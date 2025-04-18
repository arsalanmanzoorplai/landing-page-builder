import React from "react";
import { useSectionEditor } from "@/hooks/useSectionEditor";

// Import variant editors from separate files
import { OriginalVariantEditor } from "./about/variants/OriginalVariantEditor";
import { DefaultVariantEditor } from "./about/variants/DefaultVariantEditor";
import { TeamVariantEditor } from "./about/variants/TeamVariantEditor";

// Main editor component that routes to the appropriate variant editor
const AboutEditor: React.FC = () => {
  const { activeSection } = useSectionEditor();

  if (!activeSection || activeSection.type !== "about") return null;

  const data = activeSection.data;
  const variantId = data.variantId || "original";

  // Render the appropriate editor based on the variant
  switch (variantId) {
    case "team":
      return <TeamVariantEditor />;
    case "original":
      return <OriginalVariantEditor />;
    case "default":
      return <DefaultVariantEditor />;
    default:
      return <OriginalVariantEditor />;
  }
};

export default AboutEditor;
