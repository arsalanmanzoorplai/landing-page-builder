"use client";
import { useState, useRef } from "react";
import { FaBars, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { NavbarData } from "@/hooks/useSectionEditor";

// Default values if data is not provided
const defaultPageLinks = [
  { id: 1, url: "#home", text: "home" },
  { id: 2, url: "#about", text: "about" },
  { id: 3, url: "#services", text: "services" },
  { id: 4, url: "#tours", text: "tours" },
];
const defaultSocialLinks = [
  { id: 1, url: "https://www.facebook.com", icon: <FaFacebook /> },
  { id: 2, url: "https://www.twitter.com", icon: <FaTwitter /> },
];

interface NavbarProps {
  data?: NavbarData;
}

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

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

  // Use provided data or fallback to defaults
  const {
    logo = "/images/travel-tour-img/logo.svg",
    title = "Travel Tour",
    links = defaultPageLinks.map((link) => ({
      text: link.text,
      url: link.url,
    })),
    socialLinks: socialLinksData = defaultSocialLinks.map((link) => ({
      icon: link.icon === defaultSocialLinks[0].icon ? "facebook" : "twitter",
      url: link.url,
    })),
    backgroundColor = "white",
  } = data || {};

  // For debugging
  console.log("Navbar data:", { links, socialLinksData });

  // Map social icons to components
  const getSocialIcon = (iconName: string) => {
    switch (String(iconName).toLowerCase()) {
      case "facebook":
        return <FaFacebook />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      default:
        return <FaFacebook />;
    }
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linkStyles = {
    height: showLinks
      ? `${
          linksRef.current
            ? (linksRef.current as HTMLElement).getBoundingClientRect().height
            : 0
        }px`
      : "0px",
  };

  // Ensure links is an array
  const linksArray = Array.isArray(links) ? links : [];

  // Ensure socialLinksData is an array
  const socialLinksArray = Array.isArray(socialLinksData)
    ? socialLinksData
    : [];

  return (
    <nav className='bg-clr-white shadow-md' style={{ backgroundColor }}>
      <div className='md:max-w-[1170px] md:mx-auto md:flex md:items-center md:justify-between md:p-4'>
        <div className='flex items-center justify-between p-4 md:p-0'>
          <div className='flex items-center'>
            <img src={logo} className='nav-logo h-[40px] mr-2' alt='logo' />
            <span className='text-xl font-bold'>{getTextContent(title)}</span>
          </div>
          <button
            className='text-2xl text-primary-5 bg-transparent border-transparent cursor-pointer hover:text-primary-7 hover:rotate-[90deg] transition-all duration-300 ease-linear md:hidden'
            onClick={toggleLinks}
          >
            <FaBars />
          </button>
        </div>

        <div
          className='overflow-hidden transition-all duration-300 ease-linear md:!h-auto'
          ref={linksContainerRef}
          style={linkStyles}
        >
          <ul className='md:flex md:gap-2' ref={linksRef}>
            {linksArray.map((link, index) => {
              return (
                <li key={index}>
                  <a
                    href={typeof link.url === "string" ? link.url : "#"}
                    className='text-grey-1 text-base capitalize tracking-spacing block py-2 px-4 transition-all duration-300 ease-linear cursor-pointer hover:text-primary-1 hover:bg-primary-8 hover:pl-6 md:p-0 md:hover:bg-transparent md:hover:p-0 md:hover:text-primary-5'
                  >
                    {getTextContent(link.text)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social links */}
        <ul className='hidden md:flex md:gap-2 md:cursor-pointer'>
          {socialLinksArray.map((socialIcon, index) => {
            return (
              <li key={index}>
                <a
                  href={
                    typeof socialIcon.url === "string" ? socialIcon.url : "#"
                  }
                  className='md:text-primary-5 md:transition-all md:duration-300 md:ease-linear md:hover:text-primary-3'
                >
                  {getSocialIcon(socialIcon.icon)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
