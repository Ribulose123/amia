'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useNavigation } from '@/src/lib/useNavigation';
import { type Locale } from '@/src/config/i18n';

interface CategoriesPageProps {
  lang: Locale;
}

const categories = [
  {
    id: 1,
    name: 'Artist of the Year',
    description: 'Recognizing outstanding artistic achievement',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 2,
    name: 'Album of the Year',
    description: 'Celebrating exceptional album production',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 3,
    name: 'Song of the Year',
    description: 'Honoring the most impactful single',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 4,
    name: 'Best New Artist',
    description: 'Showcasing breakthrough talent',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 5,
    name: 'Best Male Artist',
    description: 'Celebrating male excellence in music',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 6,
    name: 'Best Female Artist',
    description: 'Honoring female excellence in music',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 7,
    name: 'Best Collaboration',
    description: 'Recognizing powerful musical partnerships',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 8,
    name: 'Best Music Video',
    description: 'Celebrating visual storytelling',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 9,
    name: 'Producer of the Year',
    description: 'Honoring production excellence',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 10,
    name: 'Best Afrobeats',
    description: 'Celebrating the sound of Africa',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 11,
    name: 'Best Hip Hop',
    description: 'Recognizing rap and hip hop excellence',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1200&q=80',
    nominees: 5,
  },
  {
    id: 12,
    name: 'Best R&B/Soul',
    description: 'Honoring soulful performances',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80',
    nominees: 5,
  },
];

export function CategoriesPage({ lang }: CategoriesPageProps) {
  const onNavigate = useNavigation(lang);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', 'general', 'genre-specific'];

  const filteredCategories =
    selectedGenre === 'all'
      ? categories
      : selectedGenre === 'general'
      ? categories.slice(0, 9)
      : categories.slice(9);

  const { t } = useLanguage();

  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80"
            alt="Categories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b dark:from-black/60 dark:via-black/40 dark:to-black light:from-white/60 light:via-white/40 light:to-white" />
        </div>

        <div className="relative h-full flex items-center justify-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-raleway text-4xl sm:text-7xl lg:text-9xl font-bold text-white mb-4 sm:mb-6 tracking-tighter">
              {t('categories.title')}
            </h1>
            <p className="font-inter text-base sm:text-xl text-white/70 max-w-2xl mx-auto">
              {categories.length} {t('categories.awardsText')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter - Minimal */}
      <section className="py-12 px-6 lg:px-12 border-b dark:border-white/5 light:border-black/10">
        <div className="w-full lg:w-[80%] mx-auto">
          <div className="flex gap-4 lg:gap-6 justify-center">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`font-inter text-xs lg:text-sm font-medium transition-colors capitalize ${
                  selectedGenre === genre
                    ? 'dark:text-white light:text-black'
                    : 'dark:text-white/40 dark:hover:text-white light:text-black/40 light:hover:text-black'
                }`}
              >
                {genre === 'all'
                  ? t('categories.allCategories')
                  : genre === 'general'
                  ? t('categories.general')
                  : t('categories.genreSpecific')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 lg:py-20 px-0 lg:px-12">
        <div className="w-full lg:w-[80%] mx-auto">
          {/* Mobile: Single Column, Full Width Cards */}
          {/* Desktop: 3-column grid with spacing */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-0 lg:gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => onNavigate('nominees')}
                className="group cursor-pointer relative overflow-hidden dark:bg-neutral-900 light:bg-neutral-100
                          aspect-[16/9] lg:aspect-[4/3]
                          border-b lg:border-0 dark:border-white/5 light:border-black/5"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradients - Optimized for mobile legibility */}
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/70 light:from-white light:via-white/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent lg:from-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6401CF]/0 to-transparent group-hover:from-[#6401CF]/20 transition-all duration-500" />

                {/* Content - Mobile Optimized Layout */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-8">
                  {/* Top Badge */}
                  <div className="flex justify-end">
                    <div className="inline-flex items-center gap-2 px-2.5 lg:px-3 py-1 lg:py-1.5 dark:bg-black/60 light:bg-white/60 backdrop-blur-md dark:border-white/20 light:border-black/20 border rounded-full">
                      <span className="font-inter text-[10px] lg:text-xs dark:text-white/90 light:text-black/90 uppercase tracking-wider font-medium">
                        {category.nominees} {t('categories.nominees')}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative">
                    <h3 className="font-raleway text-xl lg:text-3xl font-bold dark:text-white light:text-black mb-1 lg:mb-2 leading-tight">
                      {category.name}
                    </h3>
                    <p className="font-inter text-xs lg:text-sm dark:text-white/80 light:text-black/80 mb-3 lg:mb-4 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                    
                    {/* CTA - Compact on mobile */}
                    <div className="flex items-center dark:text-white light:text-black group-hover:text-[#FF4350] transition-colors">
                      <span className="font-inter text-xs lg:text-sm font-semibold uppercase tracking-wide">
                        {t('categories.viewNominees')}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom fade reinforcement */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t dark:from-black/80 dark:via-black/40 light:from-white/80 light:via-white/40 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-raleway text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
              {t('categories.voteTitle')}
            </h2>
            <p className="font-inter text-base sm:text-lg text-white/60 mb-8 sm:mb-12">
              {t('categories.voteDescription')}
            </p>
            <button
              disabled
              className="px-8 sm:px-12 py-4 sm:py-5 bg-neutral-800 text-neutral-500 font-inter font-semibold text-base sm:text-lg cursor-not-allowed opacity-60"
              title="Voting opens soon"
            >
              {t('categories.voteComingSoon')}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
