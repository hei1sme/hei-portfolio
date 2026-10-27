"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostMetadata } from "../../lib/posts";

export default function BlogListClient({ posts }: { posts: PostMetadata[] }) {
  const [search, setSearch] = useState("");
  const filtered = posts.filter(post => `${post.title} ${post.excerpt}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="portfolio-writing-index"><header className="portfolio-writing-heading"><h1>Thinking<br />out loud.</h1><div><p>Notes from learning AI, building things and following a question.</p><label htmlFor="writing-search">Find an article</label><input id="writing-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search titles and notes" /></div></header><p className="portfolio-search-count" role="status">{filtered.length} {filtered.length === 1 ? "article" : "articles"}{search ? " found" : ""}</p><div className="portfolio-writing-list">{filtered.map(post => <Link className="portfolio-writing-card" href={`/blog/${post.slug}`} key={post.slug} data-cursor="Read"><div className="portfolio-writing-cover">{post.imageUrl ? <Image src={post.imageUrl} alt="" fill sizes="(max-width: 900px) 90vw, 50vw" /> : null}</div><div><time dateTime={post.date}>{post.date}</time><h2>{post.title}</h2><p>{post.excerpt}</p><span>Read the story ↗</span></div></Link>)}</div>{!filtered.length ? <div className="portfolio-empty"><h2>No matching notes.</h2><p>Try another word, or return to all articles.</p><button type="button" onClick={() => setSearch("")}>Clear search</button></div> : null}</div>;
}
