'use client';

import { FC, useState } from 'react';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ImpactStat } from '@/types/sections';
import MpesaPayment from '@/components/MpesaPayment';
import { useRouter } from 'next/navigation';

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

const DonatePage: FC = () => {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isImpactHovered, setIsImpactHovered] = useState(false);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isWhyDonateHovered, setIsWhyDonateHovered] = useState(false);
  const [isOtherWaysHovered, setIsOtherWaysHovered] = useState(false);

  const predefinedAmounts = [
    { value: 1000, label: 'KSH 1,000' },
    { value: 2500, label: 'KSH 2,500' },
    { value: 5000, label: 'KSH 5,000' },
    { value: 10000, label: 'KSH 10,000' }
  ];

  const impactAreas: ImpactStat[] = [
    {
      title: 'Education Support',
      description: 'Provide school supplies, uniforms, and educational resources for children in need.',
      image: '/images/WhatsApp Image 2025-05-28 at 00.00.07_cf18e7ef.jpg',
      label: 'Education Support'
    },
    {
      title: 'Library Development',
      description: 'Help maintain and expand our community library and e-learning center.',
      image: '/images/WhatsApp Image 2025-05-28 at 00.00.06_ec93febf.jpg',
      label: 'Library Development'
    },
    {
      title: 'Youth Programs',
      description: 'Support leadership training and skills development programs for young people.',
      image: '/images/WhatsApp Image 2025-05-28 at 00.00.06_920ea981.jpg',
      label: 'Youth Programs'
    },
    {
      title: 'Community Outreach',
      description: 'Fund community engagement initiatives and social support programs.',
      image: '/images/WhatsApp Image 2025-05-28 at 00.00.06_867be25a.jpg',
      label: 'Community Outreach'
    }
  ];

  const handlePaymentSuccess = (data: any) => {
    setSubmitStatus('success');
    // Redirect to thank you page after a short delay
    setTimeout(() => {
      router.push(`/donate/thank-you?reference=${data.donationId}`);
    }, 2000);
  };

  const handlePaymentError = (error: any) => {
    setSubmitStatus('error');
    console.error('Payment error:', error);
  };

  return (
    <Layout
      showHero={true}
      heroTitle="Make a Difference Today"
      heroSubtitle="Your donation helps us continue our mission of empowering communities through education and support."
      heroImage="/images/IMG-20250515-WA0053.jpg"
    >
      {/* Impact Areas */}
      <Section 
        className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100"
        onMouseEnter={() => setIsImpactHovered(true)}
        onMouseLeave={() => setIsImpactHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-400/20 rounded-full blur-3xl"
            animate={{
              scale: isImpactHovered ? [1, 1.2, 1] : 1,
              opacity: isImpactHovered ? [0.5, 0.8, 0.5] : 0.5
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
              scale: isImpactHovered ? [1, 1.1, 1] : 1,
              opacity: isImpactHovered ? [0.5, 0.7, 0.5] : 0.5
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">Your Impact</h2>
              <p className="text-gray-600 text-lg">
                Here's how your donation will be used to make a difference
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {impactAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-primary-200/30">
                    {area.image ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={area.image}
                          alt={area.title || area.label || 'Impact Area Image'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-4xl text-primary-600 group-hover:text-primary-800 transition-colors duration-300">{area.icon}</div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-blue-600">{area.title}</h3>
                  <p className="text-blue-600">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Donation Form */}
      <Section 
        className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
        onMouseEnter={() => setIsFormHovered(true)}
        onMouseLeave={() => setIsFormHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-400/20 rounded-full blur-3xl"
            animate={{
              scale: isFormHovered ? [1, 1.2, 1] : 1,
              opacity: isFormHovered ? [0.5, 0.8, 0.5] : 0.5
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
              scale: isFormHovered ? [1, 1.1, 1] : 1,
              opacity: isFormHovered ? [0.5, 0.7, 0.5] : 0.5
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">Make a Donation</h2>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      type="button"
                      onClick={() => setSelectedAmount(amount.value)}
                      className={`p-4 text-center rounded-lg border-2 transition-colors duration-300 ${
                        selectedAmount === amount.value
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-300 hover:border-primary-600'
                      }`}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
              </div>

              <MpesaPayment
                defaultAmount={selectedAmount}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                  Payment initiated successfully! Please check your phone for the M-Pesa prompt.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                  There was an error processing your payment. Please try again.
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Other Ways to Support */}
      <Section 
        className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
        onMouseEnter={() => setIsOtherWaysHovered(true)}
        onMouseLeave={() => setIsOtherWaysHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-400/20 rounded-full blur-3xl"
            animate={{
              scale: isOtherWaysHovered ? [1, 1.2, 1] : 1,
              opacity: isOtherWaysHovered ? [0.5, 0.8, 0.5] : 0.5
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
              scale: isOtherWaysHovered ? [1, 1.1, 1] : 1,
              opacity: isOtherWaysHovered ? [0.5, 0.7, 0.5] : 0.5
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Other Ways to Support</h2>
              <p className="text-white text-lg">
                Explore other ways you can contribute to our mission.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-600">Volunteer With Us</h3>
                <p className="text-blue-600 mb-4">
                  Share your time and skills to make a difference in our community. We welcome volunteers in various areas.
                </p>
                <a
                  href="/volunteer"
                  className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/50"
                >
                  Learn More →
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-600">Corporate Partnership</h3>
                <p className="text-blue-600 mb-4">
                  Partner with us to create meaningful impact through corporate social responsibility initiatives.
                </p>
                <a
                  href="/partners"
                  className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/50"
                >
                  Learn More →
                </a>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default DonatePage; 