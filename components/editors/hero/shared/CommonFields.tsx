import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CommonFieldsProps {
  title: string;
  subtitle: string;
  onUpdateField: (field: string, value: any) => void;
}

/**
 * Common fields that appear in all Hero section variants
 */
export const CommonFields: React.FC<CommonFieldsProps> = ({
  title,
  subtitle,
  onUpdateField,
}) => {
  return (
    <>
      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          value={title || ""}
          onChange={(e) => onUpdateField("title", e.target.value)}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='subtitle'>Subtitle</Label>
        <Input
          id='subtitle'
          value={subtitle || ""}
          onChange={(e) => onUpdateField("subtitle", e.target.value)}
        />
      </div>
    </>
  );
};

/**
 * Background image upload with opacity control
 */
export const BackgroundSettings: React.FC<{
  backgroundImage: string;
  backgroundOpacity: number;
  onUpdateField: (field: string, value: any) => void;
  onUploadImage: (file: File, fieldPath: string) => Promise<string>;
  uploadState: {
    isUploading: boolean;
    progress: number;
    error: string | null;
  };
}> = ({
  backgroundImage,
  backgroundOpacity,
  onUpdateField,
  onUploadImage,
  uploadState,
}) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadImage(file, "backgroundImage");
    }
  };

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='backgroundImage'>Background Image</Label>
        <div className='flex items-center gap-4'>
          <div className='h-20 w-32 overflow-hidden bg-gray-100 rounded'>
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt='Background'
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <Input
            id='backgroundImage'
            type='file'
            accept='image/*'
            onChange={handleUpload}
          />
          {uploadState.isUploading && (
            <div className='flex items-center gap-2'>
              <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-blue-500 rounded-full'
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
              <span className='text-sm'>{uploadState.progress}%</span>
            </div>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <div className='flex justify-between'>
          <Label htmlFor='backgroundOpacity'>Background Opacity</Label>
          <span className='text-sm'>
            {(backgroundOpacity * 100).toFixed(0)}%
          </span>
        </div>
        <div className='px-2'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.05'
            value={backgroundOpacity}
            onChange={(e) =>
              onUpdateField("backgroundOpacity", parseFloat(e.target.value))
            }
            className='w-full'
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Paragraphs editor component
 */
export const ParagraphsEditor: React.FC<{
  paragraphs: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
}> = ({ paragraphs, onAdd, onRemove, onUpdate }) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium'>Paragraphs</h3>
        <Button type='button' size='sm' onClick={onAdd}>
          <Plus className='w-4 h-4 mr-1' />
          Add Paragraph
        </Button>
      </div>
      <div className='mt-3 space-y-3'>
        {Array.isArray(paragraphs) &&
          paragraphs.map((paragraph, index) => (
            <div key={index} className='flex items-start gap-2'>
              <Textarea
                value={typeof paragraph === "string" ? paragraph : ""}
                onChange={(e) => onUpdate(index, e.target.value)}
                className='flex-1 min-h-[80px]'
              />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => onRemove(index)}
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

/**
 * CTA Buttons editor component
 */
export const CtaButtonsEditor: React.FC<{
  ctaButtons: Array<{ text: string; url: string; variant: string }>;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}> = ({ ctaButtons, onAdd, onRemove, onUpdate }) => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium'>Call to Action Buttons</h3>
        <Button type='button' size='sm' onClick={onAdd}>
          <Plus className='w-4 h-4 mr-1' />
          Add Button
        </Button>
      </div>
      <div className='mt-3 space-y-3'>
        {Array.isArray(ctaButtons) &&
          ctaButtons.map((button, index) => (
            <div key={index} className='flex items-center gap-2'>
              <Input
                placeholder='Text'
                value={button.text || ""}
                onChange={(e) => onUpdate(index, "text", e.target.value)}
                className='flex-1'
              />
              <Input
                placeholder='URL'
                value={button.url || "#"}
                onChange={(e) => onUpdate(index, "url", e.target.value)}
                className='flex-1'
              />
              <select
                value={button.variant || "default"}
                onChange={(e) => onUpdate(index, "variant", e.target.value)}
                className='border border-gray-300 rounded-md p-2'
              >
                <option value='default'>Default</option>
                <option value='outline'>Outline</option>
              </select>
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => onRemove(index)}
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};
