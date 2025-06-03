import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Container from '@/components/Container';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TeamSectionProps {
  className?: string;
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: 'Kennedy Otieno',
    role: 'Founder & Executive Director',
    image: '/LEADERS/kennedy.jpg',
    bio: 'With over 15 years of experience in community development, Kennedy leads our organization with passion and vision.'
  },
  {
    name: 'Eden Mwikali',
    role: 'Program Director',
    image: '/LEADERS/eden.jpg',
    bio: 'Eden oversees all our educational programs and ensures we deliver high-quality services to our community.'
  },
  {
    name: 'Alphonce Mdaki',
    role: 'Community Outreach Coordinator',
    image: '/LEADERS/alphonce.jpg',
    bio: 'Alphonce works closely with local communities to identify needs and develop effective outreach programs.'
  }
];

const TeamSection: FC<TeamSectionProps> = ({ className = '' }) => {
  return (
    <Section className={`py-20 bg-gray-50 ${className}`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Our Leadership Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600"
          >
            Meet the dedicated individuals working to make a difference in our community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultTeamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TeamSection; 