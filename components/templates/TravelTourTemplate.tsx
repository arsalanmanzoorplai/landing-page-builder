"use client";

import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store/Store";
import Navbar from "@/components/templates/travel-tour/Navbar";
import Hero from "@/components/templates/travel-tour/Hero";
import About from "@/components/templates/travel-tour/About";
import Services from "@/components/templates/travel-tour/Services";
import FeaturedTours from "@/components/templates/travel-tour/FeaturedTours";
import Footer from "@/components/templates/travel-tour/Footer";
import EditableSection from "@/components/ui/EditableSection";

interface SectionData {
  [key: string]: any;
}

interface Section {
  id: string;
  type: string;
  order: number;
  data: SectionData;
}

interface TravelTourTemplateProps {
  previewMode?: boolean;
}

export default function TravelTourTemplate({
  previewMode = true,
}: TravelTourTemplateProps) {
  const { sections } = useSelector((state: ReduxState) => state.template);

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "navbar":
        return <Navbar data={section.data as any} />;
      case "hero":
        return <Hero data={section.data as any} />;
      case "about":
        return <About data={section.data as any} />;
      case "services":
        return <Services data={section.data as any} />;
      case "featuredTours":
        return <FeaturedTours data={section.data as any} />;
      case "footer":
        return <Footer data={section.data as any} />;
      default:
        return null;
    }
  };

  return (
    <div className='relative'>
      {sortedSections.map((section) =>
        previewMode ? (
          <EditableSection key={section.id} section={section}>
            {renderSection(section)}
          </EditableSection>
        ) : (
          <div key={section.id}>{renderSection(section)}</div>
        )
      )}
    </div>
  );
}
