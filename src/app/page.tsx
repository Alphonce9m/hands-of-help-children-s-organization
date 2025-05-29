'use client';

import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import Skeleton from '@/components/ui/Skeleton';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Dynamically import heavy components with improved loading states
const HeroSection = dynamic(() => import('@/components/sections').then(mod => mod.HeroSection), {
  loading: () => (
    <div className="h-screen bg-gray-900">
      <Skeleton className="h-full w-full" />
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
    <div className="h-48 p-8">
      <Skeleton className="h-8 w-64 mx-auto mb-6" variant="text" />
      <Skeleton className="h-4 w-96 mx-auto mb-8" variant="text" />
      <div className="flex justify-center gap-6">
        <Skeleton className="h-12 w-32" variant="rectangular" />
        <Skeleton className="h-12 w-40" variant="rectangular" />
      </div>
    </div>
  )
});

const HomePage = () => {
  return (
    <Layout>
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProgramsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <TestimonialsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <CallToAction 
          title="Join Us in Making a Difference"
          description="Be part of our mission to create lasting change in communities. Your support can help us reach more people and make a greater impact."
          buttons={[
            {
              text: "Donate Now",
              href: "/donate",
              variant: "primary"
            },
            {
              text: "Learn More",
              href: "/about",
              variant: "outline"
            }
          ]}
        />
      </ErrorBoundary>
      <ScrollToTop />
    </Layout>
  );
};

export default HomePage; 