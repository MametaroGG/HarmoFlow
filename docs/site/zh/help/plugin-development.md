---
title: "制作插件"
category: "设置与参考"
description: "从最小 Lua 扩展示例入门，了解面板注册、撤销、DLL SDK 的结构，以及构建和测试方法。"
outline: [2, 3]
prev: false
next: false
---

# 制作插件 {#plugin-development}

建议先制作一个 **Lua 面板，点击按钮即可添加一个图层**，用简短的流程体验文件创建、注册、运行和验证。需要逐像素处理图像的滤镜则使用 DLL。如果只想安装插件，请参阅[安装与管理插件](./plugins.md)。

<GuideFlow kind="plugin-authoring" />

## 选择哪种开发方式？ {#choose-plugin-api}

| | Lua 扩展 | DLL 插件 |
| --- | --- | --- |
| 制作内容 | 带按钮和数值滑块的面板 | 原生图像滤镜等 |
| 开发准备 | 支持 UTF-8 的文本编辑器 | 官方 SDK 头文件和支持 Windows x64 的 C/C++ 编译器 |
| 运行方式 | 通过操作按钮调用允许使用的 `hf` API | 通过宿主调用的回调函数执行处理 |
| 适合的用途 | 添加和整理图层，将常用操作组合在一起 | RGBA 图像逐像素处理，以及通过数值、渐变和曲线调整的滤镜 |
| API 版本 | 扩展侧的 `hf.api_version` 为 1 | 当前 SDK 的 `HF_API_VERSION` 为 3 |

::: tip 官方 SDK 与最小示例
[下载 HarmoFlow Plugin SDK API 3（ZIP）](/downloads/harmoflow-plugin-sdk-v3.zip)。压缩包包含官方头文件 `harmoflow_api.h`、本指南使用的小型 C 示例 `guide_gray.c`，以及构建说明，不包含应用本体。Lua 最小示例无需 SDK 即可尝试。
:::

SDK API 3 对应当前的开发实现。请确认所用 HarmoFlow 支持的 API 版本。下面的基础 C 示例仅使用 API 1 的功能，并以 API 1 注册。

## 1. 创建最小 Lua 面板 {#first-lua-panel}

在文本编辑器中新建文件，将以下内容以 **`my_first_panel.lua`** 为文件名、UTF-8（无 BOM）编码保存。在 Windows 中显示文件扩展名，确认文件名没有变成 `.lua.txt`。

```lua
hf.register_panel {
  id = "example.my_first_panel",
  title = "My First Panel",
  description = "Add one paint layer",
  actions = {
    {
      id = "add_paint",
      label = "Add paint layer",
      run = function(values)
        hf.add_layer("paint", "Practice layer")
        hf.log("Added one paint layer")
      end
    }
  }
}
```

此示例不会读写现有文件或进行外部通信，每次点击按钮都会添加一个绘画图层。添加位置取决于当前选中的图层和纹理集。请在测试场景中验证，不要直接在正式制作场景中尝试。

### 代码各部分的作用

- `hf.register_panel`：加载时注册面板，注册时不会添加图层。
- `id`：不能与其他扩展重复的标识符。发布时请改为自己独有的名称，例如 `author_name.feature_name`。
- `title`／`description`：面板名称和说明。
- `actions`：按钮列表。每个按钮也需要唯一的 `id` 和用于显示的 `label`。
- `run(values)`：用户点击按钮时执行。`values` 是一个表，可通过 ID 获取当时的滑块值。本最小示例不使用它。

## 2. 加载并验证运行结果 {#test-lua-panel}

1. 打开一个具有 UV 的小型模型，保存为测试场景。
2. 通过“插件 → 添加／浏览插件... → 添加插件...”选择 `my_first_panel.lua`。
3. 在列表中确认 Lua 扩展已成功注册。
4. 从“插件”打开 **My First Panel**，点击一次 **Add paint layer**。
5. 确认新增了一个图层，同时确认 Ctrl+Z 能撤销添加，Ctrl+Y 能重做。
6. 保存场景后重新打开，确认生成的图层仍然存在。

