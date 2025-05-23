import React, { useState } from "react";
import { useSectionEditor, NavbarData } from "@/hooks/useSectionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Upload } from "lucide-react";

const NavbarEditor: React.FC = () => {
  const {
    activeSection,
    updateSectionData,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
  } = useSectionEditor();

  // Track separate upload states for logo and tabLogo
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [tabLogoUploadProgress, setTabLogoUploadProgress] = useState(0);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isTabLogoUploading, setIsTabLogoUploading] = useState(false);

  if (!activeSection || activeSection.type !== "navbar") return null;

  const navbarData = activeSection.data as NavbarData;

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsLogoUploading(true);
    setLogoUploadProgress(0);

    // Use a timer to simulate upload progress
    const interval = setInterval(() => {
      setLogoUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const file = e.target.files[0];
      await uploadImage(file, "logo");
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsLogoUploading(false);
        setLogoUploadProgress(0);
      }, 500);
    }
  };

  // Handle tab logo upload
  const handleTabLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsTabLogoUploading(true);
    setTabLogoUploadProgress(0);

    // Use a timer to simulate upload progress
    const interval = setInterval(() => {
      setTabLogoUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const file = e.target.files[0];
      await uploadImage(file, "tabLogo");
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsTabLogoUploading(false);
        setTabLogoUploadProgress(0);
      }, 500);
    }
  };

  // Handle adding a new link
  const handleAddLink = () => {
    addArrayItem("links", { text: "New Link", url: "#" });
  };

  // Handle removing a link
  const handleRemoveLink = (index: number) => {
    removeArrayItem("links", index);
  };

  // Handle updating a link
  const handleUpdateLink = (
    index: number,
    field: "text" | "url",
    value: string
  ) => {
    updateArrayItem("links", index, { [field]: value });
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
        <h3 className='text-lg font-medium'>General Settings</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={navbarData.title}
              onChange={(e) =>
                updateSectionData<NavbarData>({ title: e.target.value })
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='backgroundColor'>Background Color</Label>
            <div className='flex gap-2'>
              <Input
                id='backgroundColor'
                type='text'
                value={navbarData.backgroundColor}
                onChange={(e) =>
                  updateSectionData<NavbarData>({
                    backgroundColor: e.target.value,
                  })
                }
              />
              <Input
                type='color'
                value={navbarData.backgroundColor}
                onChange={(e) =>
                  updateSectionData<NavbarData>({
                    backgroundColor: e.target.value,
                  })
                }
                className='w-12 p-1 h-10'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='logo'>Logo</Label>
            <div className='flex items-center gap-4'>
              <div className='h-10 w-32 overflow-hidden bg-gray-100 rounded'>
                <img
                  src={navbarData.logo}
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
              {isLogoUploading && (
                <div className='flex items-center gap-2'>
                  <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-500 rounded-full'
                      style={{ width: `${logoUploadProgress}%` }}
                    />
                  </div>
                  <span className='text-sm'>{logoUploadProgress}%</span>
                </div>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='tabLogo'>Browser Tab Logo (Favicon)</Label>
            <div className='flex items-center gap-4'>
              <div className='h-10 w-10 overflow-hidden bg-gray-100 rounded'>
                <img
                  src={navbarData.tabLogo || navbarData.logo}
                  alt='Tab Logo'
                  className='h-full w-full object-contain'
                />
              </div>
              <div className='relative'>
                <Input
                  id='tabLogo'
                  type='file'
                  accept='image/*'
                  onChange={handleTabLogoUpload}
                  className='absolute inset-0 opacity-0 cursor-pointer'
                />
                <Button type='button' variant='outline' size='sm'>
                  <Upload className='w-4 h-4 mr-2' />
                  Upload Tab Logo
                </Button>
              </div>
              {isTabLogoUploading && (
                <div className='flex items-center gap-2'>
                  <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-blue-500 rounded-full'
                      style={{ width: `${tabLogoUploadProgress}%` }}
                    />
                  </div>
                  <span className='text-sm'>{tabLogoUploadProgress}%</span>
                </div>
              )}
              <div className='text-xs text-gray-500'>
                Recommended: Square image, ideally 32x32 or 64x64 pixels
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-medium'>Navigation Links</h3>
          <Button type='button' size='sm' onClick={handleAddLink}>
            <Plus className='w-4 h-4 mr-1' />
            Add Link
          </Button>
        </div>
        <div className='mt-3 space-y-3'>
          {navbarData.links.map((link, index) => (
            <div key={index} className='flex items-center gap-2'>
              <Input
                placeholder='Text'
                value={link.text}
                onChange={(e) =>
                  handleUpdateLink(index, "text", e.target.value)
                }
                className='flex-1'
              />
              <Input
                placeholder='URL'
                value={link.url}
                onChange={(e) => handleUpdateLink(index, "url", e.target.value)}
                className='flex-1'
              />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => handleRemoveLink(index)}
              >
                <Trash className='w-4 h-4' />
              </Button>
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
          {navbarData.socialLinks.map((socialLink, index) => (
            <div key={index} className='flex items-center gap-2'>
              <select
                value={socialLink.icon}
                onChange={(e) =>
                  handleUpdateSocialLink(index, "icon", e.target.value)
                }
                className='flex-1 border border-gray-300 rounded-md p-2'
              >
                <option value='facebook'>Facebook</option>
                <option value='twitter'>Twitter</option>
                <option value='instagram'>Instagram</option>
              </select>
              <Input
                placeholder='URL'
                value={socialLink.url}
                onChange={(e) =>
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
    </div>
  );
};

export default NavbarEditor;
