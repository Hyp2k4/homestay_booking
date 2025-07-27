// components/Hero.js
import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ 
  imageUrl, 
  title, 
  subtitle,
  height = '90vh',
  
}) => {
  return (
    <div 
      className="relative w-full"
      style={{ height: height }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {title && (
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl text-white max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

Hero.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  height: PropTypes.string,
  overlayOpacity: PropTypes.number
};

export default Hero;