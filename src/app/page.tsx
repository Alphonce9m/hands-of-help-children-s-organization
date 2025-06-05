'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';

// Dynamically import heavy components with simple loading states
const HeroSection = dynamic(() => import('@/components/sections').then(mod => mod.HeroSection), {
  loading: () => (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse">Loading hero section...</div>
    </div>
  )
});

const ProgramsSection = dynamic(() => import('@/components/sections').then(mod => mod.ProgramsSection), {
  loading: () => (
    <div className="py-16">
      <div className="animate-pulse text-center">Loading programs...</div>
    </div>
  )
});

const TestimonialsSection = dynamic(() => import('@/components/sections').then(mod => mod.TestimonialsSection), {
  loading: () => (
    <div className="py-16 bg-gray-50">
      <div className="animate-pulse text-center">Loading testimonials...</div>
    </div>
  )
});

// Inline call to action component since we're not using the dynamic import
const CallToAction = () => {
  const router = useRouter();
  
  return (
    <div className="bg-primary text-white py-16 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your support can make a difference in the lives of children and youth in our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/donate')}
            className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Donate Now
          </button>
          <button
            onClick={() => router.push('/volunteer')}
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            Volunteer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}