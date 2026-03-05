'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Button } from './Button';
import { useAppContext } from '../context/AppContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <section className="section-padding bg-card">
      <ScrollReveal direction="up">
        <div className="bg-gradient-primary rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto"
            >
              <Mail size={32} />
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                {t('newsletter.title')}
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto">
                {t('newsletter.desc')}
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                  <Check size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold">{t('newsletter.success.title')}</p>
                  <p className="text-sm text-white/70">{t('newsletter.success.desc')}</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-white text-primary hover:bg-stone-100 px-8 py-4 rounded-full font-bold"
                >
                  {isLoading ? (
                    <span className="animate-pulse">{t('newsletter.subscribing')}</span>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      {t('newsletter.subscribe')}
                    </>
                  )}
                </Button>
              </form>
            )}

            <p className="text-xs text-white/50">
              {t('newsletter.privacy')}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
