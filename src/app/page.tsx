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
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { TranslatedText } from '../components/TranslatedText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
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

export default function Home() {
  const { t } = useAppContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

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
                    className="w-full h-full object-cover brightness-[0.4]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="section-padding relative z-10 text-white w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                  >
                    <span className="inline-block px-4 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary-foreground text-sm font-medium mb-6">
                      {t(slide.badge)}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                      {t(slide.title)}
                    </h1>
                    <p className="text-lg md:text-xl text-stone-200 mb-10 leading-relaxed">
                      {t(slide.desc)}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/donate">
                        <Button size="lg" variant="secondary">{t('hero.cta.donate')}</Button>
                      </Link>
                      <Link href="/about">
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-stone-900">
                          {t('hero.cta.learn')}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider Controls */}
        <div className="absolute bottom-10 right-10 z-20 flex gap-4">
          <button className="hero-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all cursor-pointer">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all cursor-pointer">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-12 border-b border-main">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: t('stats.lives'), value: '50k+' },
            { label: t('stats.projects'), value: '120+' },
            { label: t('stats.volunteers'), value: '1.2k' },
            { label: t('stats.countries'), value: '5+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-muted">{t('features.desc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t('features.transparency.title'),
              desc: t('features.transparency.desc'),
              icon: ShieldCheck
            },
            {
              title: t('features.global.title'),
              desc: t('features.global.desc'),
              icon: Globe
            },
            {
              title: t('features.community.title'),
              desc: t('features.community.desc'),
              icon: Users
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-card border border-main shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activities Section - Swiper Slider */}
      <section className="section-padding bg-stone-50 relative overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2">{activity.title}</h3>
                    <p className="text-stone-300 text-sm mb-4 line-clamp-2">{activity.desc}</p>
                    <button 
                      onClick={() => setVideoModal({ isOpen: true, url: activity.video })}
                      className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Play size={20} fill="currentColor" />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Inspirational Video Section - Professional Auto-play Feel */}
      <section className="section-padding bg-stone-900 text-white relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/60 to-transparent z-20" />
          {/* Placeholder for a real auto-playing background video */}
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
                <TranslatedText>Inspiring Change</TranslatedText>
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
                    <TranslatedText>Watch Full Story</TranslatedText>
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
              <div className="flex gap-6">
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
                  <p className="font-bold">
                    <TranslatedText>1,200+ Volunteers</TranslatedText>
                  </p>
                  <p className="text-sm text-muted">
                    <TranslatedText>Joined us this month</TranslatedText>
                  </p>
                </div>
              </div>
              <Link href="/about">
                <Button size="lg">
                  <TranslatedText>Learn More About Us</TranslatedText>
                </Button>
              </Link>
            </div>
            
            <div className="relative group">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
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

      {/* Core Team Section - Swiper Slider */}
      <section className="section-padding bg-stone-50">
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
                    <div className="absolute inset-0 bg-primary rounded-full scale-0 group-hover:scale-105 transition-transform duration-300" />
                    <img src={member.img} alt={member.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover relative z-10 border-4 border-card" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
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
            <p className="text-muted">
              <TranslatedText>Support our ongoing projects and help us reach our goals for this month.</TranslatedText>
            </p>
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
            <div key={i} className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-main">
              <img src={campaign.img} alt={campaign.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6">
                <TranslatedText as="h3" className="text-xl font-bold mb-4">{campaign.title}</TranslatedText>
                <div className="space-y-4">
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${campaign.percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted">
                      <TranslatedText>Raised</TranslatedText>: <span className="text-primary">{campaign.raised}</span>
                    </span>
                    <span className="text-muted">
                      <TranslatedText>Goal</TranslatedText>: {campaign.goal}
                    </span>
                  </div>
                  <Link href={`/campaigns/${i}`}>
                    <Button className="w-full mt-4" variant="outline">
                      <TranslatedText>Donate Now</TranslatedText>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-primary-foreground/80 mb-10 text-lg">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/volunteer">
                <Button size="lg" variant="secondary">{t('nav.volunteer')}</Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" className="bg-white text-primary hover:bg-stone-100">{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <button 
              onClick={() => setVideoModal({ isOpen: false, url: '' })}
              className="absolute top-10 right-10 text-white hover:text-primary transition-colors"
            >
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <iframe 
                src={videoModal.url} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
