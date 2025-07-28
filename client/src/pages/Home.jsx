import React from 'react';
import Hero from '../components/Hero';
import FeaturedDestination from '../components/FeaturedDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';


const Home = () => {
  return (
    <div>
      <Hero imageUrl="/src/assets/heroImage.png">
        <div className="flex flex-col items-start ml-4">
          <p className="bg-[#49B9FF]/50 px-2 py-1 rounded-full mt-20 w-fit text-sm">
            The Ultimate Hotel Experience
          </p>
          <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4 text-left">
            Discover Your Perfect Gateway Destination
          </h1>
          <p className="mt-4">
            Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
          </p>
        </div>
      </Hero>
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Home;