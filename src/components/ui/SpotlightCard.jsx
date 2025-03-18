/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.6)",
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();

    setPosition({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.8);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-300 bg-white overflow-hidden p-8 transition-all duration-500 ${className}`}
      style={{ position: "relative", backgroundColor: "#9FA6B2" }}
    >
      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x} ${position.y}, ${spotlightColor}, transparent 80%)`,
          transition: "opacity 0.5s ease-in-out",
        }}
      />

      {/* Content */}
      {children}
    </div>
  );
};

export default SpotlightCard;
