---
title: "Image, text, and shape stamps"
category: "Painting and editing"
description: "Place images, text, and shapes on a model and configure each type of stamp."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Image, text, and shape stamps {#stamps}

## Place stamps on a model

<GuideMedia name="stamp-settings" />

The Stamps panel has Image, Text, Shape, and Clone tabs. For Image, Text, and Shape, configure the stamp, choose Place on Model, and click the model. These are placed as paint, so their original text or shape parameters cannot be edited afterward. To change them, undo and adjust the settings, or repaint on a dedicated layer.

<GuideMedia name="place-stamp" />

## Clone stamp

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/clone-source-target.svg')" width="960" height="640" alt="Concept diagram: 1. Pick a source. 2. Paint the sampled colors elsewhere. The sample uses the composited BaseColor at capture time; it does not copy Normal or other channels." loading="lazy" />
<figcaption>Concept diagram: 1. Pick a source. 2. Paint the sampled colors elsewhere. The sample uses the composited BaseColor at capture time; it does not copy Normal or other channels.</figcaption>
</figure>

In Clone, choose the source on the model with the eyedropper gesture, Ctrl+Shift+left mouse button by default, then release the button to confirm. Drag on a paint layer to copy the composited BaseColor captured at that moment.

Aligned keeps the relative source position across strokes. When it is off, each stroke starts from the source again. Clone does not copy Normal or other channels, or screen colors with lighting applied.

## Image, text, and shape settings

| Tab | Settings and uses |
| --- | --- |
| Image | Add or drop an image. Set size, opacity, and rotation to place patterns or decals. You can also right-click a project image and choose Register as Image Stamp to open it in the Image tab. |
| Text | Set the text, system font, size, opacity, letter spacing, line spacing, alignment, and rotation |
| Shape | Choose a rectangle, ellipse, polygon, or star. Set fill, line width, number of corners, star inner-radius ratio, size, opacity, and rotation |

## Text styling and preview

Text supports font search and favorites, bold, uppercase, underline, and strikethrough. Press T to begin placing text. Text and shape previews let you toggle whether opacity is reflected in the preview. Stamp opacity is independent of brush opacity.
