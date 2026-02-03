'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaReact, FaPython, FaNodeJs, FaAws, FaDocker } from 'react-icons/fa'; // Example icons
import { SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiVercel, SiGatsby, SiContentful, SiStyledcomponents, SiGit } from 'react-icons/si'; // Example icons

// --- Custom Components for MDX ---
// You can define custom components to be used within your MDX files
// e.g., <TechIcon name="React" />, <Warning text="..." />

// Basic Tech Icon Mapping (Similar to Projects.tsx, but maybe larger)
const TechIcon = ({ name }: { name: string }) => {
  const iconSize = "1.3rem"; // Adjust size as needed
  const techLower = name?.toLowerCase() || '';
  switch (techLower) {
    // Add all the icons you might use in project details
    case "react": return <FaReact size={iconSize} className="text-cyan-400 inline-block mr-1" title={name} />;
    case "python": return <FaPython size={iconSize} className="text-blue-400 inline-block mr-1" title={name} />;
    case "node.js": return <FaNodeJs size={iconSize} className="text-green-500 inline-block mr-1" title={name} />;
    case "aws": return <FaAws size={iconSize} className="text-orange-400 inline-block mr-1" title={name} />;
    case "docker": return <FaDocker size={iconSize} className="text-blue-500 inline-block mr-1" title={name} />;
    case "tensorflow": return <SiTensorflow size={iconSize} className="text-orange-500 inline-block mr-1" title={name} />;
    case "pytorch": return <SiPytorch size={iconSize} className="text-red-500 inline-block mr-1" title={name} />;
    case "scikit-learn": return <SiScikitlearn size={iconSize} className="text-orange-400 inline-block mr-1" title={name} />;
    case "pandas": return <SiPandas size={iconSize} className="text-indigo-400 inline-block mr-1" title={name} />;
    case "javascript": return <SiJavascript size={iconSize} className="text-yellow-400 inline-block mr-1" title={name} />;
    case "typescript": return <SiTypescript size={iconSize} className="text-blue-300 inline-block mr-1" title={name} />;
    case "next.js": return <SiNextdotjs size={iconSize} className="text-gray-300 inline-block mr-1" title={name} />;
    case "tailwindcss": return <SiTailwindcss size={iconSize} className="text-cyan-300 inline-block mr-1" title={name} />;
    case "vercel": return <SiVercel size={iconSize} className="text-white inline-block mr-1" title={name} />;
    case "git": return <SiGit size={iconSize} className="text-red-400 inline-block mr-1" title={name} />;
    case "gatsby": return <SiGatsby size={iconSize} className="text-purple-400 inline-block mr-1" title={name} />;
    case "contentful": return <SiContentful size={iconSize} className="text-blue-400 inline-block mr-1" title={name} />;
    case "styled components": return <SiStyledcomponents size={iconSize} className="text-pink-400 inline-block mr-1" title={name} />;
    // Add more icons as needed
    default: return <span className="text-xs font-mono bg-gray-700 px-1.5 py-0.5 rounded mr-1 align-middle">{name}</span>;
  }
};


const components = {
  // Map standard HTML elements to styled versions if desired
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-bold font-mono text-purple-300 mt-8 mb-4" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold font-mono text-purple-400 mt-6 mb-3" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-outside pl-6 space-y-2 mb-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-outside pl-6 space-y-2 mb-4" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="leading-relaxed mb-4" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-teal-400 hover:text-teal-300 underline transition-colors" {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => ( // Style images rendered from markdown
    <div className="my-6">
      <Image
        src={typeof props.src === 'string' ? props.src : ''}
        alt={props.alt || 'Project image'}
        width={800} // Adjust default width
        height={450} // Adjust default height
        className="rounded-md border border-gray-700 mx-auto"
      />
      {props.alt && <p className="text-center text-sm text-gray-500 mt-2">{props.alt}</p>}
    </div>
  ),
  // Add your custom components here
  TechIcon: TechIcon,
};

interface ProjectClientPageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontmatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Or define a stricter type for frontmatter
  };
}

const ProjectClientPage: React.FC<ProjectClientPageProps> = ({ mdxSource, frontmatter }) => {
  return (
    <motion.div
      className="min-h-screen bg-black text-white pt-28 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/#projects" className="text-teal-400 hover:text-teal-300 font-mono inline-flex items-center transition-colors">
            &lt; Back to Projects
          </Link>
        </motion.div>

        {/* Header from Frontmatter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-purple-300 mb-3">{frontmatter.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full font-mono">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Left Column: MDX Content */}
          <div className="prose prose-invert prose-sm md:prose-base lg:col-span-2 max-w-none prose-headings:font-mono prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-ul:list-disc prose-ol:list-decimal">
            {/* Use custom styling above, or rely on prose classes */}
            <MDXRemote {...mdxSource} components={components} />
          </div>

          {/* Right Column: Meta, Links, Tech */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Image */}
            {frontmatter.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                <Image
                  src={frontmatter.image}
                  alt={`${frontmatter.title} main image`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-3">
              {frontmatter.liveUrl && (
                <a href={frontmatter.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-mono px-4 py-2 rounded text-sm transition-colors">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              {frontmatter.repoUrl && (
                <a href={frontmatter.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-white font-mono px-4 py-2 rounded text-sm transition-colors">
                  <FaGithub /> View Code
                </a>
              )}
            </div>

            {/* Technologies */}
            {frontmatter.technologies && frontmatter.technologies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold font-mono text-purple-300 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {frontmatter.technologies.map((tech: string) => (
                    <span key={tech} className="inline-flex items-center gap-1 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                      <TechIcon name={tech} /> {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectClientPage;
