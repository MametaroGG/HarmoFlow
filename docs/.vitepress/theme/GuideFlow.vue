<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { localeFromPath } from './locale-routing.js';
const props = defineProps({ kind: { type: String, required: true } });
const { page } = useData();
const texts = {
  ja: {
    'first-paint': {title:'制作の流れ', items:[['読み込む','UVのあるモデルを開く'],['描く','パーツとレイヤーを選んでペイント'],['保存する','編集用のシーンを保存し、完成画像を書き出す']]},
    'save-export': {title:'目的に合わせて保存', items:[['編集を続ける','.harmosのシーンを保存。レイヤーやストロークを後から編集'],['ほかのソフトで使う','画像・PSDを書き出す。編集用のシーンも別に残す']]},
  },
  en: {
    'first-paint': {title:'Your painting workflow', items:[['Import','Open a model with UVs'],['Paint','Select a part and layer, then paint'],['Save','Keep an editable scene and export finished textures']]},
    'save-export': {title:'Save for the next step', items:[['Continue editing','Save a .harmos scene to edit layers and strokes later'],['Use elsewhere','Export images or PSD. Keep the editable scene separately']]},
  },
  zh: {
    'first-paint': {title:'制作流程', items:[['导入','打开带有UV的模型'],['绘制','选择部件和图层后绘画'],['保存','保存可编辑场景并导出完成的纹理']]},
    'save-export': {title:'按用途保存', items:[['继续编辑','保存.harmos场景，稍后编辑图层和笔画'],['在其他软件中使用','导出图片或PSD，同时单独保留可编辑场景']]},
  },
  ko: {
    'first-paint': {title:'제작 흐름', items:[['가져오기','UV가 있는 모델 열기'],['그리기','파트와 레이어를 선택해 칠하기'],['저장하기','편집 가능한 장면 저장과 완성 텍스처 내보내기']]},
    'save-export': {title:'목적에 맞게 저장', items:[['계속 편집하기','.harmos 장면을 저장해 레이어와 스트로크를 나중에 편집'],['다른 프로그램에서 사용','이미지나 PSD로 내보내고 편집용 장면도 별도로 보관']]},
  },
};
const content = computed(() => texts[localeFromPath(page.value.relativePath)]?.[props.kind]);
</script>
<template>
  <figure v-if="content" class="guide-flow" :class="{'guide-flow--branches': kind === 'save-export'}">
    <figcaption>{{ content.title }}</figcaption>
    <ol>
      <li v-for="(item,index) in content.items" :key="item[0]">
        <span class="guide-flow-number" aria-hidden="true">{{ String(index+1).padStart(2,'0') }}</span>
        <strong>{{ item[0] }}</strong><span>{{ item[1] }}</span>
      </li>
    </ol>
  </figure>
</template>
