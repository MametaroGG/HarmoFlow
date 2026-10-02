---
title: "Installing and managing plugins"
category: "Settings and reference"
description: "Add, launch, update, and troubleshoot Lua extensions and DLL plugins. Learn how they differ from built-in adjustments."
outline: [2, 3]
prev: false
next: false
---

# Installing and managing plugins {#plugins}

Plugins add control panels and image filters to HarmoFlow. This page explains **how to use files you have received**. To create your own, see [Creating plugins](./plugin-development.md). For the color correction, tone curves, and gradient maps available out of the box, see [Built-in adjustments](./adjustments.md).

<GuideFlow kind="plugin-install" />

## First, identify the file type {#plugin-types}

| Type | Where to add or run it | Main purpose |
| --- | --- | --- |
| Lua extension (`.lua`) | Plugins → Add / Browse Plugins... | Register a panel with sliders and buttons to group layer operations together |
| DLL plugin (`.dll`) | The same add/browse screen | Register image filters and other features using native code. Requires a Windows x64 build |
| Regular Lua script (`.lua`) | Window → Scripts (Lua) → Run / Run File... | Run an `hf` API operation once. This is separate from registering a panel |

**A regular Lua script and a Lua plugin extension are different, even though both use the `.lua` extension.** A Lua file added as a plugin must use `hf.register_panel` to register a panel. Passing a regular script to the add/browse screen will not create the plugin panel you expect.

::: warning Before adding a plugin
Save your current scene and check the source of the file and the HarmoFlow versions it supports. DLLs are native code that runs in the same process as the app. Lua extensions have some restrictions, but they do not run in an isolated environment that guarantees safety. Use files only from authors you trust.
:::

## From installation to launch {#install-plugin}

1. Open Plugins (P) → Add / Browse Plugins... in the top menu.
2. Choose Add Plugin... and select the distributed `.lua` or `.dll` file.
3. The file is copied to the app's storage location and loading begins. Lua extension registration runs at a frame when it can be processed safely, so the add confirmation alone does not mean registration is complete. Also check the loading status in the list.
4. Open the top Plugins (P) menu again and choose the registered item. **The add/browse screen is for management; launch plugins from the Plugins menu.**
5. Check the results in a small test scene. If the extension adds layers, also check that the layer list contains the intended result.

Successfully added files are loaded again the next time you start the app. If no item appears in the launch menu, see [Troubleshooting loading problems](#plugin-troubleshooting).

## Where are the files stored? {#plugin-folders}

When added through the app, files are saved in the following folders **next to the HarmoFlow executable**. They do not belong in the project folder.

```text
Folder containing the HarmoFlow executable/
├─ extensions/
│  └─ my_panel.lua
└─ plugins/
   └─ my_filter.dll
```

Use the same locations when placing files manually. At startup, HarmoFlow looks for files **directly inside** each folder. Extract ZIP archives and do not put files in deeper subfolders. Use lowercase `.lua` / `.dll` extensions. Files copied through the add/browse screen have their extensions converted to lowercase.

The add/browse screen has no option to overwrite a file with the same name. If that name already exists, use the update procedure below.

## Updating or removing a plugin {#update-plugin}

1. Save your scene and quit HarmoFlow.
2. Locate the relevant file in `extensions/` for a Lua extension or `plugins/` for a DLL.
3. To update it, back up the old file elsewhere and replace it with the new file. If you no longer need it, move it out of the relevant folder.
4. Restart HarmoFlow and check the loading status in the list and the menu item.

There are no dedicated commands to reload, unload, or delete plugins while the app is running. Loading the same DLL again, or adding a renamed Lua extension with the same panel ID, does not update it. A backup left in the same folder with a `.dll` / `.lua` extension will also be loaded at startup, so keep backups elsewhere.

## Troubleshooting loading problems {#plugin-troubleshooting}

| Symptom or message | What to check |
| --- | --- |
| A file with the same name exists / cannot add the file | Existing files are not overwritten. Quit the app, check the old file, and then replace it |
| No menu item after adding Lua | Check the Lua loading result in the list. Make sure it is an extension that registers a panel with `hf.register_panel`, rather than a regular script |
| Duplicate Lua panel ID | Check whether an older version or a copy of the same extension remains in `extensions/` |
| `Could not load DLL` | Check the author's instructions to confirm it is built for Windows x64 and that the required runtime libraries and dependent DLLs are present |
| `DLL exports no hf_plugin_init` | The HarmoFlow entry point was not found. The DLL may be for another app, or its build configuration may be incorrect |
| `Plugin init failed or wrong API version` | Check which versions the plugin supports and send the loading result to the author |
| `Already loaded` | The same DLL cannot be reloaded. To update it, quit the app, replace the file, and restart |
| A manually placed file is not found | Make sure the file is directly inside the correct folder next to the app, its extension is lowercase, and it has been extracted from its ZIP archive |

Check the distributor's requirements before looking for and adding unfamiliar DLLs from other websites. When reporting a problem, include the HarmoFlow and plugin versions, filename, displayed error, and the steps you used to add it. This makes the cause easier to identify.

## Read next

- [Creating plugins: a minimal Lua example, DLL structure, and testing](./plugin-development.md)
- [Built-in adjustments: color correction, tone curves, and gradient maps](./adjustments.md)
- [Preferences and Lua scripts](./settings.md#lua-and-plugins)
