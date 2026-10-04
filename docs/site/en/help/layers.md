---
title: "Layers, masks, and blending"
category: "Painting and editing"
description: "Use layer types, blending, groups, masks, and clipping to control where your edits appear."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Layers, masks, and blending {#layers}



<GuideMedia name="layer-panel" />

## Layer types

| Type | Main use |
| --- | --- |
| Paint | Paint specific areas with brushes, erasers, and stamps |
| Material (Fill) | Cover a surface with constant channel values, images, or procedural patterns |
| Path | Create paths whose anchors, strokes, and fills can be edited later |
| Adjustment | Adjust the composited result below with Color Adjustment, Gradient Map, or Tone Curve |
| Group | Organize layers into folders |

## Editable adjustment layers

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/editable-adjustment-gradient-map.svg')" width="960" height="640" alt="Concept diagram: 1. Composite of the layers below. 2. Map brightness to colors. 3. Adjusted result. Gradient-map settings remain editable." loading="lazy" />
<figcaption>Concept diagram: 1. Composite of the layers below. 2. Map brightness to colors. 3. Adjusted result. Gradient-map settings remain editable.</figcaption>
</figure>

Use New adjustment layer in the Layers panel to add Color Adjustment, Gradient Map, or Tone Curve. These affect the composited result of the layers below. Change target channels and adjustment values later in Properties. They remain editable after saving and support Undo/Redo.

When launched from the Plugins menu, preview the result in the viewport. Apply creates an adjustment layer; Cancel restores the previous appearance.

For steps, parameter ranges, and how to choose among the three effects, see [Built-in adjustments](./adjustments.md).

## Add and organize layers

Use the controls at the top of the Layers panel to add, duplicate, delete, or group layers. When the Layers panel has focus, you can also press Delete to remove the selected layer (deleting a group also deletes its child layers). Drag layers to reorder them, and double-click groups to expand or collapse them. Change names, opacity, and blending modes in Properties. Normal uses standard compositing, Multiply darkens the underlying result, Add adds brightness, and Overlay adds contrast while retaining the underlying appearance.


Select a layer and press F2 to rename it. Drop a layer onto the middle of a folder row to move it inside, or onto the top/bottom edge to reorder it at the same level. The layer display settings gear toggles content previews and lets you choose Entire texture or Focus on painted area. Preview framing does not change the artwork.

<GuideMedia name="organize-layers" />

### Copy, cut, paste, and duplicate

With the Layers panel focused, the default shortcuts are Ctrl+C to copy, Ctrl+X to cut, Ctrl+V to paste, and Ctrl+D to duplicate. Groups include their child layers. A copy keeps a snapshot of the content at that moment. Paste, cut, and duplicate support Undo/Redo.

This is a layer clipboard for the same scene. A new scene clears it. These actions are unavailable during text entry, dialogs, imports, or stroke processing. Cutting or deleting all remaining layers is not allowed.

### Where new and pasted layers go

New layers are inserted immediately above the selected layer in the target texture set. Select a layer inside a folder to insert into that folder. Selecting the folder itself inserts a sibling above it, outside the folder.

Pasting follows the same placement rule but retains the source texture set. If a different set is selected, the paste goes to the top of the source set and the view switches to that set.

Solo includes a group’s child layers. Soloing an adjustment also keeps its underlying input, while soloing an ordinary layer retains adjustments above it. Click Solo again or use Exit solo to return to the complete stack.

Hidden layers and layers inside hidden folders remain hidden in Solo.

Lock a layer to prevent painting.


### When Merge Down is available {#merge-layers-down}

Merge Down is limited to adjacent Paint layers in the same texture set and hierarchy level. Both must be visible, at 100% opacity, use Normal blending, have no enabled mask or mask strokes, and have no clipping. Their current Lock Transparent Pixels settings must match, and neither may contain strokes recorded with alpha lock. A clipping layer directly above them also prevents merging. An eraser stroke on the upper layer or mismatched height settings also prevents merging.

## Response when changing opacity {#recompositing-performance}

Ver.0.1.1 optimizes recompositing to reduce the wait for results after changing a layer's opacity. Use the usual opacity control; no separate tool is needed.

Gains vary by operation and environment. See the [Ver.0.1.1 update notes](../updates.md#release-v0-1-1) for the workload, development environment, and measured results.

## Control visibility with masks

Masks are available on Paint, Material (Fill), and Adjustment layers. Path and Group layers have no mask slot. Lock Transparent Pixels is available only on Paint layers and confines new strokes to the area already painted at that point.

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/layer-stack-mask.svg')" width="960" height="640" alt="Concept diagram: 1. Add a mask to the blue paint. 2. Reveal only the area inside the white circle. The gray layer underneath stays visible." loading="lazy" />
<figcaption>Concept diagram: 1. Add a mask to the blue paint. 2. Reveal only the area inside the white circle. The gray layer underneath stays visible.</figcaption>
</figure>

1. Click a layer's mask area to add or select a mask.

   A new mask starts black, so the whole layer is hidden at first. The original content is still there. Paint on the mask to reveal it.

2. Paint on the mask to reveal more of the layer, or use the eraser to hide more of it.
3. Switch back to the content to edit the original layer.

Shift-click a mask to enable or disable it. Use the layer mask view to inspect its coverage. **Clipping** restricts a layer to the painted area of the layer below. **Lock Transparent Pixels** restricts new strokes to the existing painted area of the same paint layer.

Clipping is unavailable on a group or when there is no eligible layer below. An empty Paint layer has no existing coverage for alpha lock, so leave alpha lock off for the first strokes.

Stroke Height controls the height effect of painting. Use Raise/Lower and Height Amount to set the direction and amount of relief.
