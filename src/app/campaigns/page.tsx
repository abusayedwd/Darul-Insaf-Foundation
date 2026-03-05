'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { Search } from 'lucide-react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';
import { ScrollReveal } from '../../components/ScrollReveal';

const campaigns = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    category: 'Environment',
    img: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&q=80',
    raised: 12400,
    goal: 20000,
    desc: 'Providing sustainable clean water solutions to rural villages in Bangladesh.'
  },
  {
    id: 2,
    title: 'Education for All',
    category: 'Education',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80',
    raised: 8200,
    goal: 15000,
    desc: 'Building schools and providing learning materials for underprivileged children.'
  },
  {
    id: 3,
    title: 'Emergency Food Relief',
    category: 'Crisis',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
    raised: 18900,
    goal: 25000,
    desc: 'Immediate food assistance for families affected by recent floods.'
  },
  {
    id: 4,
    title: 'Healthcare for Mothers',
    category: 'Health',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    raised: 5600,
    goal: 12000,
    desc: 'Ensuring safe childbirth and postnatal care for mothers in remote areas.'
  },
  {
    id: 5,
    title: 'Youth Skills Training',
    category: 'Livelihood',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    raised: 3400,
    goal: 10000,
    desc: 'Vocational training programs to help youth gain meaningful employment.'
  },
  {
    id: 6,
    title: 'Winter Blanket Drive',
    category: 'Crisis',
    img: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80',
    raised: 9800,
    goal: 10000,
    desc: 'Distributing warm blankets to homeless families during severe winter.'
  }
];

export default function Campaigns() {
  const { t } = useAppContext();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: t('campaigns.cat.all') },
    { key: 'edu', label: t('campaigns.cat.edu') },
    { key: 'health', label: t('campaigns.cat.health') },
    { key: 'crisis', label: t('campaigns.cat.crisis') },
    { key: 'env', label: t('campaigns.cat.env') },
    { key: 'live', label: t('campaigns.cat.live') },
  ];

  const categoryMap: Record<string, string> = {
    edu: 'Education',
    health: 'Health',
    crisis: 'Crisis',
    env: 'Environment',
    live: 'Livelihood',
  };

  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || c.category === categoryMap[activeCategory];
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Page Header with Background Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80"
            alt="Campaigns"
            className="w-full h-full object-cover brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              {t('nav.campaigns')}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('campaigns.active')}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              {t('campaigns.header.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('campaigns.search')}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-card border border-main text-[var(--text-main)] placeholder:text-muted focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center md:justify-end w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-card border border-main text-muted hover:border-primary hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((campaign, i) => {
            const percent = Math.round((campaign.raised / campaign.goal) * 100);
            return (
              <ScrollReveal key={campaign.id} direction="up" delay={i * 0.1}>
                <motion.div
                  layout
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-[2rem] overflow-hidden border border-main shadow-sm hover:shadow-xl transition-all group h-full flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={campaign.img}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      <TranslatedText>{campaign.category}</TranslatedText>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                      {percent}%
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <TranslatedText as="h3" className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {campaign.title}
                    </TranslatedText>
                    <TranslatedText as="p" className="text-muted text-sm mb-5 line-clamp-2 flex-1">
                      {campaign.desc}
                    </TranslatedText>

                    <div className="space-y-3">
                      <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2 }}
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-muted">
                          {t('campaigns.raised')}: <span className="text-primary">${campaign.raised.toLocaleString()}</span>
                        </span>
                        <span className="text-muted">
                          {t('campaigns.goal')}: <span className="font-bold text-[var(--text-main)]">${campaign.goal.toLocaleString()}</span>
                        </span>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                          <Button className="w-full" variant="outline">{t('campaigns.details')}</Button>
                        </Link>
                        <Link href="/donate" className="flex-1">
                          <Button className="w-full">{t('campaigns.donate')}</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="text-xl">
              <TranslatedText>No campaigns found. Try a different search or filter.</TranslatedText>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
