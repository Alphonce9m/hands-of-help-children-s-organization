'use client';

import { FC, useState } from 'react';

import Section from '@/components/Section';
import Container from '@/components/Container';

import { motion, AnimatePresence } from 'framer-motion';

const FAQPage: FC = () => {
  const [activeSection, setActiveSection] = useState<string>('general');
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const sections = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'general', label: 'General' },
    { id: 'programs', label: 'Programs' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'donate', label: 'Donate' }
  ];

  const faqs = {
    general: [
      {
        id: 1,
        question: 'What is Hands of Help Children\'s Organization?',
        answer: 'Hands of Help is a non-profit organization dedicated to supporting vulnerable children and youth in our community through education, mentorship, and community development programs.'
      },
      {
        id: 2,
        question: 'Where are you located?',
        answer: 'We are based in Kasabuni, Nairobi, Kenya, serving the local community and surrounding areas.'
      },
      {
        id: 3,
        question: 'How can I contact you?',
        answer: 'You can reach us through our contact form, email (handsofhelpchildrenorg@gmail.com), or phone (+254 718 782 488).'
      }
    ],
    programs: [
      {
        id: 4,
        question: 'What programs do you offer?',
        answer: 'We offer various programs including educational support, community library services, youth leadership development, and social welfare services.'
      },
      {
        id: 5,
        question: 'How can children join your programs?',
        answer: 'Children can join through referrals from schools, community leaders, or by contacting us directly. We assess each case to ensure we can provide appropriate support.'
      },
      {
        id: 6,
        question: 'Are your programs free?',
        answer: 'Yes, all our programs are free for beneficiaries. We rely on donations and grants to provide these services.'
      }
    ],
    volunteer: [
      {
        id: 7,
        question: 'How can I volunteer?',
        answer: 'You can volunteer by filling out our volunteer application form on the website. We offer various opportunities in teaching, mentoring, and program support.'
      },
      {
        id: 8,
        question: 'What skills do I need to volunteer?',
        answer: 'We welcome volunteers with various skills. While specific programs may require particular expertise, enthusiasm and commitment are the most important qualities.'
      },
      {
        id: 9,
        question: 'Can I volunteer remotely?',
        answer: 'Yes, we offer some remote volunteering opportunities, particularly in areas like content creation, online tutoring, and administrative support.'
      }
    ],
    donate: [
      {
        id: 10,
        question: 'How can I donate?',
        answer: 'You can donate through our website using various payment methods including M-Pesa, bank transfer, or credit card.'
      },
      {
        id: 11,
        question: 'Is my donation tax-deductible?',
        answer: 'Yes, we are a registered non-profit organization, and donations are tax-deductible. We provide receipts for all donations.'
      },
      {
        id: 12,
        question: 'How are donations used?',
        answer: 'Donations are used to support our programs, including educational materials, program operations, and community services. We maintain transparency in our financial reporting.'
      }
    ]
  };

  const toggleQuestion = (id: number) => {
    setExpandedQuestions(prev =>
      prev.includes(id)
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-12">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">Frequently Asked Questions</h1>
        
        {/* FAQ Categories */}
        <Section className="py-8 bg-gray-50">
          <Container>
            <div className="flex flex-wrap gap-4 justify-center">
              {sections.filter(section => section.id !== 'home').map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ List */}
        <Section className="py-12">
          <Container>
            <div className="max-w-3xl mx-auto">
              {faqs[activeSection as keyof typeof faqs].map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{faq.question}</h3>
                      <span className="text-primary text-2xl">
                        {expandedQuestions.includes(faq.id) ? '−' : '+'}
                      </span>
                    </div>
                    <AnimatePresence>
                      {expandedQuestions.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-gray-600">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Contact Section */}
        <Section className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer you were looking for, feel free to contact us directly.
              </p>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Contact Us
              </button>
            </div>
          </Container>
        </Section>
      </Container>
    </div>
  );
};

export default FAQPage;