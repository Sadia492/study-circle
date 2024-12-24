import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import graduateIcon from "../assets/graduated.png";
import documentIcon from "../assets/document.png";
import clockIcon from "../assets/clock.png";
import searchIcon from "../assets/search.png";
import feedbackIcon from "../assets/conversation.png";
import folderIcon from "../assets/folder.png";

export default function Features() {
  // React Slick settings
  const settings = {
    infinite: true, // Make the slider infinite
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enable auto-play
    autoplaySpeed: 5000, // 5 seconds interval between auto-slides
    speed: 3000, // Set slide speed to 3000ms (3 seconds)
    arrows: false, // Disable default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 slides at a time for medium screens
          centerMode: true, // Optional: Center the active slide
        },
      },
      {
        breakpoint: 750,
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
          <p className="text-gray-400 mt-4 lg:w-3/5 mx-auto">
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

      <div className="relative h-full mx-auto">
        <Slider ref={sliderRef} {...settings}>
          <div className="p-4">
            <div className="bg-gray-200 p-8 rounded-2xl border-2 border-black/40 hover:bg-white hover:shadow-custom-light hover:border-none transition-all duration-500 space-y-4 between h-72 overflow-hidden">
              <div className="bg-gradient-to-tr from-secondary to-primary w-fit p-2 rounded-lg">
                <img className="w-10" src={graduateIcon} alt="" />
              </div>
              <h3 className="font-semibold text-xl">Collaborative Learning</h3>
              <p className="text-gray-600 mt-2">
                Connect with friends to create, complete, and evaluate
                assignments together. Foster teamwork and enjoy a group-study
                experience in one platform.
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-8 rounded-2xl border-2 border-black/40 hover:bg-white hover:shadow-custom-light hover:border-none transition-all duration-500 space-y-4 between h-72 overflow-hidden">
              <div className="bg-gradient-to-tr from-secondary to-primary w-fit p-2 rounded-lg">
                <img className="w-10" src={documentIcon} alt="" />
              </div>
              <h3 className="font-semibold text-xl">Assignment Management</h3>
              <p className="text-gray-600 mt-2">
                Effortlessly create, update, view, and delete assignments as
                needed. Keep assignments organized with user-friendly management
                tools.
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-8 rounded-2xl border-2 border-black/40 hover:bg-white hover:shadow-custom-light hover:border-none transition-all duration-500 space-y-4 between h-72 overflow-hidden">
              <div className="bg-gradient-to-tr from-secondary to-primary w-fit p-2 rounded-lg">
                <img className="w-10" src={clockIcon} alt="" />
              </div>
              <h3 className="font-semibold text-xl">Pending Reviews</h3>
              <p className="text-gray-600 ">
                Access and grade pending assignments submitted by your friends.
                Ensure timely evaluations to help others improve their skills.
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-8 rounded-2xl border-2 border-black/40 hover:bg-white hover:shadow-custom-light hover:border-none transition-all duration-500 space-y-4 between h-72 overflow-hidden">
              <div className="bg-gradient-to-tr from-secondary to-primary w-fit p-2 rounded-lg">
                <img className="w-10" src={searchIcon} alt="" />
              </div>
              <h3 className="font-semibold text-xl">Dynamic Filtering</h3>
              <p className="text-gray-600 mt-2">
                Filter assignments by difficulty or search by keywords to find
                tasks easily. Save time by narrowing results to what matches
                your interest or need.
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-8 rounded-2xl border-2 border-black/40 hover:bg-white hover:shadow-custom-light hover:border-none transition-all duration-500 space-y-4 between h-72 overflow-hidden">
              <div className="bg-gradient-to-tr from-secondary to-primary w-fit p-2 rounded-lg">
                <img className="w-10" src={feedbackIcon} alt="" />
              </div>
              <h3 className="font-semibold text-xl">Assignment Feedback</h3>
              <p className="text-gray-600 mt-2">
                Provide grades and detailed feedback for your friends'
                submissions. Help peers improve by sharing constructive comments
                and scores.
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-gray-200 p-8 rounded-2xl border-2 border-black/40 hover:bg-white hover:shadow-custom-light hover:border-none transition-all duration-500 space-y-4 between h-72 overflow-hidden">
              <div className="bg-gradient-to-tr from-secondary to-primary w-fit p-2 rounded-lg">
                <img className="w-10" src={folderIcon} alt="" />
              </div>
              <h3 className="font-semibold text-xl">JWT-Protected Routes</h3>
              <p className="text-gray-600 mt-2">
                Safeguard private pages with JWT tokens for authenticated user
                access. Ensure data security for sensitive operations on the
                platform.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
