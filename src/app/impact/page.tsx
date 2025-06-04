'use client';

import Layout from '@/components/Layout';
import ImpactSection from '@/components/sections/ImpactSection';
import ErrorBoundary from '@/components/ErrorBoundary';

const ImpactPage = () => {
  return (
    <Layout heroTitle="Our Impact" heroSubtitle="See how your support is making a difference." heroImage="/gallery/IMG-20250604-WA0004.jpg">
      <ErrorBoundary>
        <ImpactSection />
      </ErrorBoundary>
    </Layout>
  );
};

export default ImpactPage; 