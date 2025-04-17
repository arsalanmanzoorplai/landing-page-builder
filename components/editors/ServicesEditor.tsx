import React from "react";
import {
  useSectionEditor,
  ServicesData,
  ServiceData,
} from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, Upload } from "lucide-react";

const ServicesEditor: React.FC = () => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  if (!activeSection || activeSection.type !== "services") return null;

  const servicesData = activeSection.data as ServicesData;

  // Handle background image upload
  const handleBackgroundImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    await uploadImage(file, "backgroundImage");
  };

  // Handle adding a new service
  const handleAddService = () => {
    addArrayItem("services", {
      icon: "map",
      title: "New Service",
      description: "Description of the service",
    });
  };

  // Handle removing a service
  const handleRemoveService = (index: number) => {
    removeArrayItem("services", index);
  };

  // Handle updating a service
  const handleUpdateService = (
    index: number,
    field: keyof ServiceData,
    value: string
  ) => {
    updateArrayItem("services", index, { [field]: value });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Services Content</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={servicesData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<ServicesData>({ title: e.target.value })
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subtitle'>Subtitle</Label>
            <Input
              id='subtitle'
              value={servicesData.subtitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<ServicesData>({ subtitle: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Service Items</h3>
          <Button type='button' size='sm' onClick={handleAddService}>
            <Plus className='w-4 h-4 mr-1' />
            Add Service
          </Button>
        </div>
        <div className='mt-3 space-y-6'>
          {servicesData.services.map((service, index) => (
            <div key={index} className='border rounded-md p-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium'>Service {index + 1}</h4>
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  onClick={() => handleRemoveService(index)}
                >
                  <Trash className='w-4 h-4 mr-1' />
                  Remove
                </Button>
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`service-${index}-icon`}>Icon</Label>
                <Input
                  id={`service-${index}-icon`}
                  value={service.icon}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateService(index, "icon", e.target.value)
                  }
                  placeholder='Icon name (e.g., map, car, hotel)'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`service-${index}-title`}>Title</Label>
                <Input
                  id={`service-${index}-title`}
                  value={service.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateService(index, "title", e.target.value)
                  }
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`service-${index}-description`}>
                  Description
                </Label>
                <Textarea
                  id={`service-${index}-description`}
                  value={service.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleUpdateService(index, "description", e.target.value)
                  }
                  className='min-h-[80px]'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium'>Background & Appearance</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='backgroundImage'>Background Image</Label>
            <div className='flex items-center gap-4'>
              <div className='h-20 w-32 overflow-hidden bg-gray-100 rounded'>
                <img
                  src={servicesData.backgroundImage}
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
            <Label htmlFor='backgroundColor'>Background Color</Label>
            <div className='flex gap-2'>
              <Input
                id='backgroundColor'
                type='text'
                value={servicesData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<ServicesData>({
                    backgroundColor: e.target.value,
                  })
                }
              />
              <Input
                type='color'
                value={servicesData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<ServicesData>({
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

export default ServicesEditor;
