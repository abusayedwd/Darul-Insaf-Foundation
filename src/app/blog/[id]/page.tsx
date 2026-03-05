'use client';

import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Heart, Facebook, Twitter } from 'lucide-react';
import { TranslatedText } from '../../../components/TranslatedText';
import { useAppContext } from '../../../context/AppContext';
import { ScrollReveal } from '../../../components/ScrollReveal';
import { blogPosts } from '../../../lib/blogData';
import { Button } from '../../../components/Button';

const categoryColors: Record<string, string> = {
  Impact: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Events: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Education: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Volunteers: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  Crisis: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  Reports: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300',
};

export default function BlogDetail() {
  const { id } = useParams();
  const { t } = useAppContext();

  const postIndex = blogPosts.findIndex(p => p.id === Number(id));
  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const relatedPosts = blogPosts.filter(p => p.id !== Number(id) && p.category === post?.category).slice(0, 3);
  const fallbackRelated = blogPosts.filter(p => p.id !== Number(id)).slice(0, 3);

  if (!post) {
    return (
      <div className="section-padding text-center py-32">
        <h1 className="text-4xl font-bold mb-4"><TranslatedText>Article not found</TranslatedText></h1>
        <Link href="/blog">
          <Button><TranslatedText>Back to Blog</TranslatedText></Button>
        </Link>
      </div>
    );
  }

  // Parse markdown-lite content (bold **text**, bullet lists)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(2, -2)}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-6 mb-2 text-muted leading-relaxed list-disc">
            <TranslatedText>{line.slice(2)}</TranslatedText>
          </li>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return (
        <p key={i} className="text-muted leading-relaxed mb-4">
          <TranslatedText>{line}</TranslatedText>
        </p>
      );
    });
  };

  return (
    <div>
      {/* Hero with Background Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <TranslatedText>Back to Blog</TranslatedText>
            </Link>

            <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${categoryColors[post.category] || ''}`}>
              <TranslatedText>{post.category}</TranslatedText>
            </div>

            <TranslatedText as="h1" className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </TranslatedText>

            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-3">
                <img src={post.authorImg} alt={post.author} className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" referrerPolicy="no-referrer" />
                <span className="font-medium text-white">{post.author}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar size={14} /><TranslatedText>{post.date}</TranslatedText></span>
              <span className="flex items-center gap-1.5"><Clock size={14} /><TranslatedText>{post.readTime}</TranslatedText></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden mb-10 shadow-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-[var(--text-main)]">
              {renderContent(post.content)}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-main flex flex-wrap items-center gap-4">
              <span className="font-bold text-muted"><TranslatedText>Share this article:</TranslatedText></span>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                  <Facebook size={16} /> Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors">
                  <Twitter size={16} /> Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-main text-muted text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                  <Share2 size={16} /> <TranslatedText>Copy Link</TranslatedText>
                </button>
              </div>
            </div>

            {/* Prev / Next Navigation */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost && (
                <Link href={`/blog/${prevPost.id}`} className="group">
                  <div className="p-5 bg-card border border-main rounded-2xl hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 text-muted text-xs mb-2">
                      <ArrowLeft size={14} /> <TranslatedText>Previous</TranslatedText>
                    </div>
                    <TranslatedText as="p" className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {prevPost.title}
                    </TranslatedText>
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.id}`} className="group ml-auto w-full">
                  <div className="p-5 bg-card border border-main rounded-2xl hover:border-primary hover:shadow-md transition-all text-right">
                    <div className="flex items-center justify-end gap-2 text-muted text-xs mb-2">
                      <TranslatedText>Next</TranslatedText> <ArrowRight size={14} />
                    </div>
                    <TranslatedText as="p" className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </TranslatedText>
                  </div>
                </Link>
              )}
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Author Card */}
            <ScrollReveal direction="right">
              <div className="bg-card border border-main rounded-3xl p-6 text-center">
                <img
                  src={post.authorImg}
                  alt={post.author}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 mx-auto mb-4"
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-bold text-lg mb-1">{post.author}</h3>
                <p className="text-muted text-sm mb-4">
                  <TranslatedText>Contributing Writer, Al-Insaf Foundation</TranslatedText>
                </p>
                <Link href="/about">
                  <Button variant="outline" className="w-full text-sm">
                    <TranslatedText>View Profile</TranslatedText>
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Donate CTA */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="bg-primary rounded-3xl p-6 text-white text-center">
                <Heart className="mx-auto mb-4 fill-white" size={32} />
                <h3 className="font-bold text-xl mb-2">
                  <TranslatedText>Support Our Work</TranslatedText>
                </h3>
                <p className="text-white/80 text-sm mb-5">
                  <TranslatedText>Your donation helps us continue making an impact every day.</TranslatedText>
                </p>
                <Link href="/donate">
                  <Button className="w-full bg-white text-primary hover:bg-stone-100">
                    <TranslatedText>Donate Now</TranslatedText>
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Related Posts */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-card border border-main rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-5">
                  <TranslatedText>Related Articles</TranslatedText>
                </h3>
                <div className="space-y-4">
                  {(relatedPosts.length > 0 ? relatedPosts : fallbackRelated).map((related) => (
                    <Link key={related.id} href={`/blog/${related.id}`} className="group flex gap-3 hover:text-primary transition-colors">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <TranslatedText as="p" className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {related.title}
                        </TranslatedText>
                        <p className="text-xs text-muted mt-1">{related.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
