'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { useAppContext } from '../context/AppContext';

interface Partner {
  name: string;
  logo: string;
}

const defaultPartners: Partner[] = [
  { name: 'UNICEF', logo: 'https://picsum.photos/seed/partner1/200/80' },
  { name: 'WHO', logo: 'https://picsum.photos/seed/partner2/200/80' },
  { name: 'UNDP', logo: 'https://picsum.photos/seed/partner3/200/80' },
  { name: 'Save the Children', logo: 'https://picsum.photos/seed/partner4/200/80' },
  { name: 'Red Crescent', logo: 'https://picsum.photos/seed/partner5/200/80' },
  { name: 'World Food Programme', logo: 'https://picsum.photos/seed/partner6/200/80' },
];

interface PartnersProps {
  partners?: Partner[];
}

export const Partners: React.FC<PartnersProps> = ({
  partners = defaultPartners,
}) => {
  const { t } = useAppContext();

  return (
    <section className="section-padding bg-stone-50 dark:bg-stone-900/50">
      <ScrollReveal direction="up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('partners.title')}</h2>
          <p className="text-muted max-w-2xl mx-auto">{t('partners.subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1}
              className="flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, filter: 'grayscale(0%)' }}
                className="grayscale opacity-60 hover:opacity-100 transition-all cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-16 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
