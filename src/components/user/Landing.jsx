import React from "react";

const Landing = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="relative py-12 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44 max-w-7xl mx-auto">
        {/* Background Image for Larger Screens */}
        <div className="absolute inset-0 hidden lg:block">
          <img
            className="object-cover object-right-bottom w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/background.png"
            alt="Background"
          />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
            <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl xl:leading-tight">
              Build SaaS Landing Page without Writing a Single Code
            </h1>
            <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nunc
              nisl eu consectetur. Mi massa elementum odio eu viverra amet.
            </p>

            <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
              <a
                href="#"
                className="px-4 py-3 text-base font-bold text-gray-900 bg-white rounded-md sm:px-6 hover:bg-gray-200"
              >
                Get UI Kit Now
              </a>
              <a
                href="#"
                className="px-4 py-3 text-base font-bold text-white border rounded-md hover:bg-gray-700"
              >
                Check live preview
              </a>
            </div>
          </div>
        </div>

        {/* Background Image for Smaller Screens */}
        <div className="mt-8 lg:hidden">
          <img
            className="object-cover w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/bg.png"
            alt="Background"
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
