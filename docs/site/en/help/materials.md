---
title: "Image fills, materials, and patterns"
category: "Painting and editing"
description: "Image fills and patterns, plus first-use material downloads, offline use, retries, and cache removal."
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

## Material downloads and offline use {#material-downloads}

The current installer includes the material catalog and previews, but excludes the source images for downloadable image materials. These image materials download on first use. **A download badge means the material still needs its images.** Browsing its entry offline does not mean the material itself is ready for offline use.

Procedural materials and images you import yourself work without a material download. The full and trial editions maintain separate download caches.

1. While online, choose a material from the library. Using a material whose images are missing starts the download.
2. To prepare in advance, right-click it and choose **Download for offline use**. This prepares the images for later use.
3. Wait for **Downloading → Verifying → Extracting** to finish in the Project panel.
4. Once downloaded, the cached material is available offline. If you change the scene, layer, tool, or other target while it downloads, select the material again afterward to use it on the current target.

To download a different material, wait for the current download or choose **Cancel download**. Prepare each material you will need before going offline.

### Retry a failed or cancelled download {#material-download-retry}

- Check your connection, then choose **Retry download** in the Project panel. You can also retry after cancellation.
- Hover over the error message to see any available details. **Dismiss** closes the failed/cancelled status.
- If a material reports that its provider has not published download files, retrying the connection alone will not make those files available.
- If a downloaded material is not applied, select it again and check the target layer and enabled channels.

### Remove a downloaded material {#material-cache-uninstall}

To free disk space, right-click the material and choose **Uninstall downloaded material...**. Check the material name and downloaded size in the confirmation before continuing.

| Removed | Kept |
| --- | --- |
| That material's downloaded data (cache) | Images already copied into projects, library entries and previews, and legacy bundled images if present |

**Images already copied into your projects are kept.** The material also stays in the library, so its next use can download it again. An older installation may still have bundled images available to use. This does not mean that the current installer includes the source images for image materials. Keep the cache for materials you still need to use offline.

Removal is unavailable during a download, painting, or another active operation. If the button is disabled, wait for processing to finish and check whether removable data exists. If additional files or links prevent safe removal, inspect the reported reason rather than deleting the whole folder manually. If removal fails, check the cache folder's permissions and whether another app is using it, then retry.