修改文件后，请退出应用，替换 `extensions/` 中已安装的文件，再重新启动。仅修改原工作文件夹中的源文件，不会更新添加时复制的文件。另请参阅[更新步骤](./plugins.md#update-plugin)。

## 3. 增加操作时的规则 {#lua-contract}

### 可用操作

Lua 扩展的操作只能使用以下范围的 `hf` API，不能直接使用普通“脚本 (Lua)”界面中提供的全部 API。

| 用途 | API |
| --- | --- |
| 日志 | `log` |
| 查询图层 | `layer_count`, `layer_name`, `layer_depth` |
| 添加、删除和选择 | `add_layer`, `remove_layer`, `set_active_layer` |
| 图层状态 | `set_layer_opacity`, `set_layer_visible`, `set_layer_clip`, `set_layer_alpha_lock` |
| Fill 设置 | `set_fill_channel`, `set_fill_uv` |

图层编号**从 1 开始**。`hf.add_layer` 不会返回新图层的编号。另外，根据选中位置，图层可能被插入列表中间，因此不要将添加后立即得到的 `hf.layer_count()` 当作新图层编号。使用编号执行操作之前，应先可靠地确定目标图层。

### 滑块与数量限制

可在面板的 `controls` 中注册数值滑块。在操作中，以各滑块的 ID 为键，从 `values` 读取数值。最小值必须小于最大值，且必须使用有限数值。初始值会被限制在指定范围内。

- 每个面板最多 16 个数值滑块、16 个操作
- 每个扩展最多 8 个面板，最多可加载 32 个扩展
- 文件大小上限为 1 MiB；ID、标题和标签必须为非空字符串，且不超过 256 字节
- 面板 ID 必须在所有扩展中唯一；同一面板内的控件 ID、操作 ID 也不能重复

当前实现启动时只会按文件名顺序尝试加载前16个Lua文件。运行期间最多可加载32个扩展，但如果希望重启后全部自动加载，请将 `extensions/` 目录下的 `.lua` 文件控制在16个以内。

### 带滑块的示例

下面的示例会添加具有指定不透明度的绘画图层。如果已存在同名图层，就在名称后加上 `_`，然后在添加完成后通过名称查找实际编号。此例展示了如何避免假定新图层总是添加到列表末尾。`opacity` 这个 ID 与 `values.opacity` 对应。

```lua
assert(hf.api_version == 1)
hf.register_panel {
    id = "guide.paint_layer",
    title = "Paint Layer Helper",
    description = "Create an empty paint layer with a chosen opacity.",
    controls = {
        {id = "opacity", label = "Opacity", min = 0, max = 1, value = 0.5},
    },
    actions = {
        {
            id = "add",
            label = "Add paint layer",
            run = function(values)
                local name = "Plugin practice"
                local function find_layer()
                    for i = 1, hf.layer_count() do
                        if hf.layer_name(i) == name then return i end
                    end
                end
                while find_layer() do name = name .. "_" end
                hf.add_layer("paint", name)
                local index = assert(find_layer(), "Layer was not created")
                hf.set_layer_opacity(index, values.opacity)
                hf.set_active_layer(index)
            end,
        },
    },
}
```

### 撤销与保存

一次操作中记录的编辑会合并为一次撤销。发生错误时，会回滚已记录的编辑，并恢复原先选中的图层。但这并不保证所有处理都能无条件恢复。请测试失败情况，不要一开始就使用正式制作场景。

场景中保存的是操作产生的普通图层结果。不要假定 Lua 变量或面板滑块值会随场景一起持久保存。

### 运行环境限制

每个 Lua 扩展都有独立的 Lua 状态。可用的标准功能主要是基础函数、`math`、`string` 和 `table`，不提供任意文件加载、GPU 访问或自定义撤销 API。`load`、`dofile`、`loadfile`、`collectgarbage`、`pcall` 和 `xpcall` 也已移除。

注册和操作有两秒的执行时间限制，通过监测 Lua 指令实现。它不会强制中断 C++ 侧的处理，也不意味着可以长时间运行繁重任务。这不是用于安全运行恶意代码的进程隔离机制。

## 了解 DLL 的结构 {#native-plugin}

DLL 通过 C ABI 与宿主通信。当前 SDK 为 API 3，对于面向旧版本的 DLL，会按照 3 → 2 → 1 的顺序尝试初始化。请确认使用的功能存在于指定的 API 版本中。

| API | 注册滤镜的函数 | 输入方式 |
| --- | --- | --- |
| 1 | `register_filter` | 基础图像回调 |
| 2 | `register_adjustable_filter` | 最多 16 个浮点参数 |
| 3 | `register_gradient_filter` | 2～16 个渐变色标 |
| 3 | `register_curve_filter` | RGB 整体、R、G、B 共 4 条曲线，每条 2～16 个点 |

### 入口点

DLL 必须以不经过名称修饰的形式导出 `hf_plugin_init(const HfHost*, HfPluginInfo*)`。C++ 中请使用 `extern "C"` 和 SDK 的 `HF_EXPORT`。返回值为 0 表示初始化成功。

初始化时，在 `HfPluginInfo` 中设置 `api_version`、`name`、`author` 和 `version`，并将回调传给宿主的注册函数。传入的 `HfHost*` 只能在初始化期间使用，不要保留该指针用于后续处理。滤镜名称、回调和所需数据的生命周期必须覆盖实际处理阶段。

### 图像回调

基础的 `HfFilterDesc` 包含 `name`、`apply` 和 `user`，回调形式为 `void apply(HfImage* image, void* user)`。宿主会在注册时复制描述符。`HfImage` 是按行连续排列的 RGBA8 图像，共宽 × 高 × 4 字节。只修改图像边界以内的数据，并明确决定是否修改 Alpha。不要替换 `pixels` 指针，也不要更改 `width`／`height`，应直接在传入的缓冲区中处理。

请包含对应的官方头文件，不要凭猜测手写 SDK 结构体成员或函数表。初期采用不释放图像内存、也不在回调结束后保留指针的设计，有助于避免生命周期问题。

### 最小 C 滤镜

下载包中的 `guide_gray.c` 是一个小型教学滤镜，将 RGB 的简单平均值写回三个颜色通道，不修改 Alpha。它并不是精确计算感知亮度的实现。

```c
#include <stddef.h>
#include "harmoflow_api.h"

static void grayscale(HfImage* image, void* user) {
    (void)user;
    for (size_t i = 0; i < (size_t)image->width * image->height; ++i) {
        uint8_t* pixel = image->pixels + i * 4;
        uint8_t value = (uint8_t)(((unsigned)pixel[0] + pixel[1] + pixel[2]) / 3);
        pixel[0] = pixel[1] = pixel[2] = value;
    }
}

HF_EXPORT int hf_plugin_init(const HfHost* host, HfPluginInfo* info) {
    if (!host || !info || host->api_version < 1 || !host->register_filter)
        return 1;
    info->api_version = 1;
    info->name = "Guide Grayscale";
    info->author = "Your name";
    info->version = "1.0";
    HfFilterDesc filter = {"Guide Grayscale", grayscale, NULL};
    host->register_filter(&filter);
    return 0;
}
```

此文件应作为 C 代码构建。如果改写为 C++，请使用 `extern "C"` 声明导出函数。不要假定 SDK 提供了实际上不存在的退出回调，也不要保留初始化时传入的宿主指针。

### 预览与应用结果

自定义 DLL 滤镜也会对最大 512 × 512 像素的预览图像执行回调。不要假定回调仅在点击“应用”时运行，应确保图像处理可以安全地重复执行。点击“应用”时，会以完整分辨率处理，并创建包含图像的 Fill 图层。自定义 DLL 不会自动成为可重新编辑参数的调整图层。

`Color Adjustment`、`Gradient Map` 和 `Tone Curve` 是用于识别内置调整功能的名称。请为自定义滤镜使用独有的名称，不要使用这些名称。三个内置功能的操作在[调整功能指南](./adjustments.md)中另行介绍。

## 构建并测试 DLL {#build-native-plugin}

首先解压上方的官方 SDK ZIP。无需准备应用本体的完整开发环境；对于简单的图像回调，从 SDK 头文件和 Windows x64 C/C++ 编译器即可开始。

1. 解压 SDK ZIP，打开包含 `harmoflow_api.h` 和 `guide_gray.c` 的文件夹。
2. 首先不做修改地构建附带示例，然后再按自己的用途修改滤镜名称和图像处理逻辑。
3. 在 x64 编译器环境中，将其构建为共享库（DLL）。不要假定其他电脑也安装了 Debug 版本所需的运行时依赖。
4. 确认输出的 DLL 导出了 `hf_plugin_init`。
5. 保存测试场景，按照[添加步骤](./plugins.md#install-plugin)加载 DLL。同时检查管理界面的信息和插件菜单。打开 **Guide Grayscale**，在 BaseColor 中依次尝试预览 → 取消 → 再次打开 → 应用。还需确认图层、撤销／重做、保存和重新加载。
6. 修改源代码后，退出 HarmoFlow，替换为重新构建的 DLL，再重新启动。

在 Microsoft 的 **x64 Native Tools Command Prompt**中，进入解压头文件和 C 示例的文件夹，执行以下命令。编译器安装和许可事项请遵循相应开发工具提供方的说明。

```bat
cl /nologo /LD /O2 /W4 /I . guide_gray.c /link /OUT:guide_gray.dll
dumpbin /exports guide_gray.dll
```

如果 `dumpbin` 的列表中出现 `hf_plugin_init`，即已确认存在该名称的导出。DLL 能否在 HarmoFlow 中运行，需要实际加载验证。之后如改用 C++ 源代码，也请相应调整 C++ 构建设置。

仅使用基础 `HfImage` 回调的 DLL，不需要直接链接 HarmoFlow 本体的 Vulkan、ImGui 或 Lua。如果自行添加了依赖库，请另行确认其分发条款和运行时依赖。

## 发布前检查清单 {#plugin-test-checklist}

- **注册**：确认首次添加、应用重启，以及同名文件或重复 ID 导致的失败行为
- **操作目标**：确认在空场景、有模型、多个部件、选中组内图层等情况下，操作都作用于预期目标
- **重复执行**：确认连续点击按钮或再次执行，不会意外修改其他目标
- **历史**：Lua 需确认一次操作的撤销／重做，以及错误时结果和选中状态的恢复
- **保存**：保存并重新加载处理后的场景，确认所需结果仍然存在
- **图像**：DLL 需检查小图像、不同分辨率、透明像素，以及参数最小值和最大值
- **说明**：附上作者、版本、支持的 HarmoFlow/API、安装位置、操作步骤、依赖关系和已知限制

本指南中的代码是用于学习的最小示例。C 示例已在 Linux 上验证编译和 CPU 处理，包括注册、像素转换及 Alpha 保持；Lua 示例已验证语法和模拟 API 下的行为。在编写本公开指南时，尚未生成 Windows DLL，也未在实际 HarmoFlow 中进行运行验证。请使用自己的应用、SDK 和开发环境验证上述步骤。
