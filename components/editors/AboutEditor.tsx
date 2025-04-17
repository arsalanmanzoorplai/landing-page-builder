import React from "react";
import { useSectionEditor, AboutData } from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, Upload } from "lucide-react";

const AboutEditor: React.FC = () => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  if (!activeSection || activeSection.type !== "about") return null;

  const aboutData = activeSection.data as AboutData;

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    await uploadImage(file, "image");
  };

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
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={aboutData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<AboutData>({ title: e.target.value })
              }
            />
          </div>
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
          {aboutData.paragraphs.map((paragraph, index) => (
            <div key={index} className='flex items-start gap-2'>
              <Textarea
                value={paragraph}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleUpdateParagraph(index, e.target.value)
                }
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
        <h3 className='text-lg font-medium'>Image & Appearance</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='image'>Image</Label>
            <div className='flex items-center gap-4'>
              <div className='h-20 w-32 overflow-hidden bg-gray-100 rounded'>
                <img
                  src={aboutData.image}
                  alt='About'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='relative'>
                <Input
                  id='image'
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
                <Button type='button' variant='outline' size='sm'>
                  <Upload className='w-4 h-4 mr-2' />
                  Upload Image
                </Button>
              </div>
              {imageUploadState.isUploading && (
                <div className='flex items-center gap-2'>
                  <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-500 rounded-full'
                      style={{ width: `${imageUploadState.progress}%` }}
                    />
                  </div>
                  <span className='text-sm'>{imageUploadState.progress}%</span>
                </div>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='backgroundColor'>Background Color</Label>
            <div className='flex gap-2'>
              <Input
                id='backgroundColor'
                type='text'
                value={aboutData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<AboutData>({
                    backgroundColor: e.target.value,
                  })
                }
              />
              <Input
                type='color'
                value={aboutData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<AboutData>({
                    backgroundColor: e.target.value,
                  })
                }
                className='w-12 p-1 h-10'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
