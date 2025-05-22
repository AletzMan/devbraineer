'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function FloatingHomeButton() {
    return (
        <Link href="/" className="fixed top-4 left-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-circle btn-primary hover:bg-accent hover:border-accent transition-all duration-300">
                <Home className="w-5 h-5" />
            </motion.div>
        </Link>
    );
}
