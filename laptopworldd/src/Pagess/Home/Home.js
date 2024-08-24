import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import LastCarousel from './LastCarousel';
import TopSellingCarousel from './TopSellingCarousel';
import ImagesCarousel1 from './ImagesCarousel1';
import MacbookCarousel from './MacbookCarousel';
import HomeCarousel4 from './HomeCarousel4';
import GamingCarousel from './GamingCarousel';
import UltrabookCarousel from './UltrabookCarousel';
import ImagesCarousel2 from './ImagesCarousel2';
import CategoryCarousel from './CategoryCarousel';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const slides = [
    {
      image: 'https://assets-prd.ignimgs.com/2022/04/25/acernitrolaptop-1650914214505.jpg',
      title: 'Acer Predetor Helios for Gaming',
      subtitle: 'NEW MEMBER BONUS',
      description: 'Extra $100 off first order of $1000+. Free membership gives any size business exclusive perks, savings + access to a tech specialist.',
      code: 'Use code NEWSMBOFFER',
    },
    {
      image: 'https://images2.alphacoders.com/458/458435.jpg',
      title: 'Macbook Pro for Business',
      subtitle: 'NEW MEMBER BONUS',
      description: 'Extra $100 off first order of $1000+. Free membership gives any size business exclusive perks, savings + access to a tech specialist.',
      code: 'Use code NEWSMBOFFER',
    },
    {
      image: 'https://appleinsider.ru/wp-content/uploads/2018/11/macbookft.jpg',
      title: 'Macbook Pro for Business',
      subtitle: 'NEW MEMBER BONUS',
      description: 'Extra $100 off first order of $1000+. Free membership gives any size business exclusive perks, savings + access to a tech specialist.',
      code: 'Use code NEWSMBOFFER',
    },
    // Add more slide objects here
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleBuyNow = () => {
    if (currentSlide === 0) {
      navigate('/gaming-laptops');
    } else if (currentSlide === 1) {
      navigate('/macbook');
    } else if (currentSlide === 2) {
      navigate('/macbook');
    } else {
     
      navigate('/'); //default route
    }
  };

  return (
    <div className="relative w-full overflow-hidden mt-16">
      <div className="relative z-10 h-[100vh] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center md:justify-start">
              <div className="container mx-auto px-6 md:px-12 text-white text-center md:text-left">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                <h2 className="text-lg md:text-2xl lg:text-3xl mb-4">{slide.subtitle}</h2>
                <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl">{slide.description}</p>
                <p className="text-base md:text-lg lg:text-xl mb-8">{slide.code}</p>
                <div className="space-x-4">

                  <button
                    onClick={handleBuyNow} // Attach the click handler
                    className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-20"
        >
          &gt;
        </button>
      </div>
      <div>
        <TopSellingCarousel/>
        <ImagesCarousel1/>
        <MacbookCarousel/>
        <CategoryCarousel/>
        <HomeCarousel4/>
        <ImagesCarousel2/>
        <GamingCarousel/>
        <UltrabookCarousel/>
        <LastCarousel/>
      </div>
    </div>
  );
};

export default Home;
