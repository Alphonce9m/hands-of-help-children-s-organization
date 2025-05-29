'use client';

import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Section from '@/components/Section';
// import Image from 'next/image'; // No longer needed
import Link from 'next/link';

// Import the new ProgramsSection and ErrorBoundary
import ProgramsSection from '@/components/sections/ProgramsSection';
import ErrorBoundary from '@/components/ErrorBoundary';
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

export default function ProgramsPage() {
  const [isImpactHovered, setIsImpactHovered] = useState(false);
  const [isInvolvedHovered, setIsInvolvedHovered] = useState(false);

  return (
    <Layout
      showHero={true}
      heroTitle="Our Programs"
      heroSubtitle="Empowering communities through education and support"
      heroImage="/programs-hero.jpg"
    >
      <Container>
        <div className="py-16 space-y-12">
          <section className="prose prose-lg max-w-none">
            <h2 className="gradient-text">Education Programs</h2>
            <p>
              Our education programs focus on providing quality learning opportunities for children
              and young adults in our community.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="gradient-text mb-4">Community Library</h3>
              <p>
                A safe space for children to study, read, and access educational resources.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="gradient-text mb-4">E-Learning Center</h3>
              <p>
                Digital literacy programs and computer access for students.
              </p>
            </div>
          </section>

          <section className="prose prose-lg max-w-none">
            <h2 className="gradient-text">Community Support</h2>
            <p>
              We provide various support programs to help families and individuals in need.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="gradient-text mb-4">Food Security</h3>
              <p>
                Regular food distribution and nutrition programs.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="gradient-text mb-4">Healthcare</h3>
              <p>
                Basic healthcare services and health education.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="gradient-text mb-4">Skills Training</h3>
              <p>
                Vocational training and life skills development.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  );
} 