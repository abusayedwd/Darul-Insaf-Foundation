'use client';

import { motion } from 'motion/react';
import { Button } from '../../../components/Button';
import { Heart, Share2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function CampaignDetail() {
  return (
    <div>
      <section className="section-padding grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="rounded-[2.5rem] overflow-hidden aspect-video relative">
            <img 
              src="https://picsum.photos/seed/water-detail/1200/800" 
              alt="Campaign" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm font-medium text-stone-500">
              <span className="flex items-center gap-1"><Calendar size={16} /> Started: Jan 15, 2024</span>
              <span className="flex items-center gap-1"><MapPin size={16} /> Location: Sylhet, Bangladesh</span>
              <span className="flex items-center gap-1 text-primary"><CheckCircle2 size={16} /> Verified Cause</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Clean Water Initiative for Sylhet Villages</h1>
            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-4">
              <p>
                Access to clean water is a fundamental human right, yet thousands of families in the remote 
                villages of Sylhet still struggle with waterborne diseases due to contaminated sources. 
                Our initiative aims to install 50 deep tube wells and provide water purification training 
                to local communities.
              </p>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white pt-4">The Challenge</h3>
              <p>
                During the monsoon season, existing shallow wells often get flooded with contaminated 
                surface water. This leads to outbreaks of cholera and other illnesses that disproportionately 
                affect children and the elderly.
              </p>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white pt-4">Our Solution</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Installation of 50 deep tube wells (300ft+ depth).</li>
                <li>Community-led maintenance committees for each well.</li>
                <li>Hygiene education workshops for 500+ families.</li>
                <li>Regular water quality testing for the first 24 months.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Donation Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-card rounded-[2rem] p-8 border border-main shadow-xl space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-primary">$12,400</span>
                <span className="text-stone-400 text-sm">Raised of $20,000</span>
              </div>
              <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '62%' }}
                  className="h-full bg-primary"
                />
              </div>
              <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
                <span>62% Complete</span>
                <span>142 Donors</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold">Select Amount</h4>
              <div className="grid grid-cols-3 gap-2">
                {['$10', '$50', '$100'].map((amt) => (
                  <button key={amt} className="py-3 rounded-xl border border-main hover:border-primary hover:text-primary font-bold transition-all">
                    {amt}
                  </button>
                ))}
              </div>
              <input 
                type="number" 
                placeholder="Custom Amount" 
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-main outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Button className="w-full py-4 text-lg">Donate Now</Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1"><Heart size={18} className="mr-2" /> Save</Button>
                <Button variant="outline" className="flex-1"><Share2 size={18} className="mr-2" /> Share</Button>
              </div>
            </div>

            <div className="pt-6 border-t border-main space-y-4">
              <h4 className="font-bold">Recent Donors</h4>
              {[
                { name: 'Anonymous', amt: '$50', time: '2 hours ago' },
                { name: 'John Doe', amt: '$100', time: '5 hours ago' },
                { name: 'Sarah M.', amt: '$25', time: '1 day ago' },
              ].map((donor, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-400 font-bold">
                    {donor.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{donor.name}</div>
                    <div className="text-xs text-stone-400">{donor.time}</div>
                  </div>
                  <div className="text-sm font-bold text-primary">{donor.amt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
