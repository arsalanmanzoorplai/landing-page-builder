import React from "react";
import { useHeroEditor } from "../shared/useHeroEditor";
import {
  CommonFields,
  BackgroundSettings,
  ParagraphsEditor,
  CtaButtonsEditor,
} from "../shared/CommonFields";

export const OriginalVariantEditor: React.FC = () => {
  const {
    activeSection,
    updateField,
    uploadImage,
    addArrayItem,
    removeArrayItem,
    updateArrayItem,
    imageUploadState,
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
        <h3 className='text-lg font-medium'>Background Settings</h3>
        <div className='mt-3'>
          <BackgroundSettings
            backgroundImage={data.backgroundImage || ""}
            backgroundOpacity={data.backgroundOpacity || 0.5}
            onUpdateField={updateField}
            onUploadImage={uploadImage}
            uploadState={imageUploadState}
          />
        </div>
      </div>
    </div>
  );
};
