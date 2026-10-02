---
title: "Working with the UV view"
category: "Display and surface properties"
description: "Paint in the UV Editor, pan, zoom, and rotate the view, and configure the wireframe and background."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Working with the UV view {#uv}

<GuideMedia name="uv-editor" />

## Paint and navigate in the UV Editor

Select the Paint tool and a paint layer, then drag on the UV Editor canvas to paint the corresponding model surface. Zoom with the mouse wheel, and pan with middle-button drag or Space + left drag. Rotate the view with Shift + Space + left or right drag. Shift + Space + left or right double-click resets only the angle, keeping the zoom and position. Frame All resets rotation, position, and zoom. Dedicated cursors appear for panning and rotation. You can also edit path anchors here. The UV Editor does not unwrap or rearrange the UV layout itself.

For text, shape, and image stamps in the viewport, use Ctrl + Alt + drag to adjust size and Shift + Space + drag to adjust angle. Both gestures work with either the left or right mouse button.

## Adjust the wireframe and background

Toggle lines with UV Wireframe, and adjust their color, opacity, and width in Wireframe Settings. The default wireframe uses thin lines.

- **Triangles** — Shows internal edges as well. You can hide the diagonals of detected quads.
- **UV Shells** — Shows the boundaries of UV islands. Rectangular islands appear as outlines only.
- **Frame All** — Returns a zoomed or panned view to a view of the entire canvas.

The background selector lets you switch between channels such as BaseColor and generated curvature, AO, normal, and position maps.
