import React from 'react';
import Footer from '../components/Footer';
import VerticalNavigation from '../components/VerticalNavigation';
import { getSortedPostsData } from '../../lib/posts';
import BlogListClient from '@/app/components/BlogListClient';

export default async function BlogPage() {
  const blogPosts = getSortedPostsData();

  return (
    <main className="relative min-h-screen bg-black">
      <VerticalNavigation />

      {/* Main content */}
      <div className="flex flex-col items-center pt-6 pb-24 px-4 md:px-8">
        <BlogListClient posts={blogPosts} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}