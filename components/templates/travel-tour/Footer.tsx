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

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
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

  return (
    <footer className='section text-center p-8' style={{ backgroundColor }}>
      {/* Logo */}
      {logo && (
        <div className='mb-6 flex justify-center'>
          <img src={logo} alt='Logo' className='h-10 object-contain' />
        </div>
      )}

      {/* Link Sections */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto'>
        {links.map((section, sectionIndex) => (
          <div key={sectionIndex} className='text-left'>
            <h4 className='text-white mb-4'>{section.title}</h4>
            <ul className='space-y-2'>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href={item.url}
                    className='text-gray-300 capitalize text-base transition-all duration-300 ease-linear hover:text-primary-5'
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <ul className='flex justify-center mb-6 flex-wrap'>
        {socialLinks.map((socialLink, index) => (
          <li key={index} className='mr-4'>
            <a
              href={socialLink.url}
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
      <p className='tracking-spacing text-white'>
        {copyright}
        <span className='ml-2'>{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
