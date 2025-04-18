"use client";

import React from "react";
import { AboutData } from "@/hooks/useSectionEditor";

interface AboutTeamProps {
  data: AboutData & {
    teamMembers?: Array<{
      name: string;
      role: string;
      image: string;
    }>;
  };
  className?: string;
}

// Default data template for this variant
export const defaultData: AboutData & {
  teamMembers: Array<{
    name: string;
    role: string;
    image: string;
  }>;
} = {
  image: "/images/travel-tour-img/about-team.jpeg",
  title: "Meet Our Expert Team",
  paragraphs: [
    "Our passionate team of travel specialists is dedicated to creating unforgettable experiences.",
    "With decades of combined experience and local expertise, we'll help you discover hidden gems and iconic destinations alike.",
  ],
  backgroundColor: "red",
  teamMembers: [
    {
      name: "Sarah Johnson",
      role: "Travel Director",
      image: "/images/travel-tour-img/about.jpeg",
    },
    {
      name: "David Chen",
      role: "Destination Expert",
      image: "/images/travel-tour-img/about.jpeg",
    },
    {
      name: "Maria Rodriguez",
      role: "Customer Experience",
      image: "/images/travel-tour-img/about.jpeg",
    },
  ],
};

// Preview image for template selection
export const previewImage = "/templates/about-team.jpg";

// Display name and description for template selection
export const metadata = {
  name: "Team About",
  description: "Showcase your expert team members",
};

const AboutTeam: React.FC<AboutTeamProps> = ({ data, className = "" }) => {
  // Use default team members if not provided in data
  const teamMembers = data.teamMembers || defaultData.teamMembers;

  return (
    <section
      className={`py-16 ${className}`}
      style={{ backgroundColor: data.backgroundColor }}
    >
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-6'>{data.title}</h2>
          <div className='max-w-3xl mx-auto space-y-4'>
            {data.paragraphs.map((paragraph, index) => (
              <p key={index} className='text-gray-700'>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <div className='h-64 overflow-hidden'>
                <img
                  src={member.image}
                  alt={member.name}
                  className='w-full h-full object-cover transition-transform hover:scale-105'
                />
              </div>
              <div className='p-6 text-center'>
                <h3 className='text-xl font-semibold'>{member.name}</h3>
                <p className='text-blue-600 mt-1'>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
