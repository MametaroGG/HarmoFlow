<script setup>
const props = defineProps({ visual: { type: Object, required: true } });
// Both timing bars share zero and the same maximum; no minimum bar width.
const timingWidth = (value) => `${100 * value / Math.max(props.visual.before, props.visual.after)}%`;
</script>

<template>
  <figure class="release-highlight-visual" :class="`rh-${visual.kind}`">
    <div class="rh-visual-frame">
      <div v-if="visual.kind === 'recomposite'" class="rh-timing-chart" role="img" :aria-label="visual.label">
        <p class="rh-metric">{{ visual.metric }}</p>
        <div class="rh-timing-row">
          <div class="rh-timing-label"><span>{{ visual.beforeLabel }}</span><strong>{{ visual.before }}<small>{{ visual.unit }}</small></strong></div>
          <div class="rh-timing-track"><span class="rh-timing-bar rh-before" :style="{ width: timingWidth(visual.before) }"></span></div>
        </div>
        <div class="rh-timing-row">
          <div class="rh-timing-label"><span>{{ visual.afterLabel }}</span><strong>{{ visual.after }}<small>{{ visual.unit }}</small></strong></div>
          <div class="rh-timing-track"><span class="rh-timing-bar rh-after" :style="{ width: timingWidth(visual.after) }"></span></div>
        </div>
      </div>
      <svg v-else-if="visual.kind === 'pie-menu'" viewBox="0 0 300 180" role="img" :aria-label="visual.label">
        <circle cx="150" cy="90" r="83" stroke="#dbe6de" stroke-dasharray="2 5" />
        <g v-for="sector in 8" :key="sector" :transform="`rotate(${(sector - 1) * 45} 150 90)`">
          <path d="M150 21A69 69 0 0 1 198.79 41.21L175.46 64.54A36 36 0 0 0 150 54Z" :fill="sector === 2 ? '#167e80' : '#e0e9e0'" stroke="#f5f8f3" stroke-width="3" />
          <circle cx="170" cy="42" r="4" :fill="sector === 2 ? '#e5fff1' : '#7c9989'" stroke="none" />
        </g>
        <circle cx="150" cy="90" r="22" fill="#183e39" stroke="none" />
        <circle cx="150" cy="90" r="4" fill="#e4fff2" stroke="none" />
      </svg>
      <svg v-else-if="visual.kind === 'update-notification'" viewBox="0 0 300 180" role="img" :aria-label="visual.label">
        <circle cx="150" cy="90" r="79" fill="#e6efe3" stroke="none" />
        <rect x="65" y="33" width="148" height="99" rx="10" fill="#eff5eb" stroke="#bbcebe" stroke-width="1.5" />
        <path d="M79 48h68M79 57h42" stroke="#b1c5b4" stroke-width="3" stroke-linecap="round" />
        <rect x="86" y="64" width="149" height="84" rx="12" fill="#fff" stroke="#92b5a7" stroke-width="1.5" />
        <circle cx="122" cy="105" r="24" fill="#e6f2e9" stroke="none" />
        <path d="M110 112h24l-3-5v-9a9 9 0 0 0-18 0v9ZM119 117a3 3 0 0 0 6 0M122 86v3" stroke="#176b6b" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
        <path d="M160 97h51M160 111h37" stroke="#bbcdc4" stroke-width="5" stroke-linecap="round" />
        <circle cx="231" cy="68" r="9" fill="#168584" stroke="#fff" stroke-width="3" />
      </svg>
    </div>
    <figcaption>{{ visual.note }}</figcaption>
  </figure>
</template>

<style scoped>
.release-highlight-visual { margin: 0; color: #263f36; }
.rh-visual-frame { position: relative; width: 100%; aspect-ratio: 3 / 2; min-height: 225px; border: 1px solid #dce7da; border-radius: 9px; background: #f5f8f3; overflow: hidden; }
.rh-visual-frame svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; fill: none; }
.rh-timing-chart { position: absolute; inset: 0; padding: 21px; display: flex; flex-direction: column; justify-content: center; gap: 15px; }
.rh-timing-chart p { margin: 0; font-size: 14px; font-weight: 700; line-height: 1.6; }
.rh-timing-label { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 7px; font-size: 14px; line-height: 1.5; }
.rh-timing-label strong { font-size: 21px; font-weight: 700; color: #173d36; white-space: nowrap; }
.rh-timing-label small { margin-left: 4px; font-size: 13px; font-weight: 400; }
.rh-timing-track { height: 14px; background: #e1e9df; border-radius: 2px; overflow: hidden; }
.rh-timing-bar { height: 100%; display: block; border-radius: 2px; }
.rh-before { background: #71877b; }
.rh-after { background: #137f80; }
figcaption { font-size: 14px; color: #53655e; line-height: 1.8; margin-top: 13px; }
@media (max-width: 900px) {
  .rh-visual-frame { aspect-ratio: 2 / 1; min-height: 225px; }
  .rh-timing-chart { padding-inline: 28px; }
}
@media (max-width: 480px) {
  .rh-visual-frame { aspect-ratio: 3 / 2; }
  .rh-timing-chart { padding-inline: 20px; }
}
</style>
