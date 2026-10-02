---
title: "채널 확인하기"
category: "표시와 질감"
description: "BaseColor를 비롯한 6개 채널과 작업·내보내기·미리보기 해상도의 차이."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 채널 확인하기 {#channels}

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/work-export-resolution.svg')" width="960" height="640" alt="개념도: ① 작업 해상도는 최대4096 ② 내보내기는 최대8192. 미리보기 해상도는 별도 설정입니다. 격자는 차이를 설명하며 실제 픽셀 수가 아닙니다." loading="lazy" />
<figcaption>개념도: ① 작업 해상도는 최대4096 ② 내보내기는 최대8192. 미리보기 해상도는 별도 설정입니다. 격자는 차이를 설명하며 실제 픽셀 수가 아닙니다.</figcaption>
</figure>

## 채널의 역할

패널 맨 위에서 메시 파트를 선택합니다. 그 아래에서 작업 해상도와 내보내기 해상도를 변경할 수 있습니다. 썸네일에는 레이어를 합성한 결과가 표시됩니다.

| 채널 | 역할 |
| --- | --- |
| BaseColor | 표면의 색상 |
| Normal | 표면의 법선 |
| Roughness | 표면의 거칠기 |
| Metallic | 금속성 |
| Height | 표면의 높이 |
| Emission | 발광 색상 |

## 해상도와 이미지 연결

프로젝트의 이미지를 채널에 드롭하여 연결할 수 있습니다. 뷰포트 미리보기 해상도는 “환경 설정”의 VRAM 항목에서 설정합니다.

작업 해상도는 512 / 1024 / 2048 / 4096 중에서 선택할 수 있으며, 내보내기 해상도에는 8192(8K)도 제공됩니다. 8K는 내보내기 전용이며 작업 해상도는 아닙니다. 작업 해상도, 내보내기 해상도, 미리보기 해상도는 서로 다른 설정입니다. 고해상도로 내보내려면 더 많은 메모리와 처리 시간이 필요합니다.

“수동 텍스처 연결”에서는 가져온 머티리얼의 채널에 이미지를 지정하고, “연결 해제”로 연결을 끊을 수 있습니다. 레이어의 이미지 Fill과는 별개의 설정입니다.
