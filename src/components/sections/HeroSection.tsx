'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/Container';
import Button from '@/components/Button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/WhatsApp Image 2025-05-28 at 00.00.04_4d4186bf.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-black/70 to-accent/80" />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Empowering Communities Through Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            We are dedicated to providing quality education and opportunities to underprivileged children and youth in Kasabuni, Nairobi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/donate" 
              variant="primary"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Donate Now
            </Button>
            <Button 
              href="/volunteer" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Volunteer
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;