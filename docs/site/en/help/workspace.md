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

## Switch tools with the pie menu {#pie-menu}

In Ver.0.1.1, you can open a pie menu around the cursor in the 3D viewport or UV canvas.

1. Press the right mouse button over the 3D viewport or UV canvas.
2. Keep the button held and slide toward the item you want.
3. Release the right button to select it. Press Esc to cancel. Releasing without sliding also closes the menu without selecting anything.

Switch between tools such as brush painting, color blending, and UV shell fill close to where you work. Existing right-button bindings, such as camera controls and brush-size adjustments, take priority when their key combinations are held. See the [shortcut reference](./shortcuts.md) for keyboard and mouse controls.

The pie-menu trigger is a fixed gesture. If it does not open, release modifier keys such as Ctrl, Shift, or Alt and finish drawing or text entry before trying again.

## Texture sets and mesh parts

In HarmoFlow, each mesh part has its own texture set. Parts that use the same material are still treated as separate texture sets.

Ordinary brushes and stamps paint within the texture set of the selected existing layer. To paint another part, switch sets in the list at the top of the Layers panel or Shift+Alt+right-click the model. A new material painted from the Asset Browser also targets the currently selected texture set. Select the target set before painting. Other texture sets are not changed automatically.

## What each panel does

| Panel | What you can do |
| --- | --- |
| Layers | Stack paint and Fill layers, and adjust visibility, opacity, and blending |
| Channels | Select a part, set the working resolution, and inspect individual channels |
| Texture Set Settings | A tab next to Layers for inspecting channels and mesh maps |
| UV Editor | View the selected part's texture and UV wireframe |

## Open panels and reset the layout

Reopen closed panels from the Window menu. Use Reset Layout to restore the arrangement. Hover over controls to see additional guidance.
