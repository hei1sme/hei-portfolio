import Link from "next/link";
import type { ReactNode } from "react";
import EmailCopy from "./EmailCopy";

export default function PortfolioChrome({ children }: { children: ReactNode }) {
  return <div className="garden-root portfolio-shell">
    <a className="garden-skip" href="#portfolio-content">Skip to content</a>
    <header className="garden-nav"><Link href="/" aria-label="hei, home" className="garden-brand">hei<span>✳</span></Link><nav aria-label="Main navigation"><Link href="/#garden-publications">Research</Link><Link href="/blog">Writing</Link><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">CV ↗</a></nav><Link data-magnetic className="garden-contact-link" href="/#garden-contact">Say hello <span aria-hidden="true">↗</span></Link></header>
    <main id="portfolio-content">{children}</main>
    <footer className="portfolio-site-footer"><div><Link href="/" className="garden-brand" aria-label="hei, home">hei<span>✳</span></Link><p>Keep asking. Keep moving.</p></div><div><p>Research collaborations, internships & AI community projects.</p><EmailCopy /><nav aria-label="Footer navigation"><Link href="/#garden-work">Projects</Link><Link href="/blog">Writing</Link><a href="https://github.com/hei1sme/" target="_blank" rel="noreferrer">GitHub ↗</a><a href="/HungLNG_Resume.pdf" target="_blank" rel="noreferrer">CV ↗</a></nav></div></footer>
  </div>;
}
