"use client";

import React from "react";
import { useDispatch } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUIState } from "@/hooks/useUIState";
import { SectionType } from "@/hooks/useEditableSections";

interface SectionTemplateProps {
  type: SectionType;
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

const SectionTemplate: React.FC<SectionTemplateProps> = ({
  type,
  name,
  description,
  image,
  onClick,
}) => {
  return (
    <div
      className='flex flex-col items-center p-4 border rounded-lg hover:bg-slate-50 cursor-pointer'
      onClick={onClick}
    >
      <div className='w-full h-32 bg-slate-100 rounded mb-3 overflow-hidden'>
        <img src={image} alt={name} className='w-full h-full object-cover' />
      </div>
      <h3 className='font-medium'>{name}</h3>
      <p className='text-sm text-slate-500 text-center mt-1'>{description}</p>
    </div>
  );
};

const AddSectionSheet: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isAddSectionSheetOpen,
    afterSectionId,
    closeAllSheets,
    activeComponentsList,
  } = useUIState();

  const handleAddSection = (type: SectionType) => {
    if (!afterSectionId) return;

    dispatch({
      type: "template/addSection",
      payload: { type, afterSectionId },
    });

    closeAllSheets();
  };

  return (
    <Sheet open={isAddSectionSheetOpen} onOpenChange={closeAllSheets}>
      <SheetContent className='w-[400px] sm:w-[640px] overflow-y-auto'>
        <SheetHeader className='flex flex-row items-center justify-between'>
          <div>
            <SheetTitle>Add Section</SheetTitle>
            <SheetDescription>
              Choose a section type to add to your page.
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant='ghost' size='icon'>
              <X className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className='mt-6'>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='navbar'>
              <AccordionTrigger>Navbar</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <SectionTemplate
                    type='navbar'
                    name='Default Navbar'
                    description='Standard navbar with logo and links'
                    image='/templates/navbar-default.jpg'
                    onClick={() => handleAddSection("navbar")}
                  />
                  <SectionTemplate
                    type='navbar'
                    name='Centered Navbar'
                    description='Centered logo with links on either side'
                    image='/templates/navbar-centered.jpg'
                    onClick={() => handleAddSection("navbar")}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='hero'>
              <AccordionTrigger>Hero</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <SectionTemplate
                    type='hero'
                    name='Default Hero'
                    description='Full-width hero with background image'
                    image='/templates/hero-default.jpg'
                    onClick={() => handleAddSection("hero")}
                  />
                  <SectionTemplate
                    type='hero'
                    name='Split Hero'
                    description='Hero with image on one side'
                    image='/templates/hero-split.jpg'
                    onClick={() => handleAddSection("hero")}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='about'>
              <AccordionTrigger>About</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <SectionTemplate
                    type='about'
                    name='Default About'
                    description='Standard about section with image and text'
                    image='/templates/about-default.jpg'
                    onClick={() => handleAddSection("about")}
                  />
                  <SectionTemplate
                    type='about'
                    name='Team About'
                    description='About section with team members'
                    image='/templates/about-team.jpg'
                    onClick={() => handleAddSection("about")}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='services'>
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <SectionTemplate
                    type='services'
                    name='Default Services'
                    description='Standard service listings'
                    image='/templates/services-default.jpg'
                    onClick={() => handleAddSection("services")}
                  />
                  <SectionTemplate
                    type='services'
                    name='Grid Services'
                    description='Services laid out in a grid'
                    image='/templates/services-grid.jpg'
                    onClick={() => handleAddSection("services")}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='featuredTours'>
              <AccordionTrigger>Featured Tours</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <SectionTemplate
                    type='featuredTours'
                    name='Default Tours'
                    description='Standard tour listings'
                    image='/templates/tours-default.jpg'
                    onClick={() => handleAddSection("featuredTours")}
                  />
                  <SectionTemplate
                    type='featuredTours'
                    name='Carousel Tours'
                    description='Tours in a carousel format'
                    image='/templates/tours-carousel.jpg'
                    onClick={() => handleAddSection("featuredTours")}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='footer'>
              <AccordionTrigger>Footer</AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <SectionTemplate
                    type='footer'
                    name='Default Footer'
                    description='Standard footer with links and social icons'
                    image='/templates/footer-default.jpg'
                    onClick={() => handleAddSection("footer")}
                  />
                  <SectionTemplate
                    type='footer'
                    name='Simple Footer'
                    description='Minimal footer with essential links'
                    image='/templates/footer-simple.jpg'
                    onClick={() => handleAddSection("footer")}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddSectionSheet;
