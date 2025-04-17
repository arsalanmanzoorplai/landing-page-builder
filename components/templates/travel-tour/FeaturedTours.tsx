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

  // Split the title by space to style the last word differently
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");

  return (
    <section className='section' id='tours' style={{ backgroundColor }}>
      <div className='section-title'>
        <h2>
          {firstWords} <span>{lastWord}</span>
        </h2>
        {subtitle && <p className='section-subtitle'>{subtitle}</p>}
      </div>

      <div className='section-center md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
        {tours.map((tour, index) => (
          <article
            className='transition-all duration-300 ease-linear bg-grey-10 shadow-md mb-8 hover:shadow-lg hover:scale-[1.02]'
            key={index}
          >
            <div className='relative'>
              <img
                src={tour.image}
                className='h-60 object-cover w-full'
                alt={tour.title}
              />
            </div>
            <div className='py-5 px-6'>
              <div>
                <h4>{tour.title}</h4>
              </div>
              <p>{tour.description}</p>
              <div className='flex justify-between flex-wrap items-center mt-4'>
                <p className='text-sm mb-0 capitalize text-primary-5 leading-0'>
                  {tour.duration}
                </p>
                <p className='text-sm mb-0 font-bold text-primary-5 leading-0'>
                  From {tour.price}
                </p>
              </div>
              <a
                href={tour.url}
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
