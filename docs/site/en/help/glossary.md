---
title: "Glossary"
category: "Settings and reference"
description: "Definitions of texture-creation terms, including UVs, PBR, baking, masks, and VRAM."
outline: [2, 3]
prev: false
next: false
---

# Glossary {#glossary}

## Texture-creation terminology

| Term | Meaning |
| --- | --- |
| Mesh / Polygon | A 3D shape made of vertices and faces. A polygon is one of those faces |
| Mesh Part | A component of a model. In HarmoFlow, each mesh part defines a texture set |
| UV / UV Island (Shell) | Coordinates that map a 3D surface to a 2D image. A connected region of those coordinates is a UV island |
| Detected Quad | A pair of triangles detected and treated as the equivalent of a quadrilateral |
| Texture Set | A set of images, such as color and roughness, used by a particular part |
| Channel | A type of surface information, such as color, normals, or roughness |
| PBR / NPR | Physically based rendering using light reflection / non-photorealistic rendering, such as toon shading |
| Baking | Calculating information such as strokes or geometry and applying the result to an image |
| Mesh Map | An image calculated from the model's geometry, such as curvature or occlusion |
| Curvature / AO | The surface's tendency to be convex or concave / how much surrounding geometry occludes it |
| Normal / Tangent Space | The direction a surface faces / a coordinate system relative to the surface, used by standard Normal textures |
| Object Space | A coordinate system relative to the model itself, used for geometry-map normals and strokes |
| Height | Height information used for visible surface relief, separate from editing the model's vertices |
| Fill | A layer that fills a surface with constant values, images, or generated patterns |
| Procedural / Seed | A method of generating patterns through computation / a number that determines the pattern's arrangement |
| Alpha / Opacity | Information representing transparency / a setting that controls how opaque something appears |
| Mask / Clipping | Information defining which areas are visible / a restriction based on the painted area of the layer below |
| Anchor / Handle | A point on a path / a control used to adjust a curve's direction and shape |
| Shape Key | Data that blends vertex deformations by weight to change expressions or other shapes |
| Linear / sRGB | A space used for numerical color calculations / a nonlinear color encoding used for display. Do not confuse data maps with color images |
| VRAM / BC7 | GPU memory / a texture compression format for GPUs |
| IBL / F0 / ACES | Lighting from an environment image / base reflectance when viewed straight on / tone mapping that fits brightness into the display range |
| High-Poly / Cage / UDIM | A detailed model / geometry defining the range of projection rays / a method using multiple UV tiles. These are not currently supported by mesh map baking |
