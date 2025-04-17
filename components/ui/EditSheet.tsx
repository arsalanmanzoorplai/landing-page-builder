"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useUIState } from "@/hooks/useUIState";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useSelector } from "react-redux";

// Import section-specific editors
import NavbarEditor from "@/components/editors/NavbarEditor";
import HeroEditor from "@/components/editors/HeroEditor";
import AboutEditor from "@/components/editors/AboutEditor";
import ServicesEditor from "@/components/editors/ServicesEditor";
import FeaturedToursEditor from "@/components/editors/FeaturedToursEditor";
import FooterEditor from "@/components/editors/FooterEditor";

// Import section-specific template components
import NavbarTemplates from "@/components/templates/NavbarTemplates";
import HeroTemplates from "@/components/templates/HeroTemplates";
import AboutTemplates from "@/components/templates/AboutTemplates";
import ServicesTemplates from "@/components/templates/ServicesTemplates";
import FeaturedToursTemplates from "@/components/templates/FeaturedToursTemplates";
import FooterTemplates from "@/components/templates/FooterTemplates";

const EditSheet: React.FC = () => {
  const {
    isEditSheetOpen,
    selectedTabIndex,
    setSelectedTabIndex,
    closeAllSheets,
  } = useUIState();

  const { activeSection } = useSectionEditor();
  const editingSectionId = useSelector(
    (state: any) => state.template.editingSectionId
  );

  useEffect(() => {
    if (isEditSheetOpen) {
      console.log("Edit sheet open. Active section:", activeSection);
      console.log("Editing section ID:", editingSectionId);
    }
  }, [isEditSheetOpen, activeSection, editingSectionId]);

  // Determine which editor component to show based on section type
  const renderEditor = () => {
    // Handle case when activeSection is null
    if (!activeSection) {
      console.log("Warning: No active section found when rendering editor");
      return (
        <p>
          No section selected for editing. Please try closing and reopening the
          editor.
        </p>
      );
    }

    console.log("Rendering editor for section type:", activeSection.type);

    switch (activeSection.type) {
      case "navbar":
        return <NavbarEditor />;
      case "hero":
        return <HeroEditor />;
      case "about":
        return <AboutEditor />;
      case "services":
        return <ServicesEditor />;
      case "featuredTours":
        return <FeaturedToursEditor />;
      case "footer":
        return <FooterEditor />;
      default:
        return (
          <p>No editor available for this section type: {activeSection.type}</p>
        );
    }
  };

  // Determine which templates to show based on section type
  const renderTemplates = () => {
    // Handle case when activeSection is null
    if (!activeSection) {
      console.log("Warning: No active section found when rendering templates");
      return (
        <p>
          No section selected for templates. Please try closing and reopening
          the editor.
        </p>
      );
    }

    console.log("Rendering templates for section type:", activeSection.type);

    switch (activeSection.type) {
      case "navbar":
        return <NavbarTemplates />;
      case "hero":
        return <HeroTemplates />;
      case "about":
        return <AboutTemplates />;
      case "services":
        return <ServicesTemplates />;
      case "featuredTours":
        return <FeaturedToursTemplates />;
      case "footer":
        return <FooterTemplates />;
      default:
        return (
          <p>
            No templates available for this section type: {activeSection.type}
          </p>
        );
    }
  };

  return (
    <Sheet open={isEditSheetOpen} onOpenChange={closeAllSheets}>
      <SheetContent className='w-[400px] sm:w-[540px] overflow-y-auto'>
        <SheetHeader className='flex flex-row items-center justify-between'>
          <div>
            <SheetTitle>
              Edit{" "}
              {activeSection
                ? activeSection.type.charAt(0).toUpperCase() +
                  activeSection.type.slice(1)
                : "Section"}
            </SheetTitle>
            <SheetDescription>
              {activeSection
                ? `Make changes to your ${activeSection.type} section.`
                : "Select a section to edit."}
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant='ghost' size='icon'>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <Tabs
          defaultValue='edit'
          className='mt-6'
          value={selectedTabIndex === 0 ? "edit" : "templates"}
          onValueChange={(value) =>
            setSelectedTabIndex(value === "edit" ? 0 : 1)
          }
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='edit'>Edit</TabsTrigger>
            <TabsTrigger value='templates'>Templates</TabsTrigger>
          </TabsList>
          <TabsContent value='edit' className='mt-6 space-y-4'>
            {renderEditor()}
          </TabsContent>
          <TabsContent value='templates' className='mt-6'>
            {renderTemplates()}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
