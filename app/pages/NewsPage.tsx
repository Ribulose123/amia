'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigation } from '@/src/lib/useNavigation';
import { type Locale } from '@/src/config/i18n';

interface NewsPageProps {
  lang: Locale;
}

const newsArticles = [
  {
    id: 1,
    title: 'AMIA 2026 Nominations Open: Celebrating Excellence in African Music',
    excerpt: 'The African Music Icon Awards opens nominations for the 2026 edition, inviting artists across the continent to submit their work.',
    category: 'Announcement',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80',
    date: 'January 10, 2026',
  },
  {
    id: 2,
    title: 'Record-Breaking Voting Numbers as Fans Rally Behind Favorites',
    excerpt: 'Over 5 million votes cast in the first week as African music fans show unprecedented engagement.',
    category: 'Voting',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80',
    date: 'January 8, 2026',
  },
  {
    id: 3,
    title: 'Behind the Scenes: Preparing for the Biggest Night in African Music',
    excerpt: 'An exclusive look at the preparations for the 2026 AMIA ceremony.',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    date: 'January 5, 2026',
  },
  {
    id: 4,
    title: 'African Artists Dominate Global Charts in 2025',
    excerpt: 'Afrobeats and other African genres continue to break records worldwide.',
    category: 'Music News',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    date: 'January 3, 2026',
  },
  {
    id: 5,
    title: 'New Categories Added to AMIA 2026',
    excerpt: 'The awards ceremony introduces exciting new categories to recognize emerging genres.',
    category: 'Announcement',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
    date: 'December 28, 2025',
  },
  {
    id: 6,
    title: 'Red Carpet Fashion: Best Looks from AMIA 2025',
    excerpt: 'A showcase of the most stunning fashion moments from last year\'s ceremony.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&q=80',
    date: 'December 25, 2025',
  },
];

export function NewsPage({ lang }: NewsPageProps) {
  const onNavigate = useNavigation(lang);
  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Article */}
      <FeaturedArticle article={newsArticles[0]} />

      {/* News Grid */}
      <NewsGrid articles={newsArticles.slice(1)} />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[50vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
          alt="News"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b dark:from-black/60 dark:to-black light:from-white/60 light:to-white" />
      </div>

      <div className="relative h-full flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-raleway text-4xl sm:text-7xl lg:text-9xl font-bold dark:text-white light:text-black mb-4 sm:mb-6 tracking-tighter">
            News
          </h1>
          <p className="font-inter text-base sm:text-xl dark:text-white/70 light:text-black/70">
            Latest updates from AMI
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: typeof newsArticles[0] }) {
  return (
    <section className="py-12 sm:py-20 px-6 lg:px-12">
      <div className="w-full sm:w-[90%] lg:w-[80%] xl:w-[75%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[21/9] overflow-hidden bg-neutral-900 group cursor-pointer rounded-lg"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-0" />

          <div className="absolute inset-0 flex items-center z-10">
            <div className="px-6 sm:px-12 lg:px-16 xl:px-20 max-w-4xl lg:max-w-5xl w-full">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 lg:px-3.5 py-1 sm:py-1.5 lg:py-2 bg-[#6401CF] text-white font-inter text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3 lg:mb-4">
                {article.category}
              </div>

              <h2 className="font-raleway text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold dark:text-white light:text-black mb-2 sm:mb-3 lg:mb-4 tracking-tight leading-tight">
                {article.title}
              </h2>

              <p className="font-inter text-sm sm:text-base lg:text-lg dark:text-white/80 light:text-black/80 mb-3 sm:mb-4 lg:mb-6 line-clamp-2 sm:line-clamp-none">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2 dark:text-white/60 light:text-black/60">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  <span className="font-inter text-[10px] sm:text-xs lg:text-sm">{article.date}</span>
                </div>

                <button className="flex items-center gap-1.5 sm:gap-2 dark:text-white light:text-black group-hover:text-[#FF4350] transition-colors">
                  <span className="font-inter text-[10px] sm:text-xs lg:text-sm font-medium">Read more</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewsGrid({ articles }: { articles: typeof newsArticles }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="w-full lg:w-[80%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer border-b sm:border-0 dark:border-white/5 light:border-black/5 pb-6 sm:pb-0 bg-transparent"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 mb-4 sm:mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <div className="px-2.5 sm:px-3 py-1 bg-black/80 backdrop-blur-sm text-white font-inter text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-0">
                <div className="flex items-center gap-2 dark:text-white/40 light:text-black/40 mb-2 sm:mb-3">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-inter text-[11px] sm:text-xs">{article.date}</span>
                </div>

                <h3 className="font-raleway text-xl sm:text-2xl font-bold dark:text-white light:text-black mb-2 sm:mb-3 group-hover:text-[#6401CF] transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="font-inter text-[15px] sm:text-sm dark:text-white/60 light:text-black/60 mb-3 sm:mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <button className="flex items-center gap-2 dark:text-white/80 light:text-black/80 group-hover:text-[#FF4350] transition-colors">
                  <span className="font-inter text-xs sm:text-sm font-medium">Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterCTA() {
  return (
    <section className="relative py-24 sm:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-concert-crowd-with-hands-in-the-air-5301/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 tracking-tight">
            Stay Updated
          </h2>
          <p className="font-inter text-base sm:text-lg text-white/70 mb-8 sm:mb-12">
            Get the latest AMI news delivered to your inbox
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 font-inter text-[15px] sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6401CF]"
              />
              <button className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-[15px] sm:text-base hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

