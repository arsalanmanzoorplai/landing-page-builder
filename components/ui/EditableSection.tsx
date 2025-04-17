"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  useEditableSections,
  Section,
  SectionType,
} from "@/hooks/useEditableSections";
import { useUIState } from "@/hooks/useUIState";
import { Button } from "@/components/ui/button";
import { ReduxState } from "@/redux/store/Store";

interface EditableSectionProps {
  section: Section;
  children: React.ReactNode;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  section,
  children,
}) => {
  const dispatch = useDispatch();
  const { previewMode } = useSelector((state: ReduxState) => state.ui);
  const { handleEditSection, handleDeleteSection, handleAddSection } =
    useEditableSections();

  // Skip edit controls in preview mode
  if (previewMode) {
    return <>{children}</>;
  }

  // Check if this is the footer section to handle its positioning differently
  const isFooter = section.type === "footer";

  return (
    <div
      className='relative group'
      data-section-id={section.id}
      data-section-type={section.type}
    >
      {/* Edit and Delete buttons - now always visible */}
      <div className='absolute top-2 right-2 flex space-x-2 z-40'>
        <Button
          variant='secondary'
          size='sm'
          onClick={() => handleEditSection(section.id)}
          className='bg-white/80 hover:bg-white shadow-sm'
        >
          <Pencil size={16} className='mr-1' />
          Edit
        </Button>
        <Button
          variant='destructive'
          size='sm'
          onClick={() => handleDeleteSection(section.id)}
          className='bg-white/80 hover:bg-red-500 text-red-500 hover:text-white shadow-sm'
        >
          <Trash2 size={16} className='mr-1' />
          Delete
        </Button>
      </div>

      {children}

      {/* Add Section button - visible on hover with CSS but positioned to not add space */}
      <div
        className='absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'
        style={{ marginBottom: 0 }}
      >
        <Button
          variant='outline'
          size='icon'
          onClick={() => handleAddSection("hero", section.id)}
          className='bg-white/90 hover:bg-white shadow-sm rounded-full h-10 w-10 flex items-center justify-center transition-all duration-200 hover:scale-110'
        >
          <Plus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default EditableSection;
