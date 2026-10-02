---
title: "Viewport, meshes, and display"
category: "Display and surface properties"
description: "Control the camera, switch PBR and NPR views, select and show parts, and inspect shape keys."
outline: [2, 3]
prev: false
next: false
---

# Viewport, meshes, and display {#viewport}

## Move the camera

By default, rotate with Alt+left drag and pan with middle drag or Space+left drag. Zoom with the mouse wheel, Alt+right drag, or Ctrl+left drag; drag right or up to zoom in. Panning is unavailable in Pivot 360. If you have customized Key Configuration, check your current bindings.

Use Front to return to the front view. In Free Rotation, panning moves the rotation center. Use Capture or F12 to save the viewport as a PNG.

Use Focus Layer at the top of the viewport to move the camera toward the selected layer's painted area. The focus area is based on strokes for paint layers, the shape for paths, and the target mesh for materials. Selecting another layer while focused moves the view to that layer. Use Frame All to show the entire model. Empty paint and path layers cannot be focused.

## Switch display modes

The display menu includes PBR, NPR, individual views of the six channels, and layer masks. Choose the channel appropriate to your task, such as BaseColor for checking color or Roughness for its distribution. Use PBR to inspect surface properties with light reflections, and NPR to check a toon-style appearance. These views do not guarantee an exact match with external shaders.

Shading Settings lets you adjust the light's azimuth, elevation, intensity, and color, along with ambient light intensity, saturation, and color. PBR settings include highlights, exposure, normal strength, base reflectance (F0), and ACES tone mapping. NPR settings include minimum and maximum brightness. Use Reset Shading Settings if you want to start over.

Wireframe Settings controls visibility, back-face display, color, opacity, line width, and whether to hide the diagonals of detected quads. These settings are separate from the UV Editor's wireframe settings.

## Select and hide parts

Click a part with the Selection tool. Hold Shift to add or remove parts, drag from an empty area for rectangular selection, and press Esc to clear the selection. Show or hide selected parts from the tool options. The Mesh panel lists part names, materials, and triangle counts, with individual visibility controls as well as Show All and Hide All.

## Inspect shape keys

For models containing shape keys, adjust their weights from 0–1 in the Shape Keys panel. You can search by name, filter by mesh, or show only active keys. Use Reset All, Zero Active, or group resets to restore values. Models without shape keys have nothing to adjust in this panel.
