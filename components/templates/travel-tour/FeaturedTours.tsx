import React from "react";

const tours = [
  {
    id: 1,
    image: "/images/travel-tour-img/tour-1.jpeg",
    date: "august 26th, 2020",
    title: "Tibet Adventure",
    info: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.`,
    location: "china",
    duration: 6,
    cost: 2100,
  },
  {
    id: 2,
    image: "/images/travel-tour-img/tour-2.jpeg",
    date: "october 1th, 2020",
    title: "best of java",
    info: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.`,
    location: "indonesia",
    duration: 11,
    cost: 1400,
  },
  {
    id: 3,
    image: "/images/travel-tour-img/tour-3.jpeg",
    date: "september 15th, 2020",
    title: "explore hong kong",
    info: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.`,
    location: "hong kong",
    duration: 8,
    cost: 5000,
  },
  {
    id: 4,
    image: "/images/travel-tour-img/tour-4.jpeg",
    date: "december 5th, 2019",
    title: "kenya highlights",
    info: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque vitae tempore voluptatum maxime reprehenderit eum quod exercitationem fugit, qui corporis.`,
    location: "kenya",
    duration: 20,
    cost: 3300,
  },
];

const FeaturedTours = () => {
  return (
    <section className='section' id='tours'>
      <div className='section-title'>
        <h2>
          featured <span>tours</span>
        </h2>
      </div>

      <div className='section-center md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
        {tours.map((tour) => {
          const { id, image, date, title, info, location, duration, cost } =
            tour;
          return (
            <article
              className='transition-all duration-300 ease-linear bg-grey-10 shadow-md mb-8 hover:shadow-lg hover:scale-[1.02]'
              key={id}
            >
              <div className='relative'>
                <img src={image} className='h-60 object-cover' alt={title} />
                <p className='absolute right-0 bottom-0 bg-primary-8 text-primary-1 capitalize  py-1 px-2 mb-0'>
                  {date}
                </p>
              </div>
              <div className='py-5 px-6'>
                <div>
                  <h4>{title}</h4>
                </div>
                <p>{info}</p>
                <div className='flex justify-between flex-wrap items-center'>
                  <p className='mb-0 capitalize text-primary-5 leading-0'>
                    <span className='mr-1'>
                      <i className='fas fa-map'></i>
                    </span>
                    {location}
                  </p>
                  <p className='mb-0 capitalize text-primary-5 leading-0'>
                    from ${cost}
                  </p>
                  <p className='mb-0 capitalize text-primary-5 leading-0'>
                    {duration} days
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedTours;
