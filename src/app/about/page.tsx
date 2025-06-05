'use client';

import React from 'react';
import Container from '@/components/Container';
import Section from '@/components/Section';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-black to-accent opacity-80" />
      
      <Container className="py-20">
        {/* Mission Section */}
        <Section className="mb-12">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-lg text-gray-700">
              Hands of Help Children's Organization is dedicated to creating a future of opportunity 
              for children and young adults through education, digital literacy, and community support.
            </p>
          </div>
        </Section>

        {/* Vision & Values Section */}
        <Section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl shadow p-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Our Vision</h3>
              <p className="text-gray-700">
                To be a leading force in community development, empowering individuals through 
                education and creating sustainable opportunities for growth.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl shadow p-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Our Values</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Integrity in all our actions</li>
                <li>• Compassion for those we serve</li>
                <li>• Excellence in program delivery</li>
                <li>• Innovation in problem-solving</li>
                <li>• Community partnership and collaboration</li>
                <li>• Inclusivity and diversity</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Our Story Section */}
        <Section>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Founded in 2015, Hands of Help has grown from a small community initiative to a 
                comprehensive organization serving the needs of children and young adults in Kasabuni, 
                Nairobi. Our journey has been marked by continuous growth and adaptation to meet the 
                evolving needs of our community.
              </p>
              <p>
                Through the dedication of our volunteers, partners, and supporters, we continue to expand 
                our programs and reach more communities in need of support and empowerment.
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}