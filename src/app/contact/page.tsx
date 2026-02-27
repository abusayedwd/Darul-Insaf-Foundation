'use client';

import { motion } from 'motion/react';
import { Button } from '../../components/Button';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Contact() {
  const { t } = useAppContext();

  return (
    <div>
      <section className="section-padding">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-muted max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card rounded-[2rem] p-8 border border-main shadow-sm space-y-8">
              <h3 className="text-2xl font-bold">{t('contact.info.title')}</h3>
              
              <div className="space-y-6">
                {[
                  { title: t('contact.info.email'), icon: Mail, value: 'info@alinsaf.org', sub: t('contact.info.email.sub') },
                  { title: t('contact.info.phone'), icon: Phone, value: '+880 1234 567890', sub: t('contact.info.phone.sub') },
                  { title: t('contact.info.visit'), icon: MapPin, value: '123 Justice Way, Dhaka', sub: t('contact.info.visit.sub') },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-primary font-medium">{item.value}</p>
                      <p className="text-xs text-muted mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-main">
                <h4 className="font-bold mb-4">{t('contact.social.title')}</h4>
                <div className="flex gap-3">
                  {['FB', 'TW', 'IG', 'YT'].map((social) => (
                    <button key={social} className="w-10 h-10 rounded-full bg-stone-50 border border-main flex items-center justify-center text-xs font-bold text-stone-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-[2rem] p-8 text-white">
              <MessageSquare size={32} className="mb-4 opacity-50" />
              <h4 className="text-xl font-bold mb-2">{t('contact.support.title')}</h4>
              <p className="text-primary-foreground/80 text-sm mb-6">{t('contact.support.desc')}</p>
              <Button className="bg-white text-primary hover:bg-stone-100 w-full">{t('contact.support.cta')}</Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-main shadow-xl"
            >
              <h2 className="text-3xl font-bold mb-8">{t('contact.form.title')}</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('contact.form.name')}</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('volunteer.form.email')}</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('contact.form.subject')}</label>
                  <input type="text" placeholder={t('contact.form.subject.placeholder')} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-widest">{t('contact.form.message')}</label>
                  <textarea rows={6} placeholder={t('contact.form.message.placeholder')} className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-main outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
                </div>

                <Button size="lg" className="w-full py-4 text-lg">
                  <Send size={18} className="mr-2" /> {t('contact.form.send')}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Integration */}
      <section className="section-padding pt-0">
        <div className="rounded-[3rem] overflow-hidden h-[450px] relative border border-main shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.254272231177!2d90.3654215!3d23.7985508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d33532b3fb%3A0x206303314639e727!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd" 
            className="w-full h-full border-0" 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <h4 className="font-bold">{t('contact.map.title')}</h4>
            </div>
            <p className="text-sm text-muted">{t('contact.map.address')}</p>
            <p className="text-xs text-stone-400 mt-2">{t('contact.map.hours')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
