'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import { FaCalendar, FaClock, FaUser } from 'react-icons/fa';

interface BlogPostClientContentProps {
  title: string;
  date: string;
  author?: string;
  imageUrl?: string;
  mdxSource: MDXRemoteSerializeResult;
}

const BlogPostClientContent: React.FC<BlogPostClientContentProps> = ({
  title,
  date,
  author = 'Gia Hung',
  imageUrl,
  mdxSource,
}) => {
  const readTime = 5; // Estimate

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(88,28,135,0.2)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.08)_0%,_transparent_60%)]" />
      </div>

      {/* Hero Section */}
      <motion.header
        className="relative mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Featured Image */}
        {imageUrl && (
          <motion.div
            className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-purple-300">
            {title}
          </span>
        </motion.h1>

        {/* Meta info */}
        <motion.div
          className="flex flex-wrap items-center gap-6 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Date */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaCalendar className="w-3 h-3 text-purple-400" />
            </div>
            <span className="font-mono text-sm">{date}</span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FaUser className="w-3 h-3 text-blue-400" />
            </div>
            <span className="text-sm">{author}</span>
          </div>

          {/* Read time */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaClock className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-sm">{readTime} min read</span>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.header>

      {/* Article Content */}
      <motion.article
        className="prose prose-lg prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-purple-500/30
          prose-h3:text-2xl prose-h3:text-purple-200 prose-h3:mt-8
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-purple-400 prose-a:no-underline prose-a:border-b prose-a:border-purple-400/30 hover:prose-a:border-purple-400 hover:prose-a:text-purple-300
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-pink-400 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-900/80 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-lg
          prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-gray-300
          prose-ul:space-y-2 prose-ol:space-y-2
          prose-li:text-gray-300
          prose-li:marker:text-purple-400
          prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-xl
          prose-hr:border-purple-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <MDXRemote {...mdxSource} />
      </motion.article>

      {/* End divider */}
      <motion.div
        className="mt-16 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-500/50" />
        <div className="w-2 h-2 rounded-full bg-purple-500/50" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-500/50" />
      </motion.div>

      {/* Back to blog CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-gray-500 mb-4">Thanks for reading!</p>
      </motion.div>
    </>
  );
};

export default BlogPostClientContent;