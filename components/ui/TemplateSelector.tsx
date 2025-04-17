import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface TemplateSelectorProps {
  templates: TemplateOption[];
  selectedTemplateId: string | null;
  onSelect: (templateId: string) => void;
}

export default function TemplateSelector({
  templates,
  selectedTemplateId,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className='space-y-4'>
      <h3 className='font-medium text-lg'>Select a Template</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTemplateId === template.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelect(template.id)}
          >
            <div className='relative h-40 w-full'>
              <Image
                src={template.thumbnail}
                alt={template.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardContent className='p-4'>
              <h4 className='font-medium'>{template.name}</h4>
              <p className='text-sm text-gray-500 mt-1'>
                {template.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
