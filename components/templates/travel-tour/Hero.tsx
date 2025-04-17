"use client";
import { HeroData } from "@/hooks/useSectionEditor";

interface HeroProps {
  data?: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    backgroundImage = "/images/travel-tour-img/main.jpeg",
    backgroundOpacity = 0.7,
    title = "Backroads App",
    subtitle = "Discover amazing places",
    paragraphs = [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae explicabo debitis est autem dicta.",
    ],
    ctaButtons = [{ text: "Explore Tours", url: "#tours", variant: "default" }],
  } = data || {};

  // Create the background style with opacity
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(44,174,186,${backgroundOpacity}), rgba(0,0,0,${backgroundOpacity})), url("${backgroundImage}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className='min-h-screen bg-primary-5 flex items-center justify-center'
      id='home'
      style={bgStyle}
    >
      <div className='text-center text-clr-white py-0 px-12 md:p-0'>
        <h1 className='capitalize'>{title}</h1>
        {subtitle && <h2 className='mt-2 text-2xl'>{subtitle}</h2>}

        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className='max-w-xl ml-auto mr-auto text-clr-white tracking-spacing md:max-w-2xl mt-4'
          >
            {paragraph}
          </p>
        ))}

        <div className='mt-6 flex gap-4 justify-center'>
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.url}
              className={`btn py-[0.9rem] px-[1.6rem] text-[1.25rem] ${
                button.variant === "default"
                  ? "bg-clr-white text-primary-5 hover:bg-transparent hover:text-clr-white hover:border-clr-white"
                  : "bg-transparent text-clr-white border-clr-white hover:bg-clr-white hover:text-primary-5"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
