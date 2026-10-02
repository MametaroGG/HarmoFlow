---
title: "Drawing and editing paths"
category: "Painting and editing"
description: "Create and edit paths with anchors and handles, then adjust fills and two separate outlines."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Drawing and editing paths {#paths}

<GuideMedia name="path-settings" />

## Create a path

Press P to switch to the Path tool, then click the model to place anchors. Press Enter to finish an open path, C to close it, F to close and fill it, or Esc to cancel. While drawing, Delete / Backspace removes the last anchor. You can also click the starting point to close the path.

Click a completed path to edit it again. Drag anchors or handles to refine the contour, click a curve to add a point, and press Delete to remove the selected point. Clicking the last anchor to retract its outgoing handle creates a corner. Click outside the path, or press Enter or Esc, to finish editing. You can also edit in the UV Editor while checking the positions of UV islands.

<GuideMedia name="edit-path" />

## Fills and two outlines

Set the fill, outer outline, and inner outline independently in the Paths panel. Fills have rounded/sharp corner options and opacity. Outlines have width, hardness, and opacity. Each can use its own painting channels. Swap the color swatches or choose None to create an outline-only or fill-only result. Use Rebake Paths to update the baked result.

## Materials for fills and outlines

A path's fill, outer outline, and inner outline can each use a different material. Select the corresponding swatch, then choose a material from Materials or drag it from the material browser. Clicking a material in the browser also assigns it to the selected fill or outline. Choose Solid Color to return to the original color.

Material maps and compositing are retained. Adjust width and opacity per path. These settings support scene saving and Undo/Redo.
