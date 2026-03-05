'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './Button';
import { useState } from 'react';

export const Footer = () => {
  const { t, theme, toggleTheme } = useAppContext();
  const [email, setEmail] = useState('');

  return (
    <footer className="relative bg-stone-950 text-stone-400 pt-20 pb-10 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />
      <div className="absolute inset-0 z-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Heart size={22} fill="currentColor" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight block">Al-Insaf</span>
              <span className="text-xs text-primary-light tracking-widest uppercase">Foundation</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed">{t('footer.desc')}</p>
          <div className="flex gap-3">
            {[
              { icon: Facebook, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Instagram, href: '#' },
              { icon: Youtube, href: '#' },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-primary flex items-center justify-center text-stone-400 hover:text-white transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6 font-semibold">{t('footer.links')}</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: t('nav.about'), href: '/about' },
              { label: t('nav.campaigns'), href: '/campaigns' },
              { label: t('nav.gallery'), href: '/gallery' },
              { label: t('nav.blog'), href: '/blog' },
              { label: t('nav.volunteer'), href: '/volunteer' },
              { label: t('nav.donate'), href: '/donate' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6 font-semibold">{t('footer.contact')}</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span>123 Justice Way, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-primary shrink-0" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-primary shrink-0" />
              <span>info@alinsaf.org</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-serif text-lg mb-6 font-semibold">{t('footer.newsletter')}</h4>
          <p className="text-sm mb-4">{t('footer.newsletter.sub')}</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
            className="space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsletter.placeholder')}
              className="w-full bg-stone-900 border border-stone-800 focus:border-primary rounded-xl px-4 py-3 text-sm text-white placeholder:text-stone-600 outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              {t('newsletter.subscribe')}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500">{t('common.theme')}</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs text-stone-400 hover:text-white transition-colors"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'light' ? t('common.darkMode') : t('common.lightMode')}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <p>&copy; {new Date().getFullYear()} Al-Insaf Foundation. {t('footer.rights')}</p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
          <Link href="/about" className="hover:text-stone-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
