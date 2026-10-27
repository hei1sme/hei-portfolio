import Icon from "../../components/portfolio/Icon";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "../../../lib/posts";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getSortedPostsData().map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData((await params).slug);
  return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.title, description: post.excerpt, type: "article", authors: post.author ? [post.author] : [] } } : { title: "Article not found" };
}
export default async function BlogPostPage({ params }: Props) {
  const post = await getPostData((await params).slug);
  if (!post) notFound();
  return <article className="portfolio-article"><nav className="portfolio-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">All writing</Link></nav><header><h1>{post.title}</h1><div className="portfolio-article-meta"><time dateTime={post.date}>{post.date}</time><span>{post.author}</span><span>{post.readingMinutes} min read</span></div></header><div className="portfolio-prose">{post.renderedContent}</div><nav className="portfolio-next-project" aria-label="Continue reading"><Link href="/blog"><Icon name="left" /> All writing</Link><Link href="/#garden-publications">Explore the research <Icon name="external" /></Link></nav></article>;
}
