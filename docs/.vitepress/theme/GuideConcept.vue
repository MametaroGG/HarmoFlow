<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { localeFromPath } from './locale-routing.js';
const props = defineProps({ kind: { type: String, required: true } });
const { page } = useData();
const labels = {
  ja: { caption: '3つの調整機能の違いを、仕組みで見る', note: '概念図です。実際の操作画面や出力結果ではありません。', input: '補正前', output: '補正後', dark: '暗部', light: '明部', items: [ ['色調補正', '明るさ・コントラスト・彩度・色相・ガンマで、色全体を整える。'], ['トーンカーブ', '入力の明るさを、曲線に沿って別の明るさへ変える。'], ['グラデーションマップ', '元の明るさを位置として使い、指定したグラデーションの色へ置き換える。'] ] },
  en: { caption: 'Three adjustments, three ways to change color', note: 'Concept diagrams, not app screenshots or exact output previews.', input: 'Before', output: 'After', dark: 'Dark', light: 'Light', items: [ ['Color adjustment', 'Adjust overall brightness, contrast, saturation, hue, and gamma.'], ['Tone curves', 'Map input brightness to a different output brightness along a curve.'], ['Gradient map', 'Use original brightness as a position along your chosen color gradient.'] ] },
  zh: { caption: '通过原理理解三种调整', note: '原理示意图，并非软件界面截图或精确输出预览。', input: '调整前', output: '调整后', dark: '暗部', light: '亮部', items: [ ['色调校正', '通过亮度、对比度、饱和度、色相和伽马，调整整体颜色。'], ['色调曲线', '沿曲线将输入亮度映射到另一输出亮度。'], ['渐变映射', '以原始亮度作为位置，取出指定渐变上的颜色。'] ] },
  ko: { caption: '원리로 살펴보는 세 가지 조정', note: '개념도이며 실제 앱 화면이나 정확한 출력 미리보기가 아닙니다.', input: '조정 전', output: '조정 후', dark: '어두움', light: '밝음', items: [ ['색조 보정', '밝기, 대비, 채도, 색조, 감마로 전체 색을 조정합니다.'], ['톤 커브', '곡선을 따라 입력 밝기를 다른 출력 밝기로 바꿉니다.'], ['그라디언트 맵', '원래 밝기를 위치로 사용하여 지정한 그라디언트의 색을 가져옵니다.'] ] },
};
const content = computed(() => labels[localeFromPath(page.value.relativePath)] || labels.ja);
</script>
<template>
  <figure v-if="kind === 'adjustments'" class="guide-concept">
    <figcaption>{{ content.caption }}</figcaption>
    <div class="guide-concept-cards">
      <div v-for="(item, index) in content.items" :key="item[0]" class="guide-concept-card">
        <span class="guide-concept-number">0{{ index + 1 }}</span>
        <strong>{{ item[0] }}</strong>
        <svg v-if="index === 0" viewBox="0 0 280 170" role="img" :aria-label="item[1]">
          <defs>
            <linearGradient id="gc-original"><stop stop-color="#17394d"/><stop offset=".5" stop-color="#44899d"/><stop offset="1" stop-color="#c4dedb"/></linearGradient>
            <linearGradient id="gc-adjusted"><stop stop-color="#183b44"/><stop offset=".5" stop-color="#62a2a2"/><stop offset="1" stop-color="#fff0c3"/></linearGradient>
          </defs>
          <text x="18" y="24">{{ content.input }}</text>
          <rect x="18" y="35" width="244" height="42" rx="8" fill="url(#gc-original)"/>
          <text x="18" y="113">{{ content.output }}</text>
          <rect x="18" y="124" width="244" height="34" rx="8" fill="url(#gc-adjusted)"/>
          <path d="M140 84v25m-6-6 6 6 6-6" stroke="#437b90" fill="none" stroke-width="2"/>
        </svg>
        <svg v-else-if="index === 1" viewBox="0 0 280 170" role="img" :aria-label="item[1]">
          <path d="M35 15v128h214" stroke="#8799ae" fill="none" stroke-width="2"/>
          <path d="M35 100h214M35 57h214M106 15v128M177 15v128" stroke="#dce6ee" fill="none"/>
          <path d="M35 143 249 15" stroke="#91adbf" stroke-dasharray="5 5" fill="none"/>
          <path d="M35 143C155 143 130 15 249 15" stroke="#168aad" stroke-width="5" fill="none"/>
          <circle cx="142" cy="79" r="6" fill="#fff" stroke="#168aad" stroke-width="3"/>
          <text x="35" y="163">{{ content.dark }}</text><text x="249" y="163" text-anchor="end">{{ content.light }}</text>
        </svg>
        <svg v-else viewBox="0 0 280 170" role="img" :aria-label="item[1]">
          <defs>
            <linearGradient id="gc-gray"><stop stop-color="#182333"/><stop offset="1" stop-color="#f7fafc"/></linearGradient>
            <linearGradient id="gc-palette"><stop stop-color="#26387e"/><stop offset=".55" stop-color="#bd87b2"/><stop offset="1" stop-color="#ffda94"/></linearGradient>
          </defs>
          <text x="18" y="24">{{ content.dark }}</text><text x="262" y="24" text-anchor="end">{{ content.light }}</text>
          <rect x="18" y="35" width="244" height="38" rx="8" fill="url(#gc-gray)"/>
          <path d="M48 80v29m-6-6 6 6 6-6m86-23v29m-6-6 6 6 6-6m86-23v29m-6-6 6 6 6-6" stroke="#437b90" fill="none" stroke-width="2"/>
          <rect x="18" y="118" width="244" height="38" rx="8" fill="url(#gc-palette)"/>
        </svg>
        <p>{{ item[1] }}</p>
      </div>
    </div>
    <p class="guide-concept-note">{{ content.note }}</p>
  </figure>
</template>
