"use client";

import AboutDefault, {
  defaultData as defaultAboutData,
  previewImage as defaultPreviewImage,
  metadata as defaultMetadata,
} from "./variants/AboutDefault";

import AboutTeam, {
  defaultData as teamAboutData,
  previewImage as teamPreviewImage,
  metadata as teamMetadata,
} from "./variants/AboutTeam";

import AboutOriginal, {
  defaultData as originalAboutData,
  previewImage as originalPreviewImage,
  metadata as originalMetadata,
} from "./variants/AboutOriginal";

// Export all available variants with their metadata
export const aboutVariants = [
  {
    id: "original",
    component: AboutOriginal,
    defaultData: originalAboutData,
    previewImage: originalPreviewImage,
    name: originalMetadata.name,
    description: originalMetadata.description,
  },
  {
    id: "default",
    component: AboutDefault,
    defaultData: defaultAboutData,
    previewImage: defaultPreviewImage,
    name: defaultMetadata.name,
    description: defaultMetadata.description,
  },
  {
    id: "team",
    component: AboutTeam,
    defaultData: teamAboutData,
    previewImage: teamPreviewImage,
    name: teamMetadata.name,
    description: teamMetadata.description,
  },
];

// Export all components directly
export { AboutDefault, AboutTeam, AboutOriginal };
