"use client";

import React from "react";
import { AboutData } from "@/hooks/useSectionEditor";

interface AboutOriginalProps {
  data: AboutData;
  className?: string;
}

// Default data template for this variant
export const defaultData: AboutData = {
  image: "/images/travel-tour-img/about.jpeg",
  title: "About Us",
  paragraphs: [
    "We are a premier travel agency with over 10 years of experience.",
    "Our team of experts will help you plan the perfect vacation.",
    "We offer personalized itineraries and 24/7 support during your trip.",
  ],
  backgroundColor: "#f8fafc",
};

// Image preview for template selection
export const previewImage = "/images/travel-tour-img/about.jpeg";

// Display name and description for template selection
export const metadata = {
  name: "Original About",
  description: "The classic travel-tour about section",
};

const AboutOriginal: React.FC<AboutOriginalProps> = ({
  data,
  className = "",
}) => {
  // Default values if data is not provided
  const {
    image = defaultData.image,
    title = defaultData.title,
    paragraphs = defaultData.paragraphs,
    backgroundColor = defaultData.backgroundColor,
  } = data || {};

  // Ensure paragraphs is an array
  const paragraphsArray = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

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

  // Split the title by space to style the last word differently
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");

  return (
    <section className='section' id='about' style={{ backgroundColor }}>
      <div className='section-title'>
        <h2>
          {firstWords} <span>{lastWord}</span>
        </h2>
      </div>

      <div className='section-center lg:grid lg:grid-cols-2 lg:gap-x-8'>
        <div className="mb-8 lg:mb-0 relative xl:before:content-[''] xl:before:absolute xl:before:w-full xl:before:h-full xl:before:border-[0.5rem] xl:before:border-primary-5 xl:before:top-[-1.5rem] xl:before:left-[-1.5rem]">
          <img src={image} className='relative' alt='about image' />
        </div>
        <article className='mb-8 lg:mb-0'>
          <h3>explore the difference</h3>
          {paragraphsArray.map((paragraph, index) => (
            <p key={index} className='mb-4'>
              {getParagraphText(paragraph)}
            </p>
          ))}
          <a href='#' className='btn'>
            read more
          </a>
        </article>
      </div>
    </section>
  );
};

export default AboutOriginal;
