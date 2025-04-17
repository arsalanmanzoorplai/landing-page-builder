"use client";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "@/redux/store/Store";
import Navbar from "@/components/templates/travel-tour/Navbar";
import Hero from "@/components/templates/travel-tour/Hero";
import About from "@/components/templates/travel-tour/About";
import Services from "@/components/templates/travel-tour/Services";
import FeaturedTours from "@/components/templates/travel-tour/FeaturedTours";
import Footer from "@/components/templates/travel-tour/Footer";
import EditableSection from "@/components/ui/EditableSection";
import EditSheet from "@/components/ui/EditSheet";
import AddSectionSheet from "@/components/ui/AddSectionSheet";
import { useEffect } from "react";
import { setPreviewMode } from "@/redux/features/uiSlice";
import {
  NavbarData,
  HeroData,
  AboutData,
  ServicesData,
  FeaturedToursData,
  FooterData,
} from "@/hooks/useSectionEditor";

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
  const dispatch = useDispatch();
  const { sections } = useSelector((state: ReduxState) => state.template);

  // Update previewMode in Redux when prop changes
  useEffect(() => {
    dispatch(setPreviewMode(previewMode));
  }, [previewMode, dispatch]);

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const renderSection = (section: Section, isLastSection: boolean = false) => {
    try {
      let content;
      switch (section.type) {
        case "navbar":
          content = <Navbar data={section.data as NavbarData} />;
          break;
        case "hero":
          content = <Hero data={section.data as HeroData} />;
          break;
        case "about":
          content = <About data={section.data as AboutData} />;
          break;
        case "services":
          content = <Services data={section.data as ServicesData} />;
          break;
        case "featuredTours":
          content = <FeaturedTours data={section.data as FeaturedToursData} />;
          break;
        case "footer":
          content = <Footer data={section.data as FooterData} />;
          break;
        default:
          content = null;
      }

      // Apply edit mode class when not in preview mode and it's the last section
      if (!previewMode && isLastSection) {
        return <div className='section-edit-mode'>{content}</div>;
      }

      return content;
    } catch (error) {
      console.error(`Error rendering section ${section.type}:`, error);
      return <div>Error rendering {section.type} section</div>;
    }
  };

  // Check if the last section should have special styling
  const lastSectionIndex = sortedSections.length - 1;

  return (
    <div className={`relative ${!previewMode ? "pb-0 mb-0" : ""}`}>
      {sortedSections.map((section, index) => {
        const isLastSection = index === lastSectionIndex;

        return !previewMode ? (
          <EditableSection key={section.id} section={section}>
            {renderSection(section, isLastSection)}
          </EditableSection>
        ) : (
          <div key={section.id}>{renderSection(section)}</div>
        );
      })}

      {/* Include Edit and Add Section sheets */}
      <EditSheet />
      <AddSectionSheet />
    </div>
  );
}
