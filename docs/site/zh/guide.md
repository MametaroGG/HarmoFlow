---
title: 用户指南
description: 从入门到绘制、材质、导出和设置，查找 HarmoFlow 的操作指南。
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 用户指南

从准备绘制到完善材质，按照制作流程查找操作、设置与术语。

本指南基于开发中的实现，介绍基本操作、各面板设置和当前支持范围。所用图片为开发版本的实际界面，面板布局可以调整。

## 开始使用 {#start}

从导入模型、编辑图层到保存，了解绘制第一张纹理的基本步骤。

<a :href="withBase('/zh/help/start.html')">阅读“开始使用” →</a>

## 界面与网格部件 {#workspace}

界面布局、各面板的作用，以及切换网格部件和纹理集的方法。

<a :href="withBase('/zh/help/workspace.html')">阅读“界面与网格部件” →</a>

## 视口、网格与显示 {#viewport}

相机操作、PBR 与 NPR 显示、部件的选择和可见性，以及形态键的查看。

<a :href="withBase('/zh/help/viewport.html')">阅读“视口、网格与显示” →</a>

## 改善 UV 显示 {#uv}

在 UV 编辑器中绘制、平移、缩放和旋转，以及调整线框与背景显示。

<a :href="withBase('/zh/help/uv.html')">阅读“改善 UV 显示” →</a>

## 笔刷、橡皮擦与颜色 {#brush}

笔刷和橡皮擦的设置、笔压与防抖、面填充及颜色拾取。

<a :href="withBase('/zh/help/brush.html')">阅读“笔刷、橡皮擦与颜色” →</a>

## 图层、蒙版与混合 {#layers}

图层类型和混合方式，以及利用分组、蒙版和剪贴进行局部编辑。

<a :href="withBase('/zh/help/layers.html')">阅读“图层、蒙版与混合” →</a>

## 颜色调整、色调曲线与渐变映射 {#adjustments}

了解三种调整图层的用途、参数、重新编辑方式，以及保存和 PSD 导出的限制。

[颜色调整、色调曲线与渐变映射](./help/adjustments.md)

## 印章、文字与形状 {#stamps}

将图片、文字和形状放置到模型上的方法，以及各类印章的设置。

<a :href="withBase('/zh/help/stamps.html')">阅读“印章、文字与形状” →</a>

## 绘制与编辑路径 {#paths}

用锚点和控制柄创建与编辑路径，以及调整填充和双重描边。

<a :href="withBase('/zh/help/paths.html')">阅读“绘制与编辑路径” →</a>

## 图片填充、材质与图案 {#materials}

图片填充与 UV 变换、程序化图案调整，以及材质预设的使用方法。

<a :href="withBase('/zh/help/materials.html')">阅读“图片填充、材质与图案” →</a>

## 查看通道 {#channels}

BaseColor 等六种通道，以及工作、导出和预览分辨率的区别。

<a :href="withBase('/zh/help/channels.html')">阅读“查看通道” →</a>

## 查看烘焙的几何信息 {#mesh-maps}

曲率、AO、法线和位置贴图的查看方法，以及自动烘焙和重新烘焙的支持范围。

<a :href="withBase('/zh/help/mesh-maps.html')">阅读“查看烘焙的几何信息” →</a>

## 为边缘与凹部添加做旧效果 {#weathering}

利用几何形状贴图，在凸边、凹部和遮蔽区域分布做旧效果。

<a :href="withBase('/zh/help/weathering.html')">阅读“为边缘与凹部添加做旧效果” →</a>

## 查找与导入资源 {#assets}

搜索和筛选项目内的资源，以及导入图片和 Unity Package 的方法。

<a :href="withBase('/zh/help/assets.html')">阅读“查找与导入资源” →</a>

## 项目、保存与恢复 {#projects}

创建项目和场景、保存与打包导出，以及从自动保存中恢复。

<a :href="withBase('/zh/help/projects.html')">阅读“项目、保存与恢复” →</a>

## 导出图片 {#export}

导出为 PNG、JPG、TGA、EXR 和 PSD，以及通道、法线方向与部件合并设置。

<a :href="withBase('/zh/help/export.html')">阅读“导出图片” →</a>

## 首选项、历史与扩展 {#settings}

首页、笔压与绘画手感、界面布局、VRAM、Lua 和插件的设置。

<a :href="withBase('/zh/help/settings.html')">阅读“首选项、历史与扩展” →</a>

## 安装与管理插件 {#plugins}

添加、启动、更新 Lua 扩展和 DLL 插件，并排查加载错误。了解它们与内置调整功能的区别。

[安装与管理插件](./help/plugins.md)

## 制作插件 {#plugin-development}

从最小 Lua 扩展示例入门，了解面板注册、撤销、DLL SDK 的结构，以及构建和测试方法。

[制作插件](./help/plugin-development.md)

## 快捷键速查 {#shortcuts}

绘制、相机、UV 和保存操作的快捷键，以及按键配置的修改方法。

<a :href="withBase('/zh/help/shortcuts.html')">阅读“快捷键速查” →</a>

## 术语说明 {#glossary}

UV、PBR、烘焙、蒙版、VRAM 等纹理制作术语的含义。

<a :href="withBase('/zh/help/glossary.html')">阅读“术语说明” →</a>

## 问题排查 {#troubleshooting}

检查 UV 和线框显示、部件切换、网格贴图和图层面板的方法。

<a :href="withBase('/zh/help/troubleshooting.html')">阅读“问题排查” →</a>
