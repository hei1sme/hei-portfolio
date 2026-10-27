import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { projectMdxComponents } from "../app/projects/[slug]/ProjectMdxComponents";
import { projectRecords } from "../app/concepts/research/portfolioData";

const directory = path.join(process.cwd(), "content/projects");
export function getProjectSlugs() {
  return fs.readdirSync(directory).filter(name => /\.mdx?$/.test(name)).map(name => name.replace(/\.mdx?$/, ""));
}
export const getProjectData = cache(async (slug: string) => {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filename = ["mdx", "md"].map(ext => path.join(directory, `${slug}.${ext}`)).find(file => fs.existsSync(file));
  if (!filename) return null;
  const { data, content } = matter(fs.readFileSync(filename, "utf8"));
  const compiled = await compileMDX({ source: content, components: projectMdxComponents });
  const record = projectRecords.find(project => project.href === `/projects/${slug}`);
  return { frontmatter: data, renderedContent: compiled.content, record };
});
