'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

type Language = 'en' | 'bn';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.campaigns': 'Campaigns',
    'nav.gallery': 'Gallery',
    'nav.volunteer': 'Volunteer',
    'nav.contact': 'Contact',
    'nav.donate': 'Donate Now',
    'nav.blog': 'Blog',
    'hero.badge': 'Serving Humanity',
    'hero.title': 'Bringing Justice & Relief to the Vulnerable',
    'hero.desc': 'Al-Insaf Foundation is a non-profit organization dedicated to providing essential aid and restoring dignity to communities in need.',
    'hero.cta.donate': 'Start Donating',
    'hero.cta.learn': 'Learn More',
    'stats.lives': 'Lives Impacted',
    'stats.projects': 'Projects Done',
    'stats.volunteers': 'Volunteers',
    'stats.countries': 'Countries',
    'features.title': 'Why Choose Al-Insaf?',
    'features.desc': 'We believe in transparent, impactful, and sustainable solutions for the world\'s most pressing challenges.',
    'features.transparency.title': 'Transparency',
    'features.transparency.desc': 'Every penny you donate is tracked and reported with full accountability.',
    'features.global.title': 'Global Reach',
    'features.global.desc': 'Our network spans across borders to reach those in most desperate need.',
    'features.community.title': 'Community Driven',
    'features.community.desc': 'We work directly with local leaders to ensure sustainable growth.',
    'activities.title': 'Our Recent Activities',
    'activities.desc': 'Witness the impact of your support through our latest field work and community service.',
    'activities.iftar': 'Iftar Distribution',
    'activities.clothing': 'Clothing for All',
    'activities.medical': 'Medical Assistance',
    'activities.iftar.desc': 'Providing nutritious meals to families during the holy month of Ramadan.',
    'activities.clothing.desc': 'Distributing warm clothes and essentials to those in need during winter.',
    'activities.medical.desc': 'Free health checkups and medicine distribution in remote areas.',
    'video.title': 'Watch Our Impact',
    'video.desc': 'See how your contributions are changing lives on the ground. Every video tells a story of hope.',
    'inspire.title': 'Be the Change the World Needs',
    'inspire.desc': 'Your small act of kindness can ignite a flame of hope in someone\'s darkest hour. Watch how we turn your compassion into action.',
    'inspire.cta': 'Donate to Save Lives',
    'team.title': 'Our Core Team',
    'team.desc': 'The dedicated leaders driving our mission forward.',
    'team.role.chairman': 'Chairman',
    'team.role.director': 'Executive Director',
    'team.role.head': 'Project Head',
    'team.role.coordinator': 'Volunteer Coordinator',
    'cta.title': 'Ready to make an impact?',
    'cta.desc': 'Whether you donate your time or your resources, every bit helps us bring justice and relief to those who need it most.',
    'cta.button': 'Make a Donation Now',
    'news.title': 'Latest News & Updates',
    'news.desc': 'Stay informed about our latest projects, success stories, and ways to make a difference.',
    'news.viewAll': 'View All News',
    'news.readMore': 'Read More',
    'impact.title': 'Your Donation Creates Real Change',
    'impact.desc': 'See how different contribution levels help us serve more communities every day.',
    'impact.donate': 'Donate This Amount',
    'about.header.desc': 'Dedicated to restoring justice and providing relief to the most vulnerable communities across the globe.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To empower underserved communities by providing access to quality education, healthcare, and sustainable economic opportunities, while advocating for social justice and human rights for all.',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'A world where every individual has the opportunity to thrive in a just, equitable, and compassionate society, free from poverty and oppression.',
    'about.values.title': 'Our Core Values',
    'about.values.desc': 'The principles that guide everything we do.',
    'about.values.integrity': 'Integrity',
    'about.values.integrity.desc': 'We act with honesty and transparency in all our dealings.',
    'about.values.compassion': 'Compassion',
    'about.values.compassion.desc': 'We serve with empathy and a deep commitment to human dignity.',
    'about.values.justice': 'Justice',
    'about.values.justice.desc': 'We strive for fairness and equity in every community we serve.',
    'about.values.excellence': 'Excellence',
    'about.values.excellence.desc': 'We aim for the highest standards in our programs and operations.',
    'about.team.title': 'Meet Our Team',
    'about.team.desc': 'The passionate individuals behind Al-Insaf Foundation.',
    'volunteer.title': 'Join Our Mission',
    'volunteer.desc': 'Volunteers are the backbone of Al-Insaf Foundation. By giving your time and skills, you can help us reach more people and create lasting change in communities that need it most.',
    'volunteer.form.title': 'Registration Form',
    'volunteer.form.name': 'Full Name',
    'volunteer.form.email': 'Email Address',
    'volunteer.form.phone': 'Phone Number',
    'volunteer.form.interest': 'Area of Interest',
    'volunteer.form.submit': 'Submit Application',
    'volunteer.benefit.impact': 'Community Impact',
    'volunteer.benefit.impact.desc': 'Work directly with local communities.',
    'volunteer.benefit.skills': 'Skill Sharing',
    'volunteer.benefit.skills.desc': 'Use your professional skills for good.',
    'volunteer.benefit.growth': 'Personal Growth',
    'volunteer.benefit.growth.desc': 'Gain experience and new perspectives.',
    'volunteer.benefit.network': 'Global Network',
    'volunteer.benefit.network.desc': 'Connect with like-minded changemakers.',
    'volunteer.testimonial': '"Volunteering with Al-Insaf changed my life as much as those I helped."',
    'volunteer.testimonial.author': '— David Miller, Volunteer since 2021',
    'volunteer.form.dob': 'Date of Birth',
    'volunteer.form.motivation': 'Why do you want to join?',
    'volunteer.form.motivation.placeholder': 'Tell us about your motivation...',
    'volunteer.form.interest.edu': 'Education & Teaching',
    'volunteer.form.interest.health': 'Healthcare & Medical',
    'volunteer.form.interest.relief': 'Disaster Relief',
    'volunteer.form.interest.fund': 'Fundraising & Events',
    'volunteer.form.interest.admin': 'Administrative Support',
    'contact.title': 'Get in Touch',
    'contact.desc': 'Have questions or want to collaborate? We would love to hear from you.',
    'contact.form.name': 'Your Name',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email Us',
    'contact.info.email.sub': 'We reply within 24 hours',
    'contact.info.phone': 'Call Us',
    'contact.info.phone.sub': 'Mon-Fri from 9am to 6pm',
    'contact.info.visit': 'Visit Us',
    'contact.info.visit.sub': 'Bangladesh, 1212',
    'contact.social.title': 'Follow Our Progress',
    'contact.support.title': 'Live Support',
    'contact.support.desc': 'Our team is available for real-time chat during business hours.',
    'contact.support.cta': 'Start Chatting',
    'contact.form.title': 'Send us a Message',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'How can we help?',
    'contact.form.message.placeholder': 'Write your message here...',
    'contact.map.title': 'Our Headquarters',
    'contact.map.address': '123 Justice Way, Mirpur, Dhaka, Bangladesh',
    'contact.map.hours': 'Open for visitors from 10am to 4pm daily. Please schedule an appointment.',
    'campaigns.active': 'Active Campaigns',
    'campaigns.viewAll': 'View All Campaigns',
    'donate.title': 'Make a Donation',
    'donate.desc': 'Your contribution brings us one step closer to a more just and equitable world.',
    'donate.bkash': 'bKash (Personal)',
    'donate.nagad': 'Nagad (Personal)',
    'donate.bank': 'Bank Transfer',
    'donate.bank.info': 'Al-Insaf Foundation, Account: 123456789, Bank: Islamic Bank BD',
    'campaigns.header.desc': 'Explore our active projects and choose a cause that resonates with you. Every donation, no matter how small, makes a significant impact.',
    'campaigns.search': 'Search campaigns...',
    'campaigns.cat.all': 'All',
    'campaigns.cat.edu': 'Education',
    'campaigns.cat.health': 'Health',
    'campaigns.cat.crisis': 'Crisis',
    'campaigns.cat.env': 'Environment',
    'campaigns.cat.live': 'Livelihood',
    'campaigns.raised': 'Raised',
    'campaigns.goal': 'Goal',
    'campaigns.details': 'Details',
    'campaigns.donate': 'Donate',
    'gallery.header.desc': 'A visual journey through our projects and the lives we\'ve touched. Every photo tells a story of hope and resilience.',
    'gallery.cat.all': 'All',
    'gallery.cat.edu': 'Education',
    'gallery.cat.health': 'Health',
    'gallery.cat.water': 'Water',
    'gallery.cat.crisis': 'Crisis',
    'footer.desc': 'Al-Insaf Foundation is dedicated to serving humanity through justice, compassion, and sustainable development. Together, we can build a better world.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Info',
    'footer.newsletter': 'Newsletter',
    'footer.newsletter.placeholder': 'Your email address',
    'footer.newsletter.sub': 'Subscribe to get updates on our latest projects and impact stories.',
    'footer.rights': 'All rights reserved.',
    'common.donate.now': 'Donate Now',
    'common.learn.more': 'Learn More',
    'common.read.more': 'Read More',
    'common.view.all': 'View All',
    'common.raised': 'Raised',
    'common.goal': 'Goal',
    'common.volunteers': 'Volunteers',
    'common.joined': 'Joined us this month',
    'common.inspiring': 'Inspiring Change',
    'common.watch': 'Watch Full Story',
    'common.darkMode': 'Dark Mode',
    'common.lightMode': 'Light Mode',
    'common.theme': 'Theme',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to common questions about our work and how you can help.',
    'faq.q1': 'How is my donation used?',
    'faq.a1': 'We ensure that 90% of every donation goes directly to our programs on the ground. The remaining 10% helps us maintain operations and reach more people. We provide full transparency with detailed reports on how funds are allocated.',
    'faq.q2': 'Is my donation tax-deductible?',
    'faq.a2': 'Yes! Al-Insaf Foundation is a registered non-profit organization. All donations are tax-deductible to the fullest extent allowed by law. You will receive a tax receipt for your contribution.',
    'faq.q3': 'How can I volunteer?',
    'faq.a3': 'Simply fill out our volunteer registration form on the Volunteer page. We\'ll review your application and get back to you with opportunities that match your skills and interests.',
    'faq.q4': 'Which countries do you operate in?',
    'faq.a4': 'We currently operate in 5+ countries across South Asia, Africa, and the Middle East. Our focus is on reaching communities with the greatest need and limited access to essential services.',
    'faq.q5': 'How do you ensure transparency?',
    'faq.a5': 'We publish annual reports, conduct regular audits, and provide detailed updates on all our projects. Donors can track exactly how their contributions are being used through our transparent reporting system.',
    'faq.q6': 'Can I sponsor a specific project?',
    'faq.a6': 'Absolutely! You can choose to donate to any of our active campaigns or contact us directly to discuss sponsoring a specific initiative that aligns with your values.',
    'newsletter.title': 'Stay Updated With Our Work',
    'newsletter.desc': 'Subscribe to our newsletter and receive stories of impact, updates on campaigns, and ways to make a difference.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.success.title': 'Thank you for subscribing!',
    'newsletter.success.desc': 'Check your inbox for a confirmation email.',
    'newsletter.privacy': 'By subscribing, you agree to our Privacy Policy. No spam, unsubscribe anytime.',
    'testimonials.title': 'Stories of Impact',
    'testimonials.subtitle': 'Hear from our donors, volunteers, and the communities we serve',
    'partners.title': 'Trusted By Organizations Worldwide',
    'partners.subtitle': 'We collaborate with leading organizations to maximize our impact',
    'campaigns.support': 'Support our ongoing projects and help us reach our goals for this month.',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.campaigns': 'ক্যাম্পেইন',
    'nav.gallery': 'গ্যালারি',
    'nav.volunteer': 'স্বেচ্ছাসেবক',
    'nav.contact': 'যোগাযোগ',
    'nav.donate': 'এখনই দান করুন',
    'nav.blog': 'ব্লগ',
    'hero.badge': 'মানবতার সেবা',
    'hero.title': 'অসহায়দের মাঝে ন্যায়বিচার ও ত্রাণ পৌঁছে দেওয়া',
    'hero.desc': 'আল-ইনসাফ ফাউন্ডেশন একটি অলাভজনক সংস্থা যা প্রয়োজনীয় সহায়তা প্রদান এবং অভাবী সম্প্রদায়গুলোর মর্যাদা পুনরুদ্ধারে নিবেদিত।',
    'hero.cta.donate': 'দান শুরু করুন',
    'hero.cta.learn': 'আরও জানুন',
    'stats.lives': 'প্রভাবিত জীবন',
    'stats.projects': 'সম্পন্ন প্রকল্প',
    'stats.volunteers': 'স্বেচ্ছাসেবক',
    'stats.countries': 'দেশসমূহ',
    'features.title': 'কেন আল-ইনসাফ বেছে নেবেন?',
    'features.desc': 'আমরা বিশ্বের সবচেয়ে জরুরি চ্যালেঞ্জগুলোর জন্য স্বচ্ছ, প্রভাবশালী এবং টেকসই সমাধানে বিশ্বাস করি।',
    'features.transparency.title': 'স্বচ্ছতা',
    'features.transparency.desc': 'আপনার দান করা প্রতিটি পয়সা ট্র্যাক করা হয় এবং পূর্ণ জবাবদিহিতার সাথে রিপোর্ট করা হয়।',
    'features.global.title': 'বৈশ্বিক পরিধি',
    'features.global.desc': 'আমাদের নেটওয়ার্ক সীমানা ছাড়িয়ে সবচেয়ে অসহায় মানুষের কাছে পৌঁছায়।',
    'features.community.title': 'সম্প্রদায় চালিত',
    'features.community.desc': 'আমরা টেকসই প্রবৃদ্ধি নিশ্চিত করতে সরাসরি স্থানীয় নেতাদের সাথে কাজ করি।',
    'activities.title': 'আমাদের সাম্প্রতিক কার্যক্রম',
    'activities.desc': 'আমাদের সাম্প্রতিক মাঠপর্যায়ের কাজ এবং সমাজসেবার মাধ্যমে আপনার সহযোগিতার প্রভাব দেখুন।',
    'activities.iftar': 'ইফতার বিতরণ',
    'activities.clothing': 'সবার জন্য পোশাক',
    'activities.medical': 'চিকিৎসা সহায়তা',
    'activities.iftar.desc': 'পবিত্র রমজান মাসে পরিবারগুলোর মাঝে পুষ্টিকর খাবার সরবরাহ করা।',
    'activities.clothing.desc': 'শীতকালে অভাবী মানুষের মাঝে গরম কাপড় ও প্রয়োজনীয় সামগ্রী বিতরণ।',
    'activities.medical.desc': 'দুর্গম এলাকায় বিনামূল্যে স্বাস্থ্য পরীক্ষা ও ওষুধ বিতরণ।',
    'video.title': 'আমাদের প্রভাব দেখুন',
    'video.desc': 'আপনার অবদান কীভাবে মানুষের জীবন পরিবর্তন করছে তা দেখুন। প্রতিটি ভিডিও আশার গল্প বলে।',
    'inspire.title': 'বিশ্বের প্রয়োজনীয় পরিবর্তন হোন',
    'inspire.desc': 'আপনার দয়ার একটি ছোট কাজ কারো অন্ধকার সময়ে আশার আলো জ্বালাতে পারে। দেখুন কীভাবে আমরা আপনার করুণাকে কাজে পরিণত করি।',
    'inspire.cta': 'জীবন বাঁচাতে দান করুন',
    'team.title': 'আমাদের মূল দল',
    'team.desc': 'আমাদের লক্ষ্যকে এগিয়ে নিয়ে যাওয়ার জন্য নিবেদিতপ্রাণ নেতৃবৃন্দ।',
    'team.role.chairman': 'চেয়ারম্যান',
    'team.role.director': 'নির্বাহী পরিচালক',
    'team.role.head': 'প্রকল্প প্রধান',
    'team.role.coordinator': 'স্বেচ্ছাসেবক সমন্বয়কারী',
    'cta.title': 'প্রভাব ফেলতে প্রস্তুত?',
    'cta.desc': 'আপনি আপনার সময় বা আপনার সম্পদ দান করুন না কেন, প্রতিটি ছোট অংশ আমাদের সবচেয়ে বেশি প্রয়োজন এমন লোকদের কাছে ন্যায়বিচার এবং ত্রাণ পৌঁছে দিতে সহায়তা করে।',
    'cta.button': 'এখনই দান করুন',
    'news.title': 'সর্বশেষ সংবাদ ও আপডেট',
    'news.desc': 'আমাদের সাম্প্রতিক প্রকল্প, সাফল্যের গল্প এবং পরিবর্তন আনার উপায় সম্পর্কে জানুন।',
    'news.viewAll': 'সব সংবাদ দেখুন',
    'news.readMore': 'আরও পড়ুন',
    'impact.title': 'আপনার দান সত্যিকারের পরিবর্তন আনে',
    'impact.desc': 'দেখুন বিভিন্ন পরিমাণের অবদান কীভাবে প্রতিদিন আরও বেশি সম্প্রদায়কে সেবা দিতে সাহায্য করে।',
    'impact.donate': 'এই পরিমাণ দান করুন',
    'about.header.desc': 'বিশ্বজুড়ে সবচেয়ে অসহায় সম্প্রদায়গুলোর জন্য ন্যায়বিচার পুনরুদ্ধার এবং ত্রাণ প্রদানের জন্য নিবেদিত।',
    'about.mission.title': 'আমাদের লক্ষ্য',
    'about.mission.desc': 'মানসম্মত শিক্ষা, স্বাস্থ্যসেবা এবং টেকসই অর্থনৈতিক সুযোগ প্রদানের মাধ্যমে সুবিধাবঞ্চিত সম্প্রদায়গুলোকে ক্ষমতায়ন করা।',
    'about.vision.title': 'আমাদের দৃষ্টিভঙ্গি',
    'about.vision.desc': 'এমন একটি বিশ্ব যেখানে প্রতিটি ব্যক্তির একটি ন্যায়সঙ্গত, সাম্যবাদী এবং সহানুভূতিশীল সমাজে বেড়ে ওঠার সুযোগ রয়েছে।',
    'about.values.title': 'আমাদের মূল মূল্যবোধ',
    'about.values.desc': 'যে নীতিগুলো আমাদের প্রতিটি কাজকে পরিচালিত করে।',
    'about.values.integrity': 'সততা',
    'about.values.integrity.desc': 'আমরা আমাদের সমস্ত লেনদেনে সততা এবং স্বচ্ছতার সাথে কাজ করি।',
    'about.values.compassion': 'সহমর্মিতা',
    'about.values.compassion.desc': 'আমরা সহানুভূতি এবং মানবিক মর্যাদার প্রতি গভীর অঙ্গীকারের সাথে সেবা করি।',
    'about.values.justice': 'ন্যায়বিচার',
    'about.values.justice.desc': 'আমরা প্রতিটি সম্প্রদায়ের জন্য ন্যায্যতা এবং সাম্য নিশ্চিত করার চেষ্টা করি।',
    'about.values.excellence': 'উৎকর্ষ',
    'about.values.excellence.desc': 'আমরা আমাদের কর্মসূচি এবং কার্যক্রমে সর্বোচ্চ মান অর্জনের লক্ষ্য রাখি।',
    'about.team.title': 'আমাদের দলের সাথে পরিচিত হোন',
    'about.team.desc': 'আল-ইনসাফ ফাউন্ডেশনের পেছনে থাকা নিবেদিতপ্রাণ ব্যক্তিরা।',
    'volunteer.title': 'আমাদের মিশনে যোগ দিন',
    'volunteer.desc': 'স্বেচ্ছাসেবকরা আল-ইনসাফ ফাউন্ডেশনের মেরুদণ্ড। আপনার সময় এবং দক্ষতা প্রদানের মাধ্যমে আমাদের সাহায্য করুন।',
    'volunteer.form.title': 'রেজিস্ট্রেশন ফর্ম',
    'volunteer.form.name': 'পুরো নাম',
    'volunteer.form.email': 'ইমেল ঠিকানা',
    'volunteer.form.phone': 'ফোন নম্বর',
    'volunteer.form.interest': 'আগ্রহের ক্ষেত্র',
    'volunteer.form.submit': 'আবেদন জমা দিন',
    'volunteer.benefit.impact': 'সামাজিক প্রভাব',
    'volunteer.benefit.impact.desc': 'সরাসরি স্থানীয় সম্প্রদায়ের সাথে কাজ করুন।',
    'volunteer.benefit.skills': 'দক্ষতা ভাগাভাগি',
    'volunteer.benefit.skills.desc': 'ভালোর জন্য আপনার পেশাদার দক্ষতা ব্যবহার করুন।',
    'volunteer.benefit.growth': 'ব্যক্তিগত বৃদ্ধি',
    'volunteer.benefit.growth.desc': 'অভিজ্ঞতা এবং নতুন দৃষ্টিভঙ্গি অর্জন করুন।',
    'volunteer.benefit.network': 'বৈশ্বিক নেটওয়ার্ক',
    'volunteer.benefit.network.desc': 'সমমনা পরিবর্তনকারীদের সাথে সংযোগ স্থাপন করুন।',
    'volunteer.testimonial': '"আল-ইনসাফের সাথে স্বেচ্ছাসেবক হিসেবে কাজ করা আমার জীবনকে বদলে দিয়েছে।"',
    'volunteer.testimonial.author': '— ডেভিড মিলার, ২০২১ সাল থেকে স্বেচ্ছাসেবক',
    'volunteer.form.dob': 'জন্ম তারিখ',
    'volunteer.form.motivation': 'আপনি কেন যোগ দিতে চান?',
    'volunteer.form.motivation.placeholder': 'আপনার অনুপ্রেরণা সম্পর্কে আমাদের বলুন...',
    'volunteer.form.interest.edu': 'শিক্ষা ও শিক্ষকতা',
    'volunteer.form.interest.health': 'স্বাস্থ্যসেবা ও চিকিৎসা',
    'volunteer.form.interest.relief': 'দুর্যোগ ত্রাণ',
    'volunteer.form.interest.fund': 'তহবিল সংগ্রহ ও ইভেন্ট',
    'volunteer.form.interest.admin': 'প্রশাসনিক সহায়তা',
    'contact.title': 'যোগাযোগ করুন',
    'contact.desc': 'প্রশ্ন আছে বা সহযোগিতা করতে চান? আমরা আপনার কাছ থেকে শুনতে পছন্দ করব।',
    'contact.form.name': 'আপনার নাম',
    'contact.form.message': 'বার্তা',
    'contact.form.send': 'বার্তা পাঠান',
    'contact.info.title': 'যোগাযোগের তথ্য',
    'contact.info.email': 'আমাদের ইমেল করুন',
    'contact.info.email.sub': 'আমরা ২৪ ঘণ্টার মধ্যে উত্তর দিই',
    'contact.info.phone': 'আমাদের কল করুন',
    'contact.info.phone.sub': 'সোম-শুক্র সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত',
    'contact.info.visit': 'আমাদের সাথে দেখা করুন',
    'contact.info.visit.sub': 'বাংলাদেশ, ১২১২',
    'contact.social.title': 'আমাদের অগ্রগতি অনুসরণ করুন',
    'contact.support.title': 'লাইভ সাপোর্ট',
    'contact.support.desc': 'ব্যবসায়িক সময়ের মধ্যে আমাদের দল রিয়েল-টাইম চ্যাটের জন্য উপলব্ধ।',
    'contact.support.cta': 'চ্যাট শুরু করুন',
    'contact.form.title': 'আমাদের একটি বার্তা পাঠান',
    'contact.form.subject': 'বিষয়',
    'contact.form.subject.placeholder': 'আমরা কীভাবে সাহায্য করতে পারি?',
    'contact.form.message.placeholder': 'আপনার বার্তা এখানে লিখুন...',
    'contact.map.title': 'আমাদের সদর দপ্তর',
    'contact.map.address': '১২৩ জাস্টিস ওয়ে, মিরপুর, ঢাকা, বাংলাদেশ',
    'contact.map.hours': 'প্রতিদিন সকাল ১০টা থেকে বিকাল ৪টা পর্যন্ত দর্শনার্থীদের জন্য উন্মুক্ত। অনুগ্রহ করে অ্যাপয়েন্টমেন্ট নিন।',
    'campaigns.active': 'চলমান ক্যাম্পেইন',
    'campaigns.viewAll': 'সব ক্যাম্পেইন দেখুন',
    'donate.title': 'দান করুন',
    'donate.desc': 'আপনার অবদান আমাদের একটি ন্যায়সঙ্গত এবং সাম্যবাদী বিশ্ব গড়ার এক ধাপ কাছাকাছি নিয়ে যায়।',
    'donate.bkash': 'বিকাশ (পার্সোনাল)',
    'donate.nagad': 'নগদ (পার্সোনাল)',
    'donate.bank': 'ব্যাংক ট্রান্সফার',
    'donate.bank.info': 'আল-ইনসাফ ফাউন্ডেশন, অ্যাকাউন্ট: ১২৩৪৫৬৭৮৯, ব্যাংক: ইসলামী ব্যাংক বিডি',
    'campaigns.header.desc': 'আমাদের সাম্প্রতিক প্রকল্পগুলো অন্বেষণ করুন এবং আপনার পছন্দের একটি কারণ বেছে নিন।',
    'campaigns.search': 'ক্যাম্পেইন খুঁজুন...',
    'campaigns.cat.all': 'সব',
    'campaigns.cat.edu': 'শিক্ষা',
    'campaigns.cat.health': 'স্বাস্থ্য',
    'campaigns.cat.crisis': 'সংকট',
    'campaigns.cat.env': 'পরিবেশ',
    'campaigns.cat.live': 'জীবিকা',
    'campaigns.raised': 'সংগৃহীত',
    'campaigns.goal': 'লক্ষ্য',
    'campaigns.details': 'বিস্তারিত',
    'campaigns.donate': 'দান করুন',
    'gallery.header.desc': 'আমাদের প্রকল্প এবং আমরা যে জীবনগুলোকে স্পর্শ করেছি তার একটি ভিজ্যুয়াল যাত্রা।',
    'gallery.cat.all': 'সব',
    'gallery.cat.edu': 'শিক্ষা',
    'gallery.cat.health': 'স্বাস্থ্য',
    'gallery.cat.water': 'পানি',
    'gallery.cat.crisis': 'সংকট',
    'footer.desc': 'আল-ইনসাফ ফাউন্ডেশন ন্যায়বিচার, মমতা এবং টেকসই উন্নয়নের মাধ্যমে মানবতার সেবায় নিয়োজিত। একসাথে আমরা একটি সুন্দর পৃথিবী গড়তে পারি।',
    'footer.links': 'দ্রুত লিঙ্ক',
    'footer.contact': 'যোগাযোগের তথ্য',
    'footer.newsletter': 'নিউজলেটার',
    'footer.newsletter.placeholder': 'আপনার ইমেল ঠিকানা',
    'footer.newsletter.sub': 'আমাদের সাম্প্রতিক প্রকল্প এবং প্রভাবের গল্প সম্পর্কে আপডেট পেতে সাবস্ক্রাইব করুন।',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
    'common.donate.now': 'এখনই দান করুন',
    'common.learn.more': 'আরও জানুন',
    'common.read.more': 'আরও পড়ুন',
    'common.view.all': 'সব দেখুন',
    'common.raised': 'সংগৃহীত',
    'common.goal': 'লক্ষ্য',
    'common.volunteers': 'স্বেচ্ছাসেবক',
    'common.joined': 'এই মাসে যোগ দিয়েছেন',
    'common.inspiring': 'অনুপ্রেরণামূলক পরিবর্তন',
    'common.watch': 'পুরো গল্প দেখুন',
    'common.darkMode': 'ডার্ক মোড',
    'common.lightMode': 'লাইট মোড',
    'common.theme': 'থিম',
    'faq.title': 'সাধারণ জিজ্ঞাসা',
    'faq.subtitle': 'আমাদের কাজ এবং কীভাবে সাহায্য করতে পারেন সে সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন।',
    'faq.q1': 'আমার দান কীভাবে ব্যবহার হয়?',
    'faq.a1': 'আমরা নিশ্চিত করি যে প্রতিটি দানের ৯০% সরাসরি মাঠপর্যায়ের কার্যক্রমে যায়। বাকি ১০% পরিচালনা বজায় রাখতে এবং আরও মানুষের কাছে পৌঁছাতে ব্যবহৃত হয়।',
    'faq.q2': 'আমার দান কি কর-ছাড়যোগ্য?',
    'faq.a2': 'হ্যাঁ! আল-ইনসাফ ফাউন্ডেশন একটি নিবন্ধিত অলাভজনক সংস্থা। সমস্ত দান আইন অনুযায়ী সর্বোচ্চ পরিমাণে কর-ছাড়যোগ্য।',
    'faq.q3': 'আমি কীভাবে স্বেচ্ছাসেবক হতে পারি?',
    'faq.a3': 'শুধু স্বেচ্ছাসেবক পাতায় আমাদের নিবন্ধন ফর্ম পূরণ করুন। আমরা আপনার আবেদন পর্যালোচনা করব এবং আপনার দক্ষতার সাথে মানানসই সুযোগ নিয়ে যোগাযোগ করব।',
    'faq.q4': 'আপনারা কোন কোন দেশে কাজ করেন?',
    'faq.a4': 'আমরা বর্তমানে দক্ষিণ এশিয়া, আফ্রিকা এবং মধ্যপ্রাচ্যের ৫টিরও বেশি দেশে কাজ করি।',
    'faq.q5': 'আপনারা কীভাবে স্বচ্ছতা নিশ্চিত করেন?',
    'faq.a5': 'আমরা বার্ষিক প্রতিবেদন প্রকাশ করি, নিয়মিত নিরীক্ষা পরিচালনা করি এবং সকল প্রকল্পে বিস্তারিত আপডেট প্রদান করি।',
    'faq.q6': 'আমি কি একটি নির্দিষ্ট প্রকল্পে স্পনসর করতে পারি?',
    'faq.a6': 'অবশ্যই! আপনি আমাদের যেকোনো সক্রিয় ক্যাম্পেইনে দান করতে পারেন বা আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।',
    'newsletter.title': 'আমাদের কার্যক্রম সম্পর্কে আপডেট থাকুন',
    'newsletter.desc': 'আমাদের নিউজলেটার সাবস্ক্রাইব করুন এবং প্রভাবের গল্প, ক্যাম্পেইনের আপডেট এবং পরিবর্তন আনার উপায় পান।',
    'newsletter.placeholder': 'আপনার ইমেল লিখুন',
    'newsletter.subscribe': 'সাবস্ক্রাইব করুন',
    'newsletter.subscribing': 'সাবস্ক্রাইব হচ্ছে...',
    'newsletter.success.title': 'সাবস্ক্রাইব করার জন্য ধন্যবাদ!',
    'newsletter.success.desc': 'নিশ্চিতকরণ ইমেলের জন্য আপনার ইনবক্স চেক করুন।',
    'newsletter.privacy': 'সাবস্ক্রাইব করে আপনি আমাদের গোপনীয়তা নীতিতে সম্মত হচ্ছেন। কোনো স্প্যাম নেই, যেকোনো সময় আনসাবস্ক্রাইব করুন।',
    'testimonials.title': 'প্রভাবের গল্প',
    'testimonials.subtitle': 'আমাদের দাতা, স্বেচ্ছাসেবক এবং আমরা যে সম্প্রদায়গুলো সেবা করি তাদের কথা শুনুন',
    'partners.title': 'বিশ্বজুড়ে সংস্থাগুলো আমাদের বিশ্বাস করে',
    'partners.subtitle': 'আমরা আমাদের প্রভাব সর্বাধিক করতে শীর্ষস্থানীয় সংস্থাগুলোর সাথে সহযোগিতা করি',
    'campaigns.support': 'আমাদের চলমান প্রকল্পগুলো সমর্থন করুন এবং এই মাসে আমাদের লক্ষ্য পূরণে সাহায্য করুন।',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en';
    }
    return 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  const [isTranslating, setIsTranslating] = useState(false);

  // Use ref for cache to avoid triggering re-renders / infinite loops in translate()
  const dynamicCacheRef = useRef<Record<string, string>>({});

  // Load cache from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dynamic_translations');
      if (saved) {
        try {
          dynamicCacheRef.current = JSON.parse(saved);
        } catch {
          dynamicCacheRef.current = {};
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const t = (key: string): string => {
    const staticTranslation = translations[language][key as keyof typeof translations['en']];
    if (staticTranslation) return staticTranslation;

    // Fixed bug: was dynamicCache[dynamicCache[cacheKey]] which is wrong
    const cacheKey = `${language}:${key}`;
    if (dynamicCacheRef.current[cacheKey]) return dynamicCacheRef.current[cacheKey];

    return key;
  };

  const translate = useCallback(async (text: string): Promise<string> => {
    if (!text || language === 'en') return text;

    const cacheKey = `${language}:${text}`;
    if (dynamicCacheRef.current[cacheKey]) return dynamicCacheRef.current[cacheKey];

    setIsTranslating(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('NEXT_PUBLIC_GEMINI_API_KEY is not set. Dynamic translation disabled.');
        return text;
      }

      const ai = new GoogleGenAI({ apiKey });
      const targetLang = language === 'bn' ? 'Bengali' : 'English';
      const prompt = `Translate the following text to ${targetLang}. Return ONLY the translated text, no quotes, no explanation: ${text}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const translatedText = response.text?.trim() || text;

      // Store in ref (no re-render) and persist to localStorage
      dynamicCacheRef.current[cacheKey] = translatedText;
      localStorage.setItem('dynamic_translations', JSON.stringify(dynamicCacheRef.current));

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [language]); // Only depends on language — no more infinite loops

  return (
    <AppContext.Provider value={{ language, setLanguage, t, translate, isTranslating, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
