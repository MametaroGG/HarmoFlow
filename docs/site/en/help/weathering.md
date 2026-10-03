---
title: "Adding weathering to edges and recesses"
category: "Display and surface properties"
description: "Use geometry maps to place weathering on convex edges, recesses, and occluded areas."
outline: [2, 3]
prev: false
next: false
---

# Adding weathering to edges and recesses {#weathering}

## Place weathering based on geometry

1. **Select a Fill layer for weathering**

   Enable a procedural pattern and adjust properties such as color and Roughness.

2. **Choose Mesh placement**

   Choose Convex edges, Concave edges, or Occluded dirt (AO). Whole surface does not restrict placement by geometry.

   If mesh maps are still baking, wait for placement to update. If it does not update, check the displayed error and use Rebake mesh maps.

3. **Adjust the strength and pattern**

   Use Mesh influence to control the influence of geometry, and adjust Amount, Scale, and other settings to refine the weathering distribution.

<GuideMedia name="place-weathering" />

## Saving settings and UV transforms

Shape-based placement does not apply the fill image's UV transforms. Placement settings are saved in scenes and material presets, and support Undo/Redo.
