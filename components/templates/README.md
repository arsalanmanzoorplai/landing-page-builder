# Templates Organization

This directory contains all template components for different website themes (travel-tour, e-commerce, portfolio, etc.) and their variations.

## Directory Structure

```
components/templates/
├── README.md                      # This file
├── TemplateFactory.tsx            # Main factory component for selecting templates
├── [ThemeType]Templates.tsx       # Component to select template variations (e.g., AboutTemplates.tsx)
├── travel-tour/                   # Travel & Tourism theme
│   ├── sections/                  # Section components by type
│   │   ├── navbar/                # Navbar section
│   │   │   ├── variants/          # Different navbar layout variants
│   │   │   │   ├── NavbarDefault.tsx
│   │   │   │   ├── NavbarCentered.tsx
│   │   │   │   └── ...
│   │   │   └── index.tsx          # Exports all navbar variants
│   │   ├── hero/                  # Hero section
│   │   │   ├── variants/          # Different hero layout variants
│   │   │   │   ├── HeroDefault.tsx
│   │   │   │   ├── HeroVideo.tsx
│   │   │   │   └── ...
│   │   │   └── index.tsx          # Exports all hero variants
│   │   └── ...                    # Other section types
│   └── index.tsx                  # Exports the main travel-tour template
├── ecommerce/                     # E-commerce theme (future)
│   └── ...
└── portfolio/                     # Portfolio theme (future)
    └── ...
```

## How to Add a New Template Variant

1. Create a new component in the appropriate `/variants` folder (e.g., `travel-tour/sections/navbar/variants/NavbarAnimated.tsx`)
2. Export the component, default data, preview image, and metadata
3. Add it to the section's `index.tsx` file to make it available in the UI

## Template Component Structure

Each template variant should follow this structure:

```tsx
// MyTemplateVariant.tsx
"use client";

import React from "react";
import { SectionDataType } from "@/hooks/useSectionEditor";

// Props interface
interface MyTemplateVariantProps {
  data: SectionDataType;
  className?: string;
}

// Default data when this variant is selected
export const defaultData: SectionDataType = {
  // Template-specific default properties
};

// Preview image shown in the templates panel
export const previewImage = "/templates/my-preview.jpg";

// Metadata for the template selection UI
export const metadata = {
  name: "My Template",
  description: "Description of this template variant",
};

// The actual component
const MyTemplateVariant: React.FC<MyTemplateVariantProps> = ({ data, className = "" }) => {
  return (
    // Component JSX
  );
};

export default MyTemplateVariant;
```

## Adding a New Theme

To add a completely new theme (e.g., E-commerce):

1. Create a new directory: `components/templates/ecommerce/`
2. Follow the same structure as existing themes
3. Update `TemplateFactory.tsx` to include the new theme
