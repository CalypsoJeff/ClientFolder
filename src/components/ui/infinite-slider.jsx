/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { cn } from "@/lib/utils";
// import useEmblaCarousel from "embla-carousel-react";

// const InfiniteSlider = ({
//   items,
//   direction = "left",
//   speed = "normal",
//   pauseOnHover = true,
//   className,
// }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     loop: true,
//     dragFree: true,
//     containScroll: "keepSnaps",
//     align: "start",
//     slidesToScroll: 1,
//   });

//   const [mounted, setMounted] = useState(false);

//   // Duplicate the items to create a true infinite feeling
//   const slideItems = [...items, ...items];

//   const scrollNext = useCallback(() => {
//     if (!emblaApi) return;
//     if (direction === "left") {
//       emblaApi.scrollNext();
//     } else {
//       emblaApi.scrollPrev();
//     }
//   }, [emblaApi, direction]);

//   useEffect(() => {
//     if (!mounted) {
//       setMounted(true);
//       return;
//     }

//     if (!emblaApi) return;

//     let interval;

//     const clearIntvl = () => clearInterval(interval);
//     const startIntvl = () => {
//       clearIntvl();
//       interval = setInterval(scrollNext, getIntervalSpeed(speed));
//     };

//     // Initialize the continuous scrolling
//     startIntvl();

//     // Enable scrolling to wrap from the beginning to the end seamlessly
//     emblaApi.on("select", () => {
//       // If we've reached the end, jump to the start without animation
//       if (emblaApi.canScrollNext() === false) {
//         emblaApi.scrollTo(0, false);
//       }
//     });

//     if (pauseOnHover) {
//       const node = emblaApi.rootNode();
//       node.addEventListener("mouseenter", clearIntvl);
//       node.addEventListener("mouseleave", startIntvl);
//       return () => {
//         clearIntvl();
//         node.removeEventListener("mouseenter", clearIntvl);
//         node.removeEventListener("mouseleave", startIntvl);
//       };
//     } else {
//       return clearIntvl;
//     }
//   }, [mounted, emblaApi, direction, pauseOnHover, speed, scrollNext]);

//   return (
//     <div ref={emblaRef} className={cn("overflow-hidden", className)}>
//       <div className="flex">
//         {slideItems.map((item, index) => (
//           <div
//             className="flex-shrink-0 min-w-0"
//             key={index}
//             style={{ margin: "0 1rem" }}
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// function getIntervalSpeed(speed) {
//   switch (speed) {
//     case "fast":
//       return 1500;
//     case "normal":
//       return 2500;
//     case "slow":
//       return 3500;
//     default:
//       return 2500;
//   }
// }

// export { InfiniteSlider };

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";

export const InfiniteSlider = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {
  const getDuration = (speed) => {
    switch (speed) {
      case "fast":
        return 20;
      case "normal":
        return 30;
      case "slow":
        return 40;
      default:
        return 30;
    }
  };

  const duration = getDuration(speed);
  const durationOnHover = pauseOnHover ? 60 : undefined;
  const reverse = direction === "right";
  const gap = 16;

  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const contentSize = width + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentDuration, width, gap, isTransitioning, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          x: translation,
          gap: `${gap}px`,
        }}
        ref={ref}
        {...(pauseOnHover ? hoverProps : {})}
      >
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={i + items.length} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
