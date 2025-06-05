'use client';

import Image from 'next/image';
import Link from 'next/link';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

const leadershipTeam: TeamMember[] = [
  {
    name: 'Kennedy Otieno',
    position: 'Executive Director',
    image: '/LEADERS/KENNEDY.jpg',
    bio: 'Leading the organization with over 15 years of experience in community development and non-profit management.'
  },
  {
    name: 'Elishifa Muthoni',
    position: 'Assistant Executive Director',
    image: '/LEADERS/ELISHIFA.jpg',
    bio: 'Supporting organizational leadership with expertise in program development and community engagement.'
  },
  {
    name: 'Claris Oprah',
    position: 'Head of Operations',
    image: '/LEADERS/CLARRIS.jpg',
    bio: 'Overseeing day-to-day operations and ensuring efficient program delivery across all initiatives.'
  }
];

const managementTeam: TeamMember[] = [
  {
    name: 'Eden Mwikali',
    position: 'Head of Administration',
    image: '/LEADERS/EDEN.jpg',
    bio: 'Ensuring organizational effectiveness and smooth administrative operations across all departments.'
  },
  {
    name: 'Alphonce Mdaki',
    position: 'IT & Business Development',
    image: '/LEADERS/ALPHONCE.jpg',
    bio: 'Driving technological innovation and business growth strategies for sustainable impact.'
  },
  {
    name: 'Macy Tarus',
    position: 'Assistant Operations Lead',
    image: '/LEADERS/MACY.jpg',
    bio: 'Managing resource mobilization efforts and supporting operational excellence.'
  },
  {
    name: 'David Ochieng',
    position: 'Programs Lead',
    image: '/LEADERS/DAVID.jpg',
    bio: 'Leading program development and implementation across all community initiatives.'
  }
];

export default function TeamPage() {
  return (
    
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Leadership Team */}
              <div className="p-8 lg:border-r border-gray-100 bg-white">
                <h2 className="gradient-text text-3xl font-bold mb-6">Leadership Team</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Our executive leadership brings together decades of experience in community development,
                  non-profit management, and social impact initiatives to guide our organization's vision and strategy.
                </p>
                
                <div className="space-y-6">
                  {leadershipTeam.map((member) => (
                    <div key={member.name} className="flex gap-6 items-start p-6 bg-gray-50 rounded-xl">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="gradient-text text-xl font-semibold">{member.name}</h3>
                        <p className="text-primary font-medium mb-2">{member.position}</p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Management Team */}
              <div className="p-8 bg-gradient-to-br from-primary/80 via-black/80 to-accent/80 text-white">
                <h2 className="text-3xl font-bold mb-6">Management Team</h2>
                <p className="text-lg mb-8 text-white/90">
                  Our management professionals oversee the day-to-day operations and program implementation,
                  ensuring we deliver maximum impact in the communities we serve.
                </p>
                
                <div className="space-y-6">
                  {managementTeam.map((member) => (
                    <div key={member.name} className="flex gap-4 items-start p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-white/20">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-accent/80 font-medium mb-2">{member.position}</p>
                        <p className="text-white/80 text-sm">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3">Join Our Team</h3>
                  <p className="mb-4 text-white/80">
                    Interested in joining our dedicated team? We're always looking for passionate individuals to help us make a difference.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
 