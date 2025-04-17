"use client";
import React from "react";
import {
  FaWallet,
  FaTree,
  FaSocks,
  FaMap,
  FaHome,
  FaPlane,
  FaCar,
  FaHotel,
  FaUtensils,
} from "react-icons/fa";
import { ServicesData, ServiceData } from "@/hooks/useSectionEditor";

interface ServicesProps {
  data?: ServicesData;
}

const Services: React.FC<ServicesProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    backgroundImage = "",
    title = "Our Services",
    subtitle = "",
    services = [
      {
        icon: "wallet",
        title: "saving money",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, officia.",
      },
      {
        icon: "tree",
        title: "endless hiking",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, officia.",
      },
      {
        icon: "socks",
        title: "amazing comfort",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, officia.",
      },
    ],
    backgroundColor = "#f7f7f7",
  } = data || {};

  // For debugging
  console.log("Services data:", services);

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

  // Function to safely get text content
  const getTextContent = (content: any): string => {
    if (typeof content === "string") {
      return content;
    }

    // If it's an object, try to extract text content from common field names
    if (content && typeof content === "object") {
      // Special case: if the object has numeric keys (0, 1, 2, etc.) and they're all characters,
      // it's likely a string that was spread into an object - reconstruct it
      if (isStringObject(content)) {
        // Convert object with numeric keys back to a string
        const keys = Object.keys(content).sort(
          (a, b) => parseInt(a) - parseInt(b)
        );
        return keys.map((key) => content[key]).join("");
      }

      // Check for common content field names
      if (content.text) return content.text;
      if (content.content) return content.content;
      if (content.description) return content.description;
      if (content.value) return content.value;

      // If we can't find a suitable field, return a formatted JSON string
      try {
        return JSON.stringify(content, null, 2);
      } catch (e) {
        return "[Error displaying content]";
      }
    }

    // Fallback
    return String(content);
  };

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "wallet":
        return <FaWallet />;
      case "tree":
        return <FaTree />;
      case "socks":
        return <FaSocks />;
      case "map":
        return <FaMap />;
      case "home":
        return <FaHome />;
      case "plane":
        return <FaPlane />;
      case "car":
        return <FaCar />;
      case "hotel":
        return <FaHotel />;
      case "utensils":
        return <FaUtensils />;
      default:
        return <FaWallet />;
    }
  };

  // Split the title by space to style the last word differently
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");

  // Background style with image if provided
  const sectionStyle = {
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
  };

  // Ensure services is an array
  const servicesArray = Array.isArray(services) ? services : [services];

  return (
    <section className='section' id='services' style={sectionStyle}>
      <div className='section-title'>
        <h2>
          {firstWords} <span>{lastWord}</span>
        </h2>
        {subtitle && (
          <p className='section-subtitle'>{getTextContent(subtitle)}</p>
        )}
      </div>

      <div className='section-center sm:grid sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
        {servicesArray.map((service, index) => (
          <article
            key={index}
            className='text-center mb-12 sm:mb-0 lg:flex lg:text-left'
          >
            <span className='bg-primary-5 text-primary-1 p-2 inline-block text-[2rem] mb-6 lg:self-start'>
              {getIconComponent(service.icon)}
            </span>
            <div className='lg:pl-4'>
              <h4 className='lg:mb-2'>{getTextContent(service.title)}</h4>
              <p className='max-w-80 ml-auto mr-auto'>
                {getTextContent(service.description)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
