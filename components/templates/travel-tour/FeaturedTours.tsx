"use client";
import React from "react";
import { FeaturedToursData, TourData } from "@/hooks/useSectionEditor";
import { FaMapMarkerAlt } from "react-icons/fa";

interface FeaturedToursProps {
  data?: FeaturedToursData;
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    title = "Featured Tours",
    subtitle = "",
    tours = [
      {
        image: "/images/travel-tour-img/tour-1.jpeg",
        title: "Tibet Adventure",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.",
        price: "$2,100",
        duration: "6 days",
        url: "#",
      },
      {
        image: "/images/travel-tour-img/tour-2.jpeg",
        title: "Best of Java",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.",
        price: "$1,400",
        duration: "11 days",
        url: "#",
      },
      {
        image: "/images/travel-tour-img/tour-3.jpeg",
        title: "Explore Hong Kong",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.",
        price: "$5,000",
        duration: "8 days",
        url: "#",
      },
    ],
    backgroundColor = "#ffffff",
  } = data || {};

  // For debugging
  console.log("Tours data:", tours);

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

  // Split the title by space to style the last word differently
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");

  // Ensure tours is an array
  const toursArray = Array.isArray(tours) ? tours : [tours];

  return (
    <section className='section' id='tours' style={{ backgroundColor }}>
      <div className='section-title'>
        <h2>
          {firstWords} <span>{lastWord}</span>
        </h2>
        {subtitle && (
          <p className='section-subtitle'>{getTextContent(subtitle)}</p>
        )}
      </div>

      <div className='section-center md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
        {toursArray.map((tour, index) => (
          <article
            className='transition-all duration-300 ease-linear bg-grey-10 shadow-md mb-8 hover:shadow-lg hover:scale-[1.02]'
            key={index}
          >
            <div className='relative'>
              <img
                src={tour.image}
                className='h-60 object-cover w-full'
                alt={typeof tour.title === "string" ? tour.title : "Tour image"}
              />
            </div>
            <div className='py-5 px-6'>
              <div>
                <h4>{getTextContent(tour.title)}</h4>
              </div>
              <p>{getTextContent(tour.description)}</p>
              <div className='flex justify-between flex-wrap items-center mt-4'>
                <p className='text-sm mb-0 capitalize text-primary-5 leading-0'>
                  {getTextContent(tour.duration)}
                </p>
                <p className='text-sm mb-0 font-bold text-primary-5 leading-0'>
                  From {getTextContent(tour.price)}
                </p>
              </div>
              <a
                href={typeof tour.url === "string" ? tour.url : "#"}
                className='btn btn-primary mt-4 inline-block w-full text-center'
              >
                Details
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTours;
