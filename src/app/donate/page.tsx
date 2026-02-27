'use client';

import { motion } from 'motion/react';
import { Button } from '../../components/Button';
import { CreditCard, Heart, ShieldCheck, Globe, Smartphone, Landmark } from 'lucide-react';
import { TranslatedText } from '../../components/TranslatedText';
import { useAppContext } from '../../context/AppContext';

export default function Donate() {
  const { t } = useAppContext();

  return (
    <div>
      <section className="section-padding max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">{t('donate.title')}</h1>
          <p className="text-muted">{t('donate.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-card rounded-[2.5rem] p-8 md:p-10 border border-main shadow-xl space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest">
                <TranslatedText>Select Frequency</TranslatedText>
              </label>
              <div className="flex p-1 bg-stone-100 rounded-2xl">
                <button className="flex-1 py-3 rounded-xl bg-white shadow-sm font-bold text-primary">
                  <TranslatedText>One-time</TranslatedText>
                </button>
                <button className="flex-1 py-3 rounded-xl text-stone-500 font-bold hover:text-stone-700">
                  <TranslatedText>Monthly</TranslatedText>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest">
                <TranslatedText>Select Amount</TranslatedText>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['$20', '$50', '$100', '$250', '$500', 'Other'].map((amt) => (
                  <button key={amt} className="py-4 rounded-2xl border border-main bg-card hover:border-primary hover:text-primary font-bold transition-all">
                    <TranslatedText>{amt}</TranslatedText>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest">
                <TranslatedText>Payment Method</TranslatedText>
              </label>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-6 rounded-2xl border-2 border-primary bg-primary/5 space-y-4">
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <Smartphone size={24} /> <TranslatedText>Mobile Banking</TranslatedText>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-card rounded-xl border border-main">
                      <p className="text-xs text-muted mb-1">{t('donate.bkash')}</p>
                      <p className="font-bold text-primary">017XXXXXXXX</p>
                    </div>
                    <div className="p-4 bg-card rounded-xl border border-main">
                      <p className="text-xs text-muted mb-1">{t('donate.nagad')}</p>
                      <p className="font-bold text-primary">019XXXXXXXX</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-main bg-card space-y-4">
                  <div className="flex items-center gap-3 font-bold">
                    <Landmark size={24} /> {t('donate.bank')}
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-main">
                    <p className="text-sm leading-relaxed">{t('donate.bank.info')}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full py-5 text-xl">
              <TranslatedText>Confirm Donation</TranslatedText>
            </Button>
            
            <p className="text-center text-xs text-muted">
              <TranslatedText>By donating, you agree to our Terms of Service and Privacy Policy.</TranslatedText>
            </p>
          </div>

          {/* Impact Info */}
          <div className="space-y-10 py-6">
            <div className="space-y-4">
              <TranslatedText as="h2" className="text-3xl font-bold">How your donation helps</TranslatedText>
              <p className="text-muted leading-relaxed">
                <TranslatedText>We ensure that 90% of every donation goes directly to our programs on the ground. The remaining 10% helps us maintain our operations and reach more people.</TranslatedText>
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: '100% Secure', icon: ShieldCheck, desc: 'Your payment information is encrypted and never stored on our servers.' },
                { title: 'Tax Deductible', icon: Heart, desc: 'Al-Insaf is a registered non-profit. Your donations are tax-deductible.' },
                { title: 'Global Impact', icon: Globe, desc: 'We work in over 5 countries to bring relief to those in most desperate need.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <TranslatedText as="h4" className="font-bold">{item.title}</TranslatedText>
                    <TranslatedText as="p" className="text-sm text-muted">{item.desc}</TranslatedText>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
              <TranslatedText as="h4" className="font-bold mb-2">Need help?</TranslatedText>
              <p className="text-sm text-muted mb-4">
                <TranslatedText>Our donation support team is here to help you with any questions.</TranslatedText>
              </p>
              <a href="mailto:donations@alinsaf.org" className="text-primary font-bold hover:underline">donations@alinsaf.org</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
