# E-commerce Web Assets

Prepared from the uploaded Figma export.

## Structure
- `images/products/` — product photography converted to WebP
- `images/models/` — model/lifestyle photography converted to WebP
- `images/categories/` — reserved for category imagery
- `images/hero/` — reserved for hero imagery
- `logos/` — reserved for SVG/brand logos (none were present in the uploaded ZIP)
- `icons/` — reserved for SVG/UI icons (none were present in the uploaded ZIP)
- `originals/` — original uploaded files, retained for reference
- `asset-manifest.json` — source-to-output mapping and duplicate information

## Conversion
Photographic assets are converted to WebP at quality 92 and capped at a 1600px maximum dimension where necessary. Transparent sparkle graphics use lossless WebP. The site references the converted WebP versions; original PNG/JPEG files are retained unchanged in their source folders, and SVG logos remain SVG.

## Note
The manifest records one duplicate from the upload; that duplicate is not retained in `originals/`. Every raster source currently retained there has a corresponding WebP export. No standalone logo or SVG/icon assets were present in the uploaded ZIP.
