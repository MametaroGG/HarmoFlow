---
title: "Workspace and mesh parts"
category: "Getting started"
description: "Learn the workspace layout, what each panel does, and how to switch between mesh parts and texture sets."
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

## Texture sets and mesh parts

In HarmoFlow, each mesh part has its own texture set. Parts that use the same material are still treated as separate texture sets.

Ordinary brushes and stamps paint within the texture set of the selected existing layer. To paint another part, switch sets in the list at the top of the Layers panel or Shift+Alt+right-click the model. A new material painted from the material browser targets the first part you touch.

## What each panel does

| Panel | What you can do |
| --- | --- |
| Layers | Stack paint and Fill layers, and adjust visibility, opacity, and blending |
| Channels | Select a part, set the working resolution, and inspect individual channels |
| Texture Set Settings | A tab next to Layers for inspecting channels and mesh maps |
| UV Editor | View the selected part's texture and UV wireframe |

## Open panels and reset the layout

Reopen closed panels from the Window menu. Use Reset Layout to restore the arrangement. Hover over controls to see additional guidance.
