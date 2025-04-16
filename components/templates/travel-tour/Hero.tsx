const Hero = () => {
  return (
    <section
      className='min-h-screen bg-primary-5 flex items-center justify-center md:bg-[linear-gradient(rgba(44,174,186,0.7),rgba(0,0,0,0.7)),url("/images/travel-tour-img/main.jpeg")] md:bg-center md:bg-cover md:bg-no-repeat '
      id='home'
    >
      <div className='text-center text-clr-white py-0 px-12 md:p-0'>
        <h1 className='capitalize'>backroads app</h1>
        <p className='max-w-xl ml-auto mr-auto text-clr-white tracking-spacing md:max-w-2xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          explicabo debitis est autem dicta.
        </p>
        <a
          href='#tours'
          className='btn py-[0.9rem] px-[1.6rem] text-[1.25rem] bg-clr-white text-primary-5 hover:bg-transparent hover:text-clr-white hover:border-clr-white'
        >
          explore tours
        </a>
      </div>
    </section>
  );
};

export default Hero;
