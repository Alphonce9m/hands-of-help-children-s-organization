'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 via-black/80 to-accent/80">
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">Our Programs</h1>
            <p className="text-xl text-white/90">
              Comprehensive programs designed to empower communities through education and support
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Education Programs */}
              <div className="p-8 lg:border-r border-gray-100 bg-white">
                <h2 className="text-3xl font-bold mb-6 text-primary">Education Programs</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Our education programs focus on providing quality learning opportunities for children
                  and young adults in our community.
                </p>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Community Library</h3>
                    <p className="text-gray-600">
                      A safe space for children to study, read, and access educational resources.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3 text-primary">E-Learning Center</h3>
                    <p className="text-gray-600">
                      Digital literacy programs and computer access for students.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3 text-primary">Youth Mentorship</h3>
                    <p className="text-gray-600">
                      Connecting young people with mentors for personal and professional development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Community Support */}
              <div className="p-8 bg-gradient-to-br from-primary/80 via-black/80 to-accent/80 text-white">
                <h2 className="text-3xl font-bold mb-6">Community Support</h2>
                <p className="text-lg mb-8 text-white/90">
                  We provide various support programs to help families and individuals in need.
                </p>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Skills Training</h3>
                    <p className="text-white/80">
                      Vocational training and life skills development programs.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Community Outreach</h3>
                    <p className="text-white/80">
                      Engaging with communities to identify and address pressing needs.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Support Services</h3>
                    <p className="text-white/80">
                      Providing essential support services to families in need.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
                  <p className="mb-4 text-white/80">
                    Join us in making a difference in our community through our various programs.
                  </p>
                  <Link 
                    href="/contact" 
                    className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}