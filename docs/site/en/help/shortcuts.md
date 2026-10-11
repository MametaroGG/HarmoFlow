---
title: "Keyboard shortcut reference"
category: "Settings and reference"
description: "Keyboard and mouse controls for painting, the camera, UVs, and saving, plus how to change key bindings."
outline: [2, 3]
prev: false
next: false
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Keyboard shortcut reference {#shortcuts}


## Inspect the keyboard and mouse diagrams {#visual-key-config}

In Ver.0.3.0, Key Config uses keyboard and mouse diagrams to inspect and edit bindings. It supports filtering by key, navigation and numeric keypad clusters, and Japanese, English, Korean, and Chinese layout displays. Long shortcuts are less likely to be clipped.

If you have saved settings, use the bindings displayed in the app rather than the initial-binding tables below.

### Selection tool controls (Ver.0.3.0) {#selection-tool-shortcuts}

In Ver.0.3.0, M recalls Selection Area and S toggles symmetry for brush-based tools. Ctrl+T opens the selected-paint transform; K opens Move Layer. Individual rectangle, ellipse, lasso, polygonal, selection pen, selection eraser, shrink, and mesh selection tools start unassigned. Choose them from the tool rail or pie menu, or assign keys in Key Config. Do not use the former V, W, E, or R bindings as current defaults.

- Hold Shift while making a rectangle or ellipse selection to create a square or circle
- The selection pen and selection eraser support pen pressure and brush-size shortcuts. Check Key Config for your current bindings
- Selected paint can be moved, rotated, and scaled. See [select and transform paint](./brush.md#paint-selection-transform) for the available tools
## Check and change key bindings

In Preferences → Key Config, switch between action-name and shortcut search on the left, then select an action. Its current bindings appear under Selected Action on the right. Click a binding button to edit it, or use + Add to add another binding. Actions without a binding are marked as unassigned in the list.

In the keyboard and mouse diagram, colored keys already have bindings. Select a key to filter the action list. The panel includes a layout selector and Ctrl, Shift, and Alt controls; navigation keys and the numeric keypad are grouped in a collapsible section.

Use Reset to Default, Remove, or Cancel in the binding dialog. Fixed actions cannot be changed. Ordinary left-click and bindings that conflict with actions used at the same time cannot be assigned. If another action already uses the input you want, review that binding first.

The screenshot below shows the Key Config interface with the action list and keyboard and mouse diagram.

Adding, changing, removing, or resetting a binding saves it immediately.

<figure class="doc-diagram">
<a :href="withBase('/graphics/guide/key-config-example.png')" target="_blank" rel="noopener"><img :src="withBase('/graphics/guide/key-config-example.png')" width="1420" height="876" alt="Japanese Key Config screenshot from an earlier version, retained as an interface reference. For Ver.0.3.0 defaults use the tables below; check the app for your current bindings. Click to enlarge." loading="lazy" /></a>
<figcaption>Japanese Key Config screenshot from an earlier version, retained as an interface reference. For Ver.0.3.0 defaults use the tables below; check the app for your current bindings. Click to enlarge.</figcaption>
</figure>

These tables show the Ver.0.3.0 initial bindings and fixed gestures. If you have saved settings, use the bindings shown in Key Config. Tool keyboard shortcuts are unavailable during text entry, while Preferences is open, or while the pie menu is open.

Use the listed default gestures for window focus and Toggle Corner / Smooth. Changes made in Key Config may not take effect for these actions.

## Actions and keys or gestures

### General

| Action | Key or mouse gesture and context |
| --- | --- |
| Preferences | Ctrl+, |
| Pause Engine | Shift+Esc |

### Editing

| Action | Key or mouse gesture and context |
| --- | --- |
| Undo | Ctrl+Z |
| Redo | Ctrl+Y / Ctrl+Shift+Z |

### Files

| Action | Key or mouse gesture and context |
| --- | --- |
| New Scene | Ctrl+N |
| Save Project | Ctrl+S |
| Save Project As | Ctrl+Shift+S |
| Incremental Save | Ctrl+Alt+S |

### Tools

| Action | Key or mouse gesture and context |
| --- | --- |
| Paint Tool | B |
| Color Blending Tool | U |
| Path Tool | P |
| Selection Area | M<br>Recall the last paint-selection tool |
| Transform Selected Paint | Ctrl+T |
| Move Layer | K |
| Text Tool | T |
| Fill Tool | Unassigned |
| View Navigation | Unassigned |
| Navigation: Pan | Unassigned |
| Navigation: Rotate | Unassigned |
| Navigation: Zoom | Unassigned |

### Painting

Use these with brush-based tools. Keys 1, 2, and 3 switch to the Fill tool in Brush, Polygon, or UV Shell mode. Use C to erase with transparent color. Toggle Eraser itself has no initial key binding.

| Action | Key or mouse gesture and context |
| --- | --- |
| Brush Fill Mode | 1 |
| Polygon Fill Mode | 2 |
| UV Shell Fill Mode | 3 |
| Toggle Eraser | Unassigned |
| Smaller Brush | [ |
| Larger Brush | ] |
| Toggle Symmetry | S |
| Symmetry X Axis | Shift+X<br>When symmetry is enabled |
| Symmetry Y Axis | Shift+Y<br>When symmetry is enabled |
| Symmetry Z Axis | Shift+Z<br>When symmetry is enabled |
| Toggle Pseudo Quad | Q |
| Eyedropper | Ctrl+Shift+left drag<br>On the model in the 3D viewport. Release the left button while holding Ctrl and Shift to apply; releasing the modifiers first cancels |
| Adjust Brush Size (drag) | Ctrl+Alt+left drag / Ctrl+Alt+right drag<br>Drag horizontally |

### Palette

| Action | Key or mouse gesture and context |
| --- | --- |
| Swap Foreground / Background | X |
| Toggle Transparent Color | C<br>Does not toggle transparent color while drafting a path |
| Reset Color Slots | D |
| Mixer Eyedropper | Alt+left drag<br>On the mixer canvas. Release the left button while holding Alt to apply; releasing Alt first cancels |

### Stamps

| Action | Key or mouse gesture and context |
| --- | --- |
| Resize Stamp (drag) | Ctrl+Alt+left drag / Ctrl+Alt+right drag<br>Text, shape, and image stamps<br>Drag horizontally in the 3D viewport |
| Rotate Stamp (drag) | Shift+Space+left drag / Shift+Space+right drag<br>Text, shape, and image stamps<br>Drag horizontally in the 3D viewport |
| Reset Stamp Rotation | Shift+Space+left double-click / Shift+Space+right double-click<br>Text, shape, and image stamps |

### Display

| Action | Key or mouse gesture and context |
| --- | --- |
| Toggle Wireframe | I |
| Toggle Floor Grid | G |
| Save Viewport Screenshot | F12 |
| Toggle UV Editor | Shift+P |
| Hide Selected Meshes | Ctrl+H |
| Show Selected Meshes | Shift+H |
| Hide Unselected Meshes | Alt+H |
| Show Last Hidden Meshes | Ctrl+Shift+H |
| Open Texture Set Under Cursor | Shift+Alt+right click<br>Click the model |

### 3D viewport

| Action | Key or mouse gesture and context |
| --- | --- |
| Orbit Camera | Alt+left drag |
| Pan Camera | middle drag / Space+left drag<br>Unavailable in Pivot 360 mode |
| Zoom Camera (drag) | Alt+right drag / Ctrl+left drag<br>Drag right or up to zoom in |
| Zoom Camera (wheel) | Mouse wheel |

### Paths

C and F apply with the viewport hovered while drafting a path. Delete or Backspace removes the last draft anchor. When editing an existing path, it deletes the selected anchor.

Esc cancels an unfinished draft. When re-editing an existing path in the 3D viewport, it exits editing and keeps the changes.

Close Path is initially registered to C, which is also used by Toggle Transparent Color. Loading saved settings can leave Close Path unassigned. If the action is marked as unassigned, assign an input that does not conflict with another action.

| Action | Key or mouse gesture and context |
| --- | --- |
| Finish Open Path | Enter<br>While drafting; or while re-editing a path in the 3D viewport |
| Cancel Path | Esc<br>While drafting; or while re-editing a path in the 3D viewport |
| Remove Last Anchor | Delete / Backspace<br>While drafting |
| Close Path | Check Key Config (initial registration: C)<br>While drafting over the 3D viewport |
| Close Path and Fill | F<br>While drafting over the 3D viewport |
| Delete Selected Anchor | Delete / Backspace<br>Anchor selected in the 3D viewport or UV Editor |
| Toggle Corner / Smooth | left double-click<br>On an anchor of an existing path opened for editing in the 3D viewport |

### Selection

| Action | Key or mouse gesture and context |
| --- | --- |
| Mesh Selection | Unassigned |
| Mesh Lasso | Unassigned |
| Rectangle Selection | Unassigned |
| Ellipse Selection | Unassigned |
| Paint Lasso | Unassigned |
| Polygonal Selection | Unassigned |
| Selection Pen | Unassigned |
| Selection Eraser | Unassigned |
| Shrink Selection | Unassigned |
| Rotate Selected Paint | Unassigned |
| Scale Selected Paint | Unassigned |
| Confirm Selection / Transform | Enter / NumEnter<br>Confirm a polygonal selection (at least 3 points, canvas hovered) or a transform |
| Remove Last Selection Point | Delete / Backspace<br>While drafting a polygonal selection with the canvas hovered |
| Clear Mesh Selection | Esc<br>Select tool active, pointer over the 3D viewport |
| Add to / Remove from Selection | Shift+left click<br>With Select active, Shift-click toggles a part. Shift-drag from empty space adds parts |
| Add to / Remove from Selection (part list) | Shift+left click |

### Layers

| Action | Key or mouse gesture and context |
| --- | --- |
| Copy Selected Layer | Ctrl+C<br>Layers panel focused |
| Cut Selected Layer | Ctrl+X<br>Layers panel focused |
| Paste Layer | Ctrl+V<br>Layers panel focused |
| Duplicate Selected Layer | Ctrl+D<br>Layers panel focused |
| Delete Selected Layer | Delete<br>Layers panel focused |
| Turn Layer Mask On / Off | Shift+left click<br>On the mask thumbnail |
| Open / Close Folder | left double-click<br>On a folder row |
| Select a layer with the pie menu (Ver.0.1.2) | Hold the right button, slide into Layers, and release over a card in the thumbnail list<br>3D viewport / UV Editor |
| Toggle a layer setting with the pie menu (Ver.0.1.2) | Slide onto a setting beside the card and release the right button there<br>Only the setting released over changes |
| Browse and select layers with a pen (Ver.0.1.2) | Place the pointer at the top/bottom to scroll; return to the center to stop. Tap a card with the pen tip to select |

### UV Editor

| Action | Key or mouse gesture and context |
| --- | --- |
| Adjust Brush Size (drag) | Ctrl+Alt+left drag / Ctrl+Alt+right drag<br>Use a brush tool and a paintable target; drag horizontally |
| Zoom Canvas (drag) | Ctrl+left drag<br>Drag right or up to zoom in |
| Zoom Canvas | Mouse wheel |
| Pan Canvas | middle drag / Space+left drag |
| Rotate Canvas | Shift+Space+left drag / Shift+Space+right drag<br>Drag horizontally |
| Reset Canvas Rotation | Shift+Space+left double-click / Shift+Space+right double-click |
| Insert Anchor on Segment | left double-click<br>On a path segment |

### Interface

| Action | Key or mouse gesture and context |
| --- | --- |
| Focus Next Window | Ctrl+Tab |
| Focus Previous Window | Ctrl+Shift+Tab |
| Use the Current Tool | Left-click / pen |
| Toolbar Pie Menu | Hold the right mouse button, slide, then release to select. Esc cancels. Available in the 3D viewport / UV canvas; assigned right-button gestures take priority |
| Focus Next Widget | Tab |
| Focus Previous Widget | Shift+Tab |
| Clear Focus / Close Popup | Esc |
| Command Palette | Click the title-bar search box |
| Run Highlighted Command | Enter<br>Command palette open |
| Close Command Palette | Esc<br>Command palette open |
| View Along an Axis | Click the axis gizmo<br>3D viewport |
| Item Menu | Right-click<br>Presets, swatches, and the tool rail |
| Open Item | Double-click<br>Files, folders, and presets in panels |
| Dock / Undock Panel | Drag the panel title bar |
| Switch Dock Tab | Click a dock tab |

## Panel actions

| Action | Key or mouse gesture and context |
| --- | --- |
| Rename a layer, asset, or user material preset | Select the item, focus its panel, and press F2. Renaming a project asset also renames the file. |
| Delete a project asset | Delete while the Asset Browser has focus. Moves the item to the Windows Recycle Bin; scene Undo does not restore it |

For operation-specific requirements, see the [pie menu](./workspace.md#pie-menu), [paths](./paths.md), [UV Editor](./uv.md), [layers](./layers.md), [layer pie menu](./layers.md#layer-pie-menu), and [Asset Browser](./assets.md).
