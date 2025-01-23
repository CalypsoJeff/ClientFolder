import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold">/ORCA</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="/events" className="text-gray-700 hover:text-gray-900">
              Book Events
            </a>
            <a
              href="/competitions"
              className="text-gray-700 hover:text-gray-900"
            >
              Competitions
            </a>
            <a href="/riders" className="text-gray-700 hover:text-gray-900">
              Riders Group
            </a>
            <a href="/riders" className="text-gray-700 hover:text-gray-900">
              Trekking/Exploration
            </a>
            <a
              href="/register"
              className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Sign up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <span className="text-xl font-bold">/ORCA</span>
              </a>
            </div>
            <button
              type="button"
              className="text-gray-700"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 pt-8">
            <div className="flex flex-col space-y-8">
              <a href="/events" className="text-lg text-gray-700">
                Book Events
              </a>
              <a href="/competitions" className="text-lg text-gray-700">
                Competitions
              </a>
              <a href="/riders" className="text-lg text-gray-700">
                Riders Group
              </a>
              <a href="/trekking" className="text-lg text-gray-700">
                Trekking/Exploration
              </a>
              <a href="/login" className="text-lg text-gray-700">
                Customer Login
              </a>
              <a
                href="/register"
                className="rounded-full bg-black px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
