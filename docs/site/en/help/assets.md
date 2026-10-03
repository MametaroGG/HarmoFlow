---
title: "Finding and importing assets"
category: "Export and assets"
description: "Search and filter project assets, and import images and Unity Packages."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Finding and importing assets {#assets}

## Search and filter assets

The Asset Browser shows assets in your working folder and shared material presets. Filter by asset type (images, meshes, or materials), folder, search terms, or favorites, and save your search criteria. Use Saved searches and Filter by path at the bottom to show or hide those filter columns. Their filters remain active when hidden; the text-search field at the top stays visible. If you cannot find an asset, reset the filters.

Before applying a material, select the target texture set. A new material applied from the Asset Browser targets the currently selected texture set; other texture sets are not changed automatically.

## Prepare library materials for offline use {#offline-materials}

Materials with a download badge fetch their images on first use. Before going offline, right-click them and choose **Download for offline use**. Later uses reuse the cache. See [download status, retries, and cache removal](./materials.md#material-downloads). Uninstalling the cache keeps project images and the material's library entry.

## Import and use assets

Add assets with Import File... or by dragging them in from your operating system. Import Unity Package imports assets contained in a Unity Package. It does not run Unity Editor features or scripts. Right-click an asset to add it to favorites or show it in File Explorer. Use images in channels, image fills, or stamps as needed.

## Register an image as a stamp or brush

Right-click an image in the project and choose Register as Image Stamp or Register as Brush Tip. The first opens the Image tab in Stamps; the second opens the Brush panel. Import PNG Brush and the existing image-add/drop workflows are still available.

## Import a Unity Package {#unitypackage-import}

A Unity Package (.unitypackage) can be expanded into the project's asset library. Importing the package does not replace the model in the viewport. Choose the model you want from the extracted assets afterward.

<GuideFlow kind="unity-import" />

<figure class="doc-menu-capture">
<img :src="withBase('/graphics/guide/file-menu-import.png')" width="280" height="512" alt="Actual Japanese File menu with Import Unity Package below Import Model." loading="lazy" />
<figcaption>Actual Japanese interface: Unity Package and individual model imports are separate menu commands.</figcaption>
</figure>

1. Choose **File → Import Unity Package...** and select a .unitypackage. You can also use the Asset Browser's add menu or drop the package in from your operating system.
2. Find the extracted folders in the Asset Browser. Clear search, type, or folder filters if the assets are missing from the list.
3. Drag the desired FBX or other supported model from the Asset Browser into the viewport. You can also choose an individual file with **File → Import Model...**.
4. Assign the required images to [channels](./channels.md) or [material layers](./materials.md) and inspect the result.
5. For unsaved work, save to a project folder to retain the imported assets. See [Saving projects](./projects.md).

### Contents and limitations {#unitypackage-limits}

- Extraction preserves the package's asset folders and related files. The model picker supports FBX, OBJ, glTF, GLB, DAE, PLY, STL, 3DS, and Blend. Supporting a format does not mean every feature of a file is reproduced.
- Images, material definitions, and related files such as .meta files remain in the extracted assets. Having those files available does not automatically apply Unity material settings. Check image assignments and target channels.
- **Automatic Prefab import is currently disabled.** Extract the package and choose an FBX or another supported model. This workflow does not execute Unity scenes, scripts, Animator behavior, or custom shaders, and it does not guarantee an exact match with Unity's rendering.
- **Files at the same relative path may be overwritten.** Keep a copy of the project before reimporting or combining packages, and use a separate project when you need to check for conflicts.

If no model appears, check that you selected a model after importing the package. If colors or patterns are missing, check that the images are included and assigned to the correct texture set and channel. For morph controls, see [FBX shape-key import](./viewport.md#shape-key-import).
