---
title: "Projects, saving, and recovery"
category: "Getting started"
description: "Create projects and scenes, save and export packages, and recover work from autosaves."
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
| Save Incrementally | Keep a new numbered version. Ctrl+Alt+S |
| Open Scene | Resume from a saved editing state |
| Export as Package | Bundle the project into a `.harmopackage` file to take with you |
| Export to Previous Location | Reuse the previous package export location |
| Open Package | Extract the package to the configured location and open it |
| Open with Selected Extraction Location | Choose where to extract this package and open it |

## Autosave and recovery

Enable autosave in Preferences → Autosave, then set the interval (1–60 minutes), filename prefix, whether to save only when changes have been made, and the number of saves to keep. A retention count of 0 keeps every save. You can also choose Autosave Now or open the save folder.

Choose File → Recover from Autosave to select a saved snapshot. Recover from Previous Save restores the available previous save. After checking the recovered content, save the scene normally.
