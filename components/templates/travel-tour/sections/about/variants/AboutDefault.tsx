"use client";

import React from "react";
import { AboutData } from "@/hooks/useSectionEditor";
import { Section } from "@/hooks/useEditableSections";

interface AboutDefaultProps {
  data: AboutData;
  className?: string;
}

// Default data template for this variant
export const defaultData: AboutData = {
  image: "/images/travel-tour-img/about.jpeg",
  title: "About Our Travel Company",
  paragraphs: [
    "We're a premier travel agency with over 10 years of experience creating memorable journeys.",
    "Our team of experts will help you plan the perfect vacation tailored to your preferences.",
    "We offer personalized itineraries and 24/7 support during your trip for peace of mind.",
  ],
  backgroundColor: "#f9f9f9",
};

// Preview image for template selection
export const previewImage = "/templates/about-default.jpg";

// Display name and description for template selection
export const metadata = {
  name: "Standard About",
  description: "Clean and professional about section with image and text",
};

const AboutDefault: React.FC<AboutDefaultProps> = ({
  data,
  className = "",
}) => {
  return (
    <section
      className={`py-16 ${className}`}
      style={{ backgroundColor: data.backgroundColor }}
    >
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row items-center gap-12'>
          <div className='md:w-1/2'>
            <img
              src={data.image}
              alt={data.title}
              className='rounded-lg shadow-lg w-full h-auto object-cover'
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div className='md:w-1/2'>
            <h2 className='text-3xl font-bold mb-6'>{data.title}</h2>
            <div className='space-y-4'>
              {data.paragraphs.map((paragraph, index) => (
                <p key={index} className='text-gray-700'>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDefault;
