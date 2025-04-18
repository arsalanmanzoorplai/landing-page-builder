"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";
import { aboutVariants } from "./travel-tour/sections/about";

const AboutTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "about") return null;

  const handleSelectTemplate = (variantId: string) => {
    // Find the selected variant
    const selectedVariant = aboutVariants.find(
      (variant) => variant.id === variantId
    );

    if (selectedVariant) {
      // Apply the variant's default data to the section
      dispatch({
        type: "template/updateSectionData",
        payload: {
          sectionId: activeSection.id,
          data: {
            ...selectedVariant.defaultData,
            // Add the variant ID to identify which template was selected
            variantId: variantId,
          },
        },
      });

      // Close the edit sheet
      closeAllSheets();
    }
  };

  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>Choose a layout style</h3>
      <p className='text-sm text-gray-500 mb-6'>
        Selecting a new layout will replace your current section content
      </p>

      <div className='grid grid-cols-2 gap-4'>
        {aboutVariants.map((variant) => (
          <div
            key={variant.id}
            className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors'
            onClick={() => handleSelectTemplate(variant.id)}
          >
            <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
              <img
                src={variant.previewImage}
                alt={variant.name}
                className='w-full h-full object-cover'
              />
            </div>
            <h3 className='font-medium text-center'>{variant.name}</h3>
            <p className='text-sm text-gray-500 text-center mt-1'>
              {variant.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTemplates;
