"use client";

import React from "react";
import { HeroData } from "@/hooks/useSectionEditor";

interface HeroOriginalProps {
  data: HeroData;
  className?: string;
}

// Default data template for this variant
export const defaultData: HeroData = {
  backgroundImage: "/images/travel-tour-img/main.jpeg",
  backgroundOpacity: 0.7,
  title: "Explore the World",
  subtitle: "Discover Amazing Places",
  paragraphs: ["Start your journey today with our exclusive tour packages."],
  ctaButtons: [
    { text: "View Tours", url: "#tours", variant: "default" },
    { text: "Learn More", url: "#about", variant: "outline" },
  ],
};

// Image preview for template selection
export const previewImage = "/images/travel-tour-img/main.jpeg";

// Display name and description for template selection
export const metadata = {
  name: "Original Hero",
  description: "The classic travel-tour hero section",
};

const HeroOriginal: React.FC<HeroOriginalProps> = ({
  data,
  className = "",
}) => {
  // Default values if data is not provided
  const {
    backgroundImage = defaultData.backgroundImage,
    backgroundOpacity = defaultData.backgroundOpacity,
    title = defaultData.title,
    subtitle = defaultData.subtitle,
    paragraphs = defaultData.paragraphs,
    ctaButtons = defaultData.ctaButtons,
  } = data || {};

  // Ensure paragraphs is an array
  const paragraphsArray = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

  // Create the background style with opacity
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(44,174,186,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url("${backgroundImage}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  // Function to extract text from paragraph data
  const getParagraphText = (paragraph: any): string => {
    if (typeof paragraph === "string") {
      return paragraph;
    }

    // If it's an object, try to extract text content
    if (paragraph && typeof paragraph === "object") {
      // Check for common content field names
      if (paragraph.text) return paragraph.text;
      if (paragraph.content) return paragraph.content;
      if (paragraph.description) return paragraph.description;
      if (paragraph.value) return paragraph.value;

      // If no field found, try to convert to string
      try {
        return JSON.stringify(paragraph);
      } catch (e) {
        return "[Error displaying paragraph content]";
      }
    }

    // Fallback
    return String(paragraph);
  };

  return (
    <section
      className='min-h-screen bg-primary-5 flex items-center justify-center'
      id='home'
      style={bgStyle}
    >
      <div className='text-center text-clr-white py-0 px-12 md:p-0'>
        <h1 className='capitalize'>{title}</h1>
        {subtitle && <h2 className='mt-2 text-2xl'>{subtitle}</h2>}

        {paragraphsArray.map((paragraph, index) => (
          <p
            key={index}
            className='max-w-xl ml-auto mr-auto text-clr-white tracking-spacing md:max-w-2xl mt-4'
          >
            {getParagraphText(paragraph)}
          </p>
        ))}

        <div className='mt-6 flex gap-4 justify-center'>
          {Array.isArray(ctaButtons) &&
            ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.url}
                className={`btn py-[0.9rem] px-[1.6rem] text-[1.25rem] ${
                  button.variant === "default"
                    ? "bg-clr-white text-primary-5 hover:bg-transparent hover:text-clr-white hover:border-clr-white"
                    : "bg-transparent text-clr-white border-clr-white hover:bg-clr-white hover:text-primary-5"
                }`}
              >
                {button.text}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeroOriginal;
