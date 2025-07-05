import Hero1 from '../../assets/Hero1.jpg';
import Hero2 from '../../assets/Hero2.jpg';
import Hero3 from '../../assets/Hero3.jpg';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: Hero1,
      title: "Helping Hands",
      subtitle: "Making a difference in communities"
    },
    {
      image: Hero2,
      title: "Support the Needy",
      subtitle: "Your contribution matters"
    },
    {
      image: Hero3,
      title: "Join Our Cause",
      subtitle: "Together we can achieve more"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-8 mt-8">
      <div className="max-w-[1400px] w-full mx-auto"> {/* Custom max width */}
        {/* Header */}
        <div className="text-center mb-12">
         
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full"> {/* Ensure full width */}
          {/* Main Image Area */}
          <div className="relative h-[600px] overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <img 
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-between p-12">
                    {/* Left Content */}
                    <div className="text-white">
                      <h2 className="text-7xl font-bold mb-4 tracking-wide">
                        {slide.title.split(' ').map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h2>
                      <p className="text-xl opacity-90">{slide.subtitle}</p>
                    </div>
                    
                   
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-4 transition-all duration-200 shadow-md z-10"
          >
            <ChevronLeft className="w-8 h-8 text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-4 transition-all duration-200 shadow-md z-10"
          >
            <ChevronRight className="w-8 h-8 text-gray-800" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Side Previews */}
        
      </div>
    </div>
  );
};

export default HeroSection;