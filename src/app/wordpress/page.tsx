'use client';

import React from 'react';
import { WordPressContext } from '@/providers/WordPressProvider';

type WordPressPage = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  status: string;
  type: string;
  link: string;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
};

export default function WordPressPage() {
  const context = React.useContext(WordPressContext);
  
  if (!context) {
    return <p className="text-red-600">Error: WordPress context is not available</p>;
  }

  const { pages = [], loading = false, error = null } = context;

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">WordPress Pages</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages?.map((page: WordPressPage) => (
            <article key={page.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{page.title.rendered}</h2>
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }} 
                />
              </div>
            </article>
        ))}
      </div>
    </div>
  );
}
