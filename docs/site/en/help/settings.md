---
title: "Preferences, history, and extensions"
category: "Settings and reference"
description: "Configure the home screen, pen pressure and drawing behavior, workspace layout, VRAM, Lua, and plugins."
outline: [2, 3]
prev: false
next: false
---

# Preferences, history, and extensions {#settings}

<span id="startup-and-drawing-preferences"></span>


## Choose an appearance and color theme {#appearance-theme}

Ver.0.2.0 offers Dark, Light, and System appearance modes, seven color presets, and custom colors. Home, loading screens, pie menus, the viewport, and the UV Editor follow the selected theme.

The UI adapts to high-DPI display scaling so text and controls do not become too small on high-resolution screens. Dropdown values can also be changed with the mouse wheel.
## Home and recent scenes

On the home screen, use the left side to create or select a project or load a scene. Resume work from Recent Scenes on the right. The history keeps up to 20 of the most recent successful loads and saves. Search by name or path, and use each row's menu to remove it from the history without deleting the file itself. Click Go to Workspace at the top right to return to editing, and File → Home to return to the home screen. Turn off Show Home at Startup to open directly in the workspace next time.

Each recent-scene row has Open, Open file location, Copy path, and Remove from recent files actions. Missing files cannot be opened. Switching the project folder does not close the scene you are editing.

Change the display language in Window → Language or Preferences → General → Language. The choice is retained for the next launch. Your own material and layer names are not translated.

## Adjust stabilization

When brush stabilization is enabled, smoothing becomes slightly stronger when viewing a surface at an oblique angle. This prevents small movements on screen from becoming exaggerated across the surface. Near the silhouette, the brush follows more slowly than on front-facing areas. Brush dabs are spaced by distance along the surface, but at very shallow viewing angles, turning the surface toward you makes painting more stable.

Enable Speed-adaptive stabilization under Drawing Feel to suppress jitter while drawing slowly and make the brush follow more quickly as you speed up. Adjust Speed Response to control how much it changes. This does not apply to brushes with stabilization set to 0. New brushes default to 0.15 stabilization. Existing saved brushes retain their current stabilization values.

## Adjust pen pressure

Pressure Size changes stroke width with pen pressure, while Pressure Opacity changes how opaque the stroke is. Turn off pressure opacity for uniform ink lines. Strokes in existing scenes are redrawn using the settings stored when they were saved.

Load a model and finish any current loading operation or path edit before starting calibration. To calibrate pressure, go to Preferences → Drawing Feel → Calibrate with test strokes. Draw several strokes with varying pen pressure on the model in the viewport, then click Auto adjust and review. Try drawing again in the review screen, fine-tune with Softer or Firmer, and click Finish to save. Cancel leaves the settings unchanged. Mouse input is not used for automatic calibration. If there is insufficient pressure variation or too few samples, you will be prompted to add more test strokes. Test strokes are not added to the scene.

Only the latest test stroke remains visible; starting another clears the previous one. Clear drawing removes the preview, and Draw again restarts calibration from the review screen.

<GuideMedia name="calibrate-pressure" />

To adjust the pressure curve or minimum pressure, expand Advanced pressure settings under Preferences → Drawing Feel. For the pressure curve, Soft gives wider strokes with less force, while Firm requires more force for wide strokes. Minimum Pressure sets the lower limit for a light touch. Pressure Smoothing makes pressure changes more gradual; increasing it also introduces response lag. The graph shows output relative to input, and the monitor displays the current adjusted pressure. These pressure settings are saved automatically and apply to every brush. They do not apply to mouse input.

While “Use calibrated curve” is on, “Pressure curve” and “Minimum pressure” are disabled. Turn it off before adjusting those two controls manually.

On the same screen, you can adjust the current brush's pressure size, stabilization, and spacing. Save per-brush settings in brush presets to switch between them.

## Use pen side buttons

