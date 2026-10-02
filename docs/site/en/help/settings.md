---
title: "Preferences, history, and extensions"
category: "Settings and reference"
description: "Configure the home screen, pen pressure and drawing behavior, workspace layout, VRAM, Lua, and plugins."
outline: [2, 3]
prev: false
next: false
---

# Preferences, history, and extensions {#settings}

## Startup and drawing preferences

On the home screen, use the left side to create or select a project or load a scene. Resume work from Recent Scenes on the right. The history keeps up to 20 of the most recent successful loads and saves. Search by name or path, and use each row's menu to remove it from the history without deleting the file itself. Click Go to Workspace at the top right to return to editing.

When brush stabilization is enabled, smoothing becomes slightly stronger when viewing a surface at an oblique angle. This prevents small movements on screen from becoming exaggerated across the surface. Near the silhouette, the brush follows more slowly than on front-facing areas. Brush dabs are spaced by distance along the surface, but at very shallow viewing angles, turning the surface toward you makes painting more stable.

Enable Adjust Stabilization to Speed under Drawing Feel to suppress jitter while drawing slowly and make the brush follow more quickly as you speed up. Adjust Speed Response to control how much it changes. This does not apply to brushes with stabilization set to 0. New brushes default to 0.15 stabilization. Existing saved brushes retain their current stabilization values.

Pressure Size changes stroke width with pen pressure, while Pressure Opacity changes how opaque the stroke is. Turn off pressure opacity for uniform ink lines. Strokes in existing scenes are redrawn using the settings stored when they were saved.

To calibrate pressure, go to Preferences → Drawing Feel → Calibrate Pressure with Test Strokes. Draw several strokes with varying pen pressure, then click Auto-adjust and Review. Try drawing again in the review screen, fine-tune with Softer or Firmer, and click Done to save. Cancel leaves the settings unchanged. Mouse input is not used for automatic calibration. If there is insufficient pressure variation or too few samples, you will be prompted to add more test strokes. Test strokes are not added to the scene.

<GuideMedia name="calibrate-pressure" />

At startup, the home screen lets you create a new project, select a project folder, or load a scene. Use Go to Workspace to begin editing, and File → Home to return. Turn off Show Home at Startup to open directly in the workspace next time.

You can adjust pen pressure in Preferences → Drawing Feel. For the pressure curve, Light Touch gives wider strokes with less force, while Firm Pressure requires more force for wide strokes. Minimum Pressure sets the lower limit for a light touch. Pressure Smoothing makes pressure changes more gradual; increasing it also introduces response lag. The graph shows output relative to input, and the monitor displays the current adjusted pressure. These pressure settings are saved automatically and apply to every brush. They do not apply to mouse input.

On the same screen, you can adjust the current brush's pressure size, stabilization, and spacing. Save per-brush settings in brush presets to switch between them.

Pen side buttons work as the clicks assigned in your tablet driver. A button assigned to Right Click does not rotate the camera on its own; combined with Alt, it zooms. Touching the pen tip to the tablet while holding the right button does not paint. If the tip is still touching the tablet when you release the button, painting remains disabled until you lift the pen once. If the tip touches just before the button is pressed, the input is still treated as a right-click and any stroke that began is canceled. Touching the tip while holding Shift+Alt does not paint. Buttons assigned to Left Click or Middle Click work like the corresponding mouse buttons. Painting with a side button assigned to Left Click uses the same strength as mouse input because no pen pressure is available.

File and folder selection uses the operating system's dialogs by default. Enable Preferences → General → Use Built-in File Browser to switch to the built-in browser. This setting is retained after restarting. For a new project, create and select a project folder in the standard dialog.

## Workspace layout and history

Show panels from the Window menu and rearrange them by docking. Panel rails store panels that you can open from their icons. Widen a rail to show labels. You can reorder or group panels, or remove them from the rail. Use Reset Layout to restore the arrangement.

Use Ctrl+Z / Ctrl+Y to undo or redo edits, and inspect your actions in History. Undo does not reverse every setting or external file operation. Use the Console to check processing results and errors. Refer to this official documentation for operating instructions. The interface supports Japanese, English, Chinese, and Korean.

### Undo tool-setting changes

Brush, eraser, color blending/blur, stamp, and path tool settings support Undo/Redo. A continuous drag of a slider or numeric field is grouped into one undo step. Undo applies to the changed setting even after switching tools.

Restoring a brush or stamp setting affects the next stroke. Not every setting or external file operation can be undone.

## VRAM and display quality

In Preferences → VRAM, start with a preset and adjust as needed. If performance is slow, first lower the preview resolution, then lower the working resolution if necessary.

| Settings group | What it controls |
| --- | --- |
| Textures | Outside-mesh-UV handling, BC7 display compression, lazy channel loading, and the channels it applies to |
| Intermediate Baking Buffers | Deferred allocation and maximum counts for snapshots, live scratch buffers, and layer checkpoints |
| Import / GPU Preparation | Fast GPU path and GPU allocation batches |
| Preview | Viewport and UI panel display at full, half, or quarter resolution |
| Memory Infrastructure | Staging pools, block capacity, and reuse while idle |
| Budget | VRAM budget and over-budget warnings. 0 means no budget limit |
| Experimental Features | Neural texture compression, virtual texture cache, and reduced memory for non-edited texture sets. See the explanations below |

### Virtual texture cache

The virtual texture cache losslessly compresses unselected sets to disk and restores them when selected. Full-resolution display is supported. At full resolution, unselected sets use BC7 display copies, which may show slight color differences. Editing and export data remain lossless.

The selected set takes priority over the page budget. GPU residency is managed per texture set, not per visible tile.

### Reduce memory for non-edited texture sets

This option is off by default. On supported GPUs, the selected and actively edited sets stay at their original resolution. After at least three seconds without interaction, other sets are moved out of memory losslessly and displayed at quarter resolution.

Global layers keep all sets resident. A single-set scene does not gain channel-memory savings. This mode takes priority over BC7, NTC, and the older virtual texture cache; switching sets may require waiting for restoration.

For autosave, see [Saving and recovery](/en/guide#projects). General includes the package extraction location setting. In Key Configuration, search by action name or condition to change keyboard and mouse bindings.

## Lua and plugins

Scripts (Lua) lets you run entered code or Lua files, and inspect or clear logs. The `hf` API includes actions for adding and editing layers, masks, image fills, material presets, brushes, model imports, scene saves, packages, and texture exports. Layer numbering starts at 1.

```lua
hf.log('レイヤー数: ' .. hf.layer_count())
hf.add_layer('paint', '描き込み')
```

Launch plugins from the top Plugins (P) menu. Add / Browse Plugins lets you add .lua or .dll files and check their loading status. Added files remain available the next time you start HarmoFlow. You can also place DLL files directly in the plugins folder beside the executable.

Only add plugins from sources you trust. DLL plugins use the C ABI SDK at `sdk/harmoflow_api.h`; a development sample is in `examples/sample_plugin/`.
