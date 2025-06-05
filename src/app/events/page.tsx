'use client';

import { FC, useState } from 'react';

import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  type: 'upcoming' | 'past';
  registrationRequired: boolean;
  capacity?: number;
  registered?: number;
}

const EventsPage: FC = () => {
  const [activeSection, setActiveSection] = useState<string>('upcoming');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const sections = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past Events' },
    { id: 'register', label: 'Register' }
  ];

  const months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const events: Event[] = [
    {
      id: 1,
      title: 'Community Library Opening',
      date: '2024-04-15',
      time: '10:00 AM',
      location: 'Kasabuni Community Center',
      description: 'Join us for the grand opening of our new community library and e-learning center.',
      image: '/events/library-opening.jpg',
      type: 'upcoming',
      registrationRequired: true,
      capacity: 100,
      registered: 45
    },
    {
      id: 2,
      title: 'Youth Leadership Workshop',
      date: '2024-04-20',
      time: '2:00 PM',
      location: 'Youth Center',
      description: 'A workshop focused on developing leadership skills among young community members.',
      image: '/events/youth-workshop.jpg',
      type: 'upcoming',
      registrationRequired: true,
      capacity: 50,
      registered: 30
    },
    {
      id: 3,
      title: 'Community Health Day',
      date: '2024-03-10',
      time: '9:00 AM',
      location: 'Community Health Center',
      description: 'Free health check-ups and awareness sessions for the community.',
      image: '/events/health-day.jpg',
      type: 'past',
      registrationRequired: false
    }
  ];

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const eventMonth = months[eventDate.getMonth() + 1];
    return (selectedMonth === 'All' || eventMonth === selectedMonth) &&
           (activeSection === 'upcoming' ? event.type === 'upcoming' : event.type === 'past');
  });

  return (
    
      <QuickNavigation
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Month Filter */}
      <Section className="py-8 bg-gray-50">
        <Container>
          <div className="flex flex-wrap gap-4 justify-center">
            {months.map(month => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedMonth === month
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Events Grid */}
      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type === 'upcoming' ? 'Upcoming' : 'Past Event'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">📅</span>
                        <span className="text-gray-600">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">⏰</span>
                        <span className="text-gray-600">{event.time}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center text-gray-600">
                      <span className="text-primary">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                    {event.type === 'upcoming' && event.registrationRequired && event.capacity && event.registered !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Registration Progress</span>
                          <span>{event.registered}/{event.capacity}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <button
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        event.type === 'upcoming'
                          ? 'bg-primary text-white hover:bg-primary-dark'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      disabled={event.type === 'past'}
                    >
                      {event.type === 'upcoming'
                        ? event.registrationRequired
                          ? 'Register Now'
                          : 'Learn More'
                        : 'Past Event'}
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Event Registration Form */}
      {activeSection === 'register' && (
        <Section className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Register for an Event</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Event
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary">
                      <option value="">Choose an event...</option>
                      {events
                        .filter(event => event.type === 'upcoming' && event.registrationRequired)
                        .map(event => (
                          <option key={event.id} value={event.id}>
                            {event.title} - {event.date}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Register
                  </button>
                </form>
              </Card>
            </div>
          </Container>
        </Section>
      )}
    
  );
};

export default EventsPage; 