<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { localeFromPath } from './locale-routing.js';
const props = defineProps({ kind: { type: String, required: true } });
const { page } = useData();
const texts = {
  ja: {
    "app-install": {"title": "ダウンロードから初回起動まで", "items": [["入手する", "BOOTHから選んだ版のEXEをダウンロード"], ["インストール", "使用許諾契約を確認し、案内に沿って進める"], ["試す", "小さなモデルで描画と保存を確認"]]},
    "update-backup": {"title": "更新はバックアップから", "items": [["保存・退避", "シーンを保存し、プロジェクト全体をコピー"], ["更新する", "新しいバージョンのインストーラーを実行"], ["確認する", "バージョンとテスト用コピーの再読込を確認"]]},
    'plugin-install': {title:'プラグインを使うまで', items:[['確認する','種類・配布元・対応バージョンを確認してシーンを保存'],['追加する','追加・閲覧画面でファイルを選び、読み込み状態を確認'],['起動する','プラグインメニューから開き、テスト用シーンで試す']]},
    'plugin-authoring': {title:'小さく作って、確かめる', items:[['作る','Luaでパネル、またはSDKでDLLフィルターを実装'],['読み込む','管理画面で登録結果、メニューで起動を確認'],['検証する','繰り返し実行・Undo・保存と再読込を確かめる']]},
    'unity-import': {title:'Unity Packageからアセットを使う流れ', items:[['取り込む','.unitypackageを選び、ライブラリーへ展開'],['選ぶ','取り込んだフォルダー内からFBXなどの対応モデルを探す'],['開いて確認','モデルを読み込み、テクスチャや表示を確認する']]},
    'first-paint': {title:'制作の流れ', items:[['読み込む','UVのあるモデルを開く'],['描く','パーツとレイヤーを選んでペイント'],['保存する','編集用のシーンを保存し、完成画像を書き出す']]},
    'save-export': {title:'目的に合わせて保存', items:[['編集を続ける','.harmosのシーンを保存。レイヤーやストロークを後から編集'],['ほかのソフトで使う','画像・PSDを書き出す。編集用のシーンも別に残す']]},
  },
  en: {
    "app-install": {"title": "From download to first launch", "items": [["Download", "Get the EXE for your edition from BOOTH"], ["Install", "Read the agreement and follow the wizard"], ["Try", "Check painting and saving with a small model"]]},
    "update-backup": {"title": "Start an update with a backup", "items": [["Save and copy", "Save your scene and copy the entire project"], ["Update", "Run the new installer for the same edition"], ["Verify", "Check the version and reopen a test copy"]]},
    'plugin-install': {title:'From download to first use', items:[['Check','Confirm type, author, compatibility, and save your scene'],['Add','Select the file in the manager and check its load status'],['Launch','Open it from Plugins and try it in a test scene']]},
    'plugin-authoring': {title:'Build a small feature, then verify it', items:[['Create','Write a Lua panel or a DLL filter using the SDK'],['Load','Check registration in the manager and launch from the menu'],['Test','Check repeated runs, Undo, saving, and reopening']]},
    'unity-import': {title:'Using assets from a Unity Package', items:[['Import','Choose a .unitypackage and extract it into the library'],['Choose','Find a supported model such as FBX in the imported folder'],['Inspect','Open the model and check textures and display']]},
    'first-paint': {title:'Your painting workflow', items:[['Import','Open a model with UVs'],['Paint','Select a part and layer, then paint'],['Save','Keep an editable scene and export finished textures']]},
    'save-export': {title:'Save for the next step', items:[['Continue editing','Save a .harmos scene to edit layers and strokes later'],['Use elsewhere','Export images or PSD. Keep the editable scene separately']]},
  },
  zh: {
    "app-install": {"title": "从下载到首次启动", "items": [["下载", "从BOOTH获取所选版本的EXE"], ["安装", "阅读许可协议并按向导操作"], ["试用", "用小模型检查绘制与保存"]]},
    "update-backup": {"title": "更新从备份开始", "items": [["保存并备份", "保存场景并复制整个项目"], ["更新", "运行同一版本类型的新安装程序"], ["检查", "确认版本号并重新打开测试副本"]]},
    'plugin-install': {title:'从下载到首次使用', items:[['确认','核对类型、作者、兼容版本，并保存场景'],['添加','在管理界面选择文件并检查加载状态'],['启动','从插件菜单打开，在测试场景中试用']]},
    'plugin-authoring': {title:'先实现小功能，再逐项验证', items:[['编写','编写Lua面板，或使用SDK实现DLL滤镜'],['加载','在管理界面确认注册结果，再从菜单启动'],['测试','检查重复运行、撤销、保存和重新打开']]},
    'unity-import': {title:'使用Unity Package素材的流程', items:[['导入','选择.unitypackage并解压到素材库'],['选择','在导入文件夹中找到FBX等受支持的模型'],['检查','打开模型，检查纹理和显示效果']]},
    'first-paint': {title:'制作流程', items:[['导入','打开带有UV的模型'],['绘制','选择部件和图层后绘画'],['保存','保存可编辑场景并导出完成的纹理']]},
    'save-export': {title:'按用途保存', items:[['继续编辑','保存.harmos场景，稍后编辑图层和笔画'],['在其他软件中使用','导出图片或PSD，同时单独保留可编辑场景']]},
  },
  ko: {
    "app-install": {"title": "다운로드부터 첫 실행까지", "items": [["다운로드", "BOOTH에서 선택한 판의 EXE 받기"], ["설치", "사용권 계약을 읽고 안내에 따라 진행"], ["테스트", "작은 모델로 그리기와 저장 확인"]]},
    "update-backup": {"title": "업데이트는 백업부터", "items": [["저장·복사", "장면을 저장하고 프로젝트 전체 복사"], ["업데이트", "같은 판의 새 설치 프로그램 실행"], ["확인", "버전과 테스트 사본 다시 열기 확인"]]},
    'plugin-install': {title:'다운로드부터 첫 실행까지', items:[['확인','종류, 제작자, 호환 버전을 확인하고 장면 저장'],['추가','관리 화면에서 파일을 선택하고 로드 상태 확인'],['실행','플러그인 메뉴에서 열어 테스트 장면에서 사용']]},
    'plugin-authoring': {title:'작게 만들고 하나씩 검증하기', items:[['만들기','Lua 패널 또는 SDK를 이용한 DLL 필터 구현'],['불러오기','관리 화면에서 등록 결과를 확인하고 메뉴에서 실행'],['검증하기','반복 실행, 실행 취소, 저장과 다시 열기 확인']]},
    'unity-import': {title:'Unity Package의 에셋을 사용하는 순서', items:[['가져오기','.unitypackage를 선택해 라이브러리에 풀기'],['선택','가져온 폴더에서 FBX 등 지원되는 모델 찾기'],['확인','모델을 열어 텍스처와 표시 확인']]},
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
