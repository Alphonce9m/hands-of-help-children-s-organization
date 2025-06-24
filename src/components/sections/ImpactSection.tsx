'use client';

import * as React from 'react';

const ImpactSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Impact Metrics */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">1,000+</h3>
            <p className="text-gray-600">Lives Impacted</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">10+</h3>
            <p className="text-gray-600">Communities Served</p>
          </div>
        </div>
        
        {/* Impact Stories */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                "Thanks to the support, we've been able to provide clean water to over 500 families in rural areas."
              </p>
              <p className="font-medium">- Community Leader</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                "The education programs have transformed our children's future. We're seeing real change in our community."
              </p>
              <p className="font-medium">- Local Teacher</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
