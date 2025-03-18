import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FaHome,
  FaTrophy,
  FaUsers,
  FaHiking,
  FaShoppingCart,
} from "react-icons/fa";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLandingPage = location.pathname === "/landing";

  const navItems = [
    { name: "Home", url: "/landing", icon: FaHome },
    { name: "Competitions", url: "/competitions", icon: FaTrophy },
    { name: "Riders Group", url: "/riders", icon: FaUsers },
    { name: "Trekking/Exploration", url: "/trekking", icon: FaHiking },
    { name: "Shop", url: "/shop", icon: FaShoppingCart },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-2xl font-display font-bold tracking-tight text-sky-600">
          ORCA
        </span>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              className={cn(
                "flex items-center text-sm font-medium transition-colors no-underline hover-link",
                isLandingPage
                  ? "text-white hover:text-orca-300"
                  : "text-black hover:text-sky-600"
              )}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="/contact"
            className={cn(
              "hidden md:inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors no-underline",
              isLandingPage
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-sky-600 text-white hover:bg-sky-700"
            )}
          >
            Get Started
          </a>

          <button
            className="md:hidden rounded-md p-2"
            aria-label="Menu"
            style={{ color: isLandingPage ? "white" : "black" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
