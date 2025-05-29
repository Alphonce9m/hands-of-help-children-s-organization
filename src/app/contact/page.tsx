'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Section from '@/components/Section';
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
  }>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const [isContactInfoHovered, setIsContactInfoHovered] = useState(false);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isFAQHovered, setIsFAQHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Invalid email address';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        error: validationError
      });
      return;
    }

    setFormStatus({ isSubmitting: true, isSuccess: false, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ isSubmitting: false, isSuccess: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        error: 'Failed to send message. Please try again.'
      });
    }
  };

  const contactInfo = [
    {
      title: 'Our Location',
      content: '123 Community Street\nNairobi, Kenya\nP.O. Box 12345',
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )
    },
    {
      title: 'Contact Info',
      content: 'Email: info@community.org\nPhone: +254 123 456 789\nWhatsApp: +254 987 654 321',
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )
    },
    {
      title: 'Working Hours',
      content: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed',
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: 'How can I volunteer with your organization?',
      answer: 'We welcome volunteers in various capacities. You can apply through our volunteer portal, and our team will match your skills and interests with available opportunities.'
    },
    {
      question: 'What types of donations do you accept?',
      answer: 'We accept monetary donations, in-kind contributions, and corporate sponsorships. All donations are tax-deductible and directly support our programs.'
    },
    {
      question: 'How can I partner with your organization?',
      answer: 'We collaborate with businesses, educational institutions, and other organizations. Contact our partnerships team to discuss potential collaboration opportunities.'
    },
    {
      question: 'Do you offer internships or job opportunities?',
      answer: 'Yes, we regularly post internship and job opportunities on our careers page. Follow us on social media for the latest updates.'
    }
  ];

  return (
    <Layout
      showHero={true}
      heroTitle="Contact Us"
      heroSubtitle="Get in touch with our team"
      heroImage="/contact-hero.jpg"
    >
      <Container>
        <div className="py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="gradient-text text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  We'd love to hear from you. Reach out to us for any questions or to learn more about our programs.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-600">Kasabuni, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+254 718 782 488</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@handsofhelp.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="gradient-text text-2xl font-bold mb-6">Send us a Message</h2>
              {formStatus.isSuccess && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {formStatus.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {formStatus.error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="volunteer">Volunteering</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className={`w-full bg-gradient-to-r from-primary via-black to-accent text-white py-3 px-6 rounded-lg hover:from-primary-dark hover:via-black hover:to-accent-dark transition-all duration-300 ${
                    formStatus.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ContactPage; 