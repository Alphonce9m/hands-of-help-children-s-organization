'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { ProgramsSectionProps, Program } from '@/types/sections';

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

const defaultPrograms: Program[] = [
  {
    title: 'Education Support',
    description: 'Providing access to quality education and learning resources for underprivileged children.',
    image: '/images/WhatsApp Image 2025-05-28 at 00.00.06_920ea981.jpg',
    link: '/programs/education'
  },
  {
    title: 'Healthcare Access',
    description: 'Ensuring basic healthcare services and medical support for the community.',
    image: '/images/WhatsApp Image 2025-05-28 at 00.00.03_263ae540.jpg',
    link: '/programs/healthcare'
  },
  {
    title: 'Community Development',
    description: 'Building stronger communities through various development initiatives and programs.',
    image: '/images/WhatsApp Image 2025-05-28 at 00.00.07_cf18e7ef.jpg',
    link: '/programs/community'
  }
];

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ programs = defaultPrograms, className = '' }) => {
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
              Our Programs
            </h2>
            <p className="text-blue-600 text-lg max-w-2xl mx-auto">
              We offer comprehensive programs designed to address the most pressing needs in our communities
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {programs.map((program, index) => (
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
                <Link href={program.link}>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-8">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-blue-600">{program.title}</h3>
                        <p className="text-blue-600">{program.description}</p>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        className="h-0.5 bg-gradient-to-r from-primary-600 to-primary-800 mt-6"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ProgramsSection; 