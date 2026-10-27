import type { Metadata } from "next";
import { getSortedPostsData } from "../../lib/posts";
import BlogListClient from "../components/BlogListClient";

export const metadata: Metadata = { title: "Writing", description: "Notes on learning AI, research and building things, by Le Nguyen Gia Hung.", alternates: { canonical: "/blog" } };
export default function BlogPage() { return <BlogListClient posts={getSortedPostsData()} />; }
