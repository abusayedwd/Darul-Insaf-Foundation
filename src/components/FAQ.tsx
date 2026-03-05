'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TranslatedText } from './TranslatedText';
import { useAppContext } from '../context/AppContext';

interface FAQItem {
  question: string;
  answer: string;
  questionKey?: string;
  answerKey?: string;
}

interface FAQProps {
  items: FAQItem[];
  titleKey?: string;
  subtitleKey?: string;
  title?: string;
  subtitle?: string;
}

export const FAQ: React.FC<FAQProps> = ({ items, titleKey, subtitleKey, title, subtitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useAppContext();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedSubtitle = subtitleKey ? t(subtitleKey) : subtitle;

  return (
    <section className="section-padding bg-card">
      <ScrollReveal direction="up">
        <div className="text-center mb-16">
          {resolvedTitle && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{resolvedTitle}</h2>
          )}
          {resolvedSubtitle && (
            <p className="text-muted max-w-2xl mx-auto">{resolvedSubtitle}</p>
          )}
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <ScrollReveal key={index} direction="up" delay={index * 0.1}>
            <div className="border border-main rounded-2xl overflow-hidden bg-card hover:border-primary/50 transition-colors">
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
              >
                <span className="font-bold text-lg pr-4">
                  {item.questionKey ? t(item.questionKey) : <TranslatedText>{item.question}</TranslatedText>}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary shrink-0"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-muted leading-relaxed">
                      {item.answerKey ? t(item.answerKey) : <TranslatedText>{item.answer}</TranslatedText>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
