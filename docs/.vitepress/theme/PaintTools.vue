<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps({ active: Boolean, t: Function });
const emit = defineEmits(['play']);
const diagrams = [];
const visible = ref([false, false, false, false]);
const started = ref([false, false, false, false]);
const manual = ref([false, false, false, false]);
const runs = ref([0, 0, 0, 0]);
const hidden = ref(false), reduced = ref(true);
const titles = ['ブラシ', '消しゴム', '色混ぜ・ぼかし', '面・UV島の塗りつぶし'];
let observer, motionMedia;
const startAuto = index => {
  if (!visible.value[index] || !props.active || reduced.value || hidden.value || started.value[index]) return;
  started.value[index] = true;
  runs.value[index]++;
};
const sync = () => { for (let i = 0; i < 4; i++) startAuto(i); };
const cardClasses = index => ({
  'tool-started': started.value[index],
  'tool-awaiting': !started.value[index] && props.active && !reduced.value,
  'tool-manual': manual.value[index],
  'tool-playing': props.active && visible.value[index] && !hidden.value
});
const replay = index => {
  if (!visible.value[index]) diagrams[index]?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  manual.value[index] = true;
  started.value[index] = true;
  runs.value[index]++;
  emit('play');
};
const motionChanged = () => { reduced.value = motionMedia.matches; sync(); };
const visibilityChanged = () => { hidden.value = document.hidden; sync(); };
watch(() => props.active, sync);
onMounted(() => {
  hidden.value = document.hidden;
  motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduced.value = motionMedia.matches;
  motionMedia.addEventListener('change', motionChanged);
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const index = diagrams.indexOf(entry.target);
      if (index < 0) continue;
      visible.value[index] = entry.isIntersecting && entry.intersectionRatio >= .5;
      startAuto(index);
    }
  }, { threshold: [.0, .5], rootMargin: '-80px 0px -24px 0px' });
  diagrams.forEach(diagram => observer.observe(diagram));
  document.addEventListener('visibilitychange', visibilityChanged);
});
onBeforeUnmount(() => {
  observer?.disconnect();
  motionMedia?.removeEventListener('change', motionChanged);
  document.removeEventListener('visibilitychange', visibilityChanged);
});
</script>
<template>
  <section class="section paint-tools-section" aria-labelledby="paint-tools-title">
    <p class="eyebrow">PAINT TOOLS</p>
    <h2 id="paint-tools-title">{{ t('描く・消す・なじませる。') }}</h2>
    <p class="section-lead">{{ t('描き足す、消して整える、色をなじませる。目的に合わせて、塗り方を選べます。') }}</p>
    <div class="paint-tools-grid">
      <article class="paint-tool-card" :class="cardClasses(0)">
        <div :ref="element => diagrams[0] = element" class="paint-tool-diagram" role="img" :aria-label="t('筆圧で太さが変わるブラシの線のイメージ')">
          <svg :key="runs[0]" viewBox="0 0 480 220" aria-hidden="true" focusable="false">
            <path d="M42 168 C116 168 119 49 206 62 S322 181 434 65" fill="none" stroke="#dfe5ed" stroke-width="2" stroke-dasharray="4 8"/>
            <g class="tool-brush-reveal"><path d="M42 165 C110 164 127 51 203 45 C277 39 320 165 428 58 L439 72 C321 209 260 88 205 81 C136 72 121 177 42 171 Z" fill="#2457e7"/></g>
            <circle cx="434" cy="65" r="19" fill="none" stroke="#172a4c" stroke-width="1.5"/>
            <circle cx="434" cy="65" r="3" fill="#172a4c"/>
          </svg>
        </div>
        <div class="paint-tool-replay"><button type="button" class="button secondary" :aria-label="t(titles[0]) + '：' + t('アニメーションを再生')" @click="replay(0)">{{ t('再生') }}</button></div>
        <div class="paint-tool-copy"><p class="card-kicker">01 / BRUSH</p><h3>{{ t('ブラシ') }}</h3>
          <p>{{ t('3Dビューでは、筆圧で太さや濃淡を変えながらペイント。手ブレ補正や対称描画で、線を整えられます。') }}</p>
          <p class="paint-tool-detail">{{ t('PNG画像のブラシ先端や、設定のプリセット保存にも対応。') }}</p>
        </div>
      </article>
      <article class="paint-tool-card" :class="cardClasses(1)">
        <div :ref="element => diagrams[1] = element" class="paint-tool-diagram" role="img" :aria-label="t('消しゴムで塗った部分を消して透明にするイメージ')">
          <svg :key="runs[1]" viewBox="0 0 480 230" aria-hidden="true" focusable="false">
            <defs><pattern id="hf-tool-checker" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#fff"/><path d="M0 0h10v10H0ZM10 10h10v10H10Z" fill="#dce3ee"/></pattern>
            <mask id="hf-tool-erase"><rect width="480" height="230" fill="white"/><path class="tool-erase-cut" d="M70 126H410" stroke="black" stroke-width="48" stroke-linecap="round" fill="none"/></mask></defs>
            <g class="tool-phase-labels" font-family="sans-serif" font-size="26" fill="#465268"><text class="tool-phase-before" x="42" y="29" opacity="0">{{ t('操作前') }}</text><text class="tool-phase-action" x="42" y="29" opacity="0">{{ t('消しているところ') }}</text><text class="tool-phase-after" x="42" y="29">{{ t('操作後') }}</text></g>
            <rect x="42" y="54" width="396" height="144" rx="10" fill="url(#hf-tool-checker)"/>
            <rect x="42" y="54" width="396" height="144" rx="10" fill="#2457e7" mask="url(#hf-tool-erase)"/>
            <g class="tool-erase-cursor" transform="translate(340 0)"><circle cx="70" cy="126" r="27" fill="none" stroke="#fff" stroke-width="5"/><circle cx="70" cy="126" r="27" fill="none" stroke="#172a4c" stroke-width="2"/><circle cx="70" cy="126" r="3" fill="#172a4c"/></g>
          </svg>
        </div>
        <div class="paint-tool-replay"><button type="button" class="button secondary" :aria-label="t(titles[1]) + '：' + t('アニメーションを再生')" @click="replay(1)">{{ t('再生') }}</button></div>
        <div class="paint-tool-copy"><p class="card-kicker">02 / ERASER</p><h3>{{ t('消しゴム') }}</h3>
          <p>{{ t('サイズや先端を調整して、描いた部分を消して修正。細部も広い範囲も、ブラシで整えられます。') }}</p>
          <p class="paint-tool-detail">{{ t('ペイントだけでなく、マスクの修正にも使えます。') }}</p>
        </div>
      </article>
      <article class="paint-tool-card" :class="cardClasses(2)">
        <div :ref="element => diagrams[2] = element" class="paint-tool-diagram" role="img" :aria-label="t('描いた色の境界をぼかしてなじませるイメージ')">
          <svg :key="runs[2]" viewBox="0 0 480 230" aria-hidden="true" focusable="false">
            <defs><linearGradient id="hf-tool-soft"><stop offset="0" stop-color="#2457e7"/><stop offset=".12" stop-color="#2457e7"/><stop offset=".88" stop-color="#f0a65f"/><stop offset="1" stop-color="#f0a65f"/></linearGradient><clipPath id="hf-tool-clip"><rect x="42" y="54" width="396" height="144" rx="10"/></clipPath></defs>
            <g class="tool-phase-labels" font-family="sans-serif" font-size="26" fill="#465268"><text class="tool-phase-before" x="42" y="29" opacity="0">{{ t('操作前') }}</text><text class="tool-phase-action" x="42" y="29" opacity="0">{{ t('色をなじませる') }}</text><text class="tool-phase-after" x="42" y="29">{{ t('操作後') }}</text></g>
            <g clip-path="url(#hf-tool-clip)"><rect x="42" y="54" width="198" height="144" fill="#2457e7"/><rect x="240" y="54" width="198" height="144" fill="#f0a65f"/>
              <g class="tool-blur-soft"><rect x="42" y="54" width="396" height="144" fill="url(#hf-tool-soft)"/></g>
            </g>
            <g class="tool-blur-cursor" transform="translate(0 102)"><circle cx="240" cy="76" r="33" fill="none" stroke="#fff" stroke-width="4"/><circle cx="240" cy="76" r="33" fill="none" stroke="#172a4c" stroke-width="1.5"/><circle cx="240" cy="76" r="3" fill="#fff"/></g>
          </svg>
        </div>
        <div class="paint-tool-replay"><button type="button" class="button secondary" :aria-label="t(titles[2]) + '：' + t('アニメーションを再生')" @click="replay(2)">{{ t('再生') }}</button></div>
        <div class="paint-tool-copy"><p class="card-kicker">03 / BLEND</p><h3>{{ t('色混ぜ・ぼかし') }}</h3>
          <p>{{ t('描いた色をぼかしたり、なぞった方向へ引き延ばしたり。選択したレイヤーの色を使って、境界や質感をなじませます。') }}</p>
          <ul class="paint-tool-tags"><li>{{ t('ぼかし') }}</li><li>{{ t('色混ぜ') }}</li><li>{{ t('指先') }}</li><li>{{ t('筆なじませ') }}</li></ul>
        </div>
      </article>
      <article class="paint-tool-card" :class="cardClasses(3)">
        <div :ref="element => diagrams[3] = element" class="paint-tool-diagram" role="img" :aria-label="t('面やUV島を選んでまとめて塗り分けるイメージ')">
          <svg :key="runs[3]" viewBox="0 0 480 230" aria-hidden="true" focusable="false">
            <g class="tool-phase-labels" font-family="sans-serif" font-size="26" fill="#465268"><text class="tool-phase-before" x="42" y="29" opacity="0">{{ t('操作前') }}</text><text class="tool-phase-action" x="42" y="29" opacity="0">{{ t('選んだ範囲に塗る') }}</text><text class="tool-phase-after" x="42" y="29">{{ t('操作後') }}</text></g>
            <g fill="#e6ebf2" stroke="#fff" stroke-width="3"><path d="M45 56h126v68H45ZM45 124h126v68H45Z"/><path d="M338 75h96v57h-96ZM338 132h96v60h-96Z"/></g>
            <g fill="#e3eaf5" stroke="#fff" stroke-width="3"><path d="M194 56h62v68h-62ZM256 56h62v68h-62ZM194 124h62v68h-62ZM256 124h62v68h-62Z"/></g>
            <g fill="#2457e7" stroke="#fff" stroke-width="3"><path class="tool-fill-cell tool-fill-cell-1" d="M194 56h62v68h-62Z"/><path class="tool-fill-cell tool-fill-cell-2" d="M256 56h62v68h-62Z"/><path class="tool-fill-cell tool-fill-cell-3" d="M194 124h62v68h-62Z"/><path class="tool-fill-cell tool-fill-cell-4" d="M256 124h62v68h-62Z"/></g>
            <rect x="187" y="49" width="138" height="150" rx="5" fill="none" stroke="#2457e7" stroke-width="2" stroke-dasharray="5 5"/>
            <circle class="tool-fill-pulse" cx="257" cy="123" r="26" fill="none" stroke="#172a4c" stroke-width="2" opacity="0"/>
            <circle cx="257" cy="123" r="4" fill="#fff" stroke="#172a4c" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="paint-tool-replay"><button type="button" class="button secondary" :aria-label="t(titles[3]) + '：' + t('アニメーションを再生')" @click="replay(3)">{{ t('再生') }}</button></div>
        <div class="paint-tool-copy"><p class="card-kicker">04 / FILL</p><h3>{{ t('面・UV島の塗りつぶし') }}</h3>
          <p>{{ t('面やUV島をクリックして、範囲ごとに塗り分け。細かな面も、ひとまとまりのUV島も選べます。') }}</p>
          <p class="paint-tool-detail">{{ t('マテリアルの色・法線・粗さなども、まとめて適用できます。') }}</p>
        </div>
      </article>
    </div>
    <p class="image-disclaimer">{{ t('機能の説明用グラフィックです。実際の操作画面とは異なります。') }}</p>
  </section>
</template>
