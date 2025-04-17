import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";

const ServicesTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "services") return null;

  const handleSelectTemplate = (template: string) => {
    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data: { title: `${template} Services` },
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
            src='/templates/services-default.jpg'
            alt='Default Services'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Default Services</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Standard services listing
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Grid")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/services-grid.jpg'
            alt='Grid Services'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Grid Services</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Services in a grid layout
        </p>
      </div>
    </div>
  );
};

export default ServicesTemplates;
