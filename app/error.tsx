"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="portfolio-empty portfolio-not-found"><h1>This page hit a snag.</h1><p>Try loading it again, or head back to the portfolio.</p><button type="button" onClick={reset}>Try again</button><Link href="/">Back home</Link></section>;
}
