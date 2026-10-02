---
title: "Brushes, erasers, and color"
category: "Painting and editing"
description: "Brush Flow and Opacity, strict UV padding control, pen pressure and stabilization, face fills, and color picking."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Brushes, erasers, and color {#brush}

<GuideMedia name="brush-settings" />

## Painting basics

Select a paint layer, press B to switch to the Paint tool, and drag over the model. Strokes retain information such as positions and normals on the surface, and are baked to the current UVs. Enable multiple PBR channels to paint properties such as color and roughness with the same stroke.

| Setting | Effect |
| --- | --- |
| Size | Stroke width. You can also use the bracket keys or Ctrl+Alt+horizontal drag |
| Hardness | How soft the brush edge is. Lower values produce softer edges |
| Opacity | The opacity limit of one stroke, separate from the opacity of the whole layer |
| Flow | Ink deposited with each brush dab. Lower values build up gradually where dabs overlap |
| Spacing | The distance between brush dabs. Higher values make individual dabs more distinct |
| Stabilization | How strongly input motion is smoothed |
| Pressure Size | Use pen pressure to control brush size |
| Brush Tip | Choose a round tip or an imported image tip |
| Symmetry | Paint symmetrically around the selected X / Y / Z axes |
| Multichannel Painting | Enable the channels to paint and set their values |

In the Brush panel, choose a preset from a category and save your adjusted settings as a preset. Use Import PNG Brush to add a custom tip. The eraser has its own panel for adjusting size, tip, and other settings.

You can also right-click a project image and choose Register as Brush Tip to open it in the Brush panel.

## Flow versus Opacity {#flow-opacity}

A brush stroke is made from a sequence of small brush dabs. **Flow** controls the amount deposited by each dab; **Opacity** limits how strong a single stroke can become **before you lift the pen**.

| Goal | Setting to adjust |
| --- | --- |
| Build up paint gradually as you go over the same area | Lower Flow |
| Limit how strong one continuous stroke can become | Lower Opacity |
| Add or remove pressure-dependent changes in strength | Toggle Pressure Opacity |

For example, with Opacity at 50% and Flow at 10%, going over the same area without lifting the pen gradually builds up paint, up to that stroke's 50% limit. Lifting the pen and starting again creates another stroke that can add more paint. Flow at 0 deposits no ink. Compare the stroke preview at the top of the Brush panel and try a few strokes.

The eraser also has Flow and Opacity: they control gradual removal and the erasing limit of one stroke. To fade an entire layer, use the layer's Opacity instead.

## Remove UV padding (strict) {#strict-uv-padding}

Enable **Remove UV padding (strict)** in the Brush/Eraser panel to paint **only pixels whose centers lie inside a UV island**, disabling paint padding. A pixel that partly touches the UV boundary is not painted if its center lies outside.

- The default is off. Turn it on when you do not want paint padding outside UV islands
- This is a scene-wide setting, not a per-brush setting. It is saved with the scene, and changes support Undo/Redo
- Zoom in on a boundary in the UV Editor to compare the result. Because coverage follows exact pixel boundaries, check the model's seams as needed too

::: tip To export transparent areas outside UVs
This setting controls where paint is applied. **Preferences → VRAM → Textures → Outside mesh UVs** separately controls whether outside areas use the source image, become transparent, or keep the full texture. Strict painting alone does not make existing source-image pixels outside UVs transparent. Also check [outside-UV export handling](./export.md).
:::

## Color blending and blur

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/mix-before-after.svg')" width="960" height="640" alt="Concept diagram: 1. A sharp color boundary. 2. Blend the area touched by the brush. The tool uses existing paint rather than adding the selected color. Results vary by mode." loading="lazy" />
<figcaption>Concept diagram: 1. A sharp color boundary. 2. Blend the area touched by the brush. The tool uses existing paint rather than adding the selected color. Results vary by mode.</figcaption>
</figure>

Press U or click the fingertip icon to open Color blending. Select a paint layer and drag in the 3D view or UV Editor. It uses existing colors without adding the selected color.

- Blur softens edges
- Color mix blends nearby colors
- Fingertip drags colors along the stroke
- Bristle blend preserves fine texture

Each brush retains settings such as size, strength, and density. Press B to return to ordinary painting. You can also soften masks and painted material regions.

<GuideMedia name="blend-colors" />

## Fill faces and UV islands

Polygon Fill fills the clicked face. UV Shell Fill fills the UV island containing that face. Check the highlighted area on hover before clicking. Apply Detected Quads treats detected pairs of triangles as a single quadrilateral.

### Paint with a material

Select a material in the material browser, then paint it onto the model with a brush. Polygon Fill and UV Shell Fill apply color, normals, roughness, and other properties together to the region clicked in the 3D view or UV Editor. Changing the material keeps the current painting mode.

Select a previously painted material layer or material folder to add more coverage. The eraser removes coverage within the brush area. Ordinary painting on an existing layer is limited to that layer's texture set. A new material painted from the library targets the first part you touch.

## Eyedropper and palette

While using the Paint tool, hold Ctrl+Shift to preview the composited BaseColor on the model. Hold Ctrl+Shift+left mouse button and move the cursor, then release the mouse button to pick the color. Releasing Ctrl+Shift before the mouse button cancels the operation. The color is sampled from BaseColor, not the lit image on screen.

The Color Palette includes color adjustments, similar colors, color history, and a mixer. Drag on the mixer to blend colors, and right-click or use Alt to pick a color. The Swatches panel lets you choose saved colors. Right-click a swatch to delete an unwanted color.
