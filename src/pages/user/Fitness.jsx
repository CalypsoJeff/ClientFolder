import React, { useState } from "react";
import Header from "../../components/user/Header";

const Fitness = () => {
  return (
    <section>
     <Header/>
      <div className="relative pt-12 bg-gray-50 sm:pt-16 lg:py-36 xl:py-48">
        <div className="absolute inset-0 hidden lg:block">
          <img
            className="object-cover object-right w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/4/background.png"
            alt=""
          />
        </div>

        <div className="absolute inset-x-0 top-0 hidden lg:block">
          <div className="py-5">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <nav className="flex items-center space-x-8">
                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  All Brands{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Men{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Women{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Accessories{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Sports{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Kids{" "}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-lg mx-auto text-center lg:mx-0 lg:max-w-md lg:text-left">
            <p className="text-base font-bold text-gray-600">
              Use “FIT40” coupon to get 40% flat discount
            </p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:mt-8 sm:text-5xl xl:text-7xl">
              Fitness kits that help you keep fit.
            </h1>

            <div className="mt-8 sm:mt-12">
              <a
                href="#"
                title=""
                className="
                            inline-flex
                            items-center
                            justify-center
                            px-8
                            py-3
                            text-base
                            font-bold
                            leading-7
                            text-white
                            transition-all
                            duration-200
                            bg-gray-900
                            border border-transparent
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-600
                            focus:ring-offset-[#FFE942]
                        "
                role="button"
              >
                Start shopping
              </a>
            </div>
          </div>

          <div className="mt-8 lg:hidden">
            <img
              className="w-full mx-auto"
              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/4/bg.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Fitness
