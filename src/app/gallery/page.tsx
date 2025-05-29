'use client';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Image from 'next/image';

export default function GalleryPage() {
  const images = [
    { src: '/images/IMG-20250515-WA0044.jpg', alt: 'Community Event' },
    { src: '/images/IMG-20250515-WA0045.jpg', alt: 'Education Program' },
    { src: '/images/IMG-20250515-WA0047.jpg', alt: 'Library Activities' },
    { src: '/images/IMG-20250515-WA0053.jpg', alt: 'Community Support' },
    { src: '/images/WhatsApp Image 2025-05-28 at 00.00.02_a5b2836a.jpg', alt: 'Skills Training' },
    { src: '/images/IMG-20250515-WA0022.jpg', alt: 'Youth Program' },
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
                <div className="p-4">
                  <h3 className="gradient-text">{image.alt}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
} 