import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import { useAboutEditor } from "../shared/useAboutEditor";
import { CommonFields, ImageUploadField } from "../shared/CommonFields";

export const OriginalVariantEditor: React.FC = () => {
  const {
    activeSection,
    updateField,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useAboutEditor();

  if (!activeSection) return null;
  const data = activeSection.data;

  // Handle adding a new paragraph
  const handleAddParagraph = () => {
    addArrayItem("paragraphs", "New paragraph text");
  };

  // Handle removing a paragraph
  const handleRemoveParagraph = (index: number) => {
    removeArrayItem("paragraphs", index);
  };

  // Handle updating a paragraph
  const handleUpdateParagraph = (index: number, value: string) => {
    updateArrayItem("paragraphs", index, value);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>About Content</h3>
        <div className='mt-3 space-y-4'>
          <CommonFields
            title={data.title}
            backgroundColor={data.backgroundColor}
            onUpdateField={updateField}
          />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Paragraphs</h3>
          <Button type='button' size='sm' onClick={handleAddParagraph}>
            <Plus className='w-4 h-4 mr-1' />
            Add Paragraph
          </Button>
        </div>
        <div className='mt-3 space-y-3'>
          {Array.isArray(data.paragraphs) &&
            data.paragraphs.map((paragraph: any, index: number) => (
              <div key={index} className='flex items-start gap-2'>
                <Textarea
                  value={typeof paragraph === "string" ? paragraph : ""}
                  onChange={(e) => handleUpdateParagraph(index, e.target.value)}
                  className='flex-1 min-h-[80px]'
                />
                <Button
                  type='button'
                  variant='destructive'
                  size='icon'
                  onClick={() => handleRemoveParagraph(index)}
                >
                  <Trash className='w-4 h-4' />
                </Button>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium'>Image</h3>
        <div className='mt-3'>
          <ImageUploadField
            image={data.image}
            fieldName='image'
            onUpload={uploadImage}
            uploadState={imageUploadState}
          />
        </div>
      </div>
    </div>
  );
};
