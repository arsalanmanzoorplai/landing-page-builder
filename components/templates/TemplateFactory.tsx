"use client";

import { ReactNode } from "react";
import TravelTourTemplate from "@/components/templates/TravelTourTemplate";
// Import additional template types here
// import EcommerceTemplate from "@/components/templates/EcommerceTemplate";
// import PortfolioTemplate from "@/components/templates/PortfolioTemplate";

interface TemplateFactoryProps {
  templateType: string;
  previewMode?: boolean;
}

export default function TemplateFactory({
  templateType,
  previewMode = true,
}: TemplateFactoryProps): ReactNode {
  // Switch based on template type
  switch (templateType) {
    case "travel-tour":
      return <TravelTourTemplate previewMode={previewMode} />;

    // Add cases for additional template types
    // case "ecommerce":
    //   return <EcommerceTemplate previewMode={previewMode} />;
    // case "portfolio":
    //   return <PortfolioTemplate previewMode={previewMode} />;

    // Default to travel-tour template for backward compatibility
    default:
      return <TravelTourTemplate previewMode={previewMode} />;
  }
}
