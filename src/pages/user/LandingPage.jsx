import { useEffect } from "react";
import HeroSection from "../../components/user/HeroSection";
import FeatureSection from "../../components/user/FeatureSection";
import TestimonialSection from "../../components/user/TestimonialSection";
import CTASection from "../../components/user/CTASection";
import Footer from "../../components/user/Footer";
import NavBar from "../../components/user/NavBar";
import ProductShowcase from "../../components/user/ProductShowcase";

const LandingPage = () => {
  useEffect(() => {
    const animatedElements = document.querySelectorAll("[data-animate='true']");

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      if (animatedElements.length) {
        animatedElements.forEach((element) => {
          observer.unobserve(element);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main>
        <HeroSection />
        <FeatureSection />
        <ProductShowcase />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
