---
title: "Color adjustment, tone curves, and gradient maps"
category: "Painting and editing"
description: "Choose and edit the three adjustment layers, understand their controls, and preserve your settings when saving or exporting."
outline: [2, 3]
prev: false
next: false
---

# Color adjustment, tone curves, and gradient maps {#adjustments}

All three effects adjust the composite of the layers below them while keeping the original work editable. Choose **Color Adjustment** for overall brightness and color, **Tone Curve** for separate control over shadows, midtones, and highlights, or **Gradient Map** to assign a new palette according to brightness.

<GuideConcept kind="adjustments" />

<GuideMedia name="edit-adjustments" />

## Add and edit an adjustment {#add-and-edit}

1. In Layers, select the target texture set and the position where you want the adjustment.
2. Click the half-circle **New adjustment layer** icon and choose an effect.
3. Select the new layer and set **Target Channel** and the effect controls in Properties. Start with BaseColor when changing color.
4. Toggle the layer's visibility to compare the result. Select the same layer later to edit its settings. Moving it changes which underlying layers it affects.

Available target channels are BaseColor, Normal, Roughness, Metallic, Height, and Emission. Each adjustment layer affects one selected channel. Roughness, Metallic, and Height represent numeric distributions, so treat their adjustments differently from a color change.

You can also launch these effects from [Plugins](./plugins.md). Choose **Target Texture Set** and **Target Channel**, inspect the live viewport preview, then click **Apply** to add an editable adjustment layer. **Cancel**, or Esc while the adjustment window is focused, restores the original view.

## Color Adjustment {#color-adjustment}

Use this for overall brightness, vividness, or hue changes without repainting.

| Control | Range / default | Effect |
| --- | --- | --- |
| Brightness | −1 to 1 / 0 | Brightens or darkens the overall image |
| Contrast | 0 to 3 / 1 | Reduces or increases the difference between dark and light |
| Saturation | 0 to 3 / 1 | 0 removes color; 1 preserves saturation; higher values intensify it |
| Hue | −180 to 180 / 0 | Rotates the hue to change the color family |
| Gamma | 0.1 to 3 / 1 | Adjusts midtones: above 1 brightens them, below 1 darkens them |

Start with small brightness and contrast changes, then adjust saturation and hue, and finish with gamma. Extreme settings can lose detail in highlights or shadows. Compare the BaseColor view with the normal shaded view. “Reset adjustment” restores the effect values. It keeps the effect type and target channel, so select the correct channel separately if needed.

## Tone Curve {#tone-curve}

The horizontal axis is the original value (**Input**); the vertical axis is the corrected value (**Output**). Shadows are toward the lower left and highlights toward the upper right. Raising the curve above the diagonal brightens those values; lowering it darkens them.

1. In **Channel**, choose **RGB (Master)** to adjust overall tone, or **Red (R)**, **Green (G)**, or **Blue (B)** for individual color control.
2. Click the graph to add a point and drag it to reshape the curve. You can also edit the selected point with Input and Output.
3. Lower shadows slightly and raise highlights slightly to increase contrast. Reduce **Strength** if the effect is too strong: 0 gives no adjustment and 1 gives the full effect.

Each curve supports 2–16 points, including its endpoints. Input and Output range from 0–1. The endpoints' input positions are fixed and the endpoints cannot be removed. Use **Remove point** for an interior point.

**Curve presets** offers Linear, Contrast, Soft contrast, Lift shadows, Matte, and Darken. A preset changes the currently selected curve. The individual R, G, and B curves are applied after the RGB master curve.

## Gradient Map {#gradient-map}

A gradient map reads the underlying brightness and assigns colors from dark to light. It does not paint a spatial gradient from one side of the viewport to the other. Areas of similar brightness receive similar colors regardless of their position on the model.

1. Select a color stop on the ramp and set its color with the picker or a #RRGGBB code.
2. Drag the stop or use **Position** to choose which brightness receives that color. The 0% side represents shadows and the 100% side represents highlights.
3. Use **Add color** for an intermediate color. For example, navy shadows, red midtones, and pale yellow highlights create a three-color palette from the original tonal structure.
4. Reduce **Strength** to retain more of the original color. At 0 there is no adjustment; at 1 the mapping has full strength.

The ramp supports 2–16 stops. **Remove** deletes the selected stop; **Reverse** mirrors the colors and positions. Search and select a look in **Presets**, then refine its colors and positions. Stops move within their neighboring stops.

## Save, export, and troubleshoot {#save-and-check}

- Save a .harmos scene to keep the effect settings editable. All three effects remain editable after saving, and setting changes support Undo/Redo.
- Ordinary image exports contain the composited result. PSD exports contain raster layers for the affected channels, not native Photoshop adjustment layers. Changing the underlying layers in Photoshop will not recalculate the effect. See [Export](./export.md).
- If nothing changes, check the target set and channel, layer visibility, opacity, and stack order. Confirm there is content below the adjustment and that a mask or clipping is not limiting it.
- These effects do not fill originally transparent areas. Use a [material or paint layer](./layers.md) to add content to an empty area.
