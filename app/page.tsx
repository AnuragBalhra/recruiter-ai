"use client";
import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Stats from '@/app/components/Stats';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Stats />
    </div>
  );
};

export default Index;
