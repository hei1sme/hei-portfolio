import Link from "next/link";
import Icon from "./components/portfolio/Icon";
export default function NotFound() {
  return <section className="portfolio-empty portfolio-not-found"><Icon name="spark" size={80} className="portfolio-lost-mark" /><h1>A little off the trail.</h1><p>I couldn&apos;t find that page. You can head home or browse my projects.</p><Link href="/">Back to hei <Icon name="external" /></Link><Link href="/#garden-work">See the projects</Link></section>;
}
