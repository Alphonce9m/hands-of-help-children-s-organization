'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Card from '@/components/Card';

interface Program {
  title: string;
  description: string;
  icon: string;
  image: string;
}

const ProgramsSection = () => {
  const programs: Program[] = [
    {
      title: 'Education Support',
      description: 'Providing school supplies, uniforms, and tuition assistance to ensure children can attend school.',
      icon: '📚',
      image: '/images/IMG-20250514-WA0006.jpg'
    },
    {
      title: 'Community Library',
      description: 'A safe space for children to study, read, and access educational resources including computers.',
      icon: '📖',
      image: '/images/IMG-20250514-WA0007.jpg'
    },
    {
      title: 'Youth Mentorship',
      description: 'Connecting youth with mentors to guide them in their personal and professional development.',
      icon: '👥',
      image: '/images/IMG-20250515-WA0009.jpg'
    },
    {
      title: 'Digital Literacy',
      description: 'Teaching computer skills and providing internet access to bridge the digital divide.',
      icon: '💻',
      image: '/images/IMG-20250515-WA0006.jpg'
    },
    {
      title: 'Skills Training',
      description: 'Vocational training programs to equip youth with practical skills for employment.',
      icon: '🔧',
      image: '/images/IMG-20250515-WA0020.jpg'
    },
    {
      title: 'Community Outreach',
      description: 'Engaging with local communities to identify and address their most pressing needs.',
      icon: '🌍',
      image: '/images/IMG-20250515-WA0007.jpg'
    }
  ];

  return (
    <Section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive programs designed to empower children and youth through education, 
            skills development, and community support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 mb-4">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full">
                    <span className="text-2xl">{program.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ProgramsSection;