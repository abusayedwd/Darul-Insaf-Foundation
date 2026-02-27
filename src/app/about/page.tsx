'use client';

import { motion } from 'motion/react';
import { Target, Eye, Users2, ShieldCheck } from 'lucide-react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';

export default function About() {
  const { t } = useAppContext();

  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary/30 py-20">
        <div className="section-padding text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {t('nav.about')}
          </motion.h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            {t('about.header.desc')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Target size={32} />
          </div>
          <h2 className="text-3xl font-bold">{t('about.mission.title')}</h2>
          <p className="text-muted leading-relaxed text-lg">
            {t('about.mission.desc')}
          </p>
        </div>
        <div className="space-y-6">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <Eye size={32} />
          </div>
          <h2 className="text-3xl font-bold">{t('about.vision.title')}</h2>
          <p className="text-muted leading-relaxed text-lg">
            {t('about.vision.desc')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card section-padding border-y border-main">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.values.title')}</h2>
          <p className="text-muted">{t('about.values.desc')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: t('about.values.integrity'), icon: ShieldCheck, desc: t('about.values.integrity.desc') },
            { title: t('about.values.compassion'), icon: Users2, desc: t('about.values.compassion.desc') },
            { title: t('about.values.justice'), icon: ShieldCheck, desc: t('about.values.justice.desc') },
            { title: t('about.values.excellence'), icon: ShieldCheck, desc: t('about.values.excellence.desc') },
          ].map((value, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <value.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-stone-500 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.team.title')}</h2>
          <p className="text-stone-600">{t('about.team.desc')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Dr. Ahmed Khan', role: 'Founder & CEO', img: 'https://picsum.photos/seed/team1/400/500' },
            { name: 'Sarah Williams', role: 'Director of Operations', img: 'https://picsum.photos/seed/team2/400/500' },
            { name: 'Michael Chen', role: 'Head of Programs', img: 'https://picsum.photos/seed/team3/400/500' },
            { name: 'Fatima Zahra', role: 'Community Outreach', img: 'https://picsum.photos/seed/team4/400/500' },
          ].map((member, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-4">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <TranslatedText as="h3" className="text-xl font-bold">{member.name}</TranslatedText>
              <TranslatedText as="p" className="text-stone-500 text-sm">{member.role}</TranslatedText>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
