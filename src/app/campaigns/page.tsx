'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { Search } from 'lucide-react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';

const campaigns = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    category: 'Environment',
    img: 'https://picsum.photos/seed/water/800/600',
    raised: 12400,
    goal: 20000,
    desc: 'Providing sustainable clean water solutions to rural villages in Bangladesh.'
  },
  {
    id: 2,
    title: 'Education for All',
    category: 'Education',
    img: 'https://picsum.photos/seed/edu/800/600',
    raised: 8200,
    goal: 15000,
    desc: 'Building schools and providing learning materials for underprivileged children.'
  },
  {
    id: 3,
    title: 'Emergency Food Relief',
    category: 'Crisis',
    img: 'https://picsum.photos/seed/food/800/600',
    raised: 18900,
    goal: 25000,
    desc: 'Immediate food assistance for families affected by recent floods.'
  },
  {
    id: 4,
    title: 'Healthcare for Mothers',
    category: 'Health',
    img: 'https://picsum.photos/seed/health/800/600',
    raised: 5600,
    goal: 12000,
    desc: 'Ensuring safe childbirth and postnatal care for mothers in remote areas.'
  },
  {
    id: 5,
    title: 'Youth Skills Training',
    category: 'Livelihood',
    img: 'https://picsum.photos/seed/skills/800/600',
    raised: 3400,
    goal: 10000,
    desc: 'Vocational training programs to help youth gain employment.'
  },
  {
    id: 6,
    title: 'Winter Blanket Drive',
    category: 'Crisis',
    img: 'https://picsum.photos/seed/winter/800/600',
    raised: 9800,
    goal: 10000,
    desc: 'Distributing warm blankets to homeless families during severe winter.'
  }
];

export default function Campaigns() {
  const { t } = useAppContext();

  return (
    <div>
      <section className="bg-primary/5 py-20">
        <div className="section-padding text-center">
          <h1 className="text-5xl font-bold mb-6">{t('nav.campaigns')}</h1>
          <p className="text-muted max-w-2xl mx-auto">
            {t('campaigns.header.desc')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder={t('campaigns.search')} 
              className="w-full pl-12 pr-4 py-3 rounded-full bg-card border border-main focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {[
              { key: 'all', label: t('campaigns.cat.all') },
              { key: 'edu', label: t('campaigns.cat.edu') },
              { key: 'health', label: t('campaigns.cat.health') },
              { key: 'crisis', label: t('campaigns.cat.crisis') },
              { key: 'env', label: t('campaigns.cat.env') }
            ].map((cat) => (
              <button 
                key={cat.key}
                className="px-6 py-2 rounded-full border border-main bg-card text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const percent = Math.round((campaign.raised / campaign.goal) * 100);
            return (
              <motion.div 
                key={campaign.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-[2rem] overflow-hidden border border-main shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={campaign.img} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                    <TranslatedText>{campaign.category}</TranslatedText>
                  </div>
                </div>
                <div className="p-8">
                  <TranslatedText as="h3" className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{campaign.title}</TranslatedText>
                  <TranslatedText as="p" className="text-muted text-sm mb-6 line-clamp-2">{campaign.desc}</TranslatedText>
                  
                  <div className="space-y-4">
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-primary" 
                      />
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-stone-400">{t('campaigns.raised')}: <span className="text-primary">${campaign.raised.toLocaleString()}</span></span>
                      <span className="text-stone-400">{t('campaigns.goal')}: ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <div className="pt-4 flex gap-3">
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
            );
          })}
        </div>
      </section>
    </div>
  );
}
