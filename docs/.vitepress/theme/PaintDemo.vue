<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { withBase } from 'vitepress';
const props = defineProps({ active: Boolean, t: Function });
const emit = defineEmits(['pause', 'play']);
const stage = ref(null), video = ref(null);
const mode = ref('pbr'), visible = ref(false), ready = ref(false), failed = ref(false);
const current = ref(0), duration = ref(14), hasStarted = ref(false);
const steps = ['白いモデル', 'ベースカラー', '塗り分け', 'ディテール', 'デカール', '完成'];
const boundaries = [0, 1, 3, 5, 6.5, 8.5];
const layerIndex = computed(() => !hasStarted.value ? 5 : current.value >= 12 ? 0 : boundaries.reduce((index, time, i) => current.value >= time ? i : index, 0));
const src = name => withBase('/graphics/model-movie/' + name);
let observer, pendingTime = null, playRequest = 0;
const sync = async () => {
  const request = ++playRequest;
  const el = video.value;
  if (!el) return;
  if (props.active && visible.value && !document.hidden && ready.value && !failed.value) {
    try {
      await el.play();
      if (el !== video.value || request !== playRequest) return;
      hasStarted.value = true;
      if (!props.active || !visible.value || document.hidden) el.pause();
    } catch { if (el === video.value && request === playRequest && props.active) emit('pause'); }
  } else el.pause();
};
const pause = () => { ++playRequest; video.value?.pause(); emit('pause'); };
const changeMode = value => {
  if (value === mode.value) return;
  ++playRequest;
  pendingTime = pendingTime ?? video.value?.currentTime ?? current.value;
  ready.value = false; failed.value = false; mode.value = value;
};
const loaded = event => {
  const el = video.value;
  if (event && event.target !== el) return;
  duration.value = Number.isFinite(el.duration) ? el.duration : 14;
  if (pendingTime !== null) { el.currentTime = Math.min(pendingTime, duration.value); pendingTime = null; }
  ready.value = true; sync();
};
const seek = e => {
  pause();
  hasStarted.value = true;
  current.value = Number(e.target.value);
  if (ready.value) video.value.currentTime = current.value;
};
const selectChapter = async index => {
  const time = boundaries[index];
  current.value = time;
  hasStarted.value = true;
  if (ready.value && video.value) video.value.currentTime = time;
  else pendingTime = time;
  emit('play');
  await nextTick();
  sync();
};
const updateTime = event => { if (event.target === video.value) current.value = video.value.currentTime; };
const error = event => { if (event.target !== video.value) return; failed.value = true; ready.value = false; pause(); };
watch(() => props.active, sync);
watch(visible, sync);
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { visible.value = entry.isIntersecting; }, { threshold: .15 });
  observer.observe(stage.value);
  document.addEventListener('visibilitychange', sync);
  if (video.value.readyState >= 1) loaded();
});
onBeforeUnmount(() => { video.value?.pause(); observer?.disconnect(); document.removeEventListener('visibilitychange', sync); });
</script>
<template>
  <section class="paint-demo" :aria-label="t('レイヤーを重ねて仕上げる3Dペイント')">
    <div class="paint-demo-heading">
      <div><p class="paint-demo-kicker">LAYER BY LAYER</p><h2>{{ t('白いモデルに、色と質感を。') }}</h2></div>
      <div class="paint-modes" role="group" :aria-label="t('仕上がりの表現')">
        <button class="button secondary" :aria-pressed="mode === 'npr'" @click="changeMode('npr')">NPR <span>{{ t('トゥーン表現') }}</span></button>
        <button class="button secondary" :aria-pressed="mode === 'pbr'" @click="changeMode('pbr')">PBR <span>{{ t('物理ベースの質感') }}</span></button>
      </div>
    </div>
    <div ref="stage" class="paint-movie-stage">
      <video ref="video" :key="mode" :src="src(mode + '-worn.mp4')" :poster="src(mode + '-worn-poster.webp')" :aria-label="t('2つの3Dモデルが白からレイヤーを重ねて完成するムービー')" width="1600" height="1000" muted loop playsinline preload="metadata" @loadedmetadata="loaded" @timeupdate="updateTime" @error="error"></video>
      <img v-if="!hasStarted || failed" class="movie-static-poster" :src="src(mode + '-worn-poster.webp')" :alt="t('2つの3Dモデルが白からレイヤーを重ねて完成するムービー')" width="1600" height="1000" />
      <p v-if="failed" class="movie-error">{{ t('ムービーを読み込めませんでした。完成イメージを表示しています。') }}</p>
    </div>
    <ol class="paint-layer-steps" :aria-label="t('制作の流れ')">
      <li v-for="(step, index) in steps" :key="step" :class="{ applied: index <= layerIndex, current: index === layerIndex }"><button type="button" class="paint-chapter" :aria-current="index === layerIndex ? 'step' : undefined" :disabled="failed" @click="selectChapter(index)"><span class="layer-number">{{ String(index + 1).padStart(2, '0') }}</span><span>{{ t(step) }}</span></button></li>
    </ol>
    <div class="paint-demo-controls">
      <label for="paint-timeline">{{ t('制作の流れを見返す') }}</label>
      <input id="paint-timeline" type="range" min="0" :max="duration" step="0.1" :value="current" :disabled="!ready" :aria-label="t('ムービーの再生位置')" @input="seek" />
      <span class="paint-concept-note">{{ t('制作イメージ・実際の操作画面ではありません') }}</span>
    </div>
  </section>
</template>
