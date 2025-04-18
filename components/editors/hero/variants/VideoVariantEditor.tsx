import React from "react";
import { useHeroEditor } from "../shared/useHeroEditor";
import {
  CommonFields,
  ParagraphsEditor,
  CtaButtonsEditor,
} from "../shared/CommonFields";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const VideoVariantEditor: React.FC = () => {
  const {
    activeSection,
    updateField,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
  } = useHeroEditor();

  if (!activeSection) return null;
  const data = activeSection.data;

  // Paragraphs handlers
  const handleAddParagraph = () => {
    addArrayItem("paragraphs", "New paragraph text");
  };

  const handleRemoveParagraph = (index: number) => {
    removeArrayItem("paragraphs", index);
  };

  const handleUpdateParagraph = (index: number, value: string) => {
    updateArrayItem("paragraphs", index, value);
  };

  // CTA button handlers
  const handleAddCtaButton = () => {
    addArrayItem("ctaButtons", {
      text: "New Button",
      url: "#",
      variant: "default",
    });
  };

  const handleRemoveCtaButton = (index: number) => {
    removeArrayItem("ctaButtons", index);
  };

  const handleUpdateCtaButton = (
    index: number,
    field: string,
    value: string
  ) => {
    const button = data.ctaButtons?.[index] || {};
    updateArrayItem("ctaButtons", index, { ...button, [field]: value });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Hero Content</h3>
        <div className='mt-3 space-y-4'>
          <CommonFields
            title={data.title}
            subtitle={data.subtitle}
            onUpdateField={updateField}
          />
        </div>
      </div>

      <ParagraphsEditor
        paragraphs={data.paragraphs || []}
        onAdd={handleAddParagraph}
        onRemove={handleRemoveParagraph}
        onUpdate={handleUpdateParagraph}
      />

      <CtaButtonsEditor
        ctaButtons={data.ctaButtons || []}
        onAdd={handleAddCtaButton}
        onRemove={handleRemoveCtaButton}
        onUpdate={handleUpdateCtaButton}
      />

      <div>
        <h3 className='text-lg font-medium'>Video Background</h3>
        <div className='mt-3 space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='videoUrl'>Video URL</Label>
            <Input
              id='videoUrl'
              placeholder='https://www.youtube.com/embed/VIDEO_ID or other video URL'
              value={data.videoUrl || ""}
              onChange={(e) => updateField("videoUrl", e.target.value)}
            />
            <p className='text-sm text-gray-500'>
              YouTube, Vimeo, or other video embed URL
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='videoOverlayColor'>Overlay Color</Label>
            <div className='flex gap-2'>
              <Input
                id='videoOverlayColor'
                type='text'
                value={data.videoOverlayColor || "rgba(0,0,0,0.5)"}
                onChange={(e) =>
                  updateField("videoOverlayColor", e.target.value)
                }
                className='flex-1'
              />
              <Input
                type='color'
                value={
                  data.videoOverlayColor?.replace(/rgba?\([^)]+\)/, "") ||
                  "#000000"
                }
                onChange={(e) => {
                  const opacity = data.videoOverlayOpacity || 0.5;
                  updateField(
                    "videoOverlayColor",
                    `rgba(${hexToRgb(e.target.value)},${opacity})`
                  );
                }}
                className='w-12 p-1 h-10'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <Label htmlFor='videoOverlayOpacity'>Overlay Opacity</Label>
              <span className='text-sm'>
                {(data.videoOverlayOpacity || 0.5) * 100}%
              </span>
            </div>
            <input
              type='range'
              min='0'
              max='1'
              step='0.05'
              value={data.videoOverlayOpacity || 0.5}
              onChange={(e) => {
                const opacity = parseFloat(e.target.value);
                updateField("videoOverlayOpacity", opacity);

                // Update the overlay color as well to reflect new opacity
                if (data.videoOverlayColor) {
                  const colorMatch =
                    data.videoOverlayColor.match(/rgba?\(([^)]+)\)/);
                  if (colorMatch && colorMatch[1]) {
                    const rgbParts = colorMatch[1]
                      .split(",")
                      .slice(0, 3)
                      .join(",");
                    updateField(
                      "videoOverlayColor",
                      `rgba(${rgbParts},${opacity})`
                    );
                  }
                }
              }}
              className='w-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert hex color to RGB
function hexToRgb(hex: string) {
  // Remove '#' if present
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return as a string formatted for rgba()
  return `${r},${g},${b}`;
}
