"use client";

import { useRef, useState, useEffect } from "react";
const email = "heiontheway@gmail.com";
export default function EmailCopy() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setMessage("Email copied"); }
    catch { setMessage("Select the email address to copy it, or use the email link."); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 4000);
  };
  return <div className="portfolio-email"><a href={`mailto:${email}`}>{email}</a><button type="button" onClick={copy} aria-label="Copy email address" data-copied={message === "Email copied"}><span>{message === "Email copied" ? "Copied" : "Copy email"}</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{message === "Email copied" ? <path d="m5 12 4 4 10-10" /> : <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M15 4H6a2 2 0 0 0-2 2v9" /></>}</svg></button><span role="status" aria-live="polite">{message}</span></div>;
}
