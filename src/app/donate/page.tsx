'use client';

import AutomatedDonationForm from './AutomatedDonationForm';

// Impact area type definition
// Type for impact areas
type ImpactArea = {
  title: string;
  description: string;
  amount: string;
  impact: string;
  popular: boolean;
  link?: string;
  linkText?: string;
};

const DonatePage = () => {
  const impactAreas = [
    {
      title: 'Education Support',
      description: 'Provide school supplies, uniforms, and educational resources for children in need.',

      amount: 'KES 1,000',
      impact: 'Supplies for 1 student',
      popular: false
    },
    {
      title: 'Library Development',
      description: 'Help maintain and expand our community library and e-learning center.',
  
      amount: 'KES 500',
      impact: 'Buys 5 new books',
      popular: false
    },
    {
      title: 'Youth Programs',
      description: 'Support leadership training and skills development programs for young people.',
      amount: 'KES 1,000',
      impact: 'Sponsors a student for a month',
      popular: true
    },
    {
      title: 'Community Outreach',
      description: 'Fund community engagement initiatives and social support programs.',
  
      amount: 'KES 20,000',
      impact: 'Supports a family for a month',
      popular: false
    }
  ];

  const otherWaysToHelp = [
    {
      title: 'Volunteer',
      description: 'Donate your time and skills to support our programs and initiatives.',
      link: '/volunteer',
      linkText: 'Join Our Team'
    },
    {
      title: 'Fundraise',
      description: 'Start a fundraiser and encourage others to support our cause.',
      link: '/fundraise',
      linkText: 'Start Fundraising'
    },
    {
      title: 'Partnerships',
      description: 'Explore corporate partnerships and sponsorship opportunities.',
      link: '/partnerships',
      linkText: 'Partner With Us'
    }
  ];

  return (
    
      <div className="py-10 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Donation Form */}
              <div className="p-6 sm:p-8 lg:border-r border-gray-100">
                <h2 className="gradient-text text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Make a Donation</h2>
                <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
                  Your generous contribution will help us continue our mission of empowering communities through education and support.
                </p>
                
                <div className="space-y-6">
                  <AutomatedDonationForm />
                </div>
                
                <div className="mt-8 bg-blue-50 p-5 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">Other Ways to Give</h3>
                  <div className="space-y-4">
                    {otherWaysToHelp.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <span className="text-primary text-lg sm:text-xl">•</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-base sm:text-inherit">{item.title}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.description}</p>
                          {item.linkText && (
                            <div className="inline-block">
                              <a 
                                href={item.link || '#'}
                                className="text-primary hover:text-primary-dark font-medium text-xs sm:text-sm mt-1"
                              >
                                {item.linkText} →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Impact Areas */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-primary/90 via-black/80 to-accent/80 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Your Impact</h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 text-white/90">
                  See how your donation can make a difference in the lives of those we serve.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  {impactAreas.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 sm:p-6 rounded-xl backdrop-blur-sm ${item.popular ? 'bg-white/20 border-2 border-accent' : 'bg-white/10'}`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Removed icon rendering */}
                        <div className="min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                            <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                            {item.popular && (
                              <span className="bg-accent text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full w-fit">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="mt-1 sm:mt-2 text-white/80 text-xs sm:text-sm">{item.description}</p>
                          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                            <p className="text-base sm:text-lg font-bold">{item.amount}</p>
                            <p className="text-xs sm:text-sm text-white/60">{item.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Need Help?</h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base text-white/80">
                    Have questions about donating? Our team is here to help.
                  </p>
                  <div className="w-full sm:w-auto">
                    <a 
                      href="/contact" 
                      className="inline-block w-full text-center bg-white text-primary px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    
  );
};

export default DonatePage;