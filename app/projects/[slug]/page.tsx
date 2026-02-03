import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import ProjectClientPage from './ProjectClientPage'; // Import the client component
import { notFound } from 'next/navigation';

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

// Function to get the MDX file path for a given slug
const getProjectPath = (slug: string): string | null => {
    const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
        return filePath;
    }
    // Check for .md extension as fallback
    const mdFilePath = path.join(PROJECTS_PATH, `${slug}.md`);
    if (fs.existsSync(mdFilePath)) {
        return mdFilePath;
    }
    return null;
}

// Function to get project data and serialize MDX
const getProjectData = async (slug: string) => {
    const projectFilePath = getProjectPath(slug);

    if (!projectFilePath) {
        return null; // Indicate project not found
    }

    const source = fs.readFileSync(projectFilePath, 'utf8');
    const { content, data: frontmatter } = matter(source);

    const mdxSource = await serialize(content, {
        // Optionally pass MDX options here, like remark/rehype plugins
        mdxOptions: {
            // remarkPlugins: [],
            // rehypePlugins: [],
        },
        parseFrontmatter: false, // We already parsed it with gray-matter
    });

    return { mdxSource, frontmatter };
};

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// This is the main server component for the page
export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projectData = await getProjectData(slug);

    if (!projectData) {
        notFound(); // Trigger Next.js 404 page if project not found
    }

    // Pass the data to the client component for rendering
    return <ProjectClientPage mdxSource={projectData.mdxSource} frontmatter={projectData.frontmatter} />;
}

// --- Optional: Generate Static Paths ---
// If you want to pre-render all project pages at build time for performance
// export async function generateStaticParams() {
//     const files = fs.readdirSync(PROJECTS_PATH);
//     const paths = files
//         .filter(filename => filename.endsWith('.mdx') || filename.endsWith('.md'))
//         .map(filename => ({
//             slug: filename.replace(/\.(mdx|md)$/, ''),
//         }));
//     return paths;
// }
