'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { CallToActionProps } from '@/types/sections';

const defaultButtons = [
  {
    text: 'Donate Now',
    href: '/donate',
    variant: 'primary' as const
  },
  {
    text: 'Learn More',
    href: '/about',
    variant: 'outline' as const
  }
];

interface CallToActionRef {
  element: HTMLElement | null;
  // Add any other methods you want to expose
}

const CallToAction = forwardRef<CallToActionRef, CallToActionProps>(({ 
  title, 
  description, 
  buttons = defaultButtons,
  className = '' 
}, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Expose the ref methods
  useImperativeHandle(ref, () => ({
    get element() {
      return sectionRef.current;
    }
  }));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <Section 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
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

      <Container className="relative">
        <motion.div
          style={{ opacity, scale, y }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div 
              className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl -m-8"
              animate={{
                boxShadow: isHovered 
                  ? '0 0 30px rgba(255,255,255,0.1)' 
                  : '0 0 0px rgba(255,255,255,0)'
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative p-8 md:p-12">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                animate={{
                  textShadow: isHovered 
                    ? '0 0 20px rgba(255,255,255,0.3)' 
                    : '0 0 0px rgba(255,255,255,0)'
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h2>
              <motion.p 
                className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto"
                animate={{
                  opacity: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                {description}
              </motion.p>
              <div className="flex flex-wrap justify-center gap-4">
                {buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.href}
                    className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                      button.variant === 'primary'
                        ? 'bg-gradient-to-r from-primary via-black to-accent text-white hover:from-primary-dark hover:via-black hover:to-accent-dark'
                        : 'bg-white text-primary border-2 border-white hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative elements */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            />
          </>
        )}
      </AnimatePresence>
    </Section>
  );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;