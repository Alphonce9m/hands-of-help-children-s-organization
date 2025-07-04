'use client';

import React from 'react';
import Image from 'next/legacy/image';
import Layout from '@/components/Layout';
import Container from '@/components/Container';

// Type for the blog post
type BlogPost = {
  id?: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
};

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = ['All', 'Education', 'Healthcare', 'Community', 'Events', 'Stories'];

  const posts: BlogPost[] = [
    {
      title: 'Empowering Youth Through Education',
      excerpt: 'Discover how our education support program is transforming lives in the community through access to quality education and resources.',
      image: '/images/IMG-20250514-WA0006.jpg',
      date: '2024-03-15',
      category: 'Education'
    },
    {
      title: 'Community Library: A Hub of Learning',
      excerpt: 'Our community library serves as a vibrant center for learning, where children and youth can access books, computers, and educational resources.',
      image: '/images/IMG-20250514-WA0007.jpg',
      date: '2024-03-10',
      category: 'Education'
    },
    {
      title: 'Youth Skills Development Program',
      excerpt: 'Learn about our comprehensive skills development program that equips young people with practical skills for future employment.',
      image: '/images/IMG-20250515-WA0009.jpg',
      date: '2024-03-05',
      category: 'Community'
    },
    {
      title: 'Volunteer Impact Stories',
      excerpt: 'Meet our dedicated volunteers and discover how their commitment is making a real difference in our community programs.',
      image: '/images/IMG-20250515-WA0007.jpg',
      date: '2024-03-01',
      category: 'Community'
    },
    {
      title: 'Digital Literacy Initiative',
      excerpt: 'How we\'re bridging the digital divide by providing computer training and internet access to underprivileged youth.',
      image: '/images/IMG-20250515-WA0006.jpg',
      date: '2024-02-28',
      category: 'Education'
    },
    {
      title: 'Community Outreach Success',
      excerpt: 'A look at our recent community outreach programs and their impact on improving lives in the neighborhood.',
      image: '/images/IMG-20250515-WA0020.jpg',
      date: '2024-02-25',
      category: 'Events'
    }
  ];

  const filteredPosts = React.useMemo(() => 
    posts.filter((post: BlogPost) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }),
    [posts, selectedCategory, searchQuery]
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleReadMore = (postTitle: string) => {
    // For now, just log the action. In a real app, this would navigate to the full post
    console.log(`Reading more about: ${postTitle}`);
  };

  return (
    <>
      <Layout
        showHero={true}
        heroTitle="Our Blog"
        heroSubtitle="Stories of impact and community growth"
        heroImage="/images/WhatsApp Image 2025-05-28 at 00.00.04_4d4186bf.jpg"
      >
        <Container>
          <div className="py-16 space-y-12">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white bg-black/50"
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-100/10 text-white hover:bg-gray-200/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: BlogPost, index: number) => (
                <article key={index} className="card overflow-hidden">
                  <div className="relative aspect-video">
                    <div className="relative w-full h-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-white/70">{post.date}</time>
                    <h2 className="text-white text-xl font-bold mt-2 mb-4">{post.title}</h2>
                    <p className="text-white/90">{post.excerpt}</p>
                    <button 
                      onClick={() => handleReadMore(post.title)}
                      className="mt-4 text-white hover:text-white/80 transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default BlogPage; 