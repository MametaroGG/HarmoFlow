---
title: "Image fills, materials, and patterns"
category: "Painting and editing"
description: "Image fills and patterns, first-use downloads, offline use, cache size limits and unused-data cleanup."
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

UV transforms include tiling, position, rotation, and image repeat, and apply to all images on that layer. Use Reset UV to restore the defaults. Normal from Height (whole scene) affects the entire scene.

### Add relief from a normal map {#normal-map-only}

Use “Normal map only...” in Image Fill to add relief from a normal image alone. It enables only Normal and turns off Normal from Height for the whole scene. Check this scene-wide setting when returning to relief made from Height.

## Create patterns

Choose Add Pattern, then select grunge, rust, mud splashes, scratches, dust, or streaks. Patterns retain their settings rather than only a generated image, so you can adjust their distribution later.

| Setting | What it controls |
| --- | --- |
| Scale | Pattern repetition and the size of individual features |
| Amount | How much of the surface the pattern covers |
| Contrast | How sharply the pattern's boundaries are defined |
| Seed | A number that changes the arrangement while preserving the overall character |
| Detail | The number of detail layers added to the noise |
| Variation | Color differences within the pattern |
| Relief | Height variation where the pattern appears; enable the Height channel first |
| Invert | Reverse the pattern's distribution |
| Mesh placement / Mesh influence | Placement using convexity, concavity, and AO. See [Weathering](/en/guide#weathering) |

Patterns shape BaseColor, Roughness, Metallic, and Height, taking priority over Image Fill on those channels. Normal and Emission are not patterned. If an image does not appear, check the pattern-in-use indicator and whether the channel is enabled. Random changes the seed, Invert reverses the distribution, and Drop the pattern returns to a plain Fill while retaining channel values.

## Material presets

Save the current material and reuse it from the presets in the Asset Browser.

To replace an existing Fill layer with a single-layer preset, select an unlocked Fill layer and choose Apply to the selected layer. This replaces its channel values, images, and pattern settings; Undo restores them.

Drag a material into the viewport to add new layer(s). A multilayer preset is inserted above the selected layer as an editable layer stack and folder.

Right-click a saved preset to update, rename, or delete it, or add it to favorites. The editing operations available for built-in presets differ from those for user-saved presets.

### Paint selected areas

Select the target texture set before choosing a material in the Asset Browser. Brush, Polygon Fill, and UV Shell Fill paint areas within the currently selected texture set. Select its existing material layer or folder to add more coverage with the same material. See [Fill faces and UV islands](/en/help/brush).

Filling with a material also targets the currently selected texture set. When you start a new painted material from the Asset Browser, it is recorded in the currently selected texture set. Painting on an existing layer targets the set that owns that layer. Parts using the same material can share their final texture, so overlapping UVs can show changes on another part.

### What material presets save {#material-preset-data}

Registering the current material saves one selected Fill layer’s channel values and switches, images and UV settings, and pattern settings. It does not save the whole scene, masks, or layer opacity. “Replace with the selected layer’s material” replaces the preset with channel values and pattern settings. Keep the original and register a separate name if you need to preserve images or a multilayer recipe. Up to 512 user presets can be saved.

### Material painting channels {#material-paint-target}

Material painting and erasing follow the viewport display mode. BaseColor, Normal, Roughness, Metallic, Height, or Emission view edits only that channel. PBR, NPR, and Layer Mask view target all channels. Check “Paint / erase target” in Properties before adding or removing material.

### Continue painting or return to regular paint {#material-resume}

Select a partially painted material’s Fill layer or folder to add more coverage. The folder’s affected layers must be Fill layers in the same set with enabled masks. To edit an unmasked full-surface Fill locally, add a mask first. Choose “Clear material selection” in Properties to return to ordinary color painting; existing material layers stay in the scene.

## Material downloads and offline use {#material-downloads}

Ver.0.3.0 reduces thumbnail data in the material list, making installers and fresh installations smaller. The original material images used for painting retain their quality.

The current installer includes the material catalog and previews, but excludes the source images for downloadable image materials. These image materials download on first use. **A download badge means the material still needs its images.** Browsing its entry offline does not mean the material itself is ready for offline use.

Procedural materials and images you import yourself work without a material download. The full and trial editions maintain separate download caches.

1. While online, choose a material from the library. Using a material whose images are missing starts the download.
2. To prepare in advance, right-click it and choose **Download for offline use**. This prepares the images for later use.
3. Wait for **Downloading → Verifying → Extracting** to finish in the Asset Browser.
4. Once downloaded, the cached material is available offline. If you change the scene, layer, tool, or other target while it downloads, select the material again afterward to use it on the current target.

To download a different material, wait for the current download or choose **Cancel download**. Prepare each material you will need before going offline.

### Retry a failed or cancelled download {#material-download-retry}

- Check your connection, then choose **Retry download** in the Asset Browser. You can also retry after cancellation.
- Hover over the error message to see any available details. **Dismiss** closes the failed/cancelled status.
- If a material reports that its provider has not published download files, retrying the connection alone will not make those files available.
- If a downloaded material is not applied, select it again and check the target layer and enabled channels.

### Manage material and decal caches {#material-cache-management}

[Ver.0.2.0](https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.2.0) adds a cache size limit and unused-data cleanup for downloaded materials and decals. Use these controls to manage disk space. Initial downloads require an internet connection; downloaded assets can be used offline. Keep the data for assets you will need offline.

Decal-library uninstall is also available. Placed decal sources remain in saved scenes. See the [decal library](./assets.md#decal-library) for the 255 decals and first-use whole-library download. The steps for uninstalling an individual material remain below.

### Uninstall material data {#material-cache-uninstall}

To free disk space, right-click the material and choose **Uninstall material data...**. Check the material name and installed size in the confirmation.

This removes the material's downloaded maps and any matching bundled maps remaining in the application folder. Images already copied into projects, library entries, material recipes and previews are kept.

Using the material again requires another download. Keep its installed data if you will need it offline.

Removal is unavailable during a download, painting, or another active operation. If the button is disabled, wait for processing to finish and check whether removable data exists. If additional files or links prevent safe removal, inspect the reported reason rather than deleting the whole folder manually. If removal fails, check the cache folder's permissions and whether another app is using it, then retry.

## Transform material masks (Ver.0.3.0) {#material-mask-transform}

Select a masked material layer and use shrink selection to follow its mask shape. The Ctrl+T transform frame moves, rotates and scales it. Material patterns remain fixed in material coordinates; only the masked area changes. K Layer Move also moves the mask.

Reopening scenes with transformed masks requires Ver.0.3.0 or later. [Keep a copy from before the changes](./projects.md#scene-version-compatibility) if the project is also needed in older releases.
