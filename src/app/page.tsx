'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import Skeleton from '@/components/ui/Skeleton';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { cn } from '@/lib/utils';

// Dynamically import heavy components with improved loading states
const HeroSection = dynamic(() => import('@/components/sections').then(mod => mod.HeroSection), {
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
  )
});

const ProgramsSection = dynamic(() => import('@/components/sections').then(mod => mod.ProgramsSection), {
  loading: () => (
    <div className="h-96 p-8">
      <Skeleton className="h-8 w-48 mx-auto mb-8" variant="text" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-32 mb-4" variant="text" />
              <Skeleton className="h-4 w-full" variant="text" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
});

const TestimonialsSection = dynamic(() => import('@/components/sections').then(mod => mod.TestimonialsSection), {
  loading: () => (
    <div className="h-96 p-8 bg-gray-50">
      <Skeleton className="h-8 w-48 mx-auto mb-8" variant="text" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="w-12 h-12" variant="circular" />
              <div>
                <Skeleton className="h-5 w-24 mb-2" variant="text" />
                <Skeleton className="h-4 w-32" variant="text" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" variant="text" />
          </div>
        ))}
      </div>
    </div>
  )
});

const CallToAction = dynamic(() => import('@/components/sections').then(mod => mod.CallToAction), {
  loading: () => (
    <div className="py-20 px-4 bg-gradient-to-br from-primary/90 to-black/90 text-white">
      <div className="max-w-6xl mx-auto">
        <Skeleton className="h-10 w-3/4 max-w-md mx-auto mb-6" variant="text" />
        <Skeleton className="h-6 w-1/2 max-w-2xl mx-auto mb-10" variant="text" />
        <div className="flex flex-wrap justify-center gap-6">
          <Skeleton className="h-14 w-40" variant="rectangular" />
          <Skeleton className="h-14 w-48" variant="rectangular" />
        </div>
      </div>
    </div>
  )
});

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <Layout>
      <ErrorBoundary fallback={<ErrorFallback componentName="HeroSection" />}>
        <HeroSection />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<ErrorFallback componentName="ProgramsSection" />}>
        <ProgramsSection />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<ErrorFallback componentName="TestimonialsSection" />}>
        <TestimonialsSection />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback componentName="CallToAction" />}>
        <CallToAction 
          title="Join Us in Making a Difference"
          description="Your support helps us provide education, healthcare, and nutrition to children in need. Together, we can create lasting change in our communities."
          buttons={[
            {
              text: "Donate Now",
              href: "/donate",
              variant: "primary"
            },
            {
              text: "Become a Volunteer",
              href: "/volunteer",
              variant: "outline"
            }
          ]}
        />
      </ErrorBoundary>
      
      <ScrollToTop />
    </Layout>
  );
};

// Custom error fallback component
const ErrorFallback = ({ componentName }: { componentName: string }) => (
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

export default HomePage; 