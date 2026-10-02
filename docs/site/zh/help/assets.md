---
title: "查找与导入资源"
category: "导出与资源"
description: "搜索和筛选项目内的资源，以及导入图片和 Unity Package 的方法。"
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 查找与导入资源 {#assets}

## 搜索与筛选资源

项目面板显示工作文件夹中的资源和共用的材质预设。可以按图片、网格、材质等类型，以及文件夹、搜索条件和收藏进行筛选，并保存搜索条件。搜索栏和路径栏可以折叠，但隐藏后仍会保留筛选条件。如果找不到资源，请重置筛选条件。

## 导入和使用资源

通过“导入文件”或从操作系统中拖放文件来添加资源。“导入 Unity Package”可以导入 Unity Package 中的资源，但不会执行 Unity 编辑器功能或脚本。右键单击资源，可以将其加入收藏或在资源管理器中显示。根据用途，可以将图片用于通道、图片填充或印章。

## 将图片注册为印章或笔刷

右键单击项目内的图片，选择“Register as Image Stamp”或“Register as Brush Tip”。前者打开印章的图片选项卡，后者打开笔刷面板。原有的“导入 PNG 笔刷”以及添加／拖放图片的操作仍可使用。

## 导入 Unity Package {#unitypackage-import}

可将 Unity Package（.unitypackage）中的文件解包到项目资源库。导入资源包本身不会替换视口中的模型；完成解包后，还需要选择要使用的模型。

<GuideFlow kind="unity-import" />

<figure class="doc-menu-capture">
<img :src="withBase('/graphics/guide/file-menu-import.png')" width="280" height="512" alt="实际日文版文件菜单：“导入 Unity Package”位于“导入模型”下方。" loading="lazy" />
<figcaption>实际日文界面。导入Unity Package与导入单个模型是两个不同的菜单项。</figcaption>
</figure>

1. 选择“文件 → 导入 Unity Package...”，打开 .unitypackage 文件。也可以使用资源浏览器的添加菜单，或从操作系统拖入资源包。
2. 在资源浏览器中查看解包后的文件夹。如果找不到资源，请清除搜索、类型或文件夹筛选条件。
3. 将所需的FBX或其他受支持模型从资源浏览器拖到视口。也可以通过“文件 → 导入模型...”打开单个文件。
4. 将需要的图片指定到[通道](./channels.md)或[材质图层](./materials.md)，再检查显示效果。
5. 如果尚未保存，请保存到项目文件夹以保留导入的资源。详见[项目保存](./projects.md)。

### 导入内容与限制 {#unitypackage-limits}

- 解包会保留资源包的文件夹结构和相关文件。模型选择对话框支持FBX、OBJ、glTF、GLB、DAE、PLY、STL、3DS和Blend。支持文件格式并不表示能还原该文件的全部功能。
- 图片、材质定义、.meta等相关文件会保留在解包目录中。文件已经导入，并不等于Unity材质设置会自动应用；请检查图片分配和目标通道。
- **当前已禁用Prefab自动导入。** 请先解包，再选择FBX或其他受支持模型。此流程不会执行Unity场景、脚本、Animator行为或自定义着色器，也不保证与Unity渲染完全一致。
- **相对路径相同的文件可能被覆盖。** 重新导入或合并多个资源包前，请保留项目副本；需要检查冲突时，可以先在单独的项目中导入。

模型未显示时，请确认解包之后是否选中了模型。缺少颜色或图案时，请检查包内是否包含所需图片，以及图片是否分配到正确的纹理集和通道。形态键相关操作请参阅[FBX形态键导入](./viewport.md#shape-key-import)。
