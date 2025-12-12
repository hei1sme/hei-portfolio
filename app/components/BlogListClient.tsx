'use client'; // Mark this as a Client Component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PostMetadata } from '@/lib/posts'; // Import the type

// Re-define or import BlogPostCard if it was defined in the page previously
const BlogPostCard: React.FC<{ post: PostMetadata }> = ({ post }) => {
  return (
    <motion.div
      // key is already applied in the map in the parent
      className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 }} // Random delay for staggered effect
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="h-48 bg-gray-700 overflow-hidden relative">
          <Image
            src={post.imageUrl || '/images/placeholder-project.png'} // Provide a fallback image
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <p className="text-xs text-purple-400 mb-1 font-mono">{post.date}</p>
          <h2 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-purple-300 transition-colors">{post.title}</h2>
          <p className="text-sm text-gray-400">{post.excerpt}</p>
        </div>
      </Link>
    </motion.div>
  );
};


interface BlogListClientProps {
  posts: PostMetadata[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ posts }) => {
  return (
    <div className="w-full max-w-4xl px-4 md:px-8 lg:px-12 mt-20 z-10">
      <motion.h1 // Motion H1 is fine here in a Client Component
        className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Blog
      </motion.h1>

      {/* Grid for Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogListClient;