import Icon from "./Icon";
import Link from "next/link";
import type { ReactNode } from "react";
import EmailCopy from "./EmailCopy";

export default function PortfolioChrome({ children }: { children: ReactNode }) {
  return <div className="garden-root portfolio-shell">
    <a className="garden-skip" href="#portfolio-content">Skip to content</a>
    <header className="garden-nav"><Link href="/" aria-label="hei, home" className="garden-brand">hei<Icon name="spark" size={27} className="portfolio-brand-mark" /></Link><nav aria-label="Main navigation"><Link href="/#garden-publications">Research</Link><Link href="/blog">Writing</Link><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">CV <Icon name="external" /></a></nav><Link data-magnetic className="garden-contact-link" href="/#garden-contact">Say hello <Icon name="external" /></Link></header>
    <main id="portfolio-content">{children}</main>
    <footer className="portfolio-site-footer"><div><Link href="/" className="garden-brand" aria-label="hei, home">hei<Icon name="spark" size={27} className="portfolio-brand-mark" /></Link><p>Keep asking. Keep moving.</p></div><div><p>Open to research internships and AI/ML engineering opportunities.</p><EmailCopy /><nav aria-label="Footer navigation"><Link href="/#garden-work">Projects</Link><Link href="/#garden-experience">Experience</Link><Link href="/blog">Writing</Link><a href="https://github.com/hei1sme/" target="_blank" rel="noreferrer">GitHub <Icon name="external" /></a><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">CV <Icon name="external" /></a></nav></div></footer>
  </div>;
}
