---
title: "Getting started"
category: "Getting started"
description: "Import a model, edit layers, and save your work. The essentials for painting your first texture."
outline: [2, 3]
prev: false
next: false
---

# Getting started {#start}

<GuideFlow kind="first-paint" />

## From importing a model to saving your work

1. **Import a model**

   Import a model from the File menu, or drag a model file from File Explorer into the window. Dropping onto the home screen also works; the workspace opens after import finishes. Supported formats include FBX, OBJ, glTF / GLB, DAE, PLY, STL, 3DS, and BLEND.

   When dropping several models or images together, the first supported model is opened and the remaining files are imported into Project. Drops received during an import are processed afterward.

2. **Select the part to edit**

   The selection is linked across Channels, the UV Editor, and Texture Set Settings. Shift+Alt+right-click a model in the viewport to switch to the part under the cursor. Switching is disabled for models with only one part.

3. **Edit with layers**

   Paint on a paint layer, and add color and surface properties with Fill layers. Save your work, then export images from the Export panel.

::: tip Automatic baking
Mesh maps are baked automatically when you import a model. If you configure weathering before baking finishes, it will take effect once the maps have been generated.
:::

<GuideMedia name="first-stroke" />

## glTF / GLB images and material assignments

Importing glTF / GLB brings supported referenced images into Project and automatically assigns them to BaseColor, Normal, Metallic, Roughness, and Emission. Packed MetallicRoughness images are split into Roughness and Metallic. Supported color and strength values are also applied.

External geometry data and referenced images are included when the project is saved, so the saved project can be reopened independently of the original folder. To replace an image, use Manual Texture Assignment in the Channels panel. These imported material bindings are separate from image Fill on a layer.

### Import warnings and limits

An unreadable image produces a Console warning; other supported images that can be loaded are still applied. Missing geometry buffers or other files essential to the model can cause the whole model import to fail.

Successfully imported AO images are retained in Project, but a dedicated channel for displaying or applying imported AO is not supported. This is separate from the automatically baked AO mesh map.

Automatic image assignment uses UV0. Images referencing another UV set or texture-coordinate extensions such as KHR_texture_transform are skipped for automatic assignment, with a warning. This skips the referenced image; material color or scalar fallback values may still be generated.
