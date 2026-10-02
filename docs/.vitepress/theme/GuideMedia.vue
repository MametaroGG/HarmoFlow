<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { attachGuideVideo } from './guide-video-playback.js';
import { useData, withBase } from 'vitepress';
import { localeFromPath } from './locale-routing.js';
import SiteIcon from './SiteIcon.vue';
import slots from './guide-media.json';
const props = defineProps({ name: { type: String, required: true } });
const { page } = useData();
const locale = computed(() => localeFromPath(page.value.relativePath));
const item = computed(() => slots.find(item => item.id === props.name));
const copy = computed(() => item.value?.copy[locale.value] || item.value?.copy.ja);
const mediaImages = computed(() => item.value?.images || []);
const imageLabel = image => image.labels?.[locale.value] || image.labels?.ja || copy.value.title;
const labels = {
  ja: { image: 'スクリーンショット準備中', video: '操作動画準備中', pending: '最新の画面をここに掲載予定' },
  en: { image: 'Screenshot coming soon', video: 'Video coming soon', pending: 'Reserved for the latest app capture' },
  zh: { image: '截图准备中', video: '操作视频准备中', pending: '此处将展示最新版本的操作画面' },
  ko: { image: '스크린샷 준비 중', video: '조작 영상 준비 중', pending: '최신 앱 화면이 들어갈 자리입니다' },
};
const text = computed(() => labels[locale.value] || labels.ja);
const videoElement = ref(null);
let releaseVideo;
watch(videoElement, video => {
  releaseVideo?.();
  releaseVideo = undefined;
  if (video && typeof IntersectionObserver !== 'undefined') releaseVideo = attachGuideVideo(video);
}, { flush: 'post' });
onBeforeUnmount(() => releaseVideo?.());
</script>

<template>
  <figure v-if="item" class="guide-media" :class="'guide-media--' + item.kind" :data-media-slot="name">
    <div v-if="mediaImages.length" class="guide-media-gallery" :class="{'guide-media-gallery--pair': mediaImages.length > 1}">
      <div v-for="image in mediaImages" :key="image.src" class="guide-media-image">
        <p v-if="image.labels" class="guide-media-image-label">{{ imageLabel(image) }}</p>
        <a :href="withBase(image.src)" target="_blank" rel="noopener" :aria-label="imageLabel(image)">
          <img :src="withBase(image.src)" :width="image.width" :height="image.height" :alt="imageLabel(image)" loading="lazy" />
        </a>
      </div>
    </div>
    <template v-else-if="item.src">
      <video v-if="item.kind === 'video'" :key="item.src" ref="videoElement" :src="withBase(item.src)" :poster="item.poster ? withBase(item.poster) : undefined" controls muted playsinline preload="metadata" :aria-label="copy.title" />
      <img v-else :src="withBase(item.src)" :alt="copy.title" loading="lazy" />
    </template>
    <div v-else class="guide-media-placeholder">
      <span class="guide-media-kind"><SiteIcon name="monitor" />{{ text[item.kind] }}</span>
      <strong>{{ copy.title }}</strong>
      <span class="guide-media-pending">{{ text.pending }}</span>
    </div>
    <figcaption>{{ copy.caption }}</figcaption>
  </figure>
</template>
