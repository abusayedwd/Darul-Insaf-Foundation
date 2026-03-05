'use client';

import { motion } from 'motion/react';
import { Target, Eye, Users2, ShieldCheck, Award, HeartHandshake, Scale } from 'lucide-react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';
import { ScrollReveal } from '../../components/ScrollReveal';
import { AnimatedCounter } from '../../components/AnimatedCounter';

export default function About() {
  const { t } = useAppContext();

  return (
    <div>
      {/* Page Header with Background Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80"
            alt="About Us"
            className="w-full h-full object-cover brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
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
              {t('nav.about')}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('about.mission.title')} & {t('about.vision.title')}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {t('about.header.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding grid grid-cols-1 md:grid-cols-2 gap-12">
        <ScrollReveal direction="left">
          <div className="space-y-6 p-8 rounded-3xl bg-card border border-main hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold">{t('about.mission.title')}</h2>
            <p className="text-muted leading-relaxed text-lg">
              {t('about.mission.desc')}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="space-y-6 p-8 rounded-3xl bg-card border border-main hover:border-accent/30 hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-bold">{t('about.vision.title')}</h2>
            <p className="text-muted leading-relaxed text-lg">
              {t('about.vision.desc')}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Impact Stats */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {[
            { value: 50000, suffix: '+', label: t('stats.lives') },
            { value: 120, suffix: '+', label: t('stats.projects') },
            { value: 1200, suffix: '+', label: t('stats.volunteers') },
            { value: 5, suffix: '+', label: t('stats.countries') },
          ].map((stat, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div>
                <div className="text-4xl md:text-5xl font-serif font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-stone-50 dark:bg-stone-900/40">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.values.title')}</h2>
            <p className="text-muted">{t('about.values.desc')}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: t('about.values.integrity'), icon: ShieldCheck, desc: t('about.values.integrity.desc'), color: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' },
            { title: t('about.values.compassion'), icon: HeartHandshake, desc: t('about.values.compassion.desc'), color: 'bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400' },
            { title: t('about.values.justice'), icon: Scale, desc: t('about.values.justice.desc'), color: 'bg-primary/5 text-primary' },
            { title: t('about.values.excellence'), icon: Award, desc: t('about.values.excellence.desc'), color: 'bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400' },
          ].map((value, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="text-center p-8 bg-card rounded-3xl border border-main hover:border-primary/20 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <value.icon size={26} />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.team.title')}</h2>
            <p className="text-muted">{t('about.team.desc')}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Dr. Ahmed Khan', role: 'Founder & CEO', img: 'https://picsum.photos/seed/team1/400/500' },
            { name: 'Sarah Williams', role: 'Director of Operations', img: 'https://picsum.photos/seed/team2/400/500' },
            { name: 'Michael Chen', role: 'Head of Programs', img: 'https://picsum.photos/seed/team3/400/500' },
            { name: 'Fatima Zahra', role: 'Community Outreach', img: 'https://picsum.photos/seed/team4/400/500' },
          ].map((member, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-5 shadow-md">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <TranslatedText as="h3" className="text-xl font-bold mb-1">{member.name}</TranslatedText>
                <TranslatedText as="p" className="text-muted text-sm">{member.role}</TranslatedText>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
