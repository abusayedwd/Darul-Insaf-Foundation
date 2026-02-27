'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { useAppContext } from '../context/AppContext';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useAppContext();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.campaigns'), path: '/campaigns' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.volunteer'), path: '/volunteer' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">
            Al-Insaf
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.path ? "text-primary" : "text-stone-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-stone-200">
            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="p-2 text-stone-600 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold"
              title="Switch Language"
            >
              <Languages size={18} />
              <span>{language === 'en' ? 'BN' : 'EN'}</span>
            </button>

            <Link href="/donate">
              <Button size="sm">{t('nav.donate')}</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="p-2 text-stone-600"
          >
            <Languages size={20} />
          </button>
          <button 
            className="p-2 text-stone-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2",
                    pathname === link.path ? "text-primary" : "text-stone-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/donate" onClick={() => setIsOpen(false)}>
                <Button className="w-full">{t('nav.donate')}</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
