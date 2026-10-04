<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import ReleaseHighlightVisual from './ReleaseHighlightVisual.vue';
import { releases } from './release-notes-data.js';
import { localizedPath } from './locale-routing.js';

const props = defineProps({ locale: { type: String, required: true } });
const copy = {
  ja: { title: 'パイメニューと、更新のお知らせ。', pie: 'パイメニュー', pieText: '右クリックしたままスライドし、離して選択。Ver.0.1.2では、3DビューとUVエディタでレイヤーの選択や設定も手元から行えます。', update: 'アップデート自動通知', updateText: '起動時に新しいバージョンを自動確認。通知アイコンから変更内容を読み、アップデートの入手先へ進めます。', guide: '使い方を見る' },
  en: { title: 'A pie menu and update notifications.', pie: 'Pie menu', pieText: 'Hold right-click, slide, and release to select. In Ver.0.1.2, choose layers and change their settings near the cursor in the 3D viewport and UV Editor.', update: 'Automatic update notifications', updateText: 'Check for new versions automatically at startup. Use the notification icon to read the changes and open the download page.', guide: 'Read the guide' },
  zh: { title: '饼状菜单与更新通知。', pie: '饼状菜单', pieText: '按住右键滑动，松开即可选择。在 Ver.0.1.2 中，还可在 3D 视口和 UV 编辑器里直接选择图层、调整图层设置。', update: '自动更新通知', updateText: '启动时自动检查新版本。通过通知图标查看变更内容，并打开获取更新的页面。', guide: '查看使用方法' },
  ko: { title: '파이 메뉴와 업데이트 알림.', pie: '파이 메뉴', pieText: '오른쪽 버튼을 누른 채 슬라이드하고 놓아서 선택합니다. Ver.0.1.2에서는 3D 뷰포트와 UV 편집기에서 레이어 선택과 설정도 커서 가까이에서 할 수 있습니다.', update: '업데이트 자동 알림', updateText: '시작할 때 새 버전을 자동으로 확인합니다. 알림 아이콘에서 변경 내용을 읽고 업데이트를 받을 페이지를 열 수 있습니다.', guide: '사용 방법 보기' },
};
const text = computed(() => copy[props.locale]);
const visuals = computed(() => releases.find(item => item.id === 'v0-1-1').content[props.locale].highlights);
const visual = (kind) => visuals.value.find(item => item.visual?.kind === kind).visual;
const link = (route) => withBase(localizedPath(route, props.locale));
</script>

<template>
  <div class="update-features" aria-labelledby="update-features-title">
    <p class="eyebrow">WORKFLOW UPDATES</p>
    <h3 id="update-features-title">{{ text.title }}</h3>
    <div class="update-feature-grid">
      <article class="update-feature-card">
        <ReleaseHighlightVisual :visual="visual('pie-menu')" />
        <h4>{{ text.pie }}</h4>
        <p>{{ text.pieText }}</p>
        <a class="text-link" :href="link('/help/workspace') + '#pie-menu'">{{ text.guide }}</a>
      </article>
      <article class="update-feature-card">
        <ReleaseHighlightVisual :visual="visual('update-notification')" />
        <h4>{{ text.update }}</h4>
        <p>{{ text.updateText }}</p>
        <a class="text-link" :href="link('/help/start') + '#automatic-update-notifications'">{{ text.guide }}</a>
      </article>
    </div>
  </div>
</template>

<style scoped>
.update-features { margin-top: 80px; }
.update-features > h3 { margin: 10px 0 28px; font-size: clamp(25px, 3vw, 36px); line-height: 1.5; }
.update-feature-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; }
.update-feature-card { min-width: 0; }
.update-feature-card h4 { margin: 22px 0 10px; font-size: 23px; line-height: 1.5; }
.update-feature-card > p { margin: 0 0 18px; color: #4a5752; font-size: 16px; line-height: 1.9; }
.update-feature-card .text-link { display: inline-flex; align-items: center; min-height: 44px; }
@media (max-width: 700px) {
  .update-features { margin-top: 56px; }
  .update-feature-grid { grid-template-columns: 1fr; gap: 36px; }
}
</style>
