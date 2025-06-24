'use client';

import { jsx as _jsx } from 'react/jsx-runtime';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Image from 'next/image';

// Component props interface
interface ImpactStatsProps {
  stats?: Array<{
    number?: string;
    label: string;
    icon?: any;
    image?: string;
  }>;
  className?: string;
}

// Default stats
const defaultStats: ImpactStatsProps['stats'] = [
  {
    number: '10+',
    label: 'Active Volunteers'
  },
  {
    number: '5000+',
    label: 'Hours Donated',
    image: '/images/impact/impact-2.jpg'
  },
  {
    number: '1000+',
    label: 'Lives Impacted',
    image: '/images/impact/impact-3.jpg'
  }
];

// Counter component
const Counter = ({ value }: { value: string | undefined }) => {
  const numericValue = parseInt((value ?? '0').replace(/,/g, ''));
  
  return (
    <div className="text-5xl font-bold mb-2 text-white">
      {numericValue.toLocaleString()}+
    </div>
  );
};

// Main component
const ImpactStats = ({ stats = defaultStats, className = '' }: ImpactStatsProps) => {
  return _jsx(Section, {
    className: `py-24 relative overflow-hidden ${className}`,
    children: _jsx(Container, {
      className: "relative",
      children: _jsx("div", {
        className: "max-w-6xl mx-auto",
        children: [
          _jsx("div", {
            className: "text-center mb-16",
            children: [
              _jsx("h2", {
                className: "text-4xl md:text-5xl font-bold mb-6 text-white",
                children: "Volunteer Impact"
              }),
              _jsx("p", {
                className: "text-white/80 text-lg max-w-2xl mx-auto",
                children: "See the difference our volunteers make in the community."
              })
            ]
          }),
          _jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
            children: stats?.map((stat, index) => _jsx("div", {
              key: index,
              className: "group relative",
              children: [
                _jsx("div", {
                  className: "absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                }),
                _jsx("div", {
                  className: "relative p-8 text-center",
                  children: _jsx("div", {
                    className: "mb-6 mx-auto flex items-center justify-center",
                    children: stat.image ? (
                      _jsx("div", {
                        className: "relative w-20 h-20 rounded-full overflow-hidden",
                        children: _jsx(Image, {
                          src: stat.image,
                          alt: stat.label,
                          fill: true,
                          className: "object-cover"
                        })
                      })
                    ) : (
                      _jsx("div", {
                        className: "text-5xl",
                        children: stat.icon
                      })
                    )
                  })
                }),
                _jsx(Counter, {
                  value: stat.number
                }),
                _jsx("div", {
                  className: "text-white/80 group-hover:text-white transition-colors duration-300 text-lg",
                  children: stat.label
                })
              ]
            }))
          })
        ]
      })
    })
  });
};

export default ImpactStats;