---
title: "Projects, saving, and recovery"
category: "Getting started"
description: "Create projects and scenes, save and export packages, locate autosaves, and recover after a GPU error."
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

## Choose a save method

| Action | Purpose |
| --- | --- |
| Save Scene | Save the current editing state. Ctrl+S |
| Save Scene As | Save the editing state under a different name |
| Incremental Save | Keep a new numbered version. Ctrl+Alt+S |
| Open Scene | Resume from a saved editing state |
| Export Package | Bundle the project into a `.harmopackage` file to take with you |
| Export Package Again | Immediately overwrite the last exported package without a confirmation dialog. Hover over the command to check the destination first |
| Open Package | Extract the package to the configured location and open it |
| Open Package Into... | Choose where to extract this package and open it |

Package export first saves the current scene. For unsaved work, it creates a project folder beside the package. The package includes workspace.json and the scenes, assets, and autosave folders; other files at the project root are not included. Before sharing a package, check its other scenes and autosaves for work you cannot share.

## Autosave and recovery

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
