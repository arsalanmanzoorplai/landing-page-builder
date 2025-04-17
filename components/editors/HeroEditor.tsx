import React from "react";
import { useSectionEditor, HeroData } from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
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
              value={heroData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<HeroData>({ title: e.target.value })
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subtitle'>Subtitle</Label>
            <Input
              id='subtitle'
              value={heroData.subtitle}
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
                value={button.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUpdateCtaButton(index, "text", e.target.value)
                }
                className='flex-1'
              />
              <Input
                placeholder='URL'
                value={button.url}
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
