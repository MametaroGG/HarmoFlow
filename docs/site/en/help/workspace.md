---
title: "Workspace and mesh parts"
category: "Getting started"
description: "Workspace layout, panel roles, the pie menu, and switching between mesh parts and texture sets."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Workspace and mesh parts {#workspace}

## Workspace layout

<GuideMedia name="workspace-overview" />

## Find commands {#command-search}

Use the search box at the top of the window to find commands such as saving, importing, opening Preferences, and toggling panels. Click a result to run it, or press Enter to run the first result. Press Esc or click outside to close the results. If the search box is hidden, widen the window. To find assets, use the search box inside the Asset Browser.

## Switch tools and layers with the pie menu {#pie-menu}

Since Ver.0.1.1, you can open a pie menu around the cursor in the 3D viewport or UV canvas.

1. Press the right mouse button over the 3D viewport or UV canvas.
2. Keep the button held and slide toward the item you want.
3. Release the right button to select it. Press Esc to cancel. Releasing without sliding also closes the menu without selecting anything.

Switch between tools such as brush painting, color blending, and UV shell fill close to where you work. Existing right-button bindings, such as camera controls and brush-size adjustments, take priority when their key combinations are held. See the [shortcut reference](./shortcuts.md) for keyboard and mouse controls.

The pie-menu trigger is a fixed gesture. If it does not open, release modifier keys such as Ctrl, Shift, or Alt and finish drawing or text entry before trying again.

In Ver.0.1.2, keep the right button held and slide into Layers to open the thumbnail list. Release over a card to select that layer, or use the controls beside it to change visibility, locking, and other settings. See [layer selection and settings](./layers.md#layer-pie-menu).

## Texture sets and mesh parts

In HarmoFlow, each mesh part has its own texture set. Parts that use the same material are still treated as separate texture sets.

Ordinary brushes and stamps paint within the texture set of the selected existing layer. To paint another part, switch sets in the list at the top of the Layers panel or Shift+Alt+right-click the model. When you start a new painted material from the Asset Browser, it is recorded in the currently selected texture set. Painting on an existing layer targets the set that owns that layer. Parts using the same material can share their final texture, so overlapping UVs can show changes on another part.

## What each panel does

These are the panel names in the Window menu. Follow a name to its related instructions.

| Panel | What it does |
| --- | --- |
| [Viewport](./viewport.md#viewport) | Inspect and paint the model in 3D, control the camera, and switch between PBR and NPR. |
| [Layers](./layers.md#layers) | Organize layers and folders, and adjust masks, visibility, opacity, and blending. |
| [Texture Set Settings](./mesh-maps.md#mesh-maps) | Inspect channels and mesh maps for the selected set, enlarge previews, and rebake maps. |
| [Properties](./layers.md#layers) | Edit the settings available for the selected layer type. |
| [Brush](./brush.md#brush) | Choose brush presets and adjust size, flow, spacing, and other brush settings. |
| [Stamp](./stamps.md#stamps) | Configure image, text, shape, and clone stamps. |
| [Eraser](./brush.md#brush) | Adjust the eraser's size and behavior. |
| [Color blending](./brush.md#blend-controls) | Choose a blending or blur brush and adjust its mixing or blur strength. |
| [Color Palette](./brush.md#brush) | Choose and mix colors for painting. |
| [Swatches](./brush.md#brush) | Save frequently used colors and select them again. |
| [Asset Browser](./assets.md#assets) | Find, filter, and import assets from the project and library. |
| [Meshes](./viewport.md#mesh-visibility) | Select mesh parts, toggle their visibility, and inspect material names and triangle counts. |
| [Shape Keys](./viewport.md#shape-keys) | Filter imported shape keys and adjust their weights to preview deformation. |
| [Channels](./channels.md#channels) | Select the texture set and resolutions, inspect six channels, and bind texture images. |
| [Paths](./paths.md#paths) | Set path fill and outline styles, and edit paths. |
| [UV Editor](./uv.md#uv) | Paint and edit paths in UV space, and inspect textures, mesh maps, and UV wires. |
| [Export](./export.md#export) | Set the output location, format, and channels, then export textures. |
| [Scripting (Lua)](./settings.md#lua-and-plugins) | Run Lua code or files and inspect their logs. |
| [Plugins](./plugins.md#plugins) | Inspect installed plugins and add or manage them. |
| [History](./settings.md#history-navigation) | Inspect the edit history and select rows to move through Undo and Redo states. |
| [Console](./troubleshooting.md#diagnostic-info) | Inspect processing results and errors from the current session, and copy the log. |
| [FPS / Frame time](./settings.md#performance-panel) | Inspect FPS and frame times to compare responsiveness. |
| [Panel Rail](./settings.md#panel-rail-operations) | Stow panels as icons, open or close them, and reorder or group them. |

## Open panels and reset the layout

Reopen closed panels from the Window menu. Use Reset Layout to restore the arrangement. Hover over controls to see additional guidance.
