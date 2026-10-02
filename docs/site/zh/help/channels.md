---
title: "查看通道"
category: "显示与材质"
description: "BaseColor 等六种通道，以及工作、导出和预览分辨率的区别。"
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 查看通道 {#channels}

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/work-export-resolution.svg')" width="960" height="640" alt="示意图：①工作分辨率最高4096　②导出分辨率最高8192。预览分辨率单独设置。网格仅用于说明，并非实际像素数量。" loading="lazy" />
<figcaption>示意图：①工作分辨率最高4096　②导出分辨率最高8192。预览分辨率单独设置。网格仅用于说明，并非实际像素数量。</figcaption>
</figure>

## 各通道的作用

在面板顶部选择网格部件，下方可更改工作分辨率和导出分辨率。缩略图显示图层合成后的结果。

| 通道 | 作用 |
| --- | --- |
| BaseColor | 表面颜色 |
| Normal | 表面法线 |
| Roughness | 表面粗糙度 |
| Metallic | 金属感 |
| Height | 表面高度 |
| Emission | 自发光颜色 |

## 分辨率与图片关联

将项目中的图片拖放到通道上即可建立关联。视口的预览分辨率可在“首选项”的 VRAM 项目中设置。

工作分辨率可选择 512 / 1024 / 2048 / 4096，导出分辨率还可选择 8192（8K）。8K 仅用于导出，不是工作分辨率。工作分辨率、导出分辨率和预览分辨率是三个独立设置。高分辨率导出需要更多内存和处理时间。

“手动关联纹理”可以为导入材质的通道指定图片，点击“解除”可移除关联。这与图层的图片填充是不同的设置。
