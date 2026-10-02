---
title: "Creating plugins"
category: "Settings and reference"
description: "Start with a minimal Lua extension, then learn panel registration, Undo, the DLL SDK, building, and testing."
outline: [2, 3]
prev: false
next: false
---

# Creating plugins {#plugin-development}

A good starting point is **a Lua panel that adds one layer when you click a button**. It lets you try creating, registering, running, and checking a file in a few steps. Use a DLL for filters that process individual image pixels. If you only want to install a plugin, see [Installing and managing plugins](./plugins.md).

<GuideFlow kind="plugin-authoring" />

## Which API should you use? {#choose-plugin-api}

| | Lua extension | DLL plugin |
| --- | --- | --- |
| What you create | A panel with buttons and numeric sliders | Native image filters and other features |
| Development requirements | A UTF-8 text editor | The official SDK header and a Windows x64 C/C++ compiler |
| How it runs | Call the permitted `hf` APIs from action buttons | Process data through callbacks provided to the host |
| Best suited to | Adding and organizing layers, grouping routine operations | RGBA pixel processing and filters adjusted with numeric values, gradients, and curves |
| API version | The extension's `hf.api_version` is 1 | The current SDK's `HF_API_VERSION` is 3 |

::: tip Official SDK and minimal sample
[Download HarmoFlow Plugin SDK API 3 (ZIP)](/downloads/harmoflow-plugin-sdk-v3.zip). The package contains the official `harmoflow_api.h` header, a small C sample for this guide, `guide_gray.c`, and build instructions. It does not contain the app itself. You can try the minimal Lua example without the SDK.
:::

SDK API 3 corresponds to the current development implementation. Check which API version your HarmoFlow supports. The basic C sample below uses only API 1 features and registers itself as API 1.

## 1. Create a minimal Lua panel {#first-lua-panel}

Create a new file in a text editor and save the following as **`my_first_panel.lua`**, using UTF-8 without a BOM. Show file extensions in Windows and make sure the filename does not end in `.lua.txt`.

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

This example adds one paint layer each time you click the button, without reading or writing existing files or communicating externally. The insertion position follows the selected layer and texture set. Test it in a practice scene rather than a production scene.

### What each part does

- `hf.register_panel`: Registers the panel when the file loads. It does not add a layer at registration time.
- `id`: An identifier that must not conflict with other extensions. Before distribution, change it to a name unique to you, such as `author_name.feature_name`.
- `title` / `description`: The panel's name and description.
- `actions`: The list of buttons. Each button also needs a unique `id` and a display `label`.
- `run(values)`: Runs when the user clicks the button. `values` is a table containing the current slider values, indexed by ID. This minimal example does not use it.

## 2. Load and test the panel {#test-lua-panel}

1. Open a small model with UVs and save a test scene.
2. Choose `my_first_panel.lua` through Plugins (P) → Add / Browse Plugins... → Add Plugin...
3. Check that the Lua extension was registered successfully in the list.
4. Open **My First Panel** from Plugins (P) and click **Add paint layer** once.
5. Check that one layer was added. Also check that Ctrl+Z undoes the addition and Ctrl+Y redoes it.
6. Save and reopen the scene to check that the resulting layer remains.

