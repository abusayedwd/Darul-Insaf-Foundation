'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/Button';
import Link from 'next/link';
import {
  Heart,
  Users,
  Globe,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Calendar,
  Clock,
  Droplets,
  BookOpen,
  Utensils,
  Stethoscope,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { TranslatedText } from '../components/TranslatedText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ScrollReveal } from '../components/ScrollReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Testimonials } from '../components/Testimonials';
import { Partners } from '../components/Partners';
import { Newsletter } from '../components/Newsletter';
import { FAQ } from '../components/FAQ';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
    badge: 'hero.badge',
    title: 'hero.title',
    desc: 'hero.desc',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80',
    badge: 'activities.iftar',
    title: 'activities.iftar.desc',
    desc: 'hero.desc',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80',
    badge: 'activities.medical',
    title: 'activities.medical.desc',
    desc: 'hero.desc',
  }
];

const teamMembersData = [
  { name: 'Dr. Abdullah Al-Mamun', role: 'team.role.chairman', img: 'https://picsum.photos/seed/team1/400/400' },
  { name: 'Sarah Rahman', role: 'team.role.director', img: 'https://picsum.photos/seed/team2/400/400' },
  { name: 'Engr. Kamal Hossain', role: 'team.role.head', img: 'https://picsum.photos/seed/team3/400/400' },
  { name: 'Fatima Zohra', role: 'team.role.coordinator', img: 'https://picsum.photos/seed/team4/400/400' },
];

const latestNews = [
  {
    id: 1,
    title: 'Clean Water Project Reaches 10,000 Families',
    excerpt: 'Our latest initiative has successfully provided clean drinking water to over 10,000 families in rural Bangladesh.',
    image: 'https://picsum.photos/seed/blog1/800/500',
    date: 'February 15, 2025',
    readTime: '5 min read',
    category: 'Impact',
  },
  {
    id: 2,
    title: 'Ramadan Food Drive 2025: A Huge Success',
    excerpt: 'Thanks to our generous donors, we distributed over 50,000 meals during the holy month of Ramadan.',
    image: 'https://picsum.photos/seed/blog2/800/500',
    date: 'February 10, 2025',
    readTime: '4 min read',
    category: 'Events',
  },
  {
    id: 3,
    title: 'New Education Center Opens in Sylhet',
    excerpt: 'We are proud to announce the opening of our newest education center, serving 500+ children in need.',
    image: 'https://picsum.photos/seed/blog3/800/500',
    date: 'February 5, 2025',
    readTime: '3 min read',
    category: 'Education',
  },
];

const impactTiers = [
  {
    amount: '$10',
    icon: Utensils,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    title: 'Feed a Family',
    desc: 'Provides a full week of nutritious meals for a family of four in need.',
  },
  {
    amount: '$50',
    icon: Droplets,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    title: 'Clean Water Access',
    desc: 'Supplies clean drinking water for 20 people for an entire month.',
    featured: true,
  },
  {
    amount: '$100',
    icon: BookOpen,
    color: 'from-primary to-primary-light',
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary/20',
    title: 'Educate a Child',
    desc: 'Covers school materials, uniform, and fees for one child for a full semester.',
  },
  {
    amount: '$250',
    icon: Stethoscope,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
    borderColor: 'border-rose-200 dark:border-rose-800',
    title: 'Medical Camp',
    desc: 'Funds a free health checkup camp serving 50+ patients in remote areas.',
  },
];

const faqItems = [
  { questionKey: 'faq.q1', answerKey: 'faq.a1', question: '', answer: '' },
  { questionKey: 'faq.q2', answerKey: 'faq.a2', question: '', answer: '' },
  { questionKey: 'faq.q3', answerKey: 'faq.a3', question: '', answer: '' },
  { questionKey: 'faq.q4', answerKey: 'faq.a4', question: '', answer: '' },
  { questionKey: 'faq.q5', answerKey: 'faq.a5', question: '', answer: '' },
  { questionKey: 'faq.q6', answerKey: 'faq.a6', question: '', answer: '' },
];

