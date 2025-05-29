import { FC, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '@/components/Section';
import Container from '@/components/Container';

interface GalleryImage {
  src: string;
  alt: string;
  description?: string;
}

interface GallerySectionProps {
  className?: string;
}

const defaultGalleryImages: GalleryImage[] = [
  {
    src: '/images/IMG-20250515-WA0044.jpg',
    alt: 'Community gathering',
    description: 'Our community coming together for a special event'
  },
  {
    src: '/images/IMG-20250515-WA0045.jpg',
    alt: 'Educational program',
    description: 'Students engaged in our educational programs'
  },
  {
    src: '/images/IMG-20250515-WA0047.jpg',
    alt: 'Healthcare initiative',
    description: 'Providing healthcare services to the community'
  },
  {
    src: '/images/IMG-20250515-WA0053.jpg',
    alt: 'Community development',
    description: 'Working together to build a better future'
  },
  {
    src: '/images/WhatsApp Image 2025-05-28 at 00.00.02_a5b2836a.jpg',
    alt: 'Youth empowerment',
    description: 'Empowering young minds through education and mentorship'
  },
  {
    src: '/images/gallery/gallery-6.jpg',
    alt: 'Community outreach',
    description: 'Reaching out to communities in need'
  },
  {
    src: '/images/gallery/gallery-7.jpg',
    alt: 'Learning environment',
    description: 'Creating safe and nurturing learning environments'
  },
  {
    src: '/images/gallery/gallery-8.jpg',
    alt: 'Community support',
    description: 'Supporting communities through various initiatives'
  }
];

const GallerySection: FC<GallerySectionProps> = ({ className = '' }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Section 
      className={`py-24 relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5
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
            scale: isHovered ? [1, 1.1, 1] : 1,
            opacity: isHovered ? [0.5, 0.7, 0.5] : 0.5
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800"
          >
            Our Gallery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Take a look at the moments that capture our impact and community spirit
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {defaultGalleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <p className="text-white text-center px-4">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full aspect-[4/3]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                {selectedImage.description && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/70 text-white p-6">
                    <p className="text-lg">{selectedImage.description}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default GallerySection; 