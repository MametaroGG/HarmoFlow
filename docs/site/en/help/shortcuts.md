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

## Check and change key bindings

In Preferences → Key Config, search by action name, condition, or binding. Click a binding to change it; + adds an alternative. An action showing Add has no binding. Changes are saved per action.

Use Reset to Default, Remove, or Cancel in the binding dialog. Fixed actions cannot be changed. Ordinary left-click and bindings that conflict with actions used at the same time cannot be assigned. If another action already uses the input you want, review that binding first.

<figure class="doc-diagram">
<a :href="withBase('/graphics/guide/key-config-example.png')" target="_blank" rel="noopener"><img :src="withBase('/graphics/guide/key-config-example.png')" width="757" height="531" alt="Example of Key Config in Japanese. Displayed bindings depend on saved settings. Click the image to enlarge it." loading="lazy" /></a>
<figcaption>Example of Key Config in Japanese. Displayed bindings depend on saved settings. Click the image to enlarge it.</figcaption>
</figure>

The tables show initial bindings and fixed gestures in Ver.0.1.1. If you have saved settings, use the bindings shown in Key Config. Tool keyboard shortcuts are unavailable during text entry, while Preferences is open, or while the pie menu is open.

In Ver.0.1.1, use the listed default gestures for window focus and Toggle Corner / Smooth. Changes made in Key Config may not take effect for these actions.

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
| Select Tool | V |
| Text Tool | T |

### Painting

Use these with brush-based tools such as Paint and Color Blending. Keys 1, 2, and 3 switch the Paint fill mode; E toggles the eraser on or off. Enabling it uses the brush-shaped eraser.

| Action | Key or mouse gesture and context |
| --- | --- |
| Brush Fill Mode | 1 |
| Polygon Fill Mode | 2 |
| UV Shell Fill Mode | 3 |
| Toggle Eraser | E |
| Smaller Brush | [ |
| Larger Brush | ] |
| Toggle Symmetry | M |
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
| Toggle Transparent Color | C |
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

Close Path is initially registered to C, which is also used by Toggle Transparent Color. Loading saved settings can leave Close Path unassigned. If the action shows Add, assign an input that does not conflict with another action.

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

For operation-specific requirements, see the [pie menu](./workspace.md#pie-menu), [paths](./paths.md), [UV Editor](./uv.md), [layers](./layers.md), and [Asset Browser](./assets.md).
