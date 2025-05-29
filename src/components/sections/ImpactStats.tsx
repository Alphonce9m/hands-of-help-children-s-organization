'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { ImpactStatsProps, ImpactStat } from '@/types/sections';
import Image from 'next/image';

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

const defaultStats: ImpactStat[] = [
  {
    number: '5,000+',
    label: 'Children Educated',
    // icon: '📚'
    image: '/images/impact/impact-1.jpg'
  },
  {
    number: '10,000+',
    label: 'Lives Impacted',
    // icon: '❤️'
    image: '/images/impact/impact-2.jpg'
  },
  {
    number: '15+',
    label: 'Communities Served',
    // icon: '🏘️'
    image: '/images/impact/impact-3.jpg'
  },
  {
    number: '100+',
    label: 'Active Volunteers',
    icon: '👥'
  }
];

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/,/g, ''));

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

const ImpactStats: React.FC<ImpactStatsProps> = ({ stats = defaultStats, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, 0]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <Section ref={ref} className={`py-24 relative overflow-hidden ${className}`}>
      {/* Removed Modern gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" /> */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" /> */}

      <Container className="relative">
        <motion.div
          style={{ opacity, scale, y }}
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
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Making a difference in communities across Kenya
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative p-8 text-center">
                  <motion.div
                    className="mb-6 mx-auto flex items-center justify-center"
                    role="img"
                    aria-label={stat.label ?? ''}
                    whileHover={{
                      scale: 1.2,
                      rotate: stat.image ? 0 : [0, -10, 10, -10, 0], // Only rotate icon, not image
                      transition: { duration: 0.5 }
                    }}
                  >
                    {stat.image ? (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src={stat.image}
                          alt={stat.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-5xl">
                         {stat.icon}
                      </div>
                    )}
                  </motion.div>
                  <Counter value={stat.number} />
                  <div className="text-white/80 group-hover:text-white transition-colors duration-300 text-lg">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ImpactStats; 