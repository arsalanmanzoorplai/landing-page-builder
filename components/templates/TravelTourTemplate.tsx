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
import { useEffect, useState } from "react";
import { setPreviewMode } from "@/redux/features/uiSlice";
import {
  NavbarData,
  HeroData,
  AboutData,
  ServicesData,
  FeaturedToursData,
  FooterData,
} from "@/hooks/useSectionEditor";
import { aboutVariants } from "./travel-tour/sections/about";
import { heroVariants } from "./travel-tour/sections/hero";

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
  const [isLoaded, setIsLoaded] = useState(false);

  // Update previewMode in Redux when prop changes
  useEffect(() => {
    dispatch(setPreviewMode(previewMode));
  }, [previewMode, dispatch]);

  // Add a loading state to prevent flashing of components
  useEffect(() => {
    if (sections && sections.length > 0) {
      setIsLoaded(true);
    }
  }, [sections]);

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const renderSection = (section: Section, isLastSection: boolean = false) => {
    try {
      let content;

      // Get the variant ID from the section data, defaulting to "original" if not set
      const variantId = section.data.variantId || "original";

      switch (section.type) {
        case "navbar":
          content = <Navbar data={section.data as NavbarData} />;
          break;
        case "hero": {
          // Find the variant component
          const variant = heroVariants.find(
            (v: { id: string }) => v.id === variantId
          );
          // Use the variant component if found, otherwise fall back to original
          const HeroComponent = variant
            ? variant.component
            : heroVariants.find((v: { id: string }) => v.id === "original")
                ?.component || Hero;
          content = <HeroComponent data={section.data as HeroData} />;
          break;
        }
        case "about": {
          // Find the variant component
          const variant = aboutVariants.find(
            (v: { id: string }) => v.id === variantId
          );
          // Use the variant component if found, otherwise fall back to original
          const AboutComponent = variant
            ? variant.component
            : aboutVariants.find((v: { id: string }) => v.id === "original")
                ?.component || About;
          content = <AboutComponent data={section.data as AboutData} />;
          break;
        }
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

  // Show a loading state if the sections haven't loaded yet
  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-pulse text-center'>
          <div className='h-8 w-32 bg-gray-200 rounded mb-4 mx-auto'></div>
          <div className='h-4 w-48 bg-gray-200 rounded mx-auto'></div>
        </div>
      </div>
    );
  }

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
