const About = () => {
  return (
    <section className='section' id='about'>
      <div className='section-title'>
        <h2>
          about <span>us</span>
        </h2>
      </div>

      <div className='section-center lg:grid lg:grid-cols-2 lg:gap-x-8'>
        <div className='mb-8 lg:mb-0 relative xl:before:content-[""] xl:before:absolute xl:before:w-full xl:before:h-full xl:before:border-[0.5rem] xl:before:border-primary-5 xl:before:top-[-1.5rem] xl:before:left-[-1.5rem]'>
          <img
            src='/images/travel-tour-img/about.jpeg'
            className='relative'
            alt='awesome beach'
          />
        </div>
        <article className='mb-8 lg:mb-0'>
          <h3>explore the difference</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            quisquam harum nam cumque temporibus explicabo dolorum sapiente odio
            unde dolor?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            quisquam harum nam cumque temporibus explicabo dolorum sapiente odio
            unde dolor?
          </p>
          <a href='#' className='btn'>
            read more
          </a>
        </article>
      </div>
    </section>
  );
};

export default About;
