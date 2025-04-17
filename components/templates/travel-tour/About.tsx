"use client";
import { AboutData } from "@/hooks/useSectionEditor";

interface AboutProps {
  data?: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    image = "/images/travel-tour-img/about.jpeg",
    title = "About Us",
    paragraphs = [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quisquam harum nam cumque temporibus explicabo dolorum sapiente odio unde dolor?",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quisquam harum nam cumque temporibus explicabo dolorum sapiente odio unde dolor?",
    ],
    backgroundColor = "#f8fafc",
  } = data || {};

  // Ensure paragraphs is an array
  const paragraphsArray = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

  // For debugging
  console.log("About paragraphs data:", paragraphsArray);

  // Helper function to check if an object is a string-like object with numeric keys
  const isStringObject = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return false;

    // Check if the object has numeric keys starting from 0
    const keys = Object.keys(obj);
    if (keys.length === 0) return false;

    // Check if all keys are sequential numbers
    for (let i = 0; i < keys.length; i++) {
      if (!obj.hasOwnProperty(i.toString())) {
        return false;
      }
      // Check if values are single characters
      if (
        typeof obj[i.toString()] !== "string" ||
        obj[i.toString()].length !== 1
      ) {
        return false;
      }
    }

    return true;
  };

  // Function to extract text from paragraph data
  const getParagraphText = (paragraph: any): string => {
    if (typeof paragraph === "string") {
      return paragraph;
    }

    // If it's an object, try to extract text content from common field names
    if (paragraph && typeof paragraph === "object") {
      // Special case: if the object has numeric keys (0, 1, 2, etc.) and they're all characters,
      // it's likely a string that was spread into an object - reconstruct it
      if (isStringObject(paragraph)) {
        // Convert object with numeric keys back to a string
        const keys = Object.keys(paragraph).sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        return keys.map((key) => paragraph[key]).join("");
      }

      // Check for common content field names
      if (paragraph.text) return paragraph.text;
      if (paragraph.content) return paragraph.content;
      if (paragraph.description) return paragraph.description;
      if (paragraph.value) return paragraph.value;

      // If we can't find a suitable field, return a formatted JSON string
      try {
        return JSON.stringify(paragraph, null, 2);
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

export default About;
