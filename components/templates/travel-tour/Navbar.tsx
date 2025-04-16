"use client";
import { useState, useRef } from "react";
import { FaBars, FaFacebook, FaTwitter } from "react-icons/fa";

const pageLinks = [
  { id: 1, url: "#home", text: "home" },
  { id: 2, url: "#about", text: "about" },
  { id: 3, url: "#services", text: "services" },
  { id: 4, url: "#tours", text: "tours" },
];
const socialLinks = [
  { id: 1, url: "https://www.facebook.com", icon: <FaFacebook /> },
  { id: 2, url: "https://www.twitter.com", icon: <FaTwitter /> },
];

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

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

  return (
    <nav className='bg-clr-white shadow-md'>
      <div className='md:max-w-[1170px] md:mx-auto md:flex md:items-center md:justify-between md:p-4'>
        <div className='flex items-center justify-between p-4 md:p-0'>
          <img
            src='/images/travel-tour-img/logo.svg'
            className='nav-logo h-[40px]'
            alt='logo'
          />
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
            {pageLinks.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a
                    href={url}
                    className='text-grey-1 text-base capitalize tracking-spacing block py-2 px-4 transition-all duration-300 ease-linear cursor-pointer hover:text-primary-1 hover:bg-primary-8 hover:pl-6 md:p-0 md:hover:bg-transparent md:hover:p-0 md:hover:text-primary-5'
                  >
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {/* social links */}
        <ul className='hidden md:flex md:gap-2 md:cursor-pointer'>
          {socialLinks.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a
                  href={url}
                  className='md:text-primary-5 md:transition-all md:duration-300 md:ease-linear md:hover:text-primary-3'
                >
                  {icon}
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
