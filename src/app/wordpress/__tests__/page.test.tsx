import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordPressPage from '../page';
import { WordPressContext } from '@/providers/WordPressProvider';
import type { Page } from '@/lib/wordpress';

// Create a test wrapper component that provides the WordPressContext
interface TestWrapperProps {
  children: React.ReactNode;
  value: {
    pages: Page[];
    loading: boolean;
    error: Error | null;
  };
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children, value }: TestWrapperProps) => (
  <WordPressContext.Provider value={value}>
    {children}
  </WordPressContext.Provider>
);

describe('WordPressPage', () => {
  const mockPages = [
    {
      id: 1,
      title: { rendered: 'Test Page 1' },
      excerpt: { rendered: '<p>This is a test excerpt 1</p>' },
    },
    {
      id: 2,
      title: { rendered: 'Test Page 2' },
      excerpt: { rendered: '<p>This is a test excerpt 2</p>' },
    },
  ];

  it('renders loading state', () => {
    render(
      <TestWrapper value={{ pages: [], loading: true, error: null }}>
        <WordPressPage />
      </TestWrapper>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = new Error('Failed to load pages');
    render(
      <TestWrapper value={{ pages: [], loading: false, error }}>
        <WordPressPage />
      </TestWrapper>
    );

    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });

  it('renders pages when loaded', () => {
    render(
      <TestWrapper value={{ 
        pages: mockPages as Page[], 
        loading: false, 
        error: null 
      }}>
        <WordPressPage />
      </TestWrapper>
    );

    expect(screen.getByText('WordPress Pages')).toBeInTheDocument();
    expect(screen.getByText('Test Page 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt 1')).toBeInTheDocument();
    expect(screen.getByText('Test Page 2')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt 2')).toBeInTheDocument();
  });
});
