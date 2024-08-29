import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HeroSection.css'; // Custom CSS for additional styling
import Hero1 from '../../assets/Hero1.jpg';
import Hero2 from '../../assets/Hero2.jpg';
import Hero3 from '../../assets/Hero3.jpg';

const HeroSection = () => {
  return (
    <div className="bg-green-100 text-gray-800 min-h-screen flex items-center justify-center">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        className="w-full h-full"
      >
        <div className="relative">
          <img src={Hero1} alt="Charity Work 1" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold">Helping Hands</h2>
          </div>
        </div>
        <div className="relative">
          <img src={Hero2} alt="Charity Work 2" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold">Support the Needy</h2>
          </div>
        </div>
        <div className="relative">
          <img src={Hero3} alt="Charity Work 3" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold">Join Our Cause</h2>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSection;