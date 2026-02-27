'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Footer = () => {
  const { t } = useAppContext();

  return (
    <footer className="relative bg-stone-900 text-stone-300 pt-20 pb-10 transition-colors duration-300 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
          alt="Footer Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <Heart size={24} fill="currentColor" />
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              Al-Insaf
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            {t('footer.desc')}
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">{t('footer.links')}</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
            <li><Link href="/campaigns" className="hover:text-primary transition-colors">{t('nav.campaigns')}</Link></li>
            <li><Link href="/gallery" className="hover:text-primary transition-colors">{t('nav.gallery')}</Link></li>
            <li><Link href="/volunteer" className="hover:text-primary transition-colors">{t('nav.volunteer')}</Link></li>
            <li><Link href="/donate" className="hover:text-primary transition-colors">{t('nav.donate')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">{t('footer.contact')}</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>123 Justice Way, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>info@alinsaf.org</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-6">{t('footer.newsletter')}</h4>
          <p className="text-sm mb-4">Subscribe to get updates on our latest projects.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-stone-800 border-none rounded-full px-4 py-2 text-sm w-full focus:ring-2 focus:ring-primary outline-none"
            />
            <button className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
              <Mail size={18} />
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-stone-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Al-Insaf Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
};
