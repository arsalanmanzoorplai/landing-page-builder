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

  return (
    <section className='section' id='services' style={sectionStyle}>
      <div className='section-title'>
        <h2>
          {firstWords} <span>{lastWord}</span>
        </h2>
        {subtitle && <p className='section-subtitle'>{subtitle}</p>}
      </div>

      <div className='section-center sm:grid sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
        {services.map((service, index) => (
          <article
            key={index}
            className='text-center mb-12 sm:mb-0 lg:flex lg:text-left'
          >
            <span className='bg-primary-5 text-primary-1 p-2 inline-block text-[2rem] mb-6 lg:self-start'>
              {getIconComponent(service.icon)}
            </span>
            <div className='lg:pl-4'>
              <h4 className='lg:mb-2'>{service.title}</h4>
              <p className='max-w-80 ml-auto mr-auto'>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
