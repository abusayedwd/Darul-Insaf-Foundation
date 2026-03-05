'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';
import { blogPosts } from '../../lib/blogData';

const categories = ['All', 'Impact', 'Events', 'Education', 'Volunteers', 'Crisis', 'Reports'];

const categoryColors: Record<string, string> = {
  Impact: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Events: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Education: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Volunteers: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  Crisis: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  Reports: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300',
};

export default function Blog() {
  const { t } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter(p => p.featured);
  const regular = filtered.filter(p => !p.featured);

  return (
    <div>
      {/* Page Header with Background Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
            alt="Blog"
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
              <TranslatedText>News & Stories</TranslatedText>
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <TranslatedText>News & Updates</TranslatedText>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              <TranslatedText>Stay informed about our latest projects, success stories, and ways to make a difference.</TranslatedText>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-card border border-main text-[var(--text-main)] placeholder:text-muted focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-card border border-main text-muted hover:border-primary hover:text-primary'
                }`}
              >
                <TranslatedText>{cat}</TranslatedText>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {featured.map((post, index) => (
              <ScrollReveal key={post.id} direction="up" delay={index * 0.1}>
                <Link href={`/blog/${post.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-[2rem] overflow-hidden border border-main shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category] || ''}`}>
                        <TranslatedText>{post.category}</TranslatedText>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-muted mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={13} /><TranslatedText>{post.date}</TranslatedText></span>
                        <span className="flex items-center gap-1.5"><Clock size={13} /><TranslatedText>{post.readTime}</TranslatedText></span>
                      </div>
                      <TranslatedText as="h2" className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors flex-1">
                        {post.title}
                      </TranslatedText>
                      <TranslatedText as="p" className="text-muted mb-6 line-clamp-2 text-sm">
                        {post.excerpt}
                      </TranslatedText>
                      <div className="flex items-center gap-3">
                        <img src={post.authorImg} alt={post.author} className="w-8 h-8 rounded-full object-cover border-2 border-primary/20" referrerPolicy="no-referrer" />
                        <span className="text-sm font-medium text-muted">{post.author}</span>
                        <span className="ml-auto flex items-center text-primary font-semibold text-sm">
                          {t('news.readMore')} <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regular.map((post, index) => (
            <ScrollReveal key={post.id} direction="up" delay={index * 0.1}>
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-[2rem] overflow-hidden border border-main shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category] || ''}`}>
                      <TranslatedText>{post.category}</TranslatedText>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} /><TranslatedText>{post.date}</TranslatedText></span>
                      <span className="flex items-center gap-1"><Clock size={12} /><TranslatedText>{post.readTime}</TranslatedText></span>
                    </div>
                    <TranslatedText as="h3" className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </TranslatedText>
                    <TranslatedText as="p" className="text-muted text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </TranslatedText>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-main">
                      <img src={post.authorImg} alt={post.author} className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <span className="text-xs text-muted flex-1">{post.author}</span>
                      <span className="flex items-center text-primary font-semibold text-sm">
                        {t('news.readMore')} <ArrowRight size={13} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="text-xl"><TranslatedText>No articles found.</TranslatedText></p>
          </div>
        )}
      </section>
    </div>
  );
}
