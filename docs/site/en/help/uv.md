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


## Selected paint and UV boundaries (Ver.0.2.0) {#uv-paint-selection}

Ver.0.2.1: Fixed missing or scattered paint, extra outlines at UV shell boundaries, and outlines separating from the paint when moving, rotating or scaling selected paint. Improved responsiveness while moving selected paint.

Move, rotate, and scale selected paint. In the 3D viewport, placement follows the model surface and supports UV shell boundaries, offscreen and hidden surfaces, and symmetry. See [select and transform paint](./brush.md#paint-selection-transform).

White streaks when painting dense UV areas, such as sphere poles, have been fixed. UV wire rendering has also been optimized to reduce waits during use.
## Paint and navigate in the UV Editor

Select the Paint tool and a visible, unlocked paint layer, then drag on the UV Editor canvas to paint the corresponding model surface. Zoom with the mouse wheel, and pan with middle-button drag or Space + left drag. Rotate the view with Shift + Space + left or right drag. Shift + Space + left or right double-click resets only the angle, keeping the zoom and position. Fit resets rotation, position, and zoom. Dedicated cursors appear for panning and rotation. You can also edit path anchors here. The UV Editor does not unwrap or rearrange the UV layout itself.

Besides painting on Paint layers, the UV Editor supports material painting and painting masks on Fill and Adjustment layers. Check the target layer and mask-editing state first. UV strokes currently use fixed pressure and do not use the 3D view’s stroke stabilization. Paint in the 3D viewport when you need pressure variation or stabilization.

For text, shape, and image stamps in the viewport, use Ctrl + Alt + drag to adjust size and Shift + Space + drag to adjust angle. Both gestures work with either the left or right mouse button.

By default, Ctrl+left drag also zooms; moving right or up zooms in.

## Edit path anchors in UV space {#uv-path-editing}

To create a path in the UV Editor, select a Path layer and the Path tool (P). Click to place anchors, hold and drag to create handles, and click the first anchor to close it.

While drafting a path, Finish commits it open, Close commits a closed path, and Cancel discards the draft.

Select a path layer, then move an anchor by left-dragging it in the UV Editor. By default, double-click a path segment away from existing anchors with the left mouse button to insert an anchor. This gesture follows the UV Editor binding in Preferences → Key Config. Path-editing gestures in the 3D viewport are different.

## Check 3D painting at UV-island boundaries {#uv-island-boundaries}

The boundary-painting improvements in [Ver.0.1.2](https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.1.2) apply to painting in the 3D view.

- The ordinary brush can paint across UV-island boundaries on connected surfaces of the same part. See the [brush guide](./brush.md#brush-uv-island-boundaries)
- For paths newly created in the 3D view, the issue with strokes and fills breaking or jumping to another position at UV-island boundaries has been fixed. Older paths saved with UV coordinates need to be recreated in the 3D view

Compare the UV Editor and 3D view to inspect results near a boundary. For older-version compatibility of scenes containing the new 3D paths, see the [path guide](./paths.md#path-uv-island-boundaries).

## Adjust the wireframe and background

Toggle lines with UV wire, and adjust their color, opacity, and width in Wire Settings. The default wireframe uses thin lines.

- **Triangles** — Shows internal edges as well. You can hide the diagonals of detected quads.
- **UV Shells** — Shows the boundaries of UV islands. Rectangular islands appear as outlines only.
- **Fit** — Returns a zoomed or panned view to a view of the entire canvas.

The background selector lets you switch between channels such as BaseColor and generated curvature, AO, normal, and position maps.
