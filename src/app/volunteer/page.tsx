'use client';

import { FC, useState } from 'react';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { motion } from 'framer-motion';

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

const VolunteerPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    availability: '',
    interests: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isOpportunitiesHovered, setIsOpportunitiesHovered] = useState(false);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isImpactHovered, setIsImpactHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically send the volunteer application to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        occupation: '',
        availability: '',
        interests: '',
        experience: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const opportunities = [
    {
      title: 'Education Support',
      description: 'Help children with their homework, provide tutoring, and support educational activities.',
      requirements: [
        'Patience and good communication skills',
        'Basic knowledge of primary school subjects',
        'Commitment to regular volunteering'
      ],
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Youth Mentorship',
      description: 'Guide and mentor young people, helping them develop life skills and achieve their goals.',
      requirements: [
        'Experience working with youth',
        'Strong interpersonal skills',
        'Commitment to long-term mentoring'
      ],
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Community Outreach',
      description: 'Engage with the community, organize events, and support our outreach programs.',
      requirements: [
        'Excellent communication skills',
        'Event planning experience',
        'Flexible schedule'
      ],
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m0 4h1m-1 4h1m8-10h1m-1 4h1m-1 4h1M3 21h18M12 10v6m3-3H9" />
        </svg>
      )
    },
    {
      title: 'Skills Training',
      description: 'Share your professional skills and knowledge with youth and community members.',
      requirements: [
        'Professional expertise in a specific field',
        'Teaching or training experience',
        'Ability to develop curriculum'
      ],
      icon: (
        <svg
          className="w-12 h-12 text-primary-600 group-hover:text-primary-800 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <Layout
      showHero={true}
      heroTitle="Volunteer With Us"
      heroSubtitle="Join our team of dedicated volunteers and make a difference in our community."
      heroImage="/images/IMG-20250515-WA0047.jpg"
    >
      {/* Opportunities Section */}
      <Section 
        className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100"
        onMouseEnter={() => setIsOpportunitiesHovered(true)}
        onMouseLeave={() => setIsOpportunitiesHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-400/20 rounded-full blur-3xl"
            animate={{
              scale: isOpportunitiesHovered ? [1, 1.2, 1] : 1,
              opacity: isOpportunitiesHovered ? [0.5, 0.8, 0.5] : 0.5
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
              scale: isOpportunitiesHovered ? [1, 1.1, 1] : 1,
              opacity: isOpportunitiesHovered ? [0.5, 0.7, 0.5] : 0.5
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
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Volunteer Opportunities</h2>
            <p className="text-black text-lg">
              We offer various opportunities for volunteers to contribute their time and skills. Find the role that best matches your interests and expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group"
              >
                <div className="mb-6 flex justify-center">
                  {opportunity.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">{opportunity.title}</h3>
                <p className="text-black mb-4">{opportunity.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-black">Requirements:</h4>
                  <ul className="list-disc list-inside text-black">
                    {opportunity.requirements.map((requirement, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {requirement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Application Form */}
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
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-primary-100"
            >
              <h2 className="text-3xl font-bold mb-6 text-black">Volunteer Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-black mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="18"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-black mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-black mb-1">
                      Availability
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300 bg-white"
                    >
                      <option value="">Select availability</option>
                      <option value="weekday-mornings">Weekday Mornings</option>
                      <option value="weekday-afternoons">Weekday Afternoons</option>
                      <option value="weekday-evenings">Weekday Evenings</option>
                      <option value="weekends">Weekends</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-black mb-1">
                      Areas of Interest
                    </label>
                    <select
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300 bg-white"
                    >
                      <option value="">Select area of interest</option>
                      <option value="education">Education Support</option>
                      <option value="mentorship">Youth Mentorship</option>
                      <option value="outreach">Community Outreach</option>
                      <option value="skills">Skills Training</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-black mb-1">
                    Relevant Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                    placeholder="Describe your relevant experience and skills"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-300"
                    placeholder="Any additional information you'd like to share"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/50 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? <span className="text-black">Submitting...</span> : <span className="text-black">Submit Application</span>}
                </button>

                {submitStatus === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-700 text-center mt-4 p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span className="text-black">Thank you for your application! We'll be in touch soon.</span>
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-700 text-center mt-4 p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <span className="text-black">Failed to submit application. Please try again.</span>
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section 
        className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 text-white"
        onMouseEnter={() => setIsImpactHovered(true)}
        onMouseLeave={() => setIsImpactHovered(false)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/15 rounded-full blur-3xl"
            animate={{
              scale: isImpactHovered ? [1, 1.2, 1] : 1,
              opacity: isImpactHovered ? [0.4, 0.6, 0.4] : 0.4
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/15 rounded-full blur-3xl"
            animate={{
              scale: isImpactHovered ? [1, 1.1, 1] : 1,
              opacity: isImpactHovered ? [0.4, 0.5, 0.4] : 0.4
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Volunteer Impact</h2>
              <p className="text-white/80 text-lg">
                See the difference our volunteers make in the community.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="text-4xl font-bold mb-2 text-black">100+</div>
                <p className="text-black">Active Volunteers</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="text-4xl font-bold mb-2 text-black">5000+</div>
                <p className="text-black">Hours Donated</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="text-4xl font-bold mb-2 text-black">1000+</div>
                <p className="text-black">Lives Impacted</p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default VolunteerPage;