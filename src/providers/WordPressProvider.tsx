import React, { useState, useEffect } from 'react';
import { Post, Page } from '../lib/wordpress';
import { getPosts, getPages } from '../lib/wordpress';

interface WordPressContext {
  posts: Post[];
  pages: Page[];
  loading: boolean;
  error: Error | null;
}

interface WordPressProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const WordPressContext = React.createContext<WordPressContext | undefined>(undefined);

export const WordPressProvider: React.FC<WordPressProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWordPressData = async () => {
      try {
        const [postsData, pagesData] = await Promise.all([
          getPosts(),
          getPages()
        ]);
        setPosts(postsData);
        setPages(pagesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch WordPress data'));
      } finally {
        setLoading(false);
      }
    };

    fetchWordPressData();
  }, []);

  return (
    <WordPressContext.Provider value={{ posts, pages, loading, error }}>
      {children}
    </WordPressContext.Provider>
  );
};
