<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { withBase } from 'vitepress';
const props = defineProps({ active: Boolean, label: String });
const video = ref(null);
const visible = ref(false);
const failed = ref(false);
let observer;
const syncPlayback = () => {
  if (!video.value) return;
  if (props.active && visible.value && !failed.value) {
    video.value.play().catch(() => { failed.value = true; });
  } else video.value.pause();
};
watch(() => props.active, () => { if(props.active) failed.value=false; syncPlayback(); });
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { visible.value=entry.isIntersecting; syncPlayback(); }, {threshold:.15});
  observer.observe(video.value);
});
onBeforeUnmount(() => { observer?.disconnect(); video.value?.pause(); });
</script>
<template>
  <div class="material-demo" role="img" :aria-label="label">
    <img :src="withBase('/graphics/material-poster.jpg')" alt="" width="960" height="540" fetchpriority="high" />
    <video ref="video" :class="{'is-poster':!active || failed}" :poster="withBase('/graphics/material-poster.jpg')" muted loop playsinline preload="metadata" aria-hidden="true" @error="failed=true">
      <source :src="withBase('/graphics/material-demo.mp4')" type="video/mp4" />
    </video>
  </div>
</template>
