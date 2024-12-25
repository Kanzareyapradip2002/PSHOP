import { useState, useEffect, useCallback } from "react";
import img1 from '../../assest/banner/img1.jpg';
import img2 from '../../assest/banner/img2.jpg';
import img3 from '../../assest/banner/img3.jpg';
import img4 from '../../assest/banner/img4.jpg';
import img5 from '../../assest/banner/img5.jpg';

const CarouselHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { id: 1, image: img1, alt: "Slide 1" },
    { id: 2, image: img2, alt: "Slide 2" },
    { id: 3, image: img3, alt: "Slide 3" },
    { id: 4, image: img4, alt: "Slide 4" },
    { id: 5, image: img5, alt: "Slide 5" },
  ];

  const moveSlide = useCallback((direction) => {
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]); // Memoize the function with the dependencies

  // Auto-slide functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSlide(1); // Move to the next slide
    }, 3000); // Change slide every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [moveSlide]); // moveSlide is now stable due to useCallback

  return (
    <div className="relative w-full max-w-7xl p-2 mt-10 ">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full rounded-lg shadow-md h-[150px] lg:h-[270px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselHome;
