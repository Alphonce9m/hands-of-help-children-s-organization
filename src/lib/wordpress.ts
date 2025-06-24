import wpapi from 'wpapi';

export const wp = new wpapi({
  endpoint: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json',
  username: process.env.NEXT_PUBLIC_WORDPRESS_USERNAME,
  password: process.env.NEXT_PUBLIC_WORDPRESS_PASSWORD,
});

export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  categories: number[];
  tags: number[];
}

export interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  featured_media: number;
  status: string;
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await wp.posts().get();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPages = async (): Promise<Page[]> => {
  try {
    const pages = await wp.pages().get();
    return pages;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
};
