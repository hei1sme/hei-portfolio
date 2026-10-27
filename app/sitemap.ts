import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";
import { getProjectSlugs } from "../lib/projects";
import { getSortedPostsData } from "../lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/blog", ...getProjectSlugs().map(slug => `/projects/${slug}`), ...getSortedPostsData().map(post => `/blog/${post.slug}`)].map(route => ({ url: `${siteUrl}${route}` }));
}
