<script setup>
defineProps({ t: { type: Function, required: true } });
const specifications = [
  ['OS', 'Windows 10／11・64bit', 'Windows 11・64bit'],
  ['CPU', '4コア・8スレッド以上', '6コア・12スレッド以上'],
  ['メモリ', '16GB', '32GB以上'],
  ['GPU', 'Vulkan 1.2対応・VRAM 4GB以上', 'Vulkan 1.2対応・VRAM 8GB以上'],
  ['ストレージ', 'SSD・空き容量10GB以上', 'SSD・空き容量20GB以上'],
  ['想定する作業', '1024px程度・少数のテクスチャセット', '2048px程度の通常制作'],
];
const hardware = [
  ['CPU：Intel', 'Core i3-10100', 'Core i5-12400'],
  ['CPU：AMD', 'Ryzen 3 3100', 'Ryzen 5 5600'],
  ['GPU：NVIDIA', 'GeForce GTX 1650・4GB', 'GeForce RTX 3060・12GB版'],
  ['GPU：AMD', 'Radeon RX 5500 XT・4GB版', 'Radeon RX 6600・8GB'],
];
</script>

<template>
  <section class="requirements" aria-labelledby="requirements-title">
    <h2 id="requirements-title">{{ t('動作環境の目安（暫定）') }}</h2>
    <p class="requirements-intro">{{ t('CPU・メモリ・VRAMの数値は実装からの見積もりです。最低構成での実機検証は未完了のため、確定した最低スペックではありません。') }}</p>
    <table class="requirements-table">
      <caption class="sr-only">{{ t('最低構成の目安と推奨構成') }}</caption>
      <colgroup><col class="requirement-label-column" /><col /><col /></colgroup>
      <thead><tr><th scope="col">{{ t('項目') }}</th><th scope="col">{{ t('最低構成の目安') }}</th><th scope="col">{{ t('推奨構成') }}</th></tr></thead>
      <tbody>
        <tr v-for="row in specifications" :key="row[0]">
          <th scope="row">{{ t(row[0]) }}</th><td>{{ t(row[1]) }}</td><td>{{ t(row[2]) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="requirements-notes">
      <p>{{ t('必要な性能・メモリ・VRAM容量は、モデルの規模、テクスチャ解像度、レイヤー数によって変わります。') }}</p>
      <ul>
        <li>{{ t('4K解像度や多数のテクスチャセットを扱う場合は、VRAM 12GB以上を推奨します。') }}</li>
        <li>{{ t('プロジェクト・キャッシュ・書き出し用の空き容量は別途必要です。') }}</li>
        <li>{{ t('画面解像度は1920×1080以上を推奨します。') }}</li>
      </ul>
    </div>
    <h3 id="hardware-examples-title">{{ t('CPU・GPU製品の目安（暫定）') }}</h3>
    <p class="requirements-intro">{{ t('すべてデスクトップ版が基準です。製品名は性能の目安であり、各機種での動作確認済み一覧ではありません。') }}</p>
    <table class="requirements-table" aria-labelledby="hardware-examples-title">
      <colgroup><col class="requirement-label-column" /><col /><col /></colgroup>
      <thead><tr><th scope="col">{{ t('種類') }}</th><th scope="col">{{ t('最低構成の指標（暫定）') }}</th><th scope="col">{{ t('推奨構成の指標（暫定）') }}</th></tr></thead>
      <tbody>
        <tr v-for="row in hardware" :key="row[0]">
          <th scope="row">{{ t(row[0]) }}</th><td>{{ t(row[1]) }}</td><td>{{ t(row[2]) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="requirements-note">{{ t('表の製品名は、CPUとGPUそれぞれの性能の目安です。GPUにはVulkan 1.2対応のドライバーが必要です。') }}</p>
    <p class="requirements-note">{{ t('確定している必須条件は、WindowsとVulkan 1.2対応GPU・ドライバーです。') }}</p>
    <p class="requirements-languages"><strong>{{ t('対応言語') }}</strong><span>{{ t('日本語・英語・中国語（簡体字）・韓国語') }}</span></p>
  </section>
</template>
