---
title: "Image fills, materials, and patterns"
category: "Painting and editing"
description: "Use image fills and UV transforms, adjust procedural patterns, and work with material presets."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Image fills, materials, and patterns {#materials}

<figure class="doc-diagram">
<img :src="withBase('/graphics/guide/face-versus-uv-island.svg')" width="960" height="640" alt="Concept diagram: 1. Polygon fill targets the clicked face. 2. UV-shell fill targets its UV island. The separate small island stays untouched. Paint material channels such as color, normal and roughness together." loading="lazy" />
<figcaption>Concept diagram: 1. Polygon fill targets the clicked face. 2. UV-shell fill targets its UV island. The separate small island stays untouched. Paint material channels such as color, normal and roughness together.</figcaption>
</figure>

## Use an image as a Fill

In a material layer's properties, enable the target channel and select an image under Image Fill, or drag one from the project. Assigning an image replaces that channel's constant value. Scalar channels use the image's R channel, and transparency uses its alpha. Use Clear to remove the image.

UV transforms include tiling, position, rotation, and image repeat, and apply to all images on that layer. Use Reset UV to restore the defaults. Generate Normal from Height affects the entire scene. Turn it off when you want to use an assigned Normal image.

## Create patterns

Choose Add Pattern, then select grunge, rust, mud splashes, scratches, dust, or streaks. Patterns retain their settings rather than only a generated image, so you can adjust their distribution later.

| Setting | What it controls |
| --- | --- |
| Detail / Scale | Pattern repetition and the size of individual features |
| Amount | How much of the surface the pattern covers |
| Contrast | How sharply the pattern's boundaries are defined |
| Seed | A number that changes the arrangement while preserving the overall character |
| Octaves | The number of detail layers added to the noise |
| Color Variation | Color differences within the pattern |
| Relief | Height variation added to the Height channel |
| Invert | Reverse the pattern's distribution |
| Shape-Based Placement / Strength | Placement using convexity, concavity, and AO. See [Weathering](/en/guide#weathering) |

A pattern takes precedence over image Fill on the channels it uses. If an image does not appear, check the Pattern in Use indicator and whether the channel is enabled.

## Material presets

Save the current material and reuse it from the presets in the Project panel. Choose between applying a preset to the selected layer and adding it as a new material asset. Right-click a saved preset to update, rename, or delete it, or add it to favorites. The editing operations available for built-in presets differ from those for user-saved presets.

### Paint selected areas

Select a material in the material browser to use it with a brush, Polygon Fill, or UV Shell Fill. Select its existing material layer or folder to add more coverage with the same material. See [Fill faces and UV islands](/en/help/brush).
