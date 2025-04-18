"use client";

import React from "react";
import Image from "next/image";
import { HeroData } from "@/hooks/useSectionEditor";

interface HeroDefaultProps {
  data: HeroData;
  className?: string;
}

// Default data template for this variant
export const defaultData: HeroData = {
  backgroundImage: "/images/travel-tour-img/main.jpeg",
  backgroundOpacity: 0.7,
  title: "Explore the World",
  subtitle: "Discover Amazing Places",
  paragraphs: [
    "Start your journey today with our exclusive tour packages and create memories that last a lifetime.",
  ],
  ctaButtons: [
    { text: "View Tours", url: "#tours", variant: "default" },
    { text: "Learn More", url: "#about", variant: "outline" },
  ],
};

// Preview image for template selection
export const previewImage = "/templates/hero-default.jpg";

// Display name and description for template selection
export const metadata = {
  name: "Classic Hero",
  description:
    "Full-width hero with background image and call-to-action buttons",
};

const HeroDefault: React.FC<HeroDefaultProps> = ({ data, className = "" }) => {
  return (
    <section className={`relative h-[600px] flex items-center ${className}`}>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <div className='relative w-full h-full'>
          <Image
            src={data.backgroundImage}
            alt='Hero Background'
            fill
            priority
            className='object-cover'
          />
        </div>
        <div
          className='absolute inset-0 bg-black'
          style={{ opacity: data.backgroundOpacity }}
        ></div>
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 relative z-10 text-white'>
        <div className='max-w-2xl'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{data.title}</h1>
          <h2 className='text-xl md:text-2xl mb-6'>{data.subtitle}</h2>

          <div className='space-y-4 mb-8'>
            {data.paragraphs &&
              data.paragraphs.map((paragraph, index) => (
                <p key={index} className='text-lg text-gray-100'>
                  {paragraph}
                </p>
              ))}
          </div>

          <div className='flex flex-wrap gap-4'>
            {data.ctaButtons &&
              data.ctaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.url}
                  className={`
                  px-6 py-3 rounded-md font-medium transition-colors
                  ${
                    button.variant === "default"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-transparent border border-white hover:bg-white/10"
                  }
                `}
                >
                  {button.text}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDefault;
