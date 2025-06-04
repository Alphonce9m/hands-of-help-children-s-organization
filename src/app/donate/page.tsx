'use client';

import { FC, useState } from 'react';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ImpactStat } from '@/types/sections';
// import { PaymentButton } from '@/components/mpanga/PaymentButton';
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

// const paymentMethods = [
//   {
//     id: 'mpesa',
//     name: 'M-Pesa',
//     icon: '/icons/mpesa.svg'
//   }
// ];

const DonatePage: FC = () => {
  const router = useRouter();
  // const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isImpactHovered, setIsImpactHovered] = useState(false);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isWhyDonateHovered, setIsWhyDonateHovered] = useState(false);
  const [isOtherWaysHovered, setIsOtherWaysHovered] = useState(false);

  // const predefinedAmounts = [
  //   { value: 1000, label: 'KSH 1,000' },
  //   { value: 2500, label: 'KSH 2,500' },
  //   { value: 5000, label: 'KSH 5,000' },
  //   { value: 10000, label: 'KSH 10,000' },
  //   { value: 25000, label: 'KSH 25,000' },
  //   { value: 50000, label: 'KSH 50,000' }
  // ];

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

  // const handlePaymentSuccess = (data: any) => {
  //   setSubmitStatus('success');
  //   // Redirect to thank you page after a short delay
  //   setTimeout(() => {
  //     router.push(`/donate/thank-you?reference=${data.donationId}`);
  //   }, 2000);
  // };

  // const handlePaymentError = (error: any) => {
  //   setSubmitStatus('error');
  //   console.error('Payment error:', error);
  // };

  return (
    <>

      <Layout
        showHero={true}
        heroTitle="Make a Difference Today"
        heroSubtitle="Your donation helps us continue our mission of empowering communities through education and support."
        heroImage="/images/IMG-20250515-WA0053.jpg"
      >
        <div className="w-full flex flex-col items-center justify-center px-2 pt-8 pb-4 bg-white/95 border-b border-gray-200">
          <div className="max-w-6xl w-full">
            <section className="prose prose-lg max-w-none mb-8">
              <h2 className="gradient-text mb-4">How to Donate via M-PESA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image src="/payment doc/paybill.jpg" alt="M-PESA Paybill" width={500} height={350} className="rounded-xl mb-4 object-contain" />
                  <div className="font-semibold text-center">M-PESA Paybill (Hands of Help Childrens)</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image src="/payment doc/till.jpg" alt="M-PESA Buy Goods Till" width={500} height={350} className="rounded-xl mb-4 object-contain" />
                  <div className="font-semibold text-center">M-PESA Buy Goods Till (Havens)</div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gray-50" />
        <Section className="py-20 md:py-28 space-y-16 md:space-y-24">
          <Container>
            <section className="prose prose-lg max-w-none mb-8">
              <h2 className="gradient-text mb-4">Why Donate?</h2>
              <p>
                Your support provides education, healthcare, and hope to children and families in need. Every donation, big or small, makes a lasting impact.
              </p>
            </section>

            <section className="prose prose-lg max-w-none mb-8">
              <h2 className="gradient-text mb-4">Your Impact</h2>
              <p className="text-gray-600 text-lg mb-4">
                Here's how your donation will be used to make a difference
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {impactAreas.map((area, index) => (
                  <div
                    key={index}
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
                  </div>
                ))}
              </div>
            </section>

            <section className="prose prose-lg max-w-none mb-8">
              <h2 className="gradient-text mb-4">Other Ways to Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group">
                  <h3 className="text-xl font-bold mb-4">Volunteer With Us</h3>
                  <p className="mb-4">
                    Share your time and skills to make a difference in our community. We welcome volunteers in various areas.
                  </p>
                  <a
                    href="/volunteer"
                    className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/50"
                  >
                    Learn More →
                  </a>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group">
                  <h3 className="text-xl font-bold mb-4">Corporate Partnership</h3>
                  <p className="mb-4">
                    Partner with us to create meaningful impact through corporate social responsibility initiatives.
                  </p>
                  <a
                    href="/partners"
                    className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/50"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </section>


          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default DonatePage;