---
title: "Projects, saving, and recovery"
category: "Getting started"
description: "Reuse the Default project, save scenes, check older-version compatibility, export packages and recover work."
outline: [2, 3]
prev: false
next: false
---

# Projects, saving, and recovery {#projects}

<GuideFlow kind="save-export" />

## Create a project and import a model

Choose File → New Project to set the project location, then use Import Model to load a model. Supported formats are FBX, OBJ, glTF / GLB, DAE, PLY, STL, 3DS, and BLEND. Your model needs UVs for texture creation. For formats or files without UVs, support for importing the model does not necessarily mean it can be used for texture editing.

A project is a working folder containing assets and scenes. Project Settings lets you change the root folder and texture resolution. Scene files use the `.harmos` extension.


For package assets, see [Unity Package import](./assets.md#unitypackage-import). For FBX deformation and part display, see [Meshes and shape keys](./viewport.md#mesh-visibility).

In [Ver.0.2.0](https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.2.0), new sessions reuse a shared Default project instead of creating another temporary project each time. The scene-open file filter uses `.harmos`; choose the scene file you want to resume.

### New scenes and project folders {#new-scene-project-root}

**New Project** creates a folder containing scenes, assets, autosave and workspace.json. Save the new scene with Ctrl+S. Multiple scenes in one project can share the same assets.

**File → New Scene** (Ctrl+N) starts a fresh scene at the current work resolution. If there are changes, choose **Save and create**, **Discard and create**, or **Cancel**. Camera changes can also trigger the save prompt.

**Project Settings → Change...** and the home screen's project selector choose the project folder. They do not close the current scene or move existing scenes and assets. Use **Open Scene** to switch scenes. Choose a specific .harmos file to open that version.

## Choose a save method

| Action | Purpose |
| --- | --- |
| Save Scene | Save the current editing state. Ctrl+S |
| Save Scene As | Keep the edit state under another name. Ctrl+Shift+S. Saving into another project also copies the assets in the current library to that destination. |
| Incremental Save | Keep a new numbered version. Ctrl+Alt+S |
| Open Scene | Resume from a saved editing state |
| Export Package | Bundle the project into a `.harmopackage` file to take with you |
| Export Package Again | Immediately overwrite the last exported package without a confirmation dialog. Hover over the command to check the destination first |
| Open Package | Extract the package to the configured location and open it |
| Open Package Into... | Choose where to extract this package and open it |

::: warning Before saving into another project
Saving into another project merges all assets in the current working library into the destination, including assets not used by the current scene. Files at the same relative path are overwritten without confirmation, which can affect other scenes in the destination project. This copy does not delete files found only at the destination.

Back up an existing project before saving into it. To make an independent copy, save into a new, empty project folder. Ordinary Save Scene As and Incremental Save operations using the same asset location do not perform this copy.
:::

Package export first saves the current scene. For unsaved work, it creates a project folder beside the package. The package includes workspace.json and the scenes, assets, and autosave folders; other files at the project root are not included. Before sharing a package, check its other scenes and autosaves for work you cannot share.

### Incremental saves and package locations {#save-package-locations}

**Incremental Save** writes a sibling scene such as name_001.harmos or name_002.harmos and continues working in that scene. The versions share the project's assets; it does not duplicate the whole project for each save.

**Open Package** uses Downloads by default. Change this in **Preferences → General → Package Unpack Folder**. **Open Package Into...** chooses a destination for this one operation. If a nonempty folder with the same name exists, extraction uses a numbered sibling folder.

The application remembers the destination for **Export Package Again**. Hover over the command to check it before use, including after switching projects.

## Scene version compatibility {#scene-version-compatibility}

::: warning Before using Ver.0.3.0 features
Reopening projects containing transformed material masks requires Ver.0.3.0 or later. Reproducing the new pressure-flow, drawing-quality and fine-taper effects also requires Ver.0.3.0 or later. Existing saved strokes retain their previous width.

Before saving with new features, use Save Scene As or Incremental Save to create a separate file, and retain the original project without overwriting it if you need to use older releases.
:::

::: warning Before saving with Ver.0.2.0 features
Scenes saved with new [Ver.0.2.0](https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.2.0) features may not open correctly in older releases. If you also need an older version, use Save Scene As or Incremental Save to work in a separate file, and keep the original without overwriting it.
:::

::: warning If you also use Ver.0.1.1 or earlier
Scenes containing the new 3D paths introduced in [Ver.0.1.2](https://github.com/MametaroGG/HarmoFlow/releases/tag/Ver.0.1.2) cannot be opened in Ver.0.1.1 or earlier. Keep the file from before your changes if you also need to use the scene in an older version.
:::

Before adding new 3D paths or recreating older UV-coordinate paths in the 3D view, use Save Scene As or Incremental Save to work in a separate file, and retain the original without overwriting it. See [path UV-island boundaries](./paths.md#path-uv-island-boundaries) for which paths need recreation.

## Autosave and recovery

Timed autosave is off by default. Its initial settings are every five minutes, only when changed, keeping 20 snapshots. The UI retention range is 0–50; 0 keeps all snapshots. Scheduled saves wait during painting or other active operations. Autosave now also works when timed autosave is off.

Enable autosave in Preferences → Autosave, then set the interval (1–60 minutes), filename prefix, whether to save only when changes have been made, and the number of saves to keep. A retention count of 0 keeps every save. You can also choose Autosave Now or open the save folder.

Choose File → Recover autosave to select a saved snapshot. Recover previous save creates and opens a separate recovered scene from an available previous save, keeping the original scene file. After checking the recovered content, save the scene normally.

### Locate and choose an autosave {#autosave-location}

For a saved project, snapshots are stored in its `autosave` folder. Unsaved sessions use HarmoFlow's application data area. Check Current folder and Open Autosave Folder in Preferences → Autosave to find the actual location.

In Recover autosave, check the date, time, and target before choosing a snapshot. A project-associated autosave is added to the project's scenes folder as a separate scene named `<scene>_recovered_N`. Missing assets are restored; existing asset files are not changed. An unsaved session's autosave opens as an unsaved scene, and normal saving asks for a destination. The app also attempts to autosave your current work before recovery, but save important work normally first.

Autosave does not replace normal saving or backups. The retention limit can remove older snapshots, so keep important versions using Save Scene As, incremental saves, or a backup. Do not delete or move the original project or autosaves while investigating recovery.

## Recover work after a GPU error {#gpu-recovery}

::: warning Recovery needs a successful autosave
The app attempts a recovery autosave after a GPU error, but it may fail. Failed saves, missing data, or a forced exit can prevent recovery. Recovery of every unsaved change is not guaranteed.
:::

1. Record the cause, action, and Details in the error message. Check whether it says your work was autosaved or that the recovery autosave failed. If saving succeeded, choose Restart, or choose Quit and launch HarmoFlow again.
2. If Restore your work appears on the next launch, check the target and choose Restore. Wait for loading to finish. Work may open as an unsaved scene if its original project is unavailable or it was never saved.
3. Inspect the recovered model, layers, recent painting, materials, and images. Opening successfully does not by itself prove that everything was recovered.
4. Once you have checked the content, choose Save Scene (Ctrl+S). **Restoring alone does not overwrite the original scene file; the file on disk stays unchanged until you save normally.** Use Save Scene As if you also want to retain the original save.

If you want to restore later, **hover over Not now and record the autosave path shown in its tooltip before clicking the button.** Not now closes the recovery prompt without deleting the autosave.

To recover saved work later, open its original project before choosing File → Recover autosave. The list shows autosaves for the current project; in an unsaved session, it shows application-data autosaves. If the snapshot is missing from the list, compare the recorded path with Current folder.

If there is no prompt, saving failed, or recovery itself closes the app again, preserve the original data and follow [GPU troubleshooting and support](./troubleshooting.md#gpu-errors). Check GPU load and the driver before repeatedly attempting the same recovery.
