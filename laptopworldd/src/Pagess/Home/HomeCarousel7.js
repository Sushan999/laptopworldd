import React, { useState, useEffect } from 'react';

const carouselItems = [
    {
        imageUrl: "https://www.asus.com/WebsitesBanner/NP/banners/kgh0snfbkhlecgun/kgh0snfbkhlecgun-0_0_desktop_0_1X.jpg?webp "
    },

    {
        imageUrl: "https://images.acer.com/is/image/acer/AI_PC_Banner-1:Primary-Hero-XL "
    },
    {
      imageUrl: "https://images.samsung.com/is/image/samsung/assets/us/galaxybooks/07152024/GBPCD-HD01-KV-GB4Ultra-D-V2.jpg?imwidth=1366 "
  },
    // Add more image URLs here
];

const HomeCarousel7 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto mt-4 sm:mt-8 md:mt-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] overflow-hidden rounded-lg shadow-lg">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={item.imageUrl} alt="" className="object-cover w-full h-full" />
          </div>
        ))}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel7;