Pen side buttons work as the clicks assigned in your tablet driver. A button assigned to Right Click does not rotate the camera on its own; combined with Alt, it zooms. Touching the pen tip to the tablet while holding the right button does not paint. If the tip is still touching the tablet when you release the button, painting remains disabled until you lift the pen once. If the tip touches just before the button is pressed, the input is still treated as a right-click and any stroke that began is canceled. Touching the tip while holding Shift+Alt does not paint. Buttons assigned to Left Click or Middle Click work like the corresponding mouse buttons. Painting with a side button assigned to Left Click uses the same strength as mouse input because no pen pressure is available.

In the Ver.0.1.2 [layer pie menu](./layers.md#layer-pie-menu), a pen tablet can browse layers by placing the pointer at the top or bottom of the list. Return to the center to stop, or tap a card with the pen tip to select it. This works in both the 3D viewport and UV Editor.

## Choose file dialogs

File and folder selection uses the operating system's dialogs by default. Enable Preferences → General → Use internal file browser to switch to the built-in browser. This setting is retained after restarting. It applies to file selection for workflows such as opening models and scenes. Add Plugin and Run File in Scripting (Lua) continue to use the operating system's dialog. For a new project, create and select a project folder in the standard dialog.

## Workspace layout and history

Show panels from the Window menu and rearrange them by docking. Panel rails store panels that you can open from their icons. Widen a rail to show labels. You can reorder or group panels, or remove them from the rail. Use Reset Layout to restore the arrangement.

Use Ctrl+Z / Ctrl+Y to undo or redo edits, and inspect your actions in History. Undo does not reverse every setting or external file operation. Use the Console to check processing results and errors. Refer to this official documentation for operating instructions. The interface supports Japanese, English, Chinese, and Korean.

### Undo tool-setting changes

Brush, eraser, color blending/blur, stamp, and path tool settings support Undo/Redo. A continuous drag of a slider or numeric field is grouped into one undo step. Undo applies to the changed setting even after switching tools.

Restoring a brush or stamp setting affects the next stroke. Not every setting or external file operation can be undone.

### Use the panel rail {#panel-rail-operations}

Drag a panel's title bar onto the Panel Rail to stow it as an icon. Click the icon to open it, and click again to close it. Opening another rail panel closes the one previously opened from the rail. Drag an opened panel's title away to place it as a regular panel. Right-click its icon and choose Remove from rail to remove the icon. The arrow at the top switches between icons only and icons with names.

### Navigate the edit history {#history-navigation}

In Window → History, click a row to restore the state after that operation. Latest state replays all retained Redo steps. History navigation is unavailable while operations such as loading or painting are in progress. Making a new edit after undoing replaces the remaining Redo history.

Preferences → General → Maximum history (0 = unlimited) sets the combined Undo and Redo limit. The default is 100 entries; 0 means unlimited. Click Save to apply a change. Entries beyond the limit are removed from the oldest Undo history first, then from the most distant Redo history if needed. Removed entries cannot be recovered. A grouped operation, such as one continuous slider drag, counts as one entry.

### Check FPS and frame times {#performance-panel}

Window → FPS / Frame time shows FPS, mean/P95/maximum frame time, the count of frames over 50 ms, and a graph. It measures wall time over the last 240 frames, including frame caps and idle waits, rather than GPU rendering time alone. Click Reset measurements before an operation you want to compare. The panel also shows whether experimental texture streaming is ON or OFF.

## VRAM and display quality

In Preferences → VRAM, start with a preset and adjust as needed. If performance is slow, first lower the preview resolution, then lower the working resolution if necessary.

### Presets and preview resolution {#vram-presets}

Balanced is the default preset. Maximum quality uses full-resolution previews. Low VRAM uses quarter-resolution previews and BC7 display compression, among other changes. Changing an individual setting switches the preset to Custom. Selecting Maximum quality, Balanced, or Low VRAM turns off experimental features. Selecting Custom alone keeps the current settings.

Half and Quarter refer to the width and height of the preview image. While the UV Editor is open, the UI preview resolution adjusts automatically to its canvas size. Export resolution is unchanged.

After changing VRAM options, click Save at the bottom of Preferences. Closing the window without saving does not apply those changes. Changes to the storage mode for pixels outside mesh UVs take effect at the next model load or resolution change.

| Settings group | What it controls |
| --- | --- |
| Textures | Outside-mesh-UV handling, BC7 display compression, lazy channel loading, and the channels it applies to |
| Bake intermediates | Deferred allocation and maximum counts for snapshots, live scratch buffers, and layer checkpoints |
| Import / GPU prep | Fast GPU path and GPU allocation batches |
| Preview | Viewport and UI panel display at full, half, or quarter resolution |
| Memory Infrastructure | Staging pools, block capacity, and reuse while idle |
| Budget | VRAM budget and over-budget warnings. 0 means no budget limit |
| Experimental | Neural texture compression, virtual texture cache, and reduced memory for non-edited texture sets. See the explanations below |

To restrict painting itself to pixels inside UV islands, use [Remove UV padding (strict)](./brush.md#strict-uv-padding) in the Brush panel. It is separate from the storage and export behavior of **Outside mesh UVs**.

### What the VRAM budget controls {#vram-budget}

The VRAM budget guides warnings and some cache decisions. It does not prevent every allocation beyond the specified amount. The usage bar is an estimate and may include memory used by other applications. Set it to 0 for no configured budget.

### Display-image compression {#display-compression}

BC7 compresses viewport display copies only. BC7 for unselected sets keeps the selected set's regular preview; BC7 for all sets includes the selected set. Editable images and exports are not compressed. Ordinary BC7 display copies are 256–512 px; full-resolution virtual texture caching behaves differently.

Neural texture compression (viewport) is experimental and off by default. It reconstructs display images from a smaller representation, so detail and color may differ from the original. Previews are 256–512 px; editable and export images are retained. Latent divisor defaults to 4, with a minimum of 2. This mode is overridden when full-resolution virtual texture caching or memory reduction for non-edited sets takes priority.

### Virtual texture cache

The virtual texture cache losslessly compresses unselected sets to disk and restores them when selected. Full-resolution display is supported. At full resolution, unselected sets use BC7 display copies, which may show slight color differences. Editing and export data remain lossless.

The selected set takes priority over the page budget. GPU residency is managed per texture set, not per visible tile.

### Reduce memory for non-edited texture sets

This option is off by default. On supported GPUs, the selected and actively edited sets stay at their original resolution. After at least three seconds without interaction, other sets are moved out of memory losslessly and displayed at quarter resolution.

When the active layer targets all texture sets, all sets stay resident in memory. A single-set scene does not gain channel-memory savings. This mode takes priority over BC7, NTC, and the older virtual texture cache; switching sets may require waiting for restoration.

For autosave, see [Saving and recovery](/en/guide#projects). General includes the package extraction location setting. In Key Config, search by action name or condition to change keyboard and mouse bindings.

<span id="lua-and-plugins"></span>

## Lua and plugins

Scripting (Lua) lets you run entered code or Lua files, and inspect or clear logs. The `hf` API includes actions for adding and editing layers, masks, image fills, material presets, brushes, model imports, scene saves, packages, and texture exports. Layer numbering starts at 1.

```lua
hf.log('Layers: ' .. hf.layer_count())
hf.add_layer('paint', 'Practice layer')
```

Launch plugins from the top Plugins menu. Ordinary Lua scripts and Lua extensions that register a panel use separate execution paths. Choose a detailed guide below.

- [Install and manage plugins](./plugins.md): add, locate, launch, update, and troubleshoot plugins
- [Create plugins](./plugin-development.md): minimal Lua examples, official SDK download, DLL builds and tests
- [Built-in adjustments](./adjustments.md): color adjustment, tone curves, and gradient maps


### Script execution and Undo {#lua-execution-undo}

Normal Lua scripts wait while painting or another operation is active. Lua instructions have an approximately two-second execution limit, but a called operation cannot always be interrupted midway. Split long work into smaller steps and check the output log for errors. Unlike extension actions, an entire normal script is not automatically grouped into one Undo step or rolled back as a unit on error. Save the scene before running it.
