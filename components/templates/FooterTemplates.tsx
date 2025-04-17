import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";

const FooterTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "footer") return null;

  const handleSelectTemplate = (template: string) => {
    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data: { title: `${template} Footer` },
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
            src='/templates/footer-default.jpg'
            alt='Default Footer'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Default Footer</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Standard footer with links and info
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Simple")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/footer-simple.jpg'
            alt='Simple Footer'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Simple Footer</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Minimal footer with basic info
        </p>
      </div>
    </div>
  );
};

export default FooterTemplates;
