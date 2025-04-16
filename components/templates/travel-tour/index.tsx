import Navbar from "@/components/templates/travel-tour/Navbar";
import Hero from "@/components/templates/travel-tour/Hero";
import About from "@/components/templates/travel-tour/About";
import Services from "@/components/templates/travel-tour/Services";
import FeaturedTours from "@/components/templates/travel-tour/FeaturedTours";
import Footer from "@/components/templates/travel-tour/Footer";
const TravelTour = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <FeaturedTours />
      <Footer />
    </>
  );
};

export default TravelTour;
