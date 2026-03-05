'use client';

import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/Button';
import { Heart, Share2, Calendar, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { TranslatedText } from '../../../components/TranslatedText';
import { useAppContext } from '../../../context/AppContext';
import { ScrollReveal } from '../../../components/ScrollReveal';

const campaignsData = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    subtitle: 'Clean Water Initiative for Sylhet Villages',
    category: 'Environment',
    img: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&q=80',
    raised: 12400,
    goal: 20000,
    donors: 142,
    location: 'Sylhet, Bangladesh',
    started: 'Jan 15, 2024',
    desc: 'Access to clean water is a fundamental human right, yet thousands of families in the remote villages of Sylhet still struggle with waterborne diseases due to contaminated sources. Our initiative aims to install 50 deep tube wells and provide water purification training to local communities.',
    challenge: 'During the monsoon season, existing shallow wells often get flooded with contaminated surface water. This leads to outbreaks of cholera and other illnesses that disproportionately affect children and the elderly.',
    solution: ['Installation of 50 deep tube wells (300ft+ depth)', 'Community-led maintenance committees for each well', 'Hygiene education workshops for 500+ families', 'Regular water quality testing for the first 24 months'],
  },
  {
    id: 2,
    title: 'Education for All',
    subtitle: 'Building Schools and Changing Lives',
    category: 'Education',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80',
    raised: 8200,
    goal: 15000,
    donors: 89,
    location: 'Dhaka, Bangladesh',
    started: 'Mar 1, 2024',
    desc: 'Thousands of children in rural Bangladesh lack access to quality education. Our initiative builds schools, provides learning materials, and trains teachers to give every child a chance at a better future.',
    challenge: 'Many communities lack proper school buildings, qualified teachers, and basic learning materials. Children, especially girls, are often kept home to help with household chores.',
    solution: ['Construction of 3 new school buildings', 'Scholarship program for 200 students', 'Teacher training workshops quarterly', 'Free textbooks and stationery for all enrolled students'],
  },
  {
    id: 3,
    title: 'Emergency Food Relief',
    subtitle: 'Immediate Food Assistance for Flood Victims',
    category: 'Crisis',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
    raised: 18900,
    goal: 25000,
    donors: 203,
    location: 'Noakhali, Bangladesh',
    started: 'Jun 10, 2024',
    desc: 'Devastating floods have left thousands of families without food and shelter. Our emergency response team is on the ground distributing food packages and ensuring no family goes hungry.',
    challenge: 'Floodwaters destroyed crops and cut off supply routes, making food delivery extremely difficult. Families have lost everything and are surviving on minimal rations.',
    solution: ['Distribution of 5,000 emergency food packages', 'Mobile kitchen serving hot meals daily', 'Nutritional support for pregnant mothers and children', 'Coordination with local authorities for systematic coverage'],
  },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const { t } = useAppContext();
  const campaign = campaignsData.find(c => c.id === Number(id)) || campaignsData[0];
  const percent = Math.round((campaign.raised / campaign.goal) * 100);

  const amounts = ['$10', '$25', '$50', '$100'];

  return (
    <div>
      {/* Hero with Background Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={campaign.img}
            alt={campaign.title}
            className="w-full h-full object-cover brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <TranslatedText>Back to Campaigns</TranslatedText>
            </Link>
            <span className="inline-block px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-wider mb-4">
              <TranslatedText>{campaign.category}</TranslatedText>
            </span>
            <TranslatedText as="h1" className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {campaign.subtitle}
            </TranslatedText>
            <div className="flex flex-wrap gap-5 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={14} /><TranslatedText>{campaign.started}</TranslatedText></span>
              <span className="flex items-center gap-1.5"><MapPin size={14} /><TranslatedText>{campaign.location}</TranslatedText></span>
              <span className="flex items-center gap-1.5 text-green-400"><CheckCircle2 size={14} /><TranslatedText>Verified Cause</TranslatedText></span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-10"
          >
            <div className="rounded-3xl overflow-hidden aspect-video shadow-xl">
              <img
                src={campaign.img}
                alt={campaign.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-6">
              <TranslatedText as="p" className="text-muted leading-relaxed text-lg">
                {campaign.desc}
              </TranslatedText>

              <div className="bg-card border border-main rounded-3xl p-8 space-y-5">
                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    <TranslatedText>The Challenge</TranslatedText>
                  </h3>
                  <TranslatedText as="p" className="text-muted leading-relaxed">
                    {campaign.challenge}
                  </TranslatedText>
                </div>

                <div className="pt-5 border-t border-main">
                  <h3 className="text-2xl font-bold mb-4">
                    <TranslatedText>Our Solution</TranslatedText>
                  </h3>
                  <ul className="space-y-3">
                    {campaign.solution.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                        <TranslatedText as="span" className="text-muted leading-relaxed">
                          {item}
                        </TranslatedText>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Donation Sidebar */}
          <ScrollReveal direction="right">
            <div className="sticky top-28 bg-card rounded-3xl p-8 border border-main shadow-xl space-y-8">
              {/* Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-3xl font-bold text-primary">${campaign.raised.toLocaleString()}</span>
                    <p className="text-muted text-sm mt-1">
                      <TranslatedText>Raised of</TranslatedText> ${campaign.goal.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{percent}%</span>
                    <p className="text-muted text-xs"><TranslatedText>Complete</TranslatedText></p>
                  </div>
                </div>
                <div className="w-full h-3 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                  />
                </div>
                <div className="flex justify-between text-sm font-medium text-muted">
                  <span>{campaign.donors} <TranslatedText>Donors</TranslatedText></span>
                  <span>{percent}% <TranslatedText>of goal reached</TranslatedText></span>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <h4 className="font-bold"><TranslatedText>Select Amount</TranslatedText></h4>
                <div className="grid grid-cols-2 gap-2">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      className="py-3 rounded-xl border border-main hover:border-primary hover:bg-primary hover:text-white font-bold transition-all text-[var(--text-main)]"
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom Amount ($)"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-main text-[var(--text-main)] placeholder:text-muted outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <Link href="/donate">
                  <Button className="w-full py-4 text-lg shadow-lg shadow-primary/20">
                    {t('nav.donate')}
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Heart size={16} className="mr-2" /> <TranslatedText>Save</TranslatedText>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 size={16} className="mr-2" /> <TranslatedText>Share</TranslatedText>
                  </Button>
                </div>
              </div>

              {/* Recent Donors */}
              <div className="pt-6 border-t border-main space-y-4">
                <h4 className="font-bold"><TranslatedText>Recent Donors</TranslatedText></h4>
                {[
                  { name: 'Anonymous', amt: '$50', time: '2 hours ago' },
                  { name: 'John Doe', amt: '$100', time: '5 hours ago' },
                  { name: 'Sarah M.', amt: '$25', time: '1 day ago' },
                ].map((donor, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {donor.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{donor.name}</div>
                      <div className="text-xs text-muted">
                        <TranslatedText>{donor.time}</TranslatedText>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-primary">{donor.amt}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
