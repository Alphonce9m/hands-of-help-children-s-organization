'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { TestimonialsSectionProps, Testimonial } from '@/types/sections';

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

const defaultTestimonials: Testimonial[] = [
  {
    quote: 'The education program has transformed my children\'s future. They now have access to quality learning resources and dedicated teachers.',
    author: 'Sarah M.',
    role: 'Parent',
    image: '/images/IMG-20250514-WA0007.jpg'
  },
  {
    quote: 'As a volunteer, I\'ve seen firsthand how this organization creates lasting change in communities. The impact is truly remarkable.',
    author: 'John D.',
    role: 'Volunteer',
    image: '/images/IMG-20250514-WA0007.jpg'
  },
  {
    quote: 'The healthcare initiatives have brought essential medical services to our community. We\'re grateful for their support.',
    author: 'Dr. Michael K.',
    role: 'Community Health Worker',
    image: '/images/IMG-20250515-WA0009.jpg'
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = defaultTestimonials, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <Section ref={ref} className={`py-24 relative overflow-hidden ${className}`}>
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
      
      <Container className="relative">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              Stories of Impact
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Hear from the people whose lives have been transformed through our programs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.author}'s profile picture`}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-accent transition-colors duration-300">
                        {testimonial.author}
                      </h3>
                      <p className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-white/90 italic relative">
                    <div className="absolute -top-4 -left-2 text-4xl text-white/20 opacity-50">"</div>
                    {testimonial.quote}
                    <div className="absolute -bottom-4 -right-2 text-4xl text-white/20 opacity-50">"</div>
                  </blockquote>
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="h-0.5 bg-gradient-to-r from-white/50 to-white/80 mt-6"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TestimonialsSection; 