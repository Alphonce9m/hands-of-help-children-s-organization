'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface AdminLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const AdminLink = ({ href, children, className = '' }: AdminLinkProps) => {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <AdminLink 
                  href="/admin/dashboard" 
                  className="text-xl font-bold text-primary"
                >
                  Admin Dashboard
                </AdminLink>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <AdminLink
                  href="/admin/dashboard"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </AdminLink>
                <AdminLink
                  href="/admin/donations"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Donations
                </AdminLink>
                <AdminLink
                  href="/admin/analytics"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Analytics
                </AdminLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 