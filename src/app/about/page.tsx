'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import TeamSection from '@/components/sections/TeamSection';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Layout
      showHero={true}
      heroTitle="About Hands of Help"
      heroSubtitle="Empowering communities through education and support"
      heroImage="/gallery/IMG-20250528-WA0018.jpg"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-black to-accent opacity-80" />
      <Container>
        <div className="py-20 space-y-16">
          {/* Mission Section */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="gradient-text text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-primary">
              Hands of Help Children's Organization is dedicated to creating a future of opportunity 
              for children and young adults through education, digital literacy, and community support.
            </p>
          </section>

          {/* Vision & Values Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-gray-50 rounded-2xl shadow p-8 text-primary">
              <h3 className="gradient-text mb-4 text-xl font-semibold">Our Vision</h3>
              <p className="text-primary text-base">
                To be a leading force in community development, empowering individuals through 
                education and creating sustainable opportunities for growth.
              </p>
            </section>
            <section className="bg-gray-50 rounded-2xl shadow p-8 text-primary">
              <h3 className="gradient-text mb-4 text-xl font-semibold">Our Values</h3>
              <ul className="list-disc list-inside text-primary space-y-1">
                <li className="text-primary">Education and Empowerment</li>
                <li className="text-primary">Community Development</li>
                <li className="text-primary">Sustainability</li>
                <li className="text-primary">Innovation</li>
                <li className="text-primary">Inclusivity</li>
              </ul>
            </section>
          </div>

          <div className="card bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 text-primary">
            <section className="prose prose-lg max-w-none">
              <h2 className="gradient-text">Our Story</h2>
              <p className="text-primary">
                Founded in 2015, Hands of Help has grown from a small community initiative to a 
                comprehensive organization serving the needs of children and young adults in Kasabuni, 
                Nairobi. Our journey has been marked by continuous growth and adaptation to meet the 
                evolving needs of our community.
              </p>
            </section>
          </div>

        </div>
      </Container>
    </Layout>
  );
} 