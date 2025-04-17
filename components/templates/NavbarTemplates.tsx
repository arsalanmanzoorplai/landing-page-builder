import React from "react";
import { useDispatch } from "react-redux";
import { useSectionEditor } from "@/hooks/useSectionEditor";
import { useUIState } from "@/hooks/useUIState";

const NavbarTemplates: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSectionEditor();
  const { closeAllSheets } = useUIState();

  if (!activeSection || activeSection.type !== "navbar") return null;

  const handleSelectTemplate = (template: string) => {
    // For demonstration, we'll just update the section title based on template
    // In a real app, you'd update more properties or swap the entire data
    dispatch({
      type: "template/updateSectionData",
      payload: {
        sectionId: activeSection.id,
        data: { title: `${template} Navbar` },
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
            src='/templates/navbar-default.jpg'
            alt='Default Navbar'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Default Navbar</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Standard horizontal navbar
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Centered")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/navbar-centered.jpg'
            alt='Centered Navbar'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Centered Navbar</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Logo centered with links on sides
        </p>
      </div>

      <div
        className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50'
        onClick={() => handleSelectTemplate("Transparent")}
      >
        <div className='h-32 bg-gray-100 rounded mb-3 flex items-center justify-center overflow-hidden'>
          <img
            src='/templates/navbar-transparent.jpg'
            alt='Transparent Navbar'
            className='w-full object-cover'
          />
        </div>
        <h3 className='font-medium text-center'>Transparent Navbar</h3>
        <p className='text-sm text-gray-500 text-center mt-1'>
          Transparent background with light text
        </p>
      </div>
    </div>
  );
};

export default NavbarTemplates;
