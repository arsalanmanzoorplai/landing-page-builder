import React from "react";
import { useSectionEditor } from "@/hooks/useSectionEditor";

// Import variant editors from separate files
import { OriginalVariantEditor } from "./hero/variants/OriginalVariantEditor";
import { DefaultVariantEditor } from "./hero/variants/DefaultVariantEditor";
import { VideoVariantEditor } from "./hero/variants/VideoVariantEditor";

// Main editor component that routes to the appropriate variant editor
const HeroEditor: React.FC = () => {
  const { activeSection } = useSectionEditor();

  if (!activeSection || activeSection.type !== "hero") return null;

  const data = activeSection.data;
  const variantId = data.variantId || "original";

  // Render the appropriate editor based on the variant
  switch (variantId) {
    case "video":
      return <VideoVariantEditor />;
    case "original":
      return <OriginalVariantEditor />;
    case "default":
      return <DefaultVariantEditor />;
    default:
      return <OriginalVariantEditor />;
  }
};

export default HeroEditor;
