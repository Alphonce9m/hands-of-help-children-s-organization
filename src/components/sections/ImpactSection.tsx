import { FC, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { ImpactStatsProps, ImpactStat, ImpactImage, ImpactSectionProps } from '@/types/sections';

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

const defaultImpactImages: ImpactImage[] = [
  {
    src: '/images/IMG-20250515-WA0044.jpg',
    alt: 'Education Impact',
    title: 'Education Impact',
    description: 'Over 1,000 students supported through our educational programs'
  },
  {
    src: '/images/IMG-20250515-WA0045.jpg',
    alt: 'Healthcare Impact',
    title: 'Healthcare Impact',
    description: 'Providing healthcare services to more than 500 families'
  },
  {
    src: '/images/IMG-20250515-WA0047.jpg',
    alt: 'Community Impact',
    title: 'Community Impact',
    description: 'Engaging with 20+ communities across the region'
  }
];

const defaultStats: ImpactStat[] = [
  {
    number: '5,000+',
    label: 'Children Educated',
    image: '/images/IMG-20250515-WA0044.jpg'
  },
  {
    number: '10,000+',
    label: 'Lives Impacted',
    image: '/images/IMG-20250515-WA0045.jpg'
  },
  {
    number: '15+',
    label: 'Communities Served',
    image: '/images/IMG-20250515-WA0047.jpg'
  },
  {
    number: '100+',
    label: 'Active Volunteers',
    image: '/images/WhatsApp Image 2025-05-28 at 00.00.02_a5b2836a.jpg'
  }
];

const Counter = ({ value, duration = 2 }: { value: string | undefined; duration?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt((value || '0').replace(/,/g, ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return (
    <div ref={ref} className="text-5xl font-bold mb-2 text-white">
      {count.toLocaleString()}+
    </div>
  );
};

const ImpactSection: FC<ImpactSectionProps> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Section 
      ref={ref} 
      className={`py-24 relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary-300/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? [0.5, 0.7, 0.5] : 0.5
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <Container className="relative z-10">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Impact
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              See how we're making a difference in communities across the region
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defaultImpactImages.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-100 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={impact.src}
                    alt={impact.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">{impact.title}</h3>
                      <p className="text-white">{impact.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-1 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {defaultStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group"
              >
                <motion.div
                  className="mb-6 mx-auto flex items-center justify-center"
                  role="img"
                  aria-label={stat.label}
                  whileHover={{
                    scale: stat.image ? 1.1 : 1.2, // Slightly less scale for image
                    rotate: stat.image ? 0 : [0, -10, 10, -10, 0], // Only rotate icon, not image
                    transition: { duration: 0.5 }
                  }}
                >
                  {stat.image ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={stat.image}
                        alt={stat.label}
                        fill
                        className="object-cover"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="text-6xl text-primary-600 group-hover:text-primary-800 transition-colors duration-300">
                       {stat.icon}
                    </div>
                  )}
                </motion.div>
                <Counter value={stat.number} />
                <div className="text-white group-hover:text-white/90 transition-colors duration-300 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ImpactSection; 