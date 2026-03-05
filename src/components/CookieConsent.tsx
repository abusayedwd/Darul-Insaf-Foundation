'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Button } from './Button';
import Link from 'next/link';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    
    // Show consent banner after a short delay
    const timer = setTimeout(() => {
      if (!hasConsented) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsAnimating(true);
    localStorage.setItem('cookie-consent', 'accepted');
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    setIsAnimating(true);
    localStorage.setItem('cookie-consent', 'declined');
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 ${isAnimating ? 'pointer-events-none' : ''}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-700">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon and Text */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Cookie size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">We value your privacy</h4>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      We use cookies to enhance your browsing experience and analyze our traffic. 
                      By accepting, you agree to our use of cookies.{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 shrink-0 w-full md:w-auto">
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 flex-1 md:flex-none"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={handleAccept}
                    className="gradient-primary flex-1 md:flex-none"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
