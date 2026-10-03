---
title: "Troubleshooting"
category: "Settings and reference"
description: "Troubleshoot startup failures, crashes, and GPU errors; recover work and prepare relevant logs and a support report."
outline: [2, 3]
prev: false
next: false
---

# Troubleshooting {#troubleshooting}

Start with [startup or unexpected exits](#startup-checks), [GPU errors](#gpu-errors), or the [recovery steps](./projects.md#gpu-recovery). If the problem persists, use the [support report template](#report-template).

## Cannot start or the app closes unexpectedly {#startup-checks}

### Preserve these first

- Record the complete error message, time, and action immediately before the problem. Check screenshots for personal information or work you cannot share.
- If the app responds, save the scene. If content appears missing, use Save Scene As before overwriting a known-good save.
- Keep the project and autosaves while investigating. Deleting settings or autosave folders is not a first troubleshooting step.

### Check in this order

1. Check the [installation steps](./start.md#app-install), then launch HarmoFlow or HarmoFlow Trial from the Start menu. If the download was incomplete, download the installer for the same edition again from BOOTH. Keep the installed files together; do not move only `harmoflow.exe` or obtain missing DLLs from unknown download sites.
2. Check that you are using Windows and a Vulkan 1.2-compatible GPU and driver. Obtain driver updates from your PC or GPU manufacturer's official source. You do not need the Vulkan SDK to use the app.
3. Save work in other applications, then close GPU-heavy applications such as games or video editors and restart HarmoFlow. Restart Windows if needed.
4. If the app opens, protect your original project and test a small new project at a lower working resolution. Note whether the problem occurs immediately after launch, only with one model, or during resolution changes, painting, or export.
5. If the same error repeats, avoid repeated reproduction with unsaved work. Send the [diagnostic information](#diagnostic-info) below. Disabling Windows warnings or security software is not recommended.

::: warning After an unexpected exit
The recovery prompt does not appear after every crash. GPU-error recovery requires a successful recovery autosave that is still available. If no prompt appears, check the last saved scene or available [autosaves](./projects.md#autosave-location). Recovery of every unsaved change is not guaranteed.
:::

## Follow the GPU error message {#gpu-errors}

| Message or symptom | What to check next |
| --- | --- |
| The GPU ran out of memory (VRAM) | Close other GPU-using applications and try a lower texture resolution. More parts (texture sets) require more memory. Preferences → VRAM also lets you reduce preview memory use |
| The GPU stopped responding | Close other heavy applications and check for official driver updates. Record the action and what happened before processing stopped |
| The GPU was reset | Note whether this followed waking from sleep or a driver update. If it repeats, consider an official driver update and report the circumstances |
| Another GPU error | Record the full Details text, GPU model, driver version, and the action being performed |

An out-of-memory operation may roll back to its previous state without closing the app. If it stays open, inspect and save the scene, reduce the load, and then retry. If the app asks to close or restart, follow [recovery after a GPU error](./projects.md#gpu-recovery). Change resolution or VRAM settings one at a time to help identify what makes a difference.

## UVs show only an outline

::: details What to do
In Wire Settings, change the display mode to Triangles. UV Shells mode draws only the boundary of each island.
:::

## Wireframe lines look too dark or dense

::: details What to do
Reduce line width and opacity, or switch to UV Shells mode. Turn off UV wire when you want to inspect the texture itself.
:::

## Cannot switch parts

::: details What to do
The part selector is disabled if the imported model has only one part. For a model with multiple parts, select one at the top of the Channels panel.
:::

## Mesh maps do not appear

::: details What to do
Wait for automatic baking to finish. If an error appears, check its details and try Rebake. Importing a different model discards the previous processing results.
:::

## Layers panel display

Use the gear menu in the Layers panel to toggle content previews. This setting is saved in the UI layout. Previews show the painted material's BaseColor as a small UV image. They reuse GPU baking results rather than rebaking the entire layer for each row.

Folder rows are shorter than paint-layer rows, and the selected row has an inner border. Drag over the upper or lower half of a layer name to show a line at the corresponding insertion point. Drag over the center of a folder to show a border and move the item inside the folder. At a folder's top or bottom edge, an insertion line lets you reorder an item before or after the entire folder, including its child layers. Moving a folder preserves its children and supports Undo/Redo.

## Find your version and logs {#diagnostic-info}

- **Version:** Record the `v…` value in Help → About HarmoFlow. If visible, include the build timestamp in square brackets at the center of the title bar. If the app cannot start, give the downloaded distribution's filename and version.
- **GPU and Windows:** Record the Windows version, exact GPU model, VRAM capacity, and graphics driver version. If the computer has multiple GPUs, list those you can identify.
- **Application log:** Open Window → Console to read processing results, then use Copy to obtain the text. The console holds up to 5,000 entries from the current run in memory. It is not a persistent log file you can read from the previous run after restarting. When possible, capture it before quitting, restarting, or clearing it.

::: tip Copying and sharing logs
Copy copies all retained console entries, even when the display is filtered. Paste the text into a text editor and keep only relevant sections, such as the entries around the time of the problem. Remove usernames, full local paths, and confidential filenames. If startup fails before you can collect a log, say so and report the error message instead.
:::

## Support report template {#report-template}

Copy this template, fill in what you know, and contact the seller through [Mametaro-an's BOOTH shop](https://mametarovv.booth.pm/). “Unknown” is fine for unavailable information. Do not include passwords or purchase payment details.

```text
Problem summary:
HarmoFlow version / full or trial edition:
Build timestamp (if known):
Windows version:
GPU model / VRAM capacity / driver version:
Date and time of the problem:
Action in progress:
Steps to reproduce: 1. … 2. … 3. …
Expected result / actual result:
Frequency (every time / sometimes / once):
Also happens in a new project / only with specific data:
Model format, part count, working resolution (if known):
Additional plugins, names, and versions:
Complete error message:
Last successful save / recovery prompt and recovery result:
Troubleshooting already tried and its results:
Attachments (relevant logs, images, or a reproduction sample):
Whether a sample can be shared / restrictions on sharing:
```

You do not need to send the whole project initially. Share only the smallest relevant log excerpt, image, or sample, and check for unreleased work, client information, and third-party assets. Check redistribution terms for purchased assets. If sharing is not permitted, replace them with a small self-made sample that reproduces the issue, or explain that the data cannot be shared.
