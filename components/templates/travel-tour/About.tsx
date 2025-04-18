"use client";
import { AboutData } from "@/hooks/useSectionEditor";
import Image from "next/image";

interface AboutProps {
  data?: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    image = "/images/travel-tour-img/about.jpeg",
    title = "About Us",
    paragraphs = [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae explicabo debitis est autem dicta.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae explicabo debitis est autem dicta.",
    ],
    backgroundColor = "#f9f9f9",
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

  return (
    <section id='about' className='section py-20' style={{ backgroundColor }}>
      <div className='section-title mb-16'>
        <h2>{title}</h2>
        <div className='underline mx-auto'></div>
      </div>

      <div className='max-w-6xl mx-auto grid gap-16 md:grid-cols-2 md:items-center md:gap-8'>
        <div className='relative w-full h-[400px] rounded-lg shadow-md overflow-hidden'>
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className='rounded-lg'
            priority
          />
        </div>

        <article className='px-4 md:px-0'>
          {paragraphsArray.map((paragraph, index) => (
            <p key={index} className='mb-4 leading-loose'>
              {getParagraphText(paragraph)}
            </p>
          ))}
        </article>
      </div>
    </section>
  );
};

export default About;
