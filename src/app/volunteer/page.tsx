'use client';

import { motion } from 'motion/react';
import { Button } from '../../components/Button';
import { Users, Heart, Star, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Volunteer() {
  const { t } = useAppContext();

  return (
    <div>
      <section className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('volunteer.title').split('Mission')[0]} <span className="text-primary">Mission</span></h1>
            <p className="text-muted text-lg leading-relaxed">
              {t('volunteer.desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: t('volunteer.benefit.impact'), icon: Users, desc: t('volunteer.benefit.impact.desc') },
              { title: t('volunteer.benefit.skills'), icon: Star, desc: t('volunteer.benefit.skills.desc') },
              { title: t('volunteer.benefit.growth'), icon: Heart, desc: t('volunteer.benefit.growth.desc') },
              { title: t('volunteer.benefit.network'), icon: ShieldCheck, desc: t('volunteer.benefit.network.desc') },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-card border border-main shadow-sm">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary shrink-0">
                  <benefit.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{benefit.title}</h4>
                  <p className="text-xs text-muted">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-stone-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <h4 className="text-xl font-bold mb-2">{t('volunteer.testimonial')}</h4>
            <p className="text-stone-400 text-sm">{t('volunteer.testimonial.author')}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-main shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-8">{t('volunteer.form.title')}</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.name')}</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.email')}</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.phone')}</label>
                <input type="tel" placeholder="+1 234 567 890" className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.dob')}</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.interest')}</label>
              <select className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
                <option>{t('volunteer.form.interest.edu')}</option>
                <option>{t('volunteer.form.interest.health')}</option>
                <option>{t('volunteer.form.interest.relief')}</option>
                <option>{t('volunteer.form.interest.fund')}</option>
                <option>{t('volunteer.form.interest.admin')}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.motivation')}</label>
              <textarea rows={4} placeholder={t('volunteer.form.motivation.placeholder')} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
            </div>

            <Button size="lg" className="w-full py-4 text-lg">{t('volunteer.form.submit')}</Button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
