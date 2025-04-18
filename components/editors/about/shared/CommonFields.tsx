import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CommonFieldsProps {
  title: string;
  backgroundColor: string;
  onUpdateField: (field: string, value: any) => void;
}

/**
 * Common fields that appear in all About section variants
 */
export const CommonFields: React.FC<CommonFieldsProps> = ({
  title,
  backgroundColor,
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
        <Label htmlFor='backgroundColor'>Background Color</Label>
        <div className='flex gap-2'>
          <Input
            id='backgroundColor'
            type='text'
            value={backgroundColor || "#ffffff"}
            onChange={(e) => onUpdateField("backgroundColor", e.target.value)}
          />
          <Input
            type='color'
            value={backgroundColor || "#ffffff"}
            onChange={(e) => onUpdateField("backgroundColor", e.target.value)}
            className='w-12 p-1 h-10'
          />
        </div>
      </div>
    </>
  );
};

/**
 * Image upload field with preview
 */
export const ImageUploadField: React.FC<{
  image: string;
  fieldName: string;
  label?: string;
  onUpload: (file: File, fieldPath: string) => Promise<string>;
  uploadState: {
    isUploading: boolean;
    progress: number;
    error: string | null;
  };
}> = ({ image, fieldName, label = "Image", onUpload, uploadState }) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file, fieldName);
    }
  };

  return (
    <div className='space-y-2'>
      <Label htmlFor={fieldName}>{label}</Label>
      <div className='flex items-center gap-4'>
        <div className='h-20 w-32 overflow-hidden bg-gray-100 rounded'>
          {image && (
            <img
              src={image}
              alt={label}
              className='h-full w-full object-cover'
            />
          )}
        </div>
        <div>
          <Input
            id={fieldName}
            type='file'
            accept='image/*'
            onChange={handleUpload}
          />
          {uploadState.isUploading && (
            <div className='flex items-center gap-2 mt-2'>
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
    </div>
  );
};
