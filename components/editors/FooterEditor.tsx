import React from "react";
import { useSectionEditor, FooterData } from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, Upload } from "lucide-react";

const FooterEditor: React.FC = () => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  if (!activeSection || activeSection.type !== "footer") return null;

  const footerData = activeSection.data as FooterData;

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    await uploadImage(file, "logo");
  };

  // Handle adding a new link section
  const handleAddLinkSection = () => {
    addArrayItem("links", {
      title: "New Links Section",
      items: [{ text: "New Link", url: "#" }],
    });
  };

  // Handle removing a link section
  const handleRemoveLinkSection = (index: number) => {
    removeArrayItem("links", index);
  };

  // Handle adding a new link item to a section
  const handleAddLinkItem = (sectionIndex: number) => {
    const currentLinks = [...footerData.links];
    const currentSection = { ...currentLinks[sectionIndex] };

    currentSection.items = [
      ...currentSection.items,
      { text: "New Link", url: "#" },
    ];

    currentLinks[sectionIndex] = currentSection;

    updateSectionData<FooterData>({ links: currentLinks });
  };

  // Handle removing a link item from a section
  const handleRemoveLinkItem = (sectionIndex: number, itemIndex: number) => {
    const currentLinks = [...footerData.links];
    const currentSection = { ...currentLinks[sectionIndex] };

    currentSection.items = currentSection.items.filter(
      (_, i) => i !== itemIndex
    );

    currentLinks[sectionIndex] = currentSection;

    updateSectionData<FooterData>({ links: currentLinks });
  };

  // Handle updating a link section title
  const handleUpdateLinkSectionTitle = (index: number, value: string) => {
    const currentLinks = [...footerData.links];
    currentLinks[index] = {
      ...currentLinks[index],
      title: value,
    };

    updateSectionData<FooterData>({ links: currentLinks });
  };

  // Handle updating a link item
  const handleUpdateLinkItem = (
    sectionIndex: number,
    itemIndex: number,
    field: "text" | "url",
    value: string
  ) => {
    const currentLinks = [...footerData.links];
    const currentSection = { ...currentLinks[sectionIndex] };
    const currentItems = [...currentSection.items];

    currentItems[itemIndex] = {
      ...currentItems[itemIndex],
      [field]: value,
    };

    currentSection.items = currentItems;
    currentLinks[sectionIndex] = currentSection;

    updateSectionData<FooterData>({ links: currentLinks });
  };

  // Handle adding a new social link
  const handleAddSocialLink = () => {
    addArrayItem("socialLinks", {
      icon: "facebook",
      url: "https://facebook.com",
    });
  };

  // Handle removing a social link
  const handleRemoveSocialLink = (index: number) => {
    removeArrayItem("socialLinks", index);
  };

  // Handle updating a social link
  const handleUpdateSocialLink = (
    index: number,
    field: "icon" | "url",
    value: string
  ) => {
    updateArrayItem("socialLinks", index, { [field]: value });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Footer Content</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='logo'>Logo</Label>
            <div className='flex items-center gap-4'>
              <div className='h-10 w-32 overflow-hidden bg-gray-100 rounded'>
                <img
                  src={footerData.logo}
                  alt='Logo'
                  className='h-full w-full object-contain'
                />
              </div>
              <div className='relative'>
                <Input
                  id='logo'
                  type='file'
                  accept='image/*'
                  onChange={handleLogoUpload}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
                <Button type='button' variant='outline' size='sm'>
                  <Upload className='w-4 h-4 mr-2' />
                  Upload Logo
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
            <Label htmlFor='copyright'>Copyright Text</Label>
            <Input
              id='copyright'
              value={footerData.copyright}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateSectionData<FooterData>({ copyright: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Footer Link Sections</h3>
          <Button type='button' size='sm' onClick={handleAddLinkSection}>
            <Plus className='w-4 h-4 mr-1' />
            Add Section
          </Button>
        </div>
        <div className='mt-3 space-y-6'>
          {footerData.links.map((section, sectionIndex) => (
            <div key={sectionIndex} className='border rounded-md p-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='space-y-2 flex-1 mr-4'>
                  <Label htmlFor={`section-${sectionIndex}-title`}>
                    Section Title
                  </Label>
                  <Input
                    id={`section-${sectionIndex}-title`}
                    value={section.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateLinkSectionTitle(sectionIndex, e.target.value)
                    }
                  />
                </div>
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  onClick={() => handleRemoveLinkSection(sectionIndex)}
                >
                  <Trash className='w-4 h-4 mr-1' />
                  Remove
                </Button>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label>Links</Label>
                  <Button
                    type='button'
                    size='sm'
                    variant='outline'
                    onClick={() => handleAddLinkItem(sectionIndex)}
                  >
                    <Plus className='w-4 h-4 mr-1' />
                    Add Link
                  </Button>
                </div>
                <div className='space-y-2'>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='flex items-center gap-2'>
                      <Input
                        placeholder='Text'
                        value={item.text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateLinkItem(
                            sectionIndex,
                            itemIndex,
                            "text",
                            e.target.value
                          )
                        }
                        className='flex-1'
                      />
                      <Input
                        placeholder='URL'
                        value={item.url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateLinkItem(
                            sectionIndex,
                            itemIndex,
                            "url",
                            e.target.value
                          )
                        }
                        className='flex-1'
                      />
                      <Button
                        type='button'
                        variant='destructive'
                        size='icon'
                        onClick={() =>
                          handleRemoveLinkItem(sectionIndex, itemIndex)
                        }
                      >
                        <Trash className='w-4 h-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Social Links</h3>
          <Button type='button' size='sm' onClick={handleAddSocialLink}>
            <Plus className='w-4 h-4 mr-1' />
            Add Social
          </Button>
        </div>
        <div className='mt-3 space-y-3'>
          {footerData.socialLinks.map((socialLink, index) => (
            <div key={index} className='flex items-center gap-2'>
              <select
                value={socialLink.icon}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleUpdateSocialLink(index, "icon", e.target.value)
                }
                className='flex-1 border border-gray-300 rounded-md p-2'
              >
                <option value='facebook'>Facebook</option>
                <option value='twitter'>Twitter</option>
                <option value='instagram'>Instagram</option>
                <option value='linkedin'>LinkedIn</option>
                <option value='youtube'>YouTube</option>
              </select>
              <Input
                placeholder='URL'
                value={socialLink.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleUpdateSocialLink(index, "url", e.target.value)
                }
                className='flex-1'
              />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => handleRemoveSocialLink(index)}
              >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='backgroundColor'>Background Color</Label>
            <div className='flex gap-2'>
              <Input
                id='backgroundColor'
                type='text'
                value={footerData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<FooterData>({
                    backgroundColor: e.target.value,
                  })
                }
              />
              <Input
                type='color'
                value={footerData.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSectionData<FooterData>({
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

export default FooterEditor;
