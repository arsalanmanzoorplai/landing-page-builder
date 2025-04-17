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

  // Helper function to convert a possible object to string
  const getTextContent = (content: any): string => {
    if (typeof content === "string") {
      return content;
    }

    // If it's an object, try to extract text
    if (content && typeof content === "object") {
      // Check for special case: string-like object with numeric keys
      if (isStringObject(content)) {
        // Convert object with numeric keys back to a string
        const keys = Object.keys(content).sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        return keys.map((key) => content[key]).join("");
      }

      // Check for common content field names
      if (content.text) return content.text;
      if (content.content) return content.content;
      if (content.description) return content.description;
      if (content.value) return content.value;

      // Last resort: stringify it
      try {
        return JSON.stringify(content);
      } catch (e) {
        return "[Object]";
      }
    }

    return String(content);
  };

  // Helper function to check if an object is a string-like object with numeric keys
  const isStringObject = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return false;

    // Check if the object has numeric keys starting from 0
    const keys = Object.keys(obj);
    if (keys.length === 0) return false;

    // Check if all keys are sequential numbers
    for (let i = 0; i < keys.length; i++) {
      if (!obj.hasOwnProperty(i.toString())) {
        return false;
      }
      // Check if values are single characters
      if (
        typeof obj[i.toString()] !== "string" ||
        obj[i.toString()].length !== 1
      ) {
        return false;
      }
    }

    return true;
  };

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
    // Check if current paragraph is an object with specific structure
    const currentParagraph = aboutData.paragraphs[index];

    if (typeof currentParagraph === "object" && currentParagraph !== null) {
      // If it has a text property, update that
      if ("text" in currentParagraph) {
        updateArrayItem("paragraphs", index, {
          ...(currentParagraph as Record<string, unknown>),
          text: value,
        });
        return;
      }
      // If it has a content property, update that
      else if ("content" in currentParagraph) {
        updateArrayItem("paragraphs", index, {
          ...(currentParagraph as Record<string, unknown>),
          content: value,
        });
        return;
      }
    }

    // Default case: update as string
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
              value={getTextContent(aboutData.title)}
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
                value={getTextContent(paragraph)}
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
