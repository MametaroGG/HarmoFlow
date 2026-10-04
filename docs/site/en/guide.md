---
title: User guide
description: Find step-by-step help for painting, materials, layers, exporting, and settings in HarmoFlow.
outline: [2, 3]
---

<script setup>
import { withBase } from 'vitepress'
</script>

# User guide

Start with the basics or choose a topic below. Each guide covers a focused part of working with HarmoFlow.

## Getting started {#start}

Import a model, edit layers, and save your work. The essentials for painting your first texture.

Also covers automatic update notifications and pre-update backups in Ver.0.1.1.

<a :href="withBase('/en/help/start.html')">Read the guide: Getting started</a>

## Workspace and mesh parts {#workspace}

Learn the workspace layout, what each panel does, and how to switch between mesh parts and texture sets.

Includes the right-click-and-slide pie menu for the 3D viewport and UV canvas.

Ver.0.1.2 also adds thumbnail-based layer selection and layer settings to the pie menu.

<a :href="withBase('/en/help/workspace.html')">Read the guide: Workspace and mesh parts</a>

## Viewport, meshes, and display {#viewport}

Control the camera, switch PBR and NPR views, select and show parts, and inspect shape keys.

<a :href="withBase('/en/help/viewport.html')">Read the guide: Viewport, meshes, and display</a>

## Working with the UV view {#uv}

Paint in the UV Editor, pan, zoom, and rotate the view, and configure the wireframe and background.

<a :href="withBase('/en/help/uv.html')">Read the guide: Working with the UV view</a>

## Brushes, erasers, and color {#brush}

Set up brushes and erasers, adjust pen pressure and stabilization, fill faces, and pick colors.

<a :href="withBase('/en/help/brush.html')">Read the guide: Brushes, erasers, and color</a>

## Layers, masks, and blending {#layers}

Use layer types, blending, groups, masks, and clipping to control where your edits appear.

Also explains the recompositing improvement in Ver.0.1.1 when changing opacity.

<a :href="withBase('/en/help/layers.html')">Read the guide: Layers, masks, and blending</a>

## Color adjustment, tone curves, and gradient maps {#adjustments}

Choose and edit the three adjustment layers, understand their controls, and preserve your settings when saving or exporting.

[Color adjustment, tone curves, and gradient maps](./help/adjustments.md)

## Image, text, and shape stamps {#stamps}

Place images, text, and shapes on a model and configure each type of stamp.

<a :href="withBase('/en/help/stamps.html')">Read the guide: Image, text, and shape stamps</a>

## Drawing and editing paths {#paths}

Create and edit paths with anchors and handles, then adjust fills and two separate outlines.

For new 3D paths in Ver.0.1.2, read the UV-island guidance and the compatibility warning before saving for older versions.

<a :href="withBase('/en/help/paths.html')">Read the guide: Drawing and editing paths</a>

## Image fills, materials, and patterns {#materials}

Use image fills and UV transforms, adjust procedural patterns, and work with material presets.

<a :href="withBase('/en/help/materials.html')">Read the guide: Image fills, materials, and patterns</a>

## Inspecting channels {#channels}

Understand the six channels, including BaseColor, and the differences between working, export, and preview resolutions.

<a :href="withBase('/en/help/channels.html')">Read the guide: Inspecting channels</a>

## Inspecting baked geometry maps {#mesh-maps}

Read curvature, AO, normal, and position maps, and understand the scope of automatic baking and rebaking.

<a :href="withBase('/en/help/mesh-maps.html')">Read the guide: Inspecting baked geometry maps</a>

## Adding weathering to edges and recesses {#weathering}

Use geometry maps to place weathering on convex edges, recesses, and occluded areas.

<a :href="withBase('/en/help/weathering.html')">Read the guide: Adding weathering to edges and recesses</a>

## Finding and importing assets {#assets}

Search and filter project assets, and import images and Unity Packages.

<a :href="withBase('/en/help/assets.html')">Read the guide: Finding and importing assets</a>

## Projects, saving, and recovery {#projects}

Create projects and scenes, save and export packages, and recover work from autosaves.

<a :href="withBase('/en/help/projects.html')">Read the guide: Projects, saving, and recovery</a>

## Exporting images {#export}

Export PNG, JPG, TGA, EXR, and PSD files; choose channels and normal orientation; and combine mesh parts.

Ver.0.1.2 PNG export leaves unpainted areas transparent while retaining imported textures and user-added Fill layers.

<a :href="withBase('/en/help/export.html')">Read the guide: Exporting images</a>

## Preferences, history, and extensions {#settings}

Configure the home screen, pen pressure and drawing behavior, workspace layout, VRAM, Lua, and plugins.

<a :href="withBase('/en/help/settings.html')">Read the guide: Preferences, history, and extensions</a>

## Installing and managing plugins {#plugins}

Add, launch, update, and troubleshoot Lua extensions and DLL plugins. Learn how they differ from built-in adjustments.

[Installing and managing plugins](./help/plugins.md)

## Creating plugins {#plugin-development}

Start with a minimal Lua extension, then learn panel registration, Undo, the DLL SDK, building, and testing.

[Creating plugins](./help/plugin-development.md)

## Keyboard shortcut reference {#shortcuts}

Keyboard and mouse controls for painting, the camera, UVs, and saving, plus how to change key bindings.

<a :href="withBase('/en/help/shortcuts.html')">Read the guide: Keyboard shortcut reference</a>

## Glossary {#glossary}

Definitions of texture-creation terms, including UVs, PBR, baking, masks, and VRAM.

<a :href="withBase('/en/help/glossary.html')">Read the guide: Glossary</a>

## Troubleshooting {#troubleshooting}

Check UV and wireframe display, part switching, mesh maps, and the Layers panel.

<a :href="withBase('/en/help/troubleshooting.html')">Read the guide: Troubleshooting</a>
