import React from "react";
import {
  useSectionEditor,
  FeaturedToursData,
  TourData,
} from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, Upload } from "lucide-react";

const FeaturedToursEditor: React.FC = () => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  if (!activeSection || activeSection.type !== "featuredTours") return null;

  const featuredToursData = activeSection.data as FeaturedToursData;

  // Handle tour image upload
  const handleTourImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    await uploadImage(file, `tours[${index}].image`);
  };

  // Handle adding a new tour
  const handleAddTour = () => {
    addArrayItem("tours", {
      image: "/images/placeholder-tour.jpg",
      title: "New Tour Package",
      description: "Description of the tour package",
      price: "299",
      duration: "3 days",
      url: "#",
    });
  };

  // Handle removing a tour
  const handleRemoveTour = (index: number) => {
    removeArrayItem("tours", index);
  };

  // Handle updating a tour
  const handleUpdateTour = (
    index: number,
    field: keyof TourData,
    value: string
  ) => {
    updateArrayItem("tours", index, { [field]: value });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Featured Tours Content</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={featuredToursData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<FeaturedToursData>({ title: e.target.value })
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subtitle'>Subtitle</Label>
            <Input
              id='subtitle'
              value={featuredToursData.subtitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<FeaturedToursData>({
                  subtitle: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Tour Packages</h3>
          <Button type='button' size='sm' onClick={handleAddTour}>
            <Plus className='w-4 h-4 mr-1' />
            Add Tour
          </Button>
        </div>
        <div className='mt-3 space-y-6'>
          {featuredToursData.tours.map((tour, index) => (
            <div key={index} className='border rounded-md p-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium'>Tour {index + 1}</h4>
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  onClick={() => handleRemoveTour(index)}
                >
                  <Trash className='w-4 h-4 mr-1' />
                  Remove
                </Button>
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`tour-${index}-image`}>Tour Image</Label>
                <div className='flex items-center gap-4'>
                  <div className='h-24 w-32 overflow-hidden bg-gray-100 rounded'>
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='relative'>
                    <Input
                      id={`tour-${index}-image`}
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleTourImageUpload(e, index)}
                      className='absolute inset-0 opacity-0 cursor-pointer'
                    />
                    <Button type='button' variant='outline' size='sm'>
                      <Upload className='w-4 h-4 mr-2' />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`tour-${index}-title`}>Title</Label>
                <Input
                  id={`tour-${index}-title`}
                  value={tour.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateTour(index, "title", e.target.value)
                  }
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor={`tour-${index}-duration`}>Duration</Label>
                  <Input
                    id={`tour-${index}-duration`}
                    value={tour.duration}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateTour(index, "duration", e.target.value)
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor={`tour-${index}-price`}>Price</Label>
                  <Input
                    id={`tour-${index}-price`}
                    value={tour.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateTour(index, "price", e.target.value)
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor={`tour-${index}-url`}>URL</Label>
                  <Input
                    id={`tour-${index}-url`}
                    value={tour.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateTour(index, "url", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`tour-${index}-description`}>Description</Label>
                <Textarea
                  id={`tour-${index}-description`}
                  value={tour.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleUpdateTour(index, "description", e.target.value)
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
            <Label htmlFor='backgroundColor'>Background Color</Label>
            <div className='flex gap-2'>
              <Input
                id='backgroundColor'
                type='text'
                value={featuredToursData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<FeaturedToursData>({
                    backgroundColor: e.target.value,
                  })
                }
              />
              <Input
                type='color'
                value={featuredToursData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<FeaturedToursData>({
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

export default FeaturedToursEditor;
