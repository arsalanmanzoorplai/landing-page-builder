import React from "react";
import { OriginalVariantEditor } from "./OriginalVariantEditor";

/**
 * Default variant editor - currently uses the original variant editor
 * Can be customized with unique fields for this specific variant
 */
export const DefaultVariantEditor: React.FC = () => {
  return <OriginalVariantEditor />;
};
