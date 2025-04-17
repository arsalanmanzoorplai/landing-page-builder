"use client";

import { useSelector } from "react-redux";
import EditableSection from "@/components/ui/EditableSection";
import EditSheet from "@/components/ui/EditSheet";
import AddSectionSheet from "@/components/ui/AddSectionSheet";

// Import the original components
import Navbar from "@/components/templates/travel-tour/Navbar";
import Hero from "@/components/templates/travel-tour/Hero";
import About from "@/components/templates/travel-tour/About";
import Services from "@/components/templates/travel-tour/Services";
import FeaturedTours from "@/components/templates/travel-tour/FeaturedTours";
import Footer from "@/components/templates/travel-tour/Footer";
import { ReduxState } from "@/redux/store/Store";

const TravelTour = () => {
  const { sections } = useSelector((state: ReduxState) => state.template);

  // Map the sections by type to their components
  const renderSection = (section: any) => {
    switch (section.type) {
      case "navbar":
        return (
          <EditableSection key={section.id} section={section}>
            <Navbar data={section.data} />
          </EditableSection>
        );
      case "hero":
        return (
          <EditableSection key={section.id} section={section}>
            <Hero data={section.data} />
          </EditableSection>
        );
      case "about":
        return (
          <EditableSection key={section.id} section={section}>
            <About data={section.data} />
          </EditableSection>
        );
      case "services":
        return (
          <EditableSection key={section.id} section={section}>
            <Services data={section.data} />
          </EditableSection>
        );
      case "featuredTours":
        return (
          <EditableSection key={section.id} section={section}>
            <FeaturedTours data={section.data} />
          </EditableSection>
        );
      case "footer":
        return (
          <EditableSection key={section.id} section={section}>
            <Footer data={section.data} />
          </EditableSection>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Sort sections by order and render them */}
      {[...sections].sort((a, b) => a.order - b.order).map(renderSection)}

      {/* Edit and Add Section sheets */}
      <EditSheet />
      <AddSectionSheet />
    </>
  );
};

export default TravelTour;
