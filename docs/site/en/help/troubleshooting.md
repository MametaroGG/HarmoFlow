---
title: "Troubleshooting"
category: "Settings and reference"
description: "Check UV and wireframe display, part switching, mesh maps, and the Layers panel."
outline: [2, 3]
prev: false
next: false
---

# Troubleshooting {#troubleshooting}

## UVs show only an outline

::: details What to do
In Wireframe Settings, change the display mode to Triangles. UV Shell mode draws only the boundary of each island.
:::

## Wireframe lines look too dark or dense

::: details What to do
Reduce line width and opacity, or switch to UV Shell mode. Turn off UV Wireframe when you want to inspect the texture itself.
:::

## Cannot switch parts

::: details What to do
The part selector is disabled if the imported model has only one part. For a model with multiple parts, select one at the top of the Channels panel.
:::

## Mesh maps do not appear

::: details What to do
Wait for automatic baking to finish. If an error appears, check its details and try Rebake. Importing a different model discards the previous processing results.
:::

## Layers panel display

Use the gear menu in the Layers panel to toggle content previews. This setting is saved in the UI layout. Previews show the painted material's BaseColor as a small UV image. They reuse GPU baking results rather than rebaking the entire layer for each row.

Folder rows are shorter than paint-layer rows, and the selected row has an inner border. Drag over the upper or lower half of a layer name to show a line at the corresponding insertion point. Drag over the center of a folder to show a border and move the item inside the folder. At a folder's top or bottom edge, an insertion line lets you reorder an item before or after the entire folder, including its child layers. Moving a folder preserves its children and supports Undo/Redo.
