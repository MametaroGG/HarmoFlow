---
title: "快捷键速查"
category: "设置与参考"
description: "绘制、相机、UV 和保存操作的快捷键，以及按键配置的修改方法。"
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# 快捷键速查 {#shortcuts}


## 通过键盘和鼠标示意图查看 {#visual-key-config}

Ver.0.2.0 的快捷键设置支持通过键盘和鼠标示意图查看和编辑绑定。可以按键筛选，显示导航键和数字键盘，并切换日语、英语、韩语和中文键盘布局。较长快捷键被截断的问题也已改善。

如果已有保存的设置，请以软件中显示的绑定为准，而非下方的初始绑定表。

### 选择工具操作（Ver.0.2.0） {#selection-tool-shortcuts}

- 创建矩形或椭圆选区时按住 Shift，可得到正方形或正圆
- 选择画笔和选择橡皮支持压感与画笔大小快捷键。请在快捷键设置中确认当前绑定
- 选中的绘画内容可移动、旋转和缩放。工具用法请参阅[选择和变换绘画内容](./brush.md#paint-selection-transform)
## 查看与修改按键设置

在“偏好设置 → 按键配置”中，可在左侧切换按操作名称或快捷键搜索，然后选择操作。右侧显示所选操作的当前绑定。点击绑定按钮可编辑，使用“+ 添加”可添加另一组绑定。没有绑定的操作会在列表中标为未绑定。

在键盘和鼠标示意图中，带颜色的按键表示已有绑定。选择按键可筛选操作列表。面板提供键盘布局选择以及 Ctrl、Shift、Alt 控件；导航键和数字小键盘集中在可折叠区域中。

绑定窗口提供“恢复默认”、“Remove”（移除）和“取消”。固定操作无法修改。普通左键单击，以及与同时使用的操作冲突的组合，不能设为绑定。如果需要的按键已被其他操作使用，请先调整原有绑定。

下图展示了包含操作列表、键盘和鼠标示意图的按键配置界面。

<figure class="doc-diagram">
<a :href="withBase('/graphics/guide/key-config-example.png')" target="_blank" rel="noopener"><img :src="withBase('/graphics/guide/key-config-example.png')" width="1420" height="876" alt="日文版按键配置示例。显示的绑定取决于已保存的设置。点击图片可放大。" loading="lazy" /></a>
<figcaption>日文版按键配置示例。显示的绑定取决于已保存的设置。点击图片可放大。</figcaption>
</figure>

下表在 Ver.0.1.1 的初始绑定和固定操作基础上，补充了 Ver.0.1.2 新增的图层操作。已有保存设置时，以按键配置中的显示为准。文字输入、偏好设置或饼状菜单打开时，工具类键盘快捷键不可用。部分操作名在应用中仍显示英文，表中保留相同名称。

Ver.0.1.1中，窗口焦点切换和“Toggle Corner / Smooth”请使用表中的默认操作。在按键配置中更改后，实际操作可能仍使用原来的输入。

## 操作、按键与手势

### 常规

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 偏好设置 | Ctrl+, |
| 暂停引擎 | Shift+Esc |

### 编辑

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 撤销 | Ctrl+Z |
| 重做 | Ctrl+Y / Ctrl+Shift+Z |

### 文件

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 新建场景 | Ctrl+N |
| 保存项目 | Ctrl+S |
| 项目另存为 | Ctrl+Shift+S |
| 递增保存 | Ctrl+Alt+S |

### 工具

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 绘画工具 | B |
| Color Blending Tool | U |
| 路径工具 | P |
| 选择工具 | V |
| 文字工具 | T |

### 绘制

用于绘画、颜色混合等笔刷类工具。1、2、3 切换绘画工具的填充方式；E 切换橡皮擦的开关；开启时使用笔刷形状擦除。

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 画笔填充模式 | 1 |
| 多边形填充模式 | 2 |
| UV 壳填充模式 | 3 |
| 切换橡皮擦 | E |
| Smaller Brush | [ |
| Larger Brush | ] |
| 切换对称 | M |
| 对称 X 轴 | Shift+X<br>启用对称时 |
| 对称 Y 轴 | Shift+Y<br>启用对称时 |
| 对称 Z 轴 | Shift+Z<br>启用对称时 |
| 切换近似四边形 | Q |
| 吸管 | Ctrl+Shift+左键拖动<br>在3D视口的模型上操作。按住Ctrl和Shift时松开左键以应用；先松开修饰键会取消 |
| Adjust Brush Size (drag) | Ctrl+Alt+左键拖动 / Ctrl+Alt+右键拖动<br>水平拖动 |

### 调色板

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 交换前景色和背景色 | X |
| 切换透明色 | C |
| 重置颜色槽 | D |
| Mixer Eyedropper | Alt+左键拖动<br>在混色画布上操作。按住Alt时松开左键以应用；先松开Alt会取消 |

### 印章

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| Resize Stamp (drag) | Ctrl+Alt+左键拖动 / Ctrl+Alt+右键拖动<br>文字、形状和图片印章<br>在3D视口中水平拖动 |
| Rotate Stamp (drag) | Shift+Space+左键拖动 / Shift+Space+右键拖动<br>文字、形状和图片印章<br>在3D视口中水平拖动 |
| 重置印章旋转 | Shift+Space+左键双击 / Shift+Space+右键双击<br>文字、形状和图片印章 |

### 显示

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 切换线框 | I |
| 切换地面网格 | G |
| 保存视口截图 | F12 |
| 切换 UV 编辑器 | Shift+P |
| 打开光标下的纹理集 | Shift+Alt+右键单击<br>在模型上点击 |

### 3D 视口

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 旋转相机 | Alt+左键拖动 |
| 平移相机 | 中键拖动 / Space+左键拖动<br>Pivot 360模式下不可平移 |
| 缩放相机（拖动） | Alt+右键拖动 / Ctrl+左键拖动<br>向右或向上拖动可放大 |
| Zoom Camera (wheel) | 鼠标滚轮 |

### 路径

C、F仅在绘制路径时、光标位于3D视口内使用。Delete 或 Backspace 删除绘制中的最后一个锚点；编辑已有路径时，则删除选中的锚点。

Esc取消尚未完成的路径绘制。在3D视口重新编辑已有路径时，Esc会结束编辑并保留更改。

“闭合路径”的初始绑定是 C，“切换透明色”也使用 C。载入已保存的设置后，“闭合路径”可能变为未绑定。如果显示为未绑定，请指定不与其他操作冲突的按键。

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 结束开放路径 | Enter<br>绘制路径时，或在3D中重新编辑路径时 |
| 取消路径 | Esc<br>绘制路径时，或在3D中重新编辑路径时 |
| 移除最后一个锚点 | Delete / Backspace<br>绘制路径时 |
| 闭合路径 | 以按键配置为准（初始注册：C）<br>绘制路径时，光标位于3D视口 |
| 闭合并填充路径 | F<br>绘制路径时，光标位于3D视口 |
| 删除所选锚点 | Delete / Backspace<br>在3D视口或UV编辑器中选中锚点时 |
| Toggle Corner / Smooth | 左键双击<br>在3D视口中已打开以重新编辑的路径锚点上 |

### 选择

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 清除网格选择 | Esc<br>使用选择工具，且光标位于3D视口内 |
| Add to / Remove from Selection | Shift+左键单击<br>使用选择工具时，Shift+单击切换部件选择；从空白处Shift+拖动框选会添加部件 |
| Add to / Remove from Selection (part list) | Shift+左键单击 |

### 图层

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| Copy Selected Layer | Ctrl+C<br>图层面板获得焦点时 |
| Cut Selected Layer | Ctrl+X<br>图层面板获得焦点时 |
| Paste Layer | Ctrl+V<br>图层面板获得焦点时 |
| Duplicate Selected Layer | Ctrl+D<br>图层面板获得焦点时 |
| 删除所选图层 | Delete<br>图层面板获得焦点时 |
| Turn Layer Mask On / Off | Shift+左键单击<br>在蒙版缩略图上 |
| Open / Close Folder | 左键双击<br>在文件夹行上 |
| 使用饼状菜单选择图层（Ver.0.1.2） | 按住右键滑向“图层”，在缩略图列表的卡片上松开<br>3D 视口／UV 编辑器 |
| 使用饼状菜单切换图层设置（Ver.0.1.2） | 滑向卡片旁的设置，在该设置上松开右键<br>只更改松开位置的设置 |
| 用笔浏览和选择图层（Ver.0.1.2） | 指针停在上方／下方可滚动，移回中央则停止；用笔尖轻点卡片可选择 |

### UV 编辑器

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| Adjust Brush Size (drag) | Ctrl+Alt+左键拖动 / Ctrl+Alt+右键拖动<br>选择笔刷类工具和可绘制目标后水平拖动 |
| 缩放画布（拖动） | Ctrl+左键拖动<br>向右或向上拖动可放大 |
| 缩放画布 | 鼠标滚轮 |
| 平移画布 | 中键拖动 / Space+左键拖动 |
| Rotate Canvas | Shift+Space+左键拖动 / Shift+Space+右键拖动<br>水平拖动 |
| Reset Canvas Rotation | Shift+Space+左键双击 / Shift+Space+右键双击 |
| Insert Anchor on Segment | 左键双击<br>在路径线段上 |

### 界面操作

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 聚焦下一个窗口 | Ctrl+Tab |
| 聚焦上一个窗口 | Ctrl+Shift+Tab |
| Use the Current Tool | 左键单击／笔 |
| Toolbar Pie Menu | 按住右键滑动，松开后选中；Esc取消。在3D视口／UV画布中使用，已有右键绑定优先 |
| 聚焦下一个控件 | Tab |
| 聚焦上一个控件 | Shift+Tab |
| 清除焦点 / 关闭弹出窗口 | Esc |
| 命令面板 | 点击标题栏搜索框 |
| 运行高亮命令 | Enter<br>命令面板打开时 |
| 关闭命令面板 | Esc<br>命令面板打开时 |
| View Along an Axis | 点击坐标轴控件<br>3D视口 |
| Item Menu | 右键单击<br>预设、色板和工具栏等 |
| Open Item | 双击<br>面板内的文件、文件夹和预设 |
| 停靠 / 取消停靠面板 | 拖动面板标题栏 |
| 切换停靠选项卡 | 点击停靠区标签 |

## 面板内操作

| 操作 | 按键、鼠标操作与条件 |
| --- | --- |
| 重命名图层、资产或自建材质预设 | 选中项目，在对应面板获得焦点时按F2。重命名项目资产时，文件名也会更改。 |
| 删除项目资产 | 资产浏览器获得焦点时按Delete。将项目移至Windows回收站，场景撤销无法恢复此操作 |

各操作的具体条件请参阅[饼状菜单](./workspace.md#pie-menu)、[路径](./paths.md)、[UV 编辑器](./uv.md)、[图层](./layers.md)、[图层饼状菜单](./layers.md#layer-pie-menu)和[资产浏览器](./assets.md)。
