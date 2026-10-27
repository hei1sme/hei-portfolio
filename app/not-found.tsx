import Link from "next/link";
export default function NotFound() {
  return <section className="portfolio-empty portfolio-not-found"><span className="portfolio-lost-mark" aria-hidden="true">✳</span><h1>A little off the trail.</h1><p>This page could not be found. There is still plenty to explore.</p><Link href="/">Back to hei ↗</Link><Link href="/#garden-work">See the projects</Link></section>;
}
