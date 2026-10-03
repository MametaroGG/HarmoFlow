---
title: "Getting started"
category: "Getting started"
description: "Installation, first launch, pre-update backups, version checks, and your first painting."
outline: [2, 3]
prev: false
next: false
---

# Getting started {#start}

## Install HarmoFlow {#app-install}

<GuideFlow kind="app-install" />

1. Download the Full or Trial installer from the [BOOTH product page](https://mametarovv.booth.pm/items/8754692). **Each edition is supplied as one EXE. No ZIP extraction or split BIN files are needed.** `full` in the filename identifies the Full edition; `trial` identifies the Trial.
2. Double-click the setup EXE. Choose Japanese, English, Simplified Chinese, or Korean for the wizard, read the license agreement, and continue only if you agree. You can also read the Full edition's [EULA](../terms.md) before purchasing.
3. Choose the installation location and, optionally, a desktop shortcut. The Full installer also offers `.harmos` / `.harmopackage` file associations. The Trial does not change file associations.
4. Launch from the completion screen or open **HarmoFlow** (**HarmoFlow Trial** for the Trial) from the Start menu. Keep the installed files together; do not move only the application EXE elsewhere.

::: warning If startup stops
Check the [system requirements](../download.md#requirements-title) and [startup checks](./troubleshooting.md#startup-checks). Do not disable Windows protections without understanding the warning and verifying the download source.
:::

## Check the first launch {#first-launch}

- Create a project from Home or import a supported model with UVs. Start with a small test model and check painting and saving.
- Change the interface language under Window → Language. Use Window → Reset Layout if you lose track of the panels.
- Full and Trial install separately and have separate preferences and material caches. **The Trial supports editing and project saving, but texture export is disabled.** Projects saved in the Trial can be opened in the Full edition.
- The material catalog is included. Downloadable image materials need an internet connection on first use. Before working away from a connection, see [material downloads and offline use](./materials.md#material-downloads).

## Back up before updating {#update-backup}

<GuideFlow kind="update-backup" />

1. Save the scene normally and close the app. **Copy the entire project folder to a separate location.** Keep its imported models and images, rather than copying only the `.harmos` file. You can also [export a package](./projects.md) for transport.
2. Keep original downloads or separate backups of brushes and plugins you added. A scene saved by a newer version may not open in an older version, so keep the pre-update copy untouched.
3. Get the newer installer for the **same edition (Full or Trial)** from BOOTH and run it using the existing installation location. The same-edition installer updates the existing installation.
4. Confirm the version after launching. First use a test copy made from your backup to check models, images, layers, saving, and reopening. In the Full edition, also test the exports you need.

### Check the latest release

Check the [BOOTH product page](https://mametarovv.booth.pm/items/8754692) for the latest release and download files. Save your work and back up the project before updating. Get the newer installer for the edition you use (Full or Trial), then follow the update steps above.

## Find the version and changelog {#version-changelog}

Open **Help → About HarmoFlow** to see the application version at the top. The **Changelog** tab in the same window lists changes included with that app. The digits in square brackets in the title bar are the build timestamp. When asking for support, record the edition, version, and build timestamp together.

See the [purchase FAQ](../download.md#purchase-faq) for purchase conditions and [troubleshooting](./troubleshooting.md) for problems during use.

<GuideFlow kind="first-paint" />

## From importing a model to saving your work

1. **Import a model**

   Import a model from the File menu, or drag a model file from File Explorer into the window. Dropping onto the home screen also works; the workspace opens after import finishes. Supported formats include FBX, OBJ, glTF / GLB, DAE, PLY, STL, 3DS, and BLEND.

   When dropping several models or images together, the first supported model is opened and the remaining files are imported into the project's asset library. Drops received during an import are processed afterward.

2. **Select the part to edit**

   The selection is linked across Channels, the UV Editor, and Texture Set Settings. Shift+Alt+right-click a model in the viewport to switch to the part under the cursor. Switching is disabled for models with only one part.

3. **Edit with layers**

   Paint on a paint layer, and add color and surface properties with Fill layers. Save your work, then export images from the Export panel.

::: tip Automatic baking
Mesh maps are baked automatically when you import a model. If you configure weathering before baking finishes, it will take effect once the maps have been generated.
:::

<GuideMedia name="first-stroke" />

## glTF / GLB images and material assignments

Importing glTF / GLB brings supported referenced images into the project's asset library and automatically assigns them to BaseColor, Normal, Metallic, Roughness, and Emission. Packed MetallicRoughness images are split into Roughness and Metallic. Supported color and strength values are also applied.

External geometry data and referenced images are included when the project is saved, so the saved project can be reopened independently of the original folder. To replace an image, use Manual Texture Bind in the Channels panel. These imported material bindings are separate from image Fill on a layer.

### Import warnings and limits

An unreadable image produces a Console warning; other supported images that can be loaded are still applied. Missing geometry buffers or other files essential to the model can cause the whole model import to fail.

Successfully imported AO images are retained in the project's asset library, but a dedicated channel for displaying or applying imported AO is not supported. This is separate from the automatically baked AO mesh map.

Automatic image assignment uses UV0. Images referencing another UV set or texture-coordinate extensions such as KHR_texture_transform are skipped for automatic assignment, with a warning. This skips the referenced image; material color or scalar fallback values may still be generated.
