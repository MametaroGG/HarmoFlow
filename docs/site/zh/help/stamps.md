---
title: "印章、文字与形状"
category: "绘制与编辑"
description: "将图片、文字和形状放置到模型上的方法，以及各类印章的设置。"
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 印章、文字与形状 {#stamps}

## 在模型上放置印章

<GuideMedia name="stamp-settings" />

印章面板包含图像、文字、形状和 Clone（复制）四个选项卡。使用图像、文字或形状选项卡时，完成设置后选择“放置到模型”，再点击模型。这些内容会作为绘画放置，因此放置后不能直接编辑原始文字或形状参数。如需更改，请撤销后重新设置，或使用专用图层重新绘制。

<GuideMedia name="place-stamp" />

## 复制印章

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/clone-source-target.svg')" width="960" height="640" alt="示意图：①指定复制源　②将采样颜色绘制到其他位置。采样内容是获取时的合成BaseColor，不复制Normal等其他通道。" loading="lazy" />
<figcaption>示意图：①指定复制源　②将采样颜色绘制到其他位置。采样内容是获取时的合成BaseColor，不复制Normal等其他通道。</figcaption>
</figure>

在“Clone”中，使用与吸管相同的操作在模型上指定复制源，默认为 Ctrl+Shift+鼠标左键，松开按钮即可确认。随后在绘画图层上拖动，即可复制取样时刻已合成的 BaseColor。

开启“Aligned”会在不同笔画之间保持源点与目标的相对位置；关闭后，每次笔画都会从复制源重新开始。它不会复制 Normal 等其他通道，也不会复制包含照明效果的屏幕颜色。

## 图片、文字与形状设置

| 选项卡 | 设置与用途 |
| --- | --- |
| 图像 | 添加或拖放图片，设置大小、不透明度和旋转，放置图案或贴花。也可右键单击项目内的图片，选择“Register as Image Stamp”，在图像选项卡中使用。 |
| 文字 | 指定文字内容、系统字体、大小、不透明度、字距、行距、对齐和旋转 |
| 形状 | 选择矩形、椭圆、多边形或星形，设置填充、线宽、顶点数、星形内径比、大小、不透明度和旋转 |

## 文字样式与预览

文字支持字体搜索与收藏、加粗、转为大写、下划线和删除线。按 T 可进入文字放置模式。文字／形状预览中可以切换是否显示不透明度效果。印章的不透明度独立于笔刷设置。
