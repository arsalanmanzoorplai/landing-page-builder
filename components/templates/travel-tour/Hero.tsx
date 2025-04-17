"use client";
import { HeroData } from "@/hooks/useSectionEditor";

interface HeroProps {
  data?: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    backgroundImage = "/images/travel-tour-img/main.jpeg",
    backgroundOpacity = 0.7,
    title = "Backroads App",
    subtitle = "Discover amazing places",
    paragraphs = [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae explicabo debitis est autem dicta.",
    ],
    ctaButtons = [{ text: "Explore Tours", url: "#tours", variant: "default" }],
  } = data || {};

  // Create the background style with opacity
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(44,174,186,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url("${backgroundImage}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  // Ensure paragraphs is an array
  const paragraphsArray = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

  // For debugging
  console.log("Paragraphs data:", paragraphsArray);

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

export default Hero;
