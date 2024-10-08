import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'BUDGET GAMING LAPTOPS', image: 'https://mudita.com.np/media/Budget-Gaming-Laptop_1.webp', path: '/gaming-laptops' },
  { name: 'MACBOOK PRO', image: 'https://mudita.com.np/media/Macbook_1.webp', path: '/macbook' },
  { name: 'BEST GAMING SERIES', image: 'https://mudita.com.np/media/Best-Gaming-Laptop_1_.webp', path: '/gaming-laptops' },
  { name: 'BUDGET LAPTOPS', image: 'https://mudita.com.np/media/Budget-Laptop.webp', path: '/notebook' },
  { name: 'APPLE MACBOOK', image: 'https://mudita.com.np/media/Macbook_1.webp', path: '/macbook' },
];

const CategoryCarousel = () => {
  return (
    <div className="container mx-auto px-4 mt-16">
      <h1 className="text-3xl font-bold text-center mb-4 font-sans">Categories For You</h1>
      <div className="flex flex-wrap justify-center space-x-0 space-y-8 mt-12 md:space-x-12 md:space-y-0">
        {categories.map((category, index) => (
          <Link to={category.path} key={index} className="flex flex-col items-center w-1/2 md:w-auto">
            <div className="bg-gray-100 rounded-full p-8 md:p-12 mb-3 transition-colors duration-300 hover:bg-gray-300">
              <img src={category.image} alt={category.name} className="w-24 h-24 md:w-40 md:h-40 object-contain" />
            </div>
            <p className="text-xs md:text-sm font-bold text-center max-w-[80px] md:max-w-[100px] leading-tight">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
