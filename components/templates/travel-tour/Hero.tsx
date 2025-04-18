"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroData } from "@/hooks/useSectionEditor";

interface HeroProps {
  data?: HeroData;
}

const defaultValues: HeroData = {
  backgroundImage: "/images/travel-tour-img/main.jpeg",
  backgroundOpacity: 0.7,
  title: "Discover Amazing Places",
  subtitle: "Explore the world with us",
  paragraphs: [
    "Start your journey to the most beautiful destinations around the globe",
  ],
  ctaText: "View Tours",
  ctaLink: "#tours",
};

const Hero: React.FC<HeroProps> = ({ data = {} }) => {
  const {
    backgroundImage = defaultValues.backgroundImage,
    backgroundOpacity = defaultValues.backgroundOpacity,
    title = defaultValues.title,
    subtitle = defaultValues.subtitle,
    paragraphs = defaultValues.paragraphs,
    ctaText = defaultValues.ctaText,
    ctaLink = defaultValues.ctaLink,
    ctaButtons = [],
  } = data;

  const getParagraphText = (paragraph: string | { text: string }): string => {
    if (typeof paragraph === "string") return paragraph;
    return paragraph.text || "";
  };

  return (
    <section className='relative h-[600px] w-full overflow-hidden'>
      <div className='absolute inset-0'>
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className='object-cover'
        />
        <div
          className='absolute inset-0 bg-black'
          style={{ opacity: backgroundOpacity }}
        />
      </div>

      <div className='relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white'>
        <h1 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>
          {title}
        </h1>
        <h2 className='mb-6 text-xl md:text-2xl'>{subtitle}</h2>

        <div className='mb-8 max-w-2xl'>
          {Array.isArray(paragraphs) &&
            paragraphs.map((paragraph, index) => (
              <p key={index} className='mb-2'>
                {getParagraphText(paragraph)}
              </p>
            ))}
        </div>

        {ctaText && (
          <Button
            asChild
            className='bg-primary-500 hover:bg-primary-600 px-8 py-3 text-lg'
          >
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        )}

        {ctaButtons && ctaButtons.length > 0 && !ctaText && (
          <div className='flex gap-4'>
            {ctaButtons.map((button, index) => (
              <Button
                key={index}
                asChild
                className={
                  button.variant === "default"
                    ? "bg-primary-500"
                    : "bg-transparent border border-white"
                }
              >
                <a href={button.url}>{button.text}</a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
