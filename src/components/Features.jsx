import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Features() {
  // React Slick settings
  const settings = {
    infinite: true, // Make the slider infinite
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enable auto-play
    autoplaySpeed: 5000, // 5 seconds interval between auto-slides
    speed: 3000, // Set slide speed to 1500ms (1.5 seconds) to make it slower
    nextArrow: null, // Disable default next arrow
    prevArrow: null, // Disable default prev arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 slides at a time for medium screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // 1 slide at a time for small screens
        },
      },
    ],
  };
  const sliderRef = React.useRef(null); // Ref to access the Slider instance

  // Handle custom arrows
  const goToNext = () => sliderRef.current.slickNext();
  const goToPrev = () => sliderRef.current.slickPrev();

  return (
    <div className="w-11/12 mx-auto px-4 py-16">
      <div className="flex justify-between items-center">
        <div className=" mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary from-0 to-15% to-secondary text-transparent bg-clip-text">
            Features
          </h2>
          <p className="text-gray-600 mt-4 lg:w-3/5">
            With easy-to-use tools and real-time updates, our feature section
            ensures that every user can manage their tasks and interactions
            effortlessly.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-gray-800 text-white p-3 rounded-full shadow-lg"
            onClick={goToPrev}
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            className=" bg-gray-800 text-white p-3 rounded-full shadow-lg"
            onClick={goToNext}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          <div className="p-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-semibold text-xl">Feature 1</h3>
              <p className="text-gray-600 mt-2">Description of Feature 1</p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-semibold text-xl">Feature 2</h3>
              <p className="text-gray-600 mt-2">Description of Feature 2</p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-semibold text-xl">Feature 3</h3>
              <p className="text-gray-600 mt-2">Description of Feature 3</p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-semibold text-xl">Feature 4</h3>
              <p className="text-gray-600 mt-2">Description of Feature 4</p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-semibold text-xl">Feature 5</h3>
              <p className="text-gray-600 mt-2">Description of Feature 5</p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
              <h3 className="font-semibold text-xl">Feature 6</h3>
              <p className="text-gray-600 mt-2">Description of Feature 6</p>
            </div>
          </div>
        </Slider>

        {/* Custom Arrow buttons */}
      </div>
    </div>
  );
}
