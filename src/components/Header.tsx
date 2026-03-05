'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Languages, Moon, Sun, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { useAppContext } from '../context/AppContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t, theme, toggleTheme } = useAppContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setLangOpen(false);
    if (langOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.campaigns'), path: '/campaigns' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.volunteer'), path: '/volunteer' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'en' as const, label: 'English', native: 'English' },
    { code: 'bn' as const, label: 'Bengali', native: 'বাংলা' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-100 dark:border-stone-800 shadow-sm'
          : 'bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-100/50 dark:border-stone-800/50'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
            <Heart size={22} fill="currentColor" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-primary tracking-tight block leading-none">Al-Insaf</span>
            <span className="text-[10px] text-stone-500 tracking-widest uppercase">Foundation</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg transition-all',
                pathname === link.path
                  ? 'text-primary bg-primary/5'
                  : 'text-stone-600 dark:text-stone-400 hover:text-primary hover:bg-primary/5'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-stone-200 dark:border-stone-700">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
            >
              <Languages size={16} />
              <span className="font-bold">{language === 'en' ? 'EN' : 'বাং'}</span>
              <ChevronDown size={14} className={cn('transition-transform duration-200', langOpen && 'rotate-180')} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-stone-900 rounded-xl shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 text-sm transition-colors',
                        language === lang.code
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                      )}
                    >
                      <span>{lang.native}</span>
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-stone-600 dark:text-stone-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link href="/donate">
            <Button size="sm" className="shadow-sm shadow-primary/20">{t('nav.donate')}</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-stone-600 dark:text-stone-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="px-2 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {language === 'en' ? 'বাং' : 'EN'}
          </button>
          <button
            className="p-2 text-stone-600 dark:text-stone-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="lg:hidden bg-white dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-base font-medium py-3 px-4 rounded-xl transition-all',
                    pathname === link.path
                      ? 'text-primary bg-primary/5'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-stone-100 dark:border-stone-800">
                <Link href="/donate" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">{t('nav.donate')}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
