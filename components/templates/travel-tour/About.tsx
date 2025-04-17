"use client";
import { AboutData } from "@/hooks/useSectionEditor";

interface AboutProps {
  data?: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  // Default values if data is not provided
  const {
    image = "/images/travel-tour-img/about.jpeg",
    title = "About Us",
    paragraphs = [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quisquam harum nam cumque temporibus explicabo dolorum sapiente odio unde dolor?",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur quisquam harum nam cumque temporibus explicabo dolorum sapiente odio unde dolor?",
    ],
    backgroundColor = "#f8fafc",
  } = data || {};

  // Split the title by space to style the last word differently
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");

  return (
    <section className='section' id='about' style={{ backgroundColor }}>
      <div className='section-title'>
        <h2>
          {firstWords} <span>{lastWord}</span>
        </h2>
      </div>

      <div className='section-center lg:grid lg:grid-cols-2 lg:gap-x-8'>
        <div className="mb-8 lg:mb-0 relative xl:before:content-[''] xl:before:absolute xl:before:w-full xl:before:h-full xl:before:border-[0.5rem] xl:before:border-primary-5 xl:before:top-[-1.5rem] xl:before:left-[-1.5rem]">
          <img src={image} className='relative' alt='about image' />
        </div>
        <article className='mb-8 lg:mb-0'>
          <h3>explore the difference</h3>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className='mb-4'>
              {paragraph}
            </p>
          ))}
          <a href='#' className='btn'>
            read more
          </a>
        </article>
      </div>
    </section>
  );
};

export default About;
