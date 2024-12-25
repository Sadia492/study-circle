import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Slider settings with the afterChange callback
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    afterChange: (index) => setCurrentSlide(index), // Track the current slide index
  };
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co.com/4TS10sH/school-work-851328-1280.jpg",
      title: "Connect with Friends",
      title2: "Collaborate on Assignments Seamlessly",
      description:
        "Connect with your friends for group study sessions, share assignments, and exchange ideas in real-time. Learning is better when you're together!",
      titleAnimation: "animate__backInLeft",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/FwtBzw5/Planning-to-study-abroad.jpg",
      title: "Track Your Progress",
      title2: "Stay Ahead with Real-Time Updates",
      description:
        " Create assignments, complete tasks, and provide feedback to help each other grow. Foster collaboration while mastering your subjects.",
      titleAnimation: "animate__rubberBand",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/myZyhff/pexels-pixabay-301920.jpg",
      title: "Celebrate Success Together",
      title2: "Grade and Grow as a Team",
      description:
        "Monitor your completed assignments, grades, and feedback, all in one place. Stay motivated and focused on your academic journey.",
      titleAnimation: "animate__flipInY animate__slow",
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-screen object-top object-cover"
            />
            <div className="absolute top-0 flex flex-col pt-16 justify-center items-center  pl-6 h-screen text-white w-full left-0 z-30 font-bold space-y-4">
              <h1
                className={`text-5xl font-bold bg-gradient-to-r text-center from-primary to-secondary text-transparent bg-clip-text`}
              >
                {slide.title}
              </h1>
              <h1
                className={`text-5xl font-bold bg-gradient-to-r text-center from-secondary to-primary text-transparent bg-clip-text`}
              >
                {slide.title2}
              </h1>
              <p className={`lg:w-1/2 text-center text-white`}>
                {slide.description}
              </p>
              <a
                href="/assignments"
                className={` btn bg-gradient-to-r from-primary to-secondary text-white`}
              >
                Connect Now
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
