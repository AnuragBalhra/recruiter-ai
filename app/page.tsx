import React from 'react';
import Hero from '@/app/components/home/Hero';
import Features from '@/app/components/home/Features';
import Stats from '@/app/components/home/Stats';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Stats />
    </div>
  );
};
export default Home;