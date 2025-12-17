import React from 'react';
import { notFound } from 'next/navigation';
import { getPostData } from '../../../lib/posts';
import Link from 'next/link';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import Footer from '../../components/Footer';
import VerticalNavigation from '../../components/VerticalNavigation';
import BlogPostClientContent from '../../components/BlogPostClientContent';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  const { title, date, imageUrl, mdxSource, author } = post;

  return (
    <main className="relative min-h-screen bg-black">
      <VerticalNavigation />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-20 pb-16">
        {/* Navigation breadcrumb */}
        <nav className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            title="Home"
          >
            <FaHome className="w-4 h-4" />
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 transition-all"
          >
            <FaArrowLeft className="w-3 h-3" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </nav>

        {/* Post content */}
        <BlogPostClientContent
          title={title}
          date={date}
          author={author}
          imageUrl={imageUrl}
          mdxSource={mdxSource}
        />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}