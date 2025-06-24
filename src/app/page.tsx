'use client';

<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Hero Section Component
const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/90 to-black/90 text-white overflow-hidden">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Empowering Communities Through Education</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        We are dedicated to providing quality education and opportunities to underprivileged children and youth.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/donate" 
          className="bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Donate Now
        </Link>
        <Link 
          href="/volunteer" 
          className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
        >
          Volunteer
        </Link>
      </div>
    </div>
  </section>
);

// Programs Section Component
const ProgramsSection = () => {
  const programs = [
    {
      title: 'Education Support',
      description: 'Providing school supplies, uniforms, and tuition assistance to ensure children can attend school.',
      icon: '📚'
    },
    {
      title: 'Mentorship',
      description: 'Connecting youth with mentors to guide them in their personal and professional development.',
      icon: '👥'
    },
    {
      title: 'Community Outreach',
      description: 'Engaging with local communities to identify and address their most pressing needs.',
      icon: '🌍'
    }
  ];
=======
import * as React from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import Skeleton from '@/components/ui/Skeleton';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ui/ScrollToTop';
import type { CallToActionProps } from '@/components/CallToAction';

// Dynamically import heavy components with improved loading states
const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection').then(mod => mod.default),
  { 
    loading: () => (
      <div className="relative h-screen bg-gradient-to-br from-primary/90 to-black/90">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" variant="text" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" variant="text" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" variant="rectangular" />
              <Skeleton className="h-12 w-40" variant="rectangular" />
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true
  }
);

const ProgramsSection = dynamic(
  () => import('@/components/sections/ProgramsSection').then(mod => mod.default),
  {
    loading: () => (
      <div className="py-20">
        <Skeleton className="h-96 w-full" />
      </div>
    ),
    ssr: true
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then(mod => mod.default),
  {
    loading: () => (
      <div className="py-20 bg-gray-50">
        <Skeleton className="h-96 w-full" />
      </div>
    ),
    ssr: true
  }
);

const CallToAction = dynamic<CallToActionProps>(
  () => import('@/components/CallToAction').then(mod => mod.default),
  {
    loading: () => (
      <div className="py-20 bg-primary-50">
        <Skeleton className="h-64 w-full" />
      </div>
    ),
    ssr: true
  }
);

const ErrorFallback = ({ componentName = 'component' }: { componentName?: string }) => (
  <div className="py-16 px-4 text-center">
    <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-xl p-8">
      <h3 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-4">
        We're having trouble loading the {componentName}. Please refresh the page or try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

const HomePage = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }
>>>>>>> main

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Thanks to this organization, my children can now attend school with all the necessary supplies.",
      author: "Sarah M., Parent",
      role: "Beneficiary"
    },
    {
      quote: "Volunteering here has been one of the most rewarding experiences of my life.",
      author: "John D., Volunteer",
      role: "Volunteer"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <div className="font-medium">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
const CallToAction = () => {
  const router = useRouter();
  
  return (
    <section className="bg-primary text-white py-16">
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
    </section>
  );
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Simple loading state
  }

  return (
    <main>
      <HeroSection />
      <ProgramsSection />
      <TestimonialsSection />
      <CallToAction />
    </main>
  );
}
=======
export default HomePage; 
>>>>>>> main
