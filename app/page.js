import Image from "next/image";
import Navbar from "./components/navbar";
import HeroSection from "./components/herosection";
import ExperienceTimeline from "./components/educationwork";
import SkillTabs from "./components/skilltabs";
import GallerySection from "./components/gallerysection";
import Footer from "./components/footer";
import ContactForm from "./components/contactform";
import AboutMeSection from "./components/aboutsection";

export default function Home() {
  return (
    <main className="bg-light-gray min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <ExperienceTimeline />
      <SkillTabs />
      <AboutMeSection />
      <GallerySection />
      <ContactForm />
      <Footer />
    </main>
  );
}