After editing the file, quit the app, replace the installed file in `extensions/`, and restart. Editing only the source in your original working folder does not update the copy made when you added it. See also [Updating a plugin](./plugins.md#update-plugin).

## 3. Rules for adding more actions {#lua-contract}

### Available operations

Lua extension actions can use the following `hf` APIs. They cannot use every API available in the regular Scripts (Lua) screen.

| Purpose | API |
| --- | --- |
| Logging | `log` |
| Inspecting layers | `layer_count`, `layer_name`, `layer_depth` |
| Adding, removing, and selecting | `add_layer`, `remove_layer`, `set_active_layer` |
| Layer state | `set_layer_opacity`, `set_layer_visible`, `set_layer_clip`, `set_layer_alpha_lock` |
| Fill settings | `set_fill_channel`, `set_fill_uv` |

Layer indices **start at 1**. `hf.add_layer` does not return the new index. Layers may also be inserted in the middle of the list depending on the selection, so do not treat `hf.layer_count()` immediately after insertion as the new layer's index. Identify the intended target reliably before running operations that use an index.

### Sliders and limits

You can register numeric sliders in the panel's `controls`. Read their values from `values` inside an action, using each slider's ID as the key. The minimum must be less than the maximum, and numbers must be finite. The initial value is clamped to the range.

- Up to 16 numeric sliders and 16 actions per panel
- Up to 8 panels per extension and 32 loaded extensions
- Files up to 1 MiB; IDs, titles, and labels must be nonempty strings of at most 256 bytes
- Panel IDs must be unique across all extensions. Control IDs and action IDs must not be duplicated within a panel

### Example with a slider

This example adds a paint layer with the specified opacity. If a layer with the same name already exists, it appends `_` to the name, then finds the actual index by name after adding the layer. This avoids assuming that new layers are added at the end of the list. The `opacity` ID corresponds to `values.opacity`.

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

### Undo and saving

Edits recorded during one action are grouped into one Undo step. If an error occurs, recorded edits are rolled back and the original selected layer is restored. This is not an unconditional recovery guarantee for every operation. Test failure cases as well, and do not start with a production scene.

What is saved in the scene is the ordinary layer content produced by the operation. Do not assume that Lua variables or panel slider values are persisted with the scene.

### Runtime restrictions

Each Lua extension has its own independent Lua state. The available standard features are mainly basic functions, `math`, `string`, and `table`. There is no arbitrary file loading, GPU access, or custom Undo API. `load`, `dofile`, `loadfile`, `collectgarbage`, `pcall`, and `xpcall` are also excluded.

Registration and actions have a two-second execution limit monitored through Lua instructions. This does not forcibly interrupt processing on the C++ side, and it does not mean you should run heavy processing for long periods. It is not process isolation for safely executing malicious code.

## Understanding DLL structure {#native-plugin}

DLLs communicate with the host through a C ABI. The current SDK is API 3. For DLLs targeting earlier versions, initialization is attempted in the order 3 → 2 → 1. Make sure the features you use exist in the API version you specify.

| API | Filter registration | Input model |
| --- | --- | --- |
| 1 | `register_filter` | Basic image callback |
| 2 | `register_adjustable_filter` | Up to 16 floating-point parameters |
| 3 | `register_gradient_filter` | 2–16 gradient stops |
| 3 | `register_curve_filter` | Four curves: combined RGB, R, G, and B. 2–16 points each |

### Entry point

The DLL exports `hf_plugin_init(const HfHost*, HfPluginInfo*)` without name mangling. In C++, use `extern "C"` and the SDK's `HF_EXPORT`. A return value of 0 means initialization succeeded.

During initialization, set `api_version`, `name`, `author`, and `version` in `HfPluginInfo` and pass callbacks to the host's registration functions. Use the supplied `HfHost*` only during initialization; do not retain the pointer for later processing. Filter names, callbacks, and required data must remain valid when processing takes place.

### Image callback

The basic `HfFilterDesc` contains `name`, `apply`, and `user`, and the callback has the form `void apply(HfImage* image, void* user)`. The host copies the descriptor during registration. `HfImage` is a contiguous, row-major RGBA8 image of width × height × 4 bytes. Write only within the image bounds and decide explicitly whether to change alpha. Process the supplied buffer in place without replacing the `pixels` pointer or changing `width` / `height`.

Include the matching official header instead of guessing and manually writing SDK structure members or function tables. Starting with a design that neither frees image memory nor retains pointers after the callback helps avoid lifetime problems.

### Minimal C filter

The included `guide_gray.c` is a small learning example that writes the simple average of RGB back to all three color channels. It leaves alpha unchanged. It does not calculate perceptual luminance precisely.

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

Build this file as C. If you rewrite it in C++, declare the exported function with `extern "C"`. Do not assume a shutdown callback that is absent from the SDK or retain the host pointer passed during initialization.

### Preview and applied results

Custom DLL filters are also called for preview images up to 512 × 512 pixels. Do not assume the callback runs only when Apply is clicked. Make the image processing safe to call repeatedly. Apply processes the image at full resolution and creates a Fill layer containing the image. A custom DLL does not automatically become an adjustment layer whose parameters can be edited again.

`Color Adjustment`, `Gradient Map`, and `Tone Curve` are names used to identify the built-in adjustments. Give custom filters unique names rather than reusing these. Instructions for the three built-in features are covered separately in the [Adjustments guide](./adjustments.md).

## Build and try a DLL {#build-native-plugin}

First, extract the official SDK ZIP linked above. You do not need the app's complete development environment. For a simple image callback, you can start with the SDK header and a Windows x64 C/C++ compiler.

1. Extract the SDK ZIP and open the folder containing `harmoflow_api.h` and `guide_gray.c`.
2. First build the included sample without changes. Then edit the filter name and image processing to suit your needs.
3. Build a shared library (DLL) in an x64 compiler environment. Do not assume that other PCs have the dependencies required by a Debug build.
4. Check that the output DLL exports `hf_plugin_init`.
5. Save a test scene and load the DLL using the [installation steps](./plugins.md#install-plugin). Check both the information in the management screen and the Plugins menu. Open **Guide Grayscale** and try Preview → Cancel → Open again → Apply on BaseColor. Also check layers, Undo / Redo, saving, and reloading.
6. After changing the source, quit HarmoFlow, replace the DLL with the rebuilt version, and restart.

In Microsoft's **x64 Developer Command Prompt**, go to the folder where you extracted the header and C sample, then run the following commands. Follow the development tool provider's instructions for compiler installation and licensing.

```bat
cl /nologo /LD /O2 /W4 /I . guide_gray.c /link /OUT:guide_gray.dll
dumpbin /exports guide_gray.dll
```

If `hf_plugin_init` appears in the `dumpbin` output, the named export is present. To check whether the DLL actually runs in HarmoFlow, load it in the app. If you later use C++ source, adjust the build settings for C++ as well.

A DLL that uses only the basic `HfImage` callback does not need to link directly against HarmoFlow's Vulkan, ImGui, or Lua. If you add your own library dependencies, check their distribution terms and runtime dependencies separately.

## Pre-distribution checklist {#plugin-test-checklist}

- **Registration:** Check first-time installation, app restarts, and failure with duplicate filenames or IDs
- **Targets:** Check that operations affect the intended target with an empty scene, a model present, multiple parts, and a selection inside a group
- **Repetition:** Check that repeated clicks and reruns do not change unintended targets
- **History:** For Lua, check Undo / Redo for one action, plus restoration of results and selection after errors
- **Saving:** Save and reload a scene after processing to check that the required results remain
- **Images:** For DLLs, check small images, different resolutions, transparent pixels, and minimum / maximum parameter values
- **Documentation:** Include the author, version, supported HarmoFlow / API versions, installation location, usage steps, dependencies, and known limitations

The code in this guide consists of minimal learning examples. The C sample has been checked for compilation and CPU processing on Linux, including registration, pixel conversion, and alpha preservation. The Lua examples have been checked for syntax and behavior with a mock API. Building a Windows DLL and testing in the actual HarmoFlow app were not performed when this public guide was created. Verify the steps above with the app, SDK, and development environment you use.
