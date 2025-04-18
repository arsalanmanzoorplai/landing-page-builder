"use client";

import React from "react";
import { HeroData } from "@/hooks/useSectionEditor";
import Image from "next/image";

interface HeroVideoProps {
  data: HeroData & {
    videoUrl?: string;
    videoThumbnail?: string;
  };
  className?: string;
}

// Default data template for this variant
export const defaultData: HeroData & {
  videoUrl: string;
  videoThumbnail: string;
} = {
  backgroundImage: "/images/travel-tour-img/hero-video-thumb.jpg",
  backgroundOpacity: 0.5,
  title: "Adventures Await",
  subtitle: "Immerse Yourself in New Experiences",
  paragraphs: [
    "Let our stunning destinations inspire your next adventure with breathtaking views and unforgettable experiences.",
  ],
  ctaButtons: [
    { text: "Start Exploring", url: "#tours", variant: "default" },
    { text: "Watch Video", url: "#", variant: "outline" },
  ],
  videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
  videoThumbnail: "/images/travel-tour-img/hero-video-thumb.jpg",
};

// Preview image for template selection
export const previewImage = "/templates/hero-video.jpg";

// Display name and description for template selection
export const metadata = {
  name: "Video Hero",
  description: "Dynamic hero with video background for maximum impact",
};

const HeroVideo: React.FC<HeroVideoProps> = ({ data, className = "" }) => {
  // Default to a sample video if none is provided
  const videoUrl = data.videoUrl || defaultData.videoUrl;
  const videoThumbnail =
    data.videoThumbnail || data.backgroundImage || defaultData.videoThumbnail;

  return (
    <section
      className={`relative h-[600px] flex items-center overflow-hidden ${className}`}
    >
      {/* Video Background with Fallback */}
      <div className='absolute inset-0 z-0'>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={videoThumbnail}
          className='absolute w-full h-full object-cover'
        >
          <source src={videoUrl} type='video/mp4' />
          {/* Fallback to image if video fails */}
          <img
            src={videoThumbnail}
            alt='Background'
            className='w-full h-full object-cover'
          />
        </video>
        <div
          className='absolute inset-0 bg-black'
          style={{ opacity: data.backgroundOpacity }}
        ></div>
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 relative z-10 text-white'>
        <div className='max-w-2xl'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 transition-opacity duration-500'>
            {data.title}
          </h1>
          <h2 className='text-2xl md:text-3xl mb-6 transition-opacity duration-700'>
            {data.subtitle}
          </h2>

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

export default HeroVideo;
