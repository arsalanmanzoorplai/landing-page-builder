import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";

const FeaturedToursTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "featuredTours") return null;

  const handleSelectTemplate = (template: string) => {
    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data: { title: `${template} Tours` },
      },
    });

    closeAllSheets();
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Default")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/tours-default.jpg'
            alt='Default Tours'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Default Tours</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Standard tours listing
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Carousel")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/tours-carousel.jpg'
            alt='Carousel Tours'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Carousel Tours</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Tours in a carousel format
        </p>
      </div>
    </div>
  );
};

export default FeaturedToursTemplates;
