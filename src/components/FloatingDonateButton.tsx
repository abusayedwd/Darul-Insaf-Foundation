'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import Link from 'next/link';

export const FloatingDonateButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show button after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          {/* Quick Donate Button */}
          <Link href="/donate">
            <motion.button
              className="relative flex items-center gap-3 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-4 rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-shadow group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="group-hover:fill-white transition-colors" size={24} />
              <span className="font-bold text-lg">Donate Now</span>
              
              {/* Pulse effect */}
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            </motion.button>
          </Link>

          {/* Scroll to top button */}
          {scrollY > 1000 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-white text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
