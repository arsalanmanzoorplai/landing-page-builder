import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";

const HeroTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "hero") return null;

  const handleSelectTemplate = (template: string) => {
    // For demonstration, we'll just update the section title based on template
    // In a real app, you'd update more properties or swap the entire data
    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data: { title: `${template} Hero` },
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
            src='/templates/hero-default.jpg'
            alt='Default Hero'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Default Hero</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Fullscreen background with centered text
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Split")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/hero-split.jpg'
            alt='Split Hero'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Split Hero</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Text on one side, image on the other
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Video")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/hero-video.jpg'
            alt='Video Hero'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Video Hero</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Background video with overlay text
        </p>
      </div>
    </div>
  );
};

export default HeroTemplates;
