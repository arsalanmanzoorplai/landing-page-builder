import React from "react";
import { useSectionEditor, HeroData } from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, Upload } from "lucide-react";

const HeroEditor: React.FC = () => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  if (!activeSection || activeSection.type !== "hero") return null;

  const heroData = activeSection.data as HeroData;

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

  // Handle background image upload
  const handleBackgroundImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    await uploadImage(file, "backgroundImage");
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
    const currentParagraph = heroData.paragraphs[index];

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

  // Handle adding a new CTA button
  const handleAddCtaButton = () => {
    addArrayItem("ctaButtons", {
      text: "New Button",
      url: "#",
      variant: "default",
    });
  };

  // Handle removing a CTA button
  const handleRemoveCtaButton = (index: number) => {
    removeArrayItem("ctaButtons", index);
  };

  // Handle updating a CTA button
  const handleUpdateCtaButton = (
    index: number,
    field: "text" | "url" | "variant",
    value: string
  ) => {
    updateArrayItem("ctaButtons", index, { [field]: value });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Hero Content</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={getTextContent(heroData.title)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<HeroData>({ title: e.target.value })
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subtitle'>Subtitle</Label>
            <Input
              id='subtitle'
              value={getTextContent(heroData.subtitle)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<HeroData>({ subtitle: e.target.value })
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
          {heroData.paragraphs.map((paragraph, index) => (
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
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Call to Action Buttons</h3>
          <Button type='button' size='sm' onClick={handleAddCtaButton}>
            <Plus className='w-4 h-4 mr-1' />
            Add Button
          </Button>
        </div>
        <div className='mt-3 space-y-3'>
          {heroData.ctaButtons.map((button, index) => (
            <div key={index} className='flex items-center gap-2'>
              <Input
                placeholder='Text'
                value={getTextContent(button.text)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUpdateCtaButton(index, "text", e.target.value)
                }
                className='flex-1'
              />
              <Input
                placeholder='URL'
                value={typeof button.url === "string" ? button.url : "#"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUpdateCtaButton(index, "url", e.target.value)
                }
                className='flex-1'
              />
              <select
                value={button.variant}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleUpdateCtaButton(index, "variant", e.target.value)
                }
                className='border border-gray-300 rounded-md p-2'
              >
                <option value='default'>Default</option>
                <option value='outline'>Outline</option>
              </select>
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => handleRemoveCtaButton(index)}
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium'>Background Settings</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='backgroundImage'>Background Image</Label>
            <div className='flex items-center gap-4'>
              <div className='h-20 w-32 overflow-hidden bg-gray-100 rounded'>
                <img
                  src={heroData.backgroundImage}
                  alt='Background'
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='relative'>
                <Input
                  id='backgroundImage'
                  type='file'
                  accept='image/*'
                  onChange={handleBackgroundImageUpload}
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
            <div className='flex justify-between'>
              <Label htmlFor='backgroundOpacity'>Background Opacity</Label>
              <span className='text-sm'>
                {(heroData.backgroundOpacity * 100).toFixed(0)}%
              </span>
            </div>
            <div className='px-2'>
              <input
                type='range'
                min='0'
                max='1'
                step='0.05'
                value={heroData.backgroundOpacity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<HeroData>({
                    backgroundOpacity: parseFloat(e.target.value),
                  })
                }
                className='w-full'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