export default function Home() {
  const { t } = useAppContext();
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });

  const teamMembers = teamMembersData.map(member => ({
    ...member,
    role: t(member.role)
  }));

  const activities = [
    {
      title: t('activities.iftar'),
      desc: t('activities.iftar.desc'),
      img: 'https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?auto=format&fit=crop&q=80',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      title: t('activities.clothing'),
      desc: t('activities.clothing.desc'),
      img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      title: t('activities.medical'),
      desc: t('activities.medical.desc'),
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
  ];

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[90vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: '.hero-next',
            prevEl: '.hero-prev',
          }}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full flex items-center">
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt="Hero"
                    className="w-full h-full object-cover brightness-[0.35]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="section-padding relative z-10 text-white w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="max-w-3xl"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/40 rounded-full text-sm font-semibold mb-6"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      {t(slide.badge)}
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      {t(slide.title)}
                    </h1>
                    <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed max-w-2xl">
                      {t(slide.desc)}
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Link href="/donate">
                        <Button size="lg" variant="secondary" className="shadow-lg shadow-accent/20">
                          {t('hero.cta.donate')}
                        </Button>
                      </Link>
                      <Link href="/about">
                        <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white hover:text-stone-900 backdrop-blur-sm">
                          {t('hero.cta.learn')}
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider Controls */}
        <div className="absolute bottom-10 right-10 z-20 flex gap-3">
          <button className="hero-prev w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all cursor-pointer">
            <ChevronLeft size={22} />
          </button>
          <button className="hero-next w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all cursor-pointer">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-white/30 rounded-full"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-16 border-b border-main">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: t('stats.lives'), value: 50000, suffix: '+', prefix: '' },
            { label: t('stats.projects'), value: 120, suffix: '+', prefix: '' },
            { label: t('stats.volunteers'), value: 1200, suffix: '+', prefix: '' },
            { label: t('stats.countries'), value: 5, suffix: '+', prefix: '' },
          ].map((stat, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div className="text-center group">
                <div className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-sm text-muted uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
            <p className="text-muted">{t('features.desc')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t('features.transparency.title'), desc: t('features.transparency.desc'), icon: ShieldCheck },
            { title: t('features.global.title'), desc: t('features.global.desc'), icon: Globe },
            { title: t('features.community.title'), desc: t('features.community.desc'), icon: Users }
          ].map((feature, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-card border border-main shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="section-padding bg-stone-50 dark:bg-stone-900/50 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('activities.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted"
          >
            {t('activities.desc')}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-16"
          >
            {activities.map((activity, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group/item relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-lg"
                >
                  <img src={activity.img} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2">{activity.title}</h3>
                    <p className="text-stone-300 text-sm mb-5 line-clamp-2">{activity.desc}</p>
                    <button
                      onClick={() => setVideoModal({ isOpen: true, url: activity.video })}
                      className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-110 hover:bg-primary-light transition-all cursor-pointer"
                    >
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Donation Impact Tiers */}
      <section className="section-padding">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('impact.title')}</h2>
            <p className="text-muted">{t('impact.desc')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactTiers.map((tier, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative p-8 rounded-3xl border-2 ${tier.bgColor} ${tier.borderColor} transition-all duration-300 group flex flex-col ${tier.featured ? 'ring-2 ring-primary ring-offset-2' : ''}`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    <TranslatedText>Most Popular</TranslatedText>
                  </span>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <tier.icon size={26} />
                </div>
                <div className="text-4xl font-serif font-bold mb-2">{tier.amount}</div>
                <h3 className="text-lg font-bold mb-3">
                  <TranslatedText>{tier.title}</TranslatedText>
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
                  <TranslatedText>{tier.desc}</TranslatedText>
                </p>
                <Link href="/donate">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    {t('impact.donate')}
                  </Button>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Inspirational Video Section */}
      <section className="section-padding bg-stone-900 text-white relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/60 to-transparent z-20" />
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                {t('common.inspiring')}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                {t('inspire.title')}
              </h2>
              <p className="text-xl text-stone-300 leading-relaxed max-w-xl">
                {t('inspire.desc')}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/donate">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-10 py-6 text-lg rounded-2xl shadow-xl shadow-primary/20">
                    {t('inspire.cta')}
                  </Button>
                </Link>
                <button
                  onClick={() => setVideoModal({ isOpen: true, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' })}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-all">
                    <Play size={24} fill="currentColor" />
                  </div>
                  <span className="font-bold tracking-wider uppercase text-sm">
                    {t('common.watch')}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Impact Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {t('video.title')}
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                {t('video.desc')}
              </p>
              <div className="flex gap-6 items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/${i + 10}/100/100`}
                      className="w-12 h-12 rounded-full border-4 border-white object-cover"
                      alt="User"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold">1,200+ {t('common.volunteers')}</p>
                  <p className="text-sm text-muted">{t('common.joined')}</p>
                </div>
              </div>
              <Link href="/about">
                <Button size="lg">{t('common.learn.more')}</Button>
              </Link>
            </div>

            <div className="relative group">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80"
                  alt="Impact Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => setVideoModal({ isOpen: true, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' })}
                    className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play size={40} fill="currentColor" />
                  </button>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="section-padding bg-stone-50 dark:bg-stone-900/50">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('team.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted"
          >
            {t('team.desc')}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={2}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-16"
          >
            {teamMembers.map((member, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
                    <img src={member.img} alt={member.name} className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover relative z-10 border-4 border-white dark:border-stone-800 shadow-lg" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="section-padding">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('campaigns.active')}</h2>
            <p className="text-muted">{t('campaigns.support')}</p>
          </div>
          <Link href="/campaigns">
            <Button variant="ghost" className="group">
              {t('campaigns.viewAll')} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Clean Water Initiative',
              img: 'https://picsum.photos/seed/water/600/400',
              raised: '$12,400',
              goal: '$20,000',
              percent: 62
            },
            {
              title: 'Education for All',
              img: 'https://picsum.photos/seed/edu/600/400',
              raised: '$8,200',
              goal: '$15,000',
              percent: 54
            },
            {
              title: 'Emergency Food Relief',
              img: 'https://picsum.photos/seed/food/600/400',
              raised: '$18,900',
              goal: '$25,000',
              percent: 75
            }
          ].map((campaign, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-main group"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={campaign.img}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <TranslatedText as="h3" className="text-xl font-bold mb-4">{campaign.title}</TranslatedText>
                  <div className="space-y-4">
                    <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${campaign.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted">
                        {t('campaigns.raised')}: <span className="text-primary font-bold">{campaign.raised}</span>
                      </span>
                      <span className="text-muted">
                        {t('campaigns.goal')}: <span className="font-bold">{campaign.goal}</span>
                      </span>
                    </div>
                    <Link href={`/campaigns/${i}`}>
                      <Button className="w-full mt-2">
                        {t('campaigns.donate')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section-padding bg-stone-50 dark:bg-stone-900/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('news.title')}</h2>
            <p className="text-muted">{t('news.desc')}</p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="group">
              {t('news.viewAll')} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((post, i) => (
            <ScrollReveal key={post.id} direction="up" delay={i * 0.1}>
              <Link href={`/blog/${post.id}`} className="group block">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-card rounded-3xl overflow-hidden border border-main shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      <TranslatedText>{post.category}</TranslatedText>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        <TranslatedText>{post.date}</TranslatedText>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        <TranslatedText>{post.readTime}</TranslatedText>
                      </span>
                    </div>
                    <TranslatedText as="h3" className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </TranslatedText>
                    <div className="flex items-center text-primary font-semibold text-sm mt-4">
                      {t('news.readMore')} <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwYzkuOTQgMCAxOCA4LjA2IDE4IDE4aC0xOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L2c+PC9zdmc+')] opacity-30" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-white/80 mb-10 text-lg leading-relaxed">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/volunteer">
                <Button size="lg" variant="secondary" className="shadow-lg">{t('nav.volunteer')}</Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-stone-100 shadow-lg">{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ
        titleKey="faq.title"
        subtitleKey="faq.subtitle"
        items={faqItems}
      />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
            onClick={() => setVideoModal({ isOpen: false, url: '' })}
          >
            <button
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors z-10"
            >
              <X size={36} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoModal.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
