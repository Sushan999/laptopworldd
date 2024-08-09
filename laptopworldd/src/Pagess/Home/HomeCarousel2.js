import React, { useState, useEffect } from 'react';

const carouselItems = [
    {
        imageUrl: "https://mudita.com.np/media/catalog/category/asus-laptop-price-in-nepal_1.webp",
    },

    {
      imageUrl: "https://www.asus.com/WebsitesBanner/NP/banners/sx6ixnjabkgug2o4/sx6ixnjabkgug2o4-0_0_desktop_0_1X.jpg?webp",
      
  },
    {
      imageUrl: "https://www.asus.com/WebsitesBanner/NP/banners/ocfrukvidsflxksk/ocfrukvidsflxksk-0_0_desktop_0_1X.jpg?webp "
  },
    // Add more image URLs here
];

const HomeCarousel2 = () => {
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

export default HomeCarousel2;