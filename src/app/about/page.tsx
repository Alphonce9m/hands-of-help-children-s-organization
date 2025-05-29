'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
      heroImage="/images/IMG-20250515-WA0044.jpg"
    >
      <Container>
        <div className="py-16 space-y-12">
          <section className="prose prose-lg max-w-none">
            <h2 className="gradient-text">Our Mission</h2>
            <p>
              Hands of Help Children's Organization is dedicated to creating a future of opportunity 
              for children and young adults through education, digital literacy, and community support.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="gradient-text mb-4">Our Vision</h3>
              <p>
                To be a leading force in community development, empowering individuals through 
                education and creating sustainable opportunities for growth.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="gradient-text mb-4">Our Values</h3>
              <ul className="gradient-list">
                <li>Education and Empowerment</li>
                <li>Community Development</li>
                <li>Sustainability</li>
                <li>Innovation</li>
                <li>Inclusivity</li>
              </ul>
            </div>
          </section>

          <section className="prose prose-lg max-w-none">
            <h2 className="gradient-text">Our Story</h2>
            <p>
              Founded in [Year], Hands of Help has grown from a small community initiative to a 
              comprehensive organization serving the needs of children and young adults in Kasabuni, 
              Nairobi. Our journey has been marked by continuous growth and adaptation to meet the 
              evolving needs of our community.
            </p>
          </section>
        </div>
      </Container>
    </Layout>
  );
} 