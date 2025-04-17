import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";

const AboutTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "about") return null;

  const handleSelectTemplate = (template: string) => {
    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data: { title: `${template} About` },
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
            src='/templates/about-default.jpg'
            alt='Default About'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Default About</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Standard about section
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Team")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/about-team.jpg'
            alt='Team About'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Team About</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          About with team members
        </p>
      </div>
    </div>
  );
};

export default AboutTemplates;
