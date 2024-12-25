import { useState } from "react";

const Carousel = ({img1,img2,img3,img4}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: img1,
      alt: "Slide 1",
    },
    {
      id: 2,
      image: img2,
      alt: "Slide 2",
    },
    {
      id: 3,
      image: img3,
      alt: "Slide 3",
    },
    {
      id: 4,
      image: img4,
      alt: "Slide 4",
    },
  ];

  const moveSlide = (direction) => {
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-2xl p-2 mx-auto mt-10">
      {/* Carousel Wrapper */}
      <div className="overflow-hidden">
        {/* Carousel Inner (Slides) */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-[500px] rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev & Next Buttons */}
      <button
        onClick={() => moveSlide(-1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={() => moveSlide(1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
