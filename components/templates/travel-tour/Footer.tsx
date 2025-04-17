"use client";
import React from "react";
import { FooterData } from "@/hooks/useSectionEditor";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

interface FooterProps {
  data?: FooterData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
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
      if (content.label) return content.label;
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

  // Default values if data is not provided
  const {
    backgroundColor = "#222",
    logo = "/images/logo.png",
    links = [
      {
        title: "Quick Links",
        items: [
          { text: "Home", url: "#home" },
          { text: "About", url: "#about" },
          { text: "Services", url: "#services" },
          { text: "Tours", url: "#tours" },
        ],
      },
    ],
    socialLinks = [
      { icon: "facebook", url: "https://www.facebook.com" },
      { icon: "twitter", url: "https://www.twitter.com" },
    ],
    copyright = "Copyright © Backroads Travel Tours Company. All rights reserved",
  } = data || {};

  // For debugging
  console.log("Footer data:", { links, socialLinks });

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (String(iconName).toLowerCase()) {
      case "facebook":
        return <FaFacebook />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      case "youtube":
        return <FaYoutube />;
      default:
        return <FaFacebook />;
    }
  };

  // Ensure links is an array
  const linksArray = Array.isArray(links) ? links : [];

  // Ensure socialLinks is an array
  const socialLinksArray = Array.isArray(socialLinks) ? socialLinks : [];

  return (
    <footer
      className='section text-center p-8 pb-4'
      style={{ backgroundColor }}
    >
      {/* Logo */}
      {logo && (
        <div className='mb-6 flex justify-center'>
          <img src={logo} alt='Logo' className='h-10 object-contain' />
        </div>
      )}

      {/* Link Sections */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto'>
        {linksArray.map((section, sectionIndex) => {
          const sectionItems = Array.isArray(section.items)
            ? section.items
            : [];
          return (
            <div key={sectionIndex} className='text-left'>
              <h4 className='text-white mb-4'>
                {getTextContent(section.title)}
              </h4>
              <ul className='space-y-2'>
                {sectionItems.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={typeof item.url === "string" ? item.url : "#"}
                      className='text-gray-300 capitalize text-base transition-all duration-300 ease-linear hover:text-primary-5'
                    >
                      {getTextContent(item.text)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Social Links */}
      <ul className='flex justify-center mb-6 flex-wrap'>
        {socialLinksArray.map((socialLink, index) => (
          <li key={index} className='mr-4'>
            <a
              href={typeof socialLink.url === "string" ? socialLink.url : "#"}
              className='text-[2rem] text-white transition-all duration-300 ease-linear hover:text-primary-5'
              target='_blank'
              rel='noopener noreferrer'
            >
              {getIconComponent(socialLink.icon)}
            </a>
          </li>
        ))}
      </ul>

      {/* Copyright */}
      <p className='tracking-spacing text-white mb-0'>
        {getTextContent(copyright)}
        <span className='ml-2'>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
