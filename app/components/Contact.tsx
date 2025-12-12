'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaGraduationCap, FaIdCard, FaSearch, FaGlobeAmericas } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 2500);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 text-white">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s collaborate on research, auditable prototypes, or AI community programs."
          description="I aim to reply within 48 hours. Share context, timelines, or desired outcomes — I’ll bring the right artefacts to the conversation."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-[0_18px_55px_rgba(13,10,32,0.45)]"
          >
            <h3 className="text-xl font-semibold text-white">Signal Boosts</h3>
            <p className="mt-3 text-sm text-slate-300/80">
              Drop me a note for research collaborations, internships, or community events. I respond within 48 hours.
            </p>

            <div className="mt-8 space-y-5 text-sm text-slate-200/85">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10">
                  <FaEnvelope className="text-purple-200" />
                </span>
                <span>heiontheway@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10">
                  <FaMapMarkerAlt className="text-purple-200" />
                </span>
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Connect</p>
              <div className="mt-4 flex gap-4">
                {[
                  { href: 'https://linkedin.com/in/le-nguyen-gia-hung/', icon: <FaLinkedin size={20} /> },
                  { href: 'https://github.com/hei1sme/', icon: <FaGithub size={20} /> },
                  { href: 'https://www.instagram.com/hei.isme/', icon: <FaInstagram size={20} /> },
                ].map((profile) => (
                  <motion.a
                    key={profile.href}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-200 transition-all duration-300 hover:border-white/30 hover:text-white"
                    whileHover={{ y: -4 }}
                  >
                    {profile.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Academic Profiles */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Academic Profiles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { href: 'https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en', label: 'Google Scholar', icon: <FaGraduationCap className="text-purple-300" /> },
                  { href: 'https://orcid.org/0009-0003-7120-8167', label: 'ORCID', icon: <FaIdCard className="text-green-300" /> },
                  { href: 'https://www.scopus.com/authid/detail.uri?authorId=60219530700', label: 'Scopus', icon: <FaSearch className="text-orange-300" /> },
                  { href: 'https://www.webofscience.com/wos/author/record/PCR-6096-2025', label: 'Web of Science', icon: <FaGlobeAmericas className="text-sky-300" /> },
                ].map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                  >
                    {profile.icon} {profile.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(13,11,35,0.45)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'What should I call you?' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'Where can I reach you?' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-xs uppercase tracking-[0.35em] text-slate-300/70 mb-2">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id as keyof FormData]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/15"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.35em] text-slate-300/70 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Share context, timelines, or anything that will help me prepare."
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/15"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_25px_rgba(133,76,255,0.4)] transition-all duration-300 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-[0_0_35px_rgba(133,76,255,0.55)]'
                    }`}
                >
                  <FaPaperPlane />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-semibold text-emerald-300"
                    >
                      Message received - talk soon!
                    </motion.span>
                  )}
                  {submitStatus === 'error' && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-semibold text-rose-300"
                    >
                      Something went wrong. Try again?
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
