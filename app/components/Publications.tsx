'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaBook, FaTrophy } from 'react-icons/fa';
import { SiGooglescholar, SiOrcid } from 'react-icons/si';

interface Publication {
    id: string;
    title: string;
    authors: string[];
    highlightedAuthor: string;
    venue: string;
    venueType: 'conference' | 'journal';
    year: number;
    ranking?: string;
    doi?: string;
    doiUrl?: string;
    series?: string;
}

const publications: Publication[] = [
    {
        id: 'nz-au-air-quality-2026',
        title: 'Warning Before the Evening Peak: Health-Centred Air Quality Alerts in New Zealand and Australia',
        authors: ['Co-Authors', 'Gia-Hung Nguyen Le (Second Author)', 'et al.'],
        highlightedAuthor: 'Gia-Hung Nguyen Le (Second Author)',
        venue: 'Australasian Joint Conference on Artificial Intelligence (AJCAI 2026)',
        venueType: 'conference',
        year: 2026,
        ranking: 'Under Review',
    },
    {
        id: 'ajcai-2026',
        title: 'Stress-Testing Multi-Source Cyanobacterial Bloom Forecasting under Sparse Monitoring',
        authors: ['Gia-Hung Nguyen Le (First & Corresponding Author)', 'et al.'],
        highlightedAuthor: 'Gia-Hung Nguyen Le (First & Corresponding Author)',
        venue: 'Australasian Joint Conference on Artificial Intelligence (AJCAI 2026)',
        venueType: 'conference',
        year: 2026,
        ranking: 'Under Review',
    },
    {
        id: 'kdd-2027',
        title: 'Trustworthy Multimodal Anomaly Detection in Time Series with Conformal Calibration and Counterfactual Attribution',
        authors: ['Co-Authors', 'Gia-Hung Nguyen Le (Second Author)', 'et al.'],
        highlightedAuthor: 'Gia-Hung Nguyen Le (Second Author)',
        venue: '33rd ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD 2027)',
        venueType: 'conference',
        year: 2027,
        ranking: 'Under Review',
    },
    {
        id: 'ajcai-2025',
        title: 'Proactive Air Quality Forecasting and Health Alert System for Melbourne',
        authors: ['Gia-Hung Nguyen Le (First & Corresponding Author)', 'Gia-Bao Pham Hoang', 'Tan-Phat Vo', 'Thu Le', 'Nhu Nguyen'],
        highlightedAuthor: 'Gia-Hung Nguyen Le (First & Corresponding Author)',
        venue: 'Australasian Joint Conference on Artificial Intelligence (AJCAI 2025)',
        venueType: 'conference',
        year: 2025,
        ranking: 'Q2 (SJR 2024)',
        doi: '10.1007/978-981-95-4969-6_34',
        doiUrl: 'https://link.springer.com/chapter/10.1007/978-981-95-4969-6_34',
        series: 'Lecture Notes in Artificial Intelligence (LNAI)',
    },
];

const PublicationCard: React.FC<{ pub: Publication; index: number }> = ({ pub, index }) => {
    const CardWrapper = pub.doiUrl ? 'a' : 'div';
    const cardProps = pub.doiUrl ? {
        href: pub.doiUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
    } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
        >
            {/* Main card with glow - now clickable */}
            <CardWrapper
                {...cardProps}
                className="block relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                style={{ boxShadow: '0 0 40px rgba(168,85,247,0.15)' }}
            >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                        className="absolute -inset-[1px] rounded-3xl"
                        style={{
                            background: 'linear-gradient(135deg, #a855f7 0%, #22c55e 50%, #a855f7 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient-shift 3s ease infinite',
                        }}
                    />
                    <div className="absolute inset-[1px] rounded-3xl bg-black/95" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                    {/* Year badge */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/30 bg-purple-500/20"
                            style={{ boxShadow: '0 0 15px #a855f740' }}
                        >
                            <FaBook className="text-sm text-purple-300" />
                            <span className="text-sm font-medium text-purple-200">{pub.year}</span>
                        </div>

                        {/* Ranking badge */}
                        {pub.ranking && (
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/15"
                                style={{ boxShadow: '0 0 15px #f59e0b30' }}
                            >
                                <FaTrophy className="text-sm text-amber-300" />
                                <span className="text-sm font-medium text-amber-200">{pub.ranking}</span>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h3
                        className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-purple-100 transition-colors"
                        style={{ textShadow: '0 0 30px rgba(255,255,255,0.1)' }}
                    >
                        {pub.title}
                    </h3>

                    {/* Authors - highlight own name */}
                    <p className="text-base text-white/60">
                        {pub.authors.map((author, i) => (
                            <span key={i}>
                                {author === pub.highlightedAuthor ? (
                                    <span
                                        className="font-semibold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
                                        style={{ filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.5))' }}
                                    >
                                        {author}
                                    </span>
                                ) : (
                                    author
                                )}
                                {i < pub.authors.length - 1 && ', '}
                            </span>
                        ))}
                    </p>

                    {/* Venue */}
                    <div className="space-y-1">
                        <p className="text-base text-white/80 font-medium">{pub.venue}</p>
                        {pub.series && (
                            <p className="text-sm text-white/50 italic">{pub.series}</p>
                        )}
                    </div>

                    {/* Click hint */}
                    <div className="flex items-center gap-2 text-green-400 pt-2">
                        <span className="font-medium group-hover:underline">Read Paper</span>
                        <FaExternalLinkAlt className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                </div>
            </CardWrapper>
        </motion.div>
    );
};

const Publications: React.FC = () => {
    return (
        <section id="publications" className="relative py-20 text-white">
            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p
                        className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4"
                        style={{ textShadow: '0 0 20px #a855f780' }}
                    >
                        Publications
                    </p>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-black"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Peer-reviewed{' '}
                        <span
                            className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
                            style={{ filter: 'drop-shadow(0 0 25px rgba(168,85,247,0.6))' }}
                        >
                            research
                        </span>
                    </h2>
                    <p className="mt-4 text-white/50 max-w-lg mx-auto">
                        Contributing to the scientific community through rigorous research
                    </p>
                </motion.div>

                {/* Publications list */}
                <div className="space-y-6">
                    {publications.map((pub, index) => (
                        <PublicationCard key={pub.id} pub={pub} index={index} />
                    ))}
                </div>

                {/* Research Profiles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 text-center"
                >
                    <p className="text-sm text-white/40 mb-4">Find me on</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {[
                            { name: 'Google Scholar', icon: <SiGooglescholar />, url: 'https://scholar.google.com/citations?user=iGODAQYAAAAJ&hl=en', color: '#4285f4' },
                            { name: 'ORCID', icon: <SiOrcid />, url: 'https://orcid.org/0009-0003-7120-8167', color: '#a6ce39' },
                            { name: 'Scopus', icon: <span className="text-base font-bold">S</span>, url: 'https://www.scopus.com/authid/detail.uri?authorId=60219530700', color: '#e9711c' },
                            { name: 'Web of Science', icon: <span className="text-base font-bold">W</span>, url: 'https://www.webofscience.com/wos/author/record/PCR-6096-2025', color: '#5856d6' },
                        ].map((profile) => (
                            <a
                                key={profile.name}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-105"
                                style={{ boxShadow: `0 0 20px ${profile.color}20` }}
                            >
                                <span style={{ color: profile.color }}>{profile.icon}</span>
                                <span className="text-sm text-white/70">{profile.name}</span>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* CSS for gradient animation */}
            <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
        </section>
    );
};

export default Publications;
