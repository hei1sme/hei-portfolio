'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PostMetadata } from '@/lib/posts';
import { FaCalendar, FaArrowRight, FaClock, FaSearch } from 'react-icons/fa';

const BlogPostCard: React.FC<{ post: PostMetadata; index: number }> = ({ post, index }) => {
  const readTime = Math.ceil((post.excerpt?.length || 100) / 50) + 2;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={post.imageUrl || '/images/placeholder-project.png'}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

            {/* Read time badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-white/70">
              <FaClock className="w-3 h-3" />
              {readTime} min read
            </div>
          </div>

          {/* Content */}
          <div className="p-6 relative">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-purple-400/80 mb-3">
              <FaCalendar className="w-3 h-3" />
              <span className="font-mono">{post.date}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Read more */}
            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
              <span>Read article</span>
              <FaArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%)',
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

interface BlogListClientProps {
  posts: PostMetadata[];
}

const BlogListClient: React.FC<BlogListClientProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl px-4 md:px-8 mt-16 z-10">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500" />
          <span className="text-purple-400 text-sm font-mono uppercase tracking-widest">Thoughts & Ideas</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-purple-400">
            My Blog
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Exploring AI, machine learning, and the intersection of technology with human understanding.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="max-w-md mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
      </motion.div>

      {/* Posts count */}
      <motion.p
        className="text-gray-500 text-sm mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} {searchQuery && 'found'}
      </motion.p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredPosts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-lg">No articles found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear search
          </button>
        </motion.div>
      )}

      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(88,28,135,0.25)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.1)_0%,_transparent_60%)]" />
      </div>
    </div>
  );
};

export default BlogListClient;