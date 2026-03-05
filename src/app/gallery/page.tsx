'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';
import { ScrollReveal } from '../../components/ScrollReveal';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80', category: 'Education', title: 'New School Opening' },
  { id: 2, src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80', category: 'Health', title: 'Medical Camp 2024' },
  { id: 3, src: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&q=80', category: 'Water', title: 'Clean Water Project' },
  { id: 4, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80', category: 'Crisis', title: 'Food Distribution' },
  { id: 5, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80', category: 'Education', title: 'Student Workshop' },
  { id: 6, src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80', category: 'Health', title: 'Vaccination Drive' },
  { id: 7, src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80', category: 'Water', title: 'Well Installation' },
  { id: 8, src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80', category: 'Crisis', title: 'Emergency Shelter' },
  { id: 9, src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80', category: 'Education', title: 'Library Setup' },
  { id: 10, src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80', category: 'Health', title: 'Health Checkup Camp' },
  { id: 11, src: 'https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?auto=format&fit=crop&q=80', category: 'Crisis', title: 'Ramadan Food Drive' },
  { id: 12, src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80', category: 'Education', title: 'Clothing Drive' },
];

export default function Gallery() {
  const { t } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<{ open: boolean; img: typeof images[0] | null }>({ open: false, img: null });

  const categories = [
    { key: 'All', label: t('gallery.cat.all') },
    { key: 'Education', label: t('gallery.cat.edu') },
    { key: 'Health', label: t('gallery.cat.health') },
    { key: 'Water', label: t('gallery.cat.water') },
    { key: 'Crisis', label: t('gallery.cat.crisis') },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div>
      {/* Page Header with Background Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80"
            alt="Gallery"
            className="w-full h-full object-cover brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              {t('nav.gallery')}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('nav.gallery')}</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t('gallery.header.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        {/* Filter Bar */}
        <ScrollReveal direction="up">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === cat.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-card border border-main text-muted hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-primary hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence>
            {filteredImages.map((img, i) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative group rounded-2xl overflow-hidden cursor-pointer break-inside-avoid"
                onClick={() => setLightbox({ open: true, img })}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                  <div>
                    <TranslatedText as="span" className="text-accent font-bold text-xs uppercase tracking-widest mb-1 block">
                      {img.category}
                    </TranslatedText>
                    <TranslatedText as="h3" className="text-white text-lg font-bold">
                      {img.title}
                    </TranslatedText>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && lightbox.img && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox({ open: false, img: null })}
          >
            <button className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-10">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] relative"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.img.src}
                alt={lightbox.img.title}
                className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <TranslatedText as="span" className="text-accent text-xs font-bold uppercase tracking-widest block mb-1">
                  {lightbox.img.category}
                </TranslatedText>
                <TranslatedText as="h3" className="text-white text-xl font-bold">
                  {lightbox.img.title}
                </TranslatedText>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
