'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaUsers, FaFlask, FaAward } from 'react-icons/fa';
import AnimatedCounter from './AnimatedCounter';

const stats = [
    {
        end: 1,
        suffix: '',
        label: 'Publication',
        icon: <FaFileAlt className="text-purple-300" />,
    },
    {
        end: 10,
        suffix: '',
        label: 'Researchers Led',
        icon: <FaUsers className="text-sky-300" />,
    },
    {
        end: 150,
        suffix: '+',
        label: 'Students Mentored',
        icon: <FaAward className="text-teal-300" />,
    },
    {
        end: 8,
        suffix: '',
        label: 'AI Pilots',
        icon: <FaFlask className="text-fuchsia-300" />,
    },
];

const StatsRow: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
            {stats.map((stat, index) => (
                <AnimatedCounter
                    key={stat.label}
                    end={stat.end}
                    suffix={stat.suffix}
                    label={stat.label}
                    icon={stat.icon}
                    duration={1.5 + index * 0.2}
                />
            ))}
        </motion.div>
    );
};

export default StatsRow;
