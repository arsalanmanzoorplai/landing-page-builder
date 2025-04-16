import React from "react";
import { FaWallet, FaTree, FaSocks } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaWallet />,
    title: "saving money",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit Asperiores, officia.",
  },
  {
    id: 2,
    icon: <FaTree />,
    title: "endless hiking",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit Asperiores, officia.",
  },
  {
    id: 3,
    icon: <FaSocks />,
    title: "amazing comfort",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit Asperiores, officia.",
  },
];

const Services = () => {
  return (
    <section className='section bg-grey-10' id='services'>
      <div className='section-title'>
        <h2>
          our <span>services</span>
        </h2>
      </div>

      <div className='section-center sm:grid sm:grid-cols-2 sm:gap-8 md:grid-cols-3'>
        {services.map((service) => {
          const { id, icon, title, text } = service;
          return (
            <article
              key={id}
              className='text-center mb-12 sm:mb-0 lg:flex lg:text-left'
            >
              <span className='bg-primary-5 text-primary-1 p-2 inline-block text-[2rem] mb-6 lg:self-start'>
                {icon}
              </span>
              <div className='lg:pl-4'>
                <h4 className='lg:mb-2'>{title}</h4>
                <p className='max-w-80 ml-auto mr-auto'>{text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
