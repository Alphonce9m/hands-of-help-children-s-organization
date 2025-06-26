'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import Skeleton from '@/components/ui/Skeleton';
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

  return (
    <main className="min-h-screen">
      <ErrorBoundary fallback={<ErrorFallback componentName="hero section" />}>
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback componentName="programs section" />}>
        <ProgramsSection />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback componentName="testimonials section" />}>
        <TestimonialsSection />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback componentName="call to action" />}>
        <CallToAction
          title="Join Our Mission"
          description="Your support can make a difference in the lives of children and youth in our community. Together, we can create lasting change through education and empowerment."
          buttons={[
            {
              text: "Donate Now",
              href: "/donate",
              variant: "primary"
            },
            {
              text: "Volunteer",
              href: "/volunteer", 
              variant: "outline"
            }
          ]}
        />
      </ErrorBoundary>

      <ScrollToTop />
    </main>
  );
};

export default HomePage;