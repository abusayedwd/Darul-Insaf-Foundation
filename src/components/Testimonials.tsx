'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TranslatedText } from './TranslatedText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useAppContext } from '../context/AppContext';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Monthly Donor',
    content: 'Seeing the direct impact of my donations has been incredible. The transparency and dedication of the team keeps me coming back.',
    rating: 5,
    image: 'https://picsum.photos/seed/testimonial1/100/100',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Volunteer',
    content: 'Volunteering with Al-Insaf has been life-changing. The communities we serve are so grateful, and the team is amazing.',
    rating: 5,
    image: 'https://picsum.photos/seed/testimonial2/100/100',
  },
  {
    name: 'Emily Chen',
    role: 'Corporate Partner',
    content: 'Our company proudly partners with Al-Insaf. Their professionalism and measurable impact make them the perfect choice for CSR initiatives.',
    rating: 5,
    image: 'https://picsum.photos/seed/testimonial3/100/100',
  },
  {
    name: 'Fatima Al-Rashid',
    role: 'Community Leader',
    content: 'Al-Insaf Foundation has transformed our village. The clean water project they completed changed everything for our families.',
    rating: 5,
    image: 'https://picsum.photos/seed/testimonial4/100/100',
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
}) => {
  const { t } = useAppContext();

  return (
    <section className="section-padding bg-gradient-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <ScrollReveal direction="up" className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-white/80 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <ScrollReveal direction="up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 h-full"
                >
                  <Quote className="text-white/30 mb-6" size={32} />

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-accent fill-accent" size={18} />
                    ))}
                  </div>

                  <p className="text-white/90 leading-relaxed mb-6 line-clamp-4">
                    "<TranslatedText>{testimonial.content}</TranslatedText>"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">
                        <TranslatedText>{testimonial.role}</TranslatedText>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
