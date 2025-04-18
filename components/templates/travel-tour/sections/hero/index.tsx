"use client";

import HeroDefault, {
  defaultData as defaultHeroData,
  previewImage as defaultPreviewImage,
  metadata as defaultMetadata,
} from "./variants/HeroDefault";

import HeroVideo, {
  defaultData as videoHeroData,
  previewImage as videoPreviewImage,
  metadata as videoMetadata,
} from "./variants/HeroVideo";

import HeroOriginal, {
  defaultData as originalHeroData,
  previewImage as originalPreviewImage,
  metadata as originalMetadata,
} from "./variants/HeroOriginal";

// Export all available variants with their metadata
export const heroVariants = [
  {
    id: "original",
    component: HeroOriginal,
    defaultData: originalHeroData,
    previewImage: originalPreviewImage,
    name: originalMetadata.name,
    description: originalMetadata.description,
  },
  {
    id: "default",
    component: HeroDefault,
    defaultData: defaultHeroData,
    previewImage: defaultPreviewImage,
    name: defaultMetadata.name,
    description: defaultMetadata.description,
  },
  {
    id: "video",
    component: HeroVideo,
    defaultData: videoHeroData,
    previewImage: videoPreviewImage,
    name: videoMetadata.name,
    description: videoMetadata.description,
  },
];

// Export all components directly
export { HeroDefault, HeroVideo, HeroOriginal };
