'use client';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Image from 'next/image';

export default function GalleryPage() {
  const images = [
    { src: '/gallery/IMG-20250528-WA0018.jpg', alt: 'Community Event' },
    { src: '/gallery/IMG-20250604-WA0003.jpg', alt: 'Education Program' },
    { src: '/gallery/IMG-20250604-WA0004.jpg', alt: 'Library Activities' },
    { src: '/gallery/IMG-20250604-WA0005.jpg', alt: 'Community Support' },
    { src: '/gallery/IMG-20250604-WA0006.jpg', alt: 'Skills Training' },
    { src: '/gallery/IMG-20250604-WA0007.jpg', alt: 'Youth Program' },
    { src: '/gallery/IMG-20250604-WA0008.jpg', alt: 'Sports Engagement' },
    { src: '/gallery/IMG-20250604-WA0009.jpg', alt: 'Health Outreach' },
    { src: '/gallery/IMG-20250604-WA0010.jpg', alt: 'Cultural Day' },
    { src: '/gallery/IMG-20250604-WA0011.jpg', alt: 'Volunteer Day' },
    { src: '/gallery/IMG-20250604-WA0012.jpg', alt: 'Food Distribution' },
    { src: '/gallery/IMG-20250604-WA0013.jpg', alt: 'Digital Literacy' },
    { src: '/gallery/IMG-20250604-WA0014.jpg', alt: 'Women Empowerment' },
    { src: '/gallery/IMG-20250604-WA0015.jpg', alt: 'Environmental Action' },
    { src: '/gallery/IMG-20250604-WA0016.jpg', alt: 'Art Workshop' },
    { src: '/gallery/IMG-20250604-WA0017.jpg', alt: 'Youth Leadership' },
    { src: '/gallery/IMG-20250604-WA0018.jpg', alt: 'Literacy Drive' },
    { src: '/gallery/IMG-20250604-WA0019.jpg', alt: 'Family Day' },
    { src: '/gallery/IMG-20250604-WA0020.jpg', alt: 'STEM Workshop' },
    { src: '/gallery/IMG-20250604-WA0021.jpg', alt: 'Music Program' },
    { src: '/gallery/IMG-20250604-WA0022.jpg', alt: 'Mentorship' },
    { src: '/gallery/IMG-20250604-WA0023.jpg', alt: 'Public Speaking' },
    { src: '/gallery/IMG-20250604-WA0024.jpg', alt: 'Holiday Celebration' },
    { src: '/gallery/IMG-20250604-WA0025.jpg', alt: 'Gardening Project' },
    { src: '/gallery/IMG-20250604-WA0026.jpg', alt: 'Career Day' },
    { src: '/gallery/IMG-20250604-WA0027.jpg', alt: 'Parent Engagement' },
    { src: '/gallery/IMG-20250604-WA0028.jpg', alt: 'Health & Wellness' },
    { src: '/gallery/IMG-20250604-WA0029.jpg', alt: 'Book Fair' },
    { src: '/gallery/IMG-20250604-WA0030.jpg', alt: 'Science Fair' },
    { src: '/gallery/IMG-20250604-WA0031.jpg', alt: 'Creative Writing' },
    { src: '/gallery/IMG-20250604-WA0032.jpg', alt: 'Entrepreneurship' },
    { src: '/gallery/IMG-20250604-WA0033.jpg', alt: 'Peer Tutoring' },
    { src: '/gallery/IMG-20250604-WA0034.jpg', alt: 'Community Outreach' },
    { src: '/gallery/IMG-20250604-WA0035.jpg', alt: 'After School Program' },
  ];

  return (
    <Layout
      showHero={true}
      heroTitle="Our Gallery"
      heroSubtitle="Capturing moments of impact and community growth"
      heroImage="/images/IMG-20250515-WA0047.jpg"
    >
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div key={index} className="card overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
} 