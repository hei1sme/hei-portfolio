import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
// Import rehype-pretty-code
import rehypePrettyCode from 'rehype-pretty-code';
// If you plan to use remark/rehype plugins for syntax highlighting, footnotes, etc., import them here
// Example: import rehypeHighlight from 'rehype-highlight';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Define options for rehype-pretty-code
const prettyCodeOptions = {
  // Use one of Shiki's packaged themes
  theme: 'one-dark-pro', // Or choose another theme like 'github-dark', 'material-theme-palenight' etc.
  // Keep the background or use a custom background color?
  keepBackground: true,
  // Callback hooks for customization if needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}]
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVisitHighlightedLine(node: any) {
    // Each line node by default has `class="line"`.
    node.properties.className.push('highlighted')
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVisitHighlightedWord(node: any) {
    // Each word node has no className by default.
    node.properties.className = ['word--highlighted']
  },
};

// Adjust the path if your content directory is different (but should be correct if at root)
const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt: string;
  imageUrl?: string;
  // Add any other frontmatter fields you expect here
}

export interface PostData extends PostMetadata {
  mdxSource: MDXRemoteSerializeResult; // Type from next-mdx-remote/dist/types
}

export function getSortedPostsData(): PostMetadata[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
      console.warn(`Blog directory not found at: ${postsDirectory}`);
      return [];
  }

  // Get file names under /content/blog
  let fileNames: string[];
  try {
      fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
      console.error(`Error reading blog directory: ${postsDirectory}`, error);
      return [];
  }

  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx')) // Only include .mdx files
    .map(fileName => {
      // Remove ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      let fileContents: string;
      try {
          fileContents = fs.readFileSync(fullPath, 'utf8');
      } catch (error) {
          console.error(`Error reading blog file: ${fullPath}`, error);
          return null; // Skip this file if unreadable
      }


      // Use gray-matter to parse the post metadata section
      let matterResult;
      try {
          matterResult = matter(fileContents);
      } catch (error) {
          console.error(`Error parsing frontmatter for file: ${fullPath}`, error);
          return null; // Skip this file if frontmatter is invalid
      }


      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || 'Untitled Post',
        date: matterResult.data.date ? String(matterResult.data.date) : new Date().toISOString().split('T')[0],
        author: matterResult.data.author || 'Unknown Author',
        excerpt: matterResult.data.excerpt || '',
        imageUrl: matterResult.data.imageUrl || null,
        // Add defaults or checks for other expected frontmatter fields
      } as PostMetadata; // Type assertion
    })
    .filter((post): post is PostMetadata => post !== null); // Filter out any nulls from errors

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostSlugs() {
   // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
      return [];
  }
  let fileNames: string[];
   try {
       fileNames = fs.readdirSync(postsDirectory);
   } catch (error) {
       console.error(`Error reading blog directory: ${postsDirectory}`, error);
       return [];
   }
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Post file not found for slug "${slug}" at: ${fullPath}`);
    return null; // Post not found
  }

  let fileContents: string;
   try {
       fileContents = fs.readFileSync(fullPath, 'utf8');
   } catch (error) {
       console.error(`Error reading blog file: ${fullPath}`, error);
       return null; // Cannot read file
   }

  // Use gray-matter to parse the post metadata section
  let matterResult;
  try {
      matterResult = matter(fileContents);
  } catch (error) {
      console.error(`Error parsing frontmatter for file: ${fullPath}`, error);
      return null; // Frontmatter parsing error
  }
  const { data, content } = matterResult;

  // Use next-mdx-remote to serialize the MDX content
  let mdxSource;
  try {
      mdxSource = await serialize(content, {
          mdxOptions: {
              // Add rehypePrettyCode to rehype plugins
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
          parseFrontmatter: false // Already parsed by gray-matter
      });
  } catch (error) {
      console.error(`Error serializing MDX for slug "${slug}":`, error);
      // Optionally return partial data or null depending on desired behavior
      return null; // Failed to process MDX content
  }


  // Combine the data with the slug and serialized content
  return {
    slug,
    title: data.title || 'Untitled Post',
    date: data.date ? String(data.date) : new Date().toISOString().split('T')[0],
    author: data.author || 'Unknown Author',
    excerpt: data.excerpt || '',
    imageUrl: data.imageUrl || null,
    mdxSource,
    // Add other frontmatter fields from 'data' here
  } as PostData; // Type assertion
}