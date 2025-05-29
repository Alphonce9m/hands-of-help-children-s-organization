'use client';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Image from 'next/image';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Kennedy Otieno',
    position: 'Executive Director',
    image: '/images/team/team-1.jpg',
    bio: 'Leading the organization with over 15 years of experience in community development and non-profit management.'
  },
  {
    name: 'Elishifa Muthoni',
    position: 'Assistant Executive Director',
    image: '/images/team/team-2.jpg',
    bio: 'Supporting organizational leadership with expertise in program development and community engagement.'
  },
  {
    name: 'Claris Oprah',
    position: 'Head of Operations',
    image: '/images/team/team-3.jpg',
    bio: 'Overseeing day-to-day operations and ensuring efficient program delivery across all initiatives.'
  },
  {
    name: 'Alphonse Mudaki',
    position: 'IT & Business Development Manager',
    image: '/images/team/team-4.jpg',
    bio: 'Driving technological innovation and business growth strategies for sustainable impact.'
  },
  {
    name: 'Macy Tarus',
    position: 'Assistant Operations Lead & Resource Mobilization',
    image: '/images/team/team-5.jpg',
    bio: 'Managing resource mobilization efforts and supporting operational excellence.'
  },
  {
    name: 'David Ochieng',
    position: 'Programs Lead',
    image: '/images/team/team-6.jpg',
    bio: 'Leading program development and implementation across all community initiatives.'
  },
  {
    name: 'Martha',
    position: 'Operations Coordinator',
    image: '/images/team/team-7.jpg',
    bio: 'Coordinating operational activities and ensuring smooth program execution across all departments.'
  }
];

export default function TeamPage() {
  return (
    <Layout
      showHero={true}
      heroTitle="Our Leadership Team"
      heroSubtitle="Meet the dedicated professionals driving our mission forward"
      heroImage="/images/IMG-20250515-WA0045.jpg"
    >
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our diverse team of experienced professionals brings together expertise in community development, 
              education, technology, and operations to create lasting impact in our communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-white/80 text-sm">
                      {member.bio}
                    </p>
                  )}
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@handsofhelp.org`}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      Contact
                    </a>
                    <a
                      href={`https://www.linkedin.com/in/${member.name.toLowerCase().replace(' ', '-')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join Our Team
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference in our community.
              Check out our current opportunities or send us your resume.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/careers"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="/contact"
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
} 