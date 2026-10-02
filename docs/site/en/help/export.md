---
title: "Exporting images"
category: "Export and assets"
description: "Export PNG, JPG, TGA, EXR, and PSD files; choose channels and normal orientation; and combine mesh parts."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Exporting images {#export}

## Exporting versus saving a scene

<GuideMedia name="export-settings" />

Choose an output location, format, and resolution in the Export panel. Supported formats include PNG, JPG, TGA, EXR, and PSD. Saving a scene so you can resume editing and exporting finished textures as images are separate operations.

To export only geometry maps, use PNG export in the mesh map baking window. These maps contain linear data. A new folder is created at the output location.

## Output settings

1. Choose the export resolution in Channels.
2. In Export, specify the output folder, base name, and format.
3. Enable the channels you need and choose the normal map convention.
4. Click Export Textures.

| Setting | When to use it |
| --- | --- |
| PNG | The standard choice for saving images without quality loss |
| JPG | Use for smaller color images. Because it uses lossy compression, choose PNG or another suitable format for data maps |
| TGA | Use when the destination workflow requires TGA |
| EXR | Use for workflows that support EXR. Changing the format alone does not increase the precision of the original editing data |
| PSD | One file per channel, with raster layers and editable opacity/blend settings. Save .harmos too for editable HarmoFlow strokes and adjustment parameters. See the details below |
| OpenGL / DirectX | Choose the green-channel orientation of tangent-space Normal maps to match the destination's settings |

### What PSD retains

Creates one PSD per channel. Paint, Fill, and path layers are saved as image layers with their original names, order, and visibility. Opacity and blend modes (Normal, Multiply, Add, and Overlay) remain editable PSD settings. Add maps to Linear Dodge (Add).

Masks and clipping are baked into pixel transparency. Folders retain their hierarchy, names, visibility, and collapsed state, using Pass Through blending. For ordinary Paint, Fill, and Path channel compositing, no extra layer is added solely to compensate for compositing differences.

Results from generated normals, normal-map UV seam processing, and three-dimensional height effects are saved in separate layers as needed. Save the Scene as well if you want to edit the original strokes or settings later

### Adjustment layers in PSD

Adjustment layers are exported as raster image layers for their target channels. HarmoFlow's adjustment parameters are not preserved as native Photoshop adjustment layers. Save the .harmos scene too if you want to edit those values later.

The exported adjustment image depends on the composited layers below its position. Changing those underlying layers in the PSD does not automatically recalculate HarmoFlow's adjustment.

Standard image formats are exported separately for each channel. Combine Parts with the Same Material is enabled by default. It combines the UV regions of parts that use the same material into one texture set for export, while keeping different materials separate. Where UVs overlap, painting from the first part takes priority. If you have painted different images on overlapping UVs, turn this setting off to export each part separately.

## Pixels outside mesh UVs

In Preferences → VRAM → Textures → Outside mesh UVs, choose to fill with the original texture, make the area transparent, or keep the entire texture. Storage-mode changes take effect on the next model import or resolution change.

Transparent export also works without sparse-GPU support. Original-texture filling applies to ordinary exports and to the background and merged image in layered PSD files.
