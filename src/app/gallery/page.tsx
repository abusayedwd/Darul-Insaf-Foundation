'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';

const images = [
  { id: 1, src: 'https://picsum.photos/seed/gal1/800/800', category: 'Education', title: 'New School Opening' },
  { id: 2, src: 'https://picsum.photos/seed/gal2/800/1000', category: 'Health', title: 'Medical Camp 2023' },
  { id: 3, src: 'https://picsum.photos/seed/gal3/1000/800', category: 'Water', title: 'Clean Water Project' },
  { id: 4, src: 'https://picsum.photos/seed/gal4/800/800', category: 'Crisis', title: 'Food Distribution' },
  { id: 5, src: 'https://picsum.photos/seed/gal5/800/1200', category: 'Education', title: 'Student Workshop' },
  { id: 6, src: 'https://picsum.photos/seed/gal6/1200/800', category: 'Health', title: 'Vaccination Drive' },
  { id: 7, src: 'https://picsum.photos/seed/gal7/800/800', category: 'Water', title: 'Well Installation' },
  { id: 8, src: 'https://picsum.photos/seed/gal8/800/1000', category: 'Crisis', title: 'Emergency Shelter' },
  { id: 9, src: 'https://picsum.photos/seed/gal9/1000/800', category: 'Education', title: 'Library Setup' },
];

export default function Gallery() {
  const { t } = useAppContext();
  const [filter, setFilter] = useState('All');
  const categories = [
    { key: 'All', label: t('gallery.cat.all') },
    { key: 'Education', label: t('gallery.cat.edu') },
    { key: 'Health', label: t('gallery.cat.health') },
    { key: 'Water', label: t('gallery.cat.water') },
    { key: 'Crisis', label: t('gallery.cat.crisis') }
  ];

  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div>
      <section className="section-padding">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t('nav.gallery')}</h1>
          <p className="text-muted max-w-2xl mx-auto">
            {t('gallery.header.desc')}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat.key 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-card text-muted hover:bg-stone-50 border border-main'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative group rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <TranslatedText as="span" className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{img.category}</TranslatedText>
                <TranslatedText as="h3" className="text-white text-xl font-bold">{img.title}</TranslatedText>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
