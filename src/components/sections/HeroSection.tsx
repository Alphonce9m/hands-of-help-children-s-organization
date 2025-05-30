'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';

// Particle component for background effects
const Particle = ({ x, y, size, color, delay, index }: { x: number; y: number; size: number; color: string; delay: number; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Create different animation patterns based on index
  const getAnimationPattern = () => {
    const patterns = [
      // Circular motion
      {
        x: [x, x + 50 * Math.cos(index), x],
        y: [y, y + 50 * Math.sin(index), y],
        rotate: [0, 360],
      },
      // Zigzag motion
      {
        x: [x, x + 30, x - 30, x],
        y: [y, y + 30, y - 30, y],
        rotate: [0, 180, 360, 540],
      },
      // Wave motion
      {
        x: [x, x + 40 * Math.sin(index), x],
        y: [y, y + 20 * Math.cos(index), y],
        rotate: [0, 180, 360],
      },
      // Spiral motion
      {
        x: [x, x + 40 * Math.cos(index * 0.5), x],
        y: [y, y + 40 * Math.sin(index * 0.5), y],
        rotate: [0, 720],
      }
    ];
    return patterns[index % patterns.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        ...getAnimationPattern(),
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      whileHover={{
        scale: 2.5,
        opacity: 1,
        transition: { duration: 0.3 }
      }}
      transition={{
        duration: 4 + index * 0.2, // Vary duration based on index
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className="absolute rounded-full cursor-pointer"
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(1px)',
        boxShadow: `0 0 ${size}px ${color}`,
        mixBlendMode: 'screen',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay * 0.5,
        }}
        style={{
          background: color,
          filter: 'blur(2px)',
        }}
      />
    </motion.div>
  );
};

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; color: string; delay: number; index: number }>>([]);

  const heroImages = [
    '/images/WhatsApp Image 2025-05-28 at 00.00.07_cf18e7ef.jpg',
    '/images/WhatsApp Image 2025-05-28 at 00.00.06_920ea981.jpg',
    '/images/WhatsApp Image 2025-05-28 at 00.00.03_263ae540.jpg'
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Generate particles with enhanced properties
  useEffect(() => {
    const colors = [
      'rgba(59, 130, 246, 0.6)',  // blue
      'rgba(234, 179, 8, 0.6)',   // yellow
      'rgba(255, 255, 255, 0.6)', // white
      'rgba(0, 0, 0, 0.6)',       // black
    ];

    const newParticles = Array.from({ length: 40 }, (_, index) => {
      const baseColor = colors[index % colors.length];
      // Create size distribution: 20% small, 60% medium, 20% large
      const sizeDistribution = Math.random();
      const size = sizeDistribution < 0.2 
        ? Math.random() * 3 + 1  // Small particles
        : sizeDistribution < 0.8 
          ? Math.random() * 4 + 3  // Medium particles
          : Math.random() * 6 + 5;  // Large particles
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 3; // Increased delay range
      
      return {
        x,
        y,
        size,
        color: baseColor,
        delay,
        index,
      };
    });
    setParticles(newParticles);
  }, []);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Rotate through hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <Section 
      ref={ref} 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-yellow-500 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),rgba(0,0,0,0.3))]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-yellow-300/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5,
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
            rotate: isHovered ? [0, 5, 0] : 0
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-yellow-400/20 to-blue-300/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? [0.5, 0.7, 0.5] : 0.5,
            x: -mousePosition.x * 0.5,
            y: -mousePosition.y * 0.5,
            rotate: isHovered ? [0, -5, 0] : 0
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Enhanced Particles Container */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <Particle 
            key={index} 
            {...particle}
            index={index}
          />
        ))}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovered 
              ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)'
              : 'none'
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Parallax background image */}
      <motion.div
        style={{ y, opacity, scale, rotate }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Hero background"
              fill
              priority
              className="object-cover transition-opacity duration-1000"
              style={{ opacity: isLoaded ? 1 : 0 }}
              onLoad={handleImageLoad}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-yellow-500/10 to-blue-600/20"
          animate={{
            opacity: isHovered ? [0.2, 0.3, 0.2] : 0.2,
            scale: isHovered ? [1, 1.1, 1] : 1
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <Container className="relative h-full flex items-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-yellow-500/5 to-black/20 backdrop-blur-sm rounded-3xl -m-8"
              animate={{
                boxShadow: isHovered 
                  ? '0 0 30px rgba(59, 130, 246, 0.2)' 
                  : '0 0 0px rgba(59, 130, 246, 0)',
                x: mousePosition.x * 0.1,
                y: mousePosition.y * 0.1,
                rotate: isHovered ? [0, 1, 0] : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative p-8 md:p-12">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
              >
                Empowering Communities,
                <br />
                <span >
                  Transforming Lives
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-white mb-8 max-w-2xl"
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                  x: mousePosition.x * 0.03,
                  y: mousePosition.y * 0.03,
                  scale: isHovered ? [1, 1.01, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              >
                Join us in our mission to create lasting change through education, healthcare, and community development initiatives.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/donate" passHref>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-yellow-600 transition-colors duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                    aria-label="Donate Now - Opens in new page"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Donate Now
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
                <Link href="/about" passHref>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500/10 to-yellow-500/10 text-white rounded-xl font-semibold hover:from-blue-500/20 hover:to-yellow-500/20 transition-colors duration-300 backdrop-blur-sm border border-white/20 overflow-hidden"
                    aria-label="Learn More - Opens in new page"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Learn More
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>

      {/* Loading state */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary-600 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default HeroSection; 