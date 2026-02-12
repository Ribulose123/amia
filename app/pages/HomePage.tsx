'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Bell, Play, ArrowRight, Star, Trophy, Users, Info, X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MusicPlatformModal } from '@/components/MusicPlatformModal';
import { VideoPlayerModal } from '@/components/VideoPlayerModal';
import { useNavigation } from '@/src/lib/useNavigation';
import { type Locale } from '@/src/config/i18n';

interface HomePageProps {
  lang: Locale;
}

export function HomePage({ lang }: HomePageProps) {
  const onNavigate = useNavigation(lang);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<{ artist: string; track?: string } | null>(null);
  const { t } = useLanguage();

  const handlePlayClick = (artistName: string, trackName?: string) => {
    setSelectedTrack({ artist: artistName, track: trackName });
    setPlatformModalOpen(true);
  };

  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero */}
      <VideoHero imageLoaded={imageLoaded} setImageLoaded={setImageLoaded} onNavigate={onNavigate} />

      {/* Stats Bar */}
      <StatsBar />

      {/* Countdown - Minimal */}
      <CountdownSection onNavigate={onNavigate} />

      {/* Image Interlude 1 */}
      <ImageInterlude
        imageUrl="https://images.unsplash.com/photo-1767487226550-4d57040fc69c?w=1600&q=80"
        translationKey="interlude.celebrating"
      />

      {/* Categories - Visual Grid */}
      <CategoriesVisual onNavigate={onNavigate} />

      {/* Featured Nominees - Premium Grid */}
      <FeaturedNominees onNavigate={onNavigate} onPlayClick={handlePlayClick} />

      {/* Image Interlude 2 */}
      <ImageInterlude
        imageUrl="https://images.unsplash.com/photo-1630510590499-fdd4ff8cb295?w=1600&q=80"
        translationKey="interlude.oneNight"
      />

      {/* Nominees Showcase - Split Layout */}
      <NomineesShowcase onNavigate={onNavigate} />

      {/* News Section */}
      <NewsSection onNavigate={onNavigate} />

      {/* Hall of Fame Section */}
      <HallOfFameSection onNavigate={onNavigate} />

      {/* Videos & Performances Section */}
      <VideosSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Final CTA */}
      <FinalCTA onNavigate={onNavigate} />
      
      {/* Music Platform Modal */}
      <MusicPlatformModal
        isOpen={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        artistName={selectedTrack?.artist}
        trackName={selectedTrack?.track}
      />
    </div>
  );
}

function VideoHero({ imageLoaded, setImageLoaded, onNavigate }: { imageLoaded: boolean; setImageLoaded: (loaded: boolean) => void; onNavigate: (page: string) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={heroRef} className="relative h-screen bg-black overflow-hidden">
      {/* Background Video with Parallax - AMI Logo Video */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 right-0 bottom-0 z-0 flex items-center justify-center"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
          onLoadedData={() => setImageLoaded(true)}
        >
          <source
            src="/video/Landing video.MP4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-black/30 lg:bg-transparent" />
      </motion.div>

      {/* Content Overlay - BEFORE image loads */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 pt-20 pb-20 pointer-events-none"
          >
            <div className="text-center max-w-4xl pointer-events-auto w-full">
              {/* Title */}
              <h1 className="font-raleway text-4xl sm:text-6xl lg:text-9xl text-white leading-[0.9] tracking-tighter font-black mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-[#6401CF] to-[#FF4350] bg-clip-text text-transparent">
                  AMI 2026
                </span>
              </h1>

              {/* Date badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8">
                <span className="date-badge-text font-oswald text-xs sm:text-sm tracking-widest font-semibold">
                  {t('hero.date')}
                </span>
              </div>

              {/* Subtitle */}
              <p className="font-inter text-base sm:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed px-2">
                {t('hero.tagline')}
              </p>

              {/* CTAs - Hidden initially, will appear in countdown section */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay - AFTER image loads */}
      <AnimatePresence>
        {imageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 z-10 flex items-center justify-center lg:items-end lg:justify-start px-4 sm:px-6 lg:px-12 pb-20 lg:pb-32 pointer-events-none"
          >
            <div className="max-w-2xl pointer-events-auto w-full text-center lg:text-left">
              {/* Title - Reduced, smaller on mobile */}
              <h1 className="font-raleway text-3xl sm:text-4xl lg:text-6xl text-white leading-[0.95] tracking-tighter font-black mb-4 lg:mb-6">
                <span className="bg-gradient-to-r from-[#6401CF] to-[#FF4350] bg-clip-text text-transparent">
                  AMI 2026
                </span>
              </h1>

              {/* Date badge - smaller on mobile */}
              <div className="inline-flex items-center gap-2 px-3 py-2 lg:px-5 lg:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 mb-4 lg:mb-6">
                <span className="date-badge-text font-oswald text-[10px] lg:text-xs tracking-widest font-semibold">
                  {t('hero.date')}
                </span>
              </div>

              {/* Subtitle - Show on mobile but smaller */}
              <p className="text-sm sm:text-base lg:text-base text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t('hero.tagline')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StatsBar() {
  const { t } = useLanguage();
  const stats = [
    { icon: Star, value: '100+', label: t('stats.nominees') },
    { icon: Trophy, value: '50', label: t('stats.categories') },
    { icon: Users, value: '54', label: t('stats.countries') },
    { icon: Calendar, value: 'Mar 15', label: '2026' },
  ];

  return (
    <section className="relative z-20 -mt-20 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 lg:p-10 text-center group"
              >
                {/* Vertical divider - only show on desktop between items */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
                
                {/* Horizontal divider - only show on mobile between rows */}
                {index === 1 && (
                  <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                )}

                {/* Icon - subtle, small */}
                <stat.icon className="w-4 h-4 mx-auto mb-3 text-white/30 group-hover:text-white/50 transition-colors duration-500" />
                
                {/* Value */}
                <div className="font-raleway text-4xl lg:text-5xl font-semibold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="font-oswald text-[10px] text-white/50 tracking-[0.2em] group-hover:text-white/70 transition-colors duration-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CountdownSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  
  // Target date for AMIA event - adjust this to your actual event date
  const targetDate = new Date('2026-06-15T20:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Event has started or passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="py-16 lg:py-24 dark:bg-black light:bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-full lg:max-w-[80%] mx-auto text-center"
      >
        {/* Event Countdown */}
        <div className="mb-12 lg:mb-16">
          <p className="font-oswald text-xs lg:text-sm tracking-[0.3em] dark:text-white/60 light:text-black/60 mb-6 lg:mb-8 uppercase">
            {t('countdown.eventCountdown')}
          </p>
          
          <div className="flex justify-center gap-4 lg:gap-8 mb-8 lg:mb-12">
            {[
              { value: timeLeft.days.toString().padStart(2, '0'), label: t('countdown.days') },
              { value: timeLeft.hours.toString().padStart(2, '0'), label: t('countdown.hours') },
              { value: timeLeft.minutes.toString().padStart(2, '0'), label: t('countdown.minutes') },
              { value: timeLeft.seconds.toString().padStart(2, '0'), label: t('countdown.seconds') },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-raleway text-3xl lg:text-6xl font-bold bg-gradient-to-r from-[#6401CF] to-[#FF4350] bg-clip-text text-transparent mb-2">
                  {item.value}
                </div>
                <div className="font-inter text-xs lg:text-sm dark:text-white/50 light:text-black/50 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('nominees')}
            className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#6401CF] to-[#FF4350] dark:text-white light:text-white font-inter text-sm lg:text-base font-semibold hover:opacity-90 transition-opacity"
          >
            {t('home.exploreNominees')}
          </button>
          <button
            disabled
            className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 dark:bg-white/10 dark:text-white/40 light:bg-black/10 light:text-black/40 dark:border-white/20 light:border-black/20 border font-inter text-sm lg:text-base font-semibold cursor-not-allowed"
            title="Voting opens soon"
          >
            {t('home.voteComingSoon')}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function ImageInterlude({ imageUrl, translationKey }: { imageUrl: string; translationKey: string }) {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/video/Landing video.MP4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 dark:bg-black/50 light:bg-white/40" />
      </div>

      <div className="relative h-full flex items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-raleway text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center max-w-4xl leading-tight"
        >
          {t(translationKey)}
        </motion.h2>
      </div>
    </section>
  );
}

function CategoriesVisual({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const categoryImages = [
    { id: 1, name: t('categories.afrobeats'), image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80' },
    { id: 2, name: t('categories.hiphop'), image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80' },
    { id: 3, name: t('categories.rnb'), image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80' },
    { id: 4, name: t('categories.gospel'), image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80' },
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 dark:bg-black light:bg-white">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold dark:text-white light:text-black mb-4 lg:mb-6">
            {t('home.categoriesTitle')}
          </h2>
          <button
            onClick={() => onNavigate('categories')}
            className="font-inter text-base lg:text-lg text-[#6401CF] hover:text-[#FF4350] transition-colors"
          >
            {t('home.viewAllCategories')}
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {categoryImages.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onNavigate('categories')}
              className="group cursor-pointer relative aspect-[4/3] overflow-hidden dark:bg-neutral-900 light:bg-neutral-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Bottom fade to black */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
              <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/40 light:from-white light:via-white/40 to-transparent" />
              
              {/* Simple Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                <h3 className="font-raleway text-2xl lg:text-4xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedNominees({ onNavigate, onPlayClick }: { onNavigate: (page: string) => void; onPlayClick: (artist: string, track?: string) => void }) {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tappedId, setTappedId] = useState<number | null>(null);
  const [selectedNominee, setSelectedNominee] = useState<typeof nominees[0] | null>(null);
  
  const nominees = [
    {
      id: 1,
      name: 'Burna Boy',
      category: 'Artist of the Year',
      nominations: 8,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
      genre: 'Afrobeats',
      songTitle: 'Last Last',
      album: 'Love, Damini',
      producer: 'Chopstix',
      releaseDate: 'May 13, 2022',
      label: 'Atlantic Records',
      duration: '2:47',
      writers: 'Damini Ogulu, Toni Braxton, Kenneth Edmonds',
      descriptionKey: 'nominee.burnaboy.desc',
    },
    {
      id: 2,
      name: 'Tiwa Savage',
      category: 'Best Female Artist',
      nominations: 5,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
      genre: 'Afrobeats',
      songTitle: 'Somebody\'s Son',
      album: 'Water & Garri',
      producer: 'P2J',
      releaseDate: 'December 3, 2021',
      label: 'Motown Records',
      duration: '3:21',
      writers: 'Tiwa Savage, P2J, Brandy Norwood',
      descriptionKey: 'nominee.tiwasavage.desc',
    },
    {
      id: 3,
      name: 'Wizkid',
      category: 'Song of the Year',
      nominations: 6,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
      genre: 'Afrobeats',
      songTitle: 'Essence',
      album: 'Made in Lagos',
      producer: 'Legendury Beatz, P2J',
      releaseDate: 'October 30, 2020',
      label: 'Starboy Entertainment',
      duration: '4:07',
      writers: 'Ayodeji Balogun, Temilade Openiyi',
      descriptionKey: 'nominee.wizkid.desc',
    },
    {
      id: 4,
      name: 'Davido',
      category: 'Best Male Artist',
      nominations: 7,
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
      genre: 'Afrobeats',
      songTitle: 'Stand Strong',
      album: 'Timeless',
      producer: 'Magicsticks, Rage',
      releaseDate: 'March 31, 2023',
      label: 'Davido Music Worldwide',
      duration: '3:18',
      writers: 'David Adeleke, Sunday Ginikachukwu',
      descriptionKey: 'nominee.davido.desc',
    },
    {
      id: 5,
      name: 'Tems',
      category: 'Best New Artist',
      nominations: 4,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
      genre: 'R&B/Soul',
      songTitle: 'Free Mind',
      album: 'If Orange Was A Place (EP)',
      producer: 'Spax',
      releaseDate: 'September 15, 2021',
      label: 'Since \'93 / RCA Records',
      duration: '3:07',
      writers: 'Temilade Openiyi, Uzezi Oniko',
      descriptionKey: 'nominee.tems.desc',
    },
    {
      id: 6,
      name: 'Asake',
      category: 'Best Afrobeats',
      nominations: 5,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
      genre: 'Afrobeats',
      songTitle: 'Terminator',
      album: 'Work of Art',
      producer: 'Magicsticks',
      releaseDate: 'June 14, 2023',
      label: 'YBNL Nation / Empire',
      duration: '3:33',
      writers: 'Ahmed Ololade, Magicsticks',
      descriptionKey: 'nominee.asake.desc',
    },
  ];

  const handleCardClick = (nomineeId: number) => {
    // On mobile, first tap shows play button, second tap navigates
    if (window.innerWidth < 1024) {
      if (tappedId === nomineeId) {
        onNavigate('nominees');
      } else {
        setTappedId(nomineeId);
      }
    } else {
      onNavigate('nominees');
    }
  };

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 dark:bg-black light:bg-white">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold dark:text-white light:text-black mb-3 lg:mb-4">
            {t('home.topNominees')}
          </h2>
          <p className="font-inter text-sm lg:text-lg dark:text-white/60 light:text-black/60 max-w-2xl">
            {t('home.topNomineesDescription')}
          </p>
        </motion.div>

        {/* Premium Grid - 3 columns, equal treatment */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {nominees.map((nominee, index) => (
            <motion.div
              key={nominee.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(nominee.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(nominee.id)}
              className="group cursor-pointer relative"
            >
              {/* Image Container - Reduced Height */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-3 lg:mb-4">
                <img
                  src={nominee.image}
                  alt={nominee.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Bottom fade to black */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/20 light:from-white light:via-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Nominations Badge - Top Right */}
                <div className="absolute top-2 lg:top-3 right-2 lg:right-3">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#6401CF] to-[#FF4350] flex flex-col items-center justify-center border-2 border-white/20 backdrop-blur-sm shadow-xl">
                    <span className="font-inter text-lg lg:text-xl font-bold leading-none" style={{ color: 'white' }}>
                      {nominee.nominations}
                    </span>
                    <span className="font-inter text-[9px] lg:text-[10px] uppercase leading-none mt-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {t('home.noms')}
                    </span>
                  </div>
                </div>

                {/* Info Button - Bottom Left */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: (hoveredId === nominee.id || tappedId === nominee.id) ? 1 : 0,
                    scale: (hoveredId === nominee.id || tappedId === nominee.id) ? 1 : 0.9,
                  }}
                  transition={{ 
                    duration: 0.25,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNominee(nominee);
                  }}
                  className="absolute bottom-3 left-3 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/95 dark:bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/50 hover:scale-110 transition-transform duration-200"
                >
                  <Info className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                </motion.button>

                {/* Play Button - Bottom Right (Grammy Style) */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: (hoveredId === nominee.id || tappedId === nominee.id) ? 1 : 0,
                    scale: (hoveredId === nominee.id || tappedId === nominee.id) ? 1 : 0.9,
                  }}
                  transition={{ 
                    duration: 0.25,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayClick(nominee.name, nominee.category);
                  }}
                  className="absolute bottom-3 right-3 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/95 dark:bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/50 hover:scale-110 transition-transform duration-200"
                >
                  <Play className="w-4 h-4 lg:w-5 lg:h-5 text-black fill-black ml-0.5" />
                </motion.button>
              </div>

              {/* Content - Below Image */}
              <div className="space-y-0.5 lg:space-y-1">
                <h3 className="font-raleway text-lg lg:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6401CF] group-hover:to-[#FF4350] group-hover:bg-clip-text transition-all duration-500">
                  {nominee.name}
                </h3>
                <p className="font-inter text-xs text-white/60 uppercase tracking-wider">
                  {nominee.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <button
            onClick={() => onNavigate('nominees')}
            className="inline-flex items-center gap-2 px-8 lg:px-10 py-3 lg:py-4 border border-white/30 text-white font-inter text-sm lg:text-base font-medium hover:bg-white/5 hover:border-[#6401CF] transition-all duration-300 group"
          >
            {t('home.viewAllNominees')}
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Nominee Details Modal */}
      <AnimatePresence>
        {selectedNominee && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNominee(null)}
              className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto dark:bg-neutral-900/95 light:bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border dark:border-white/10 light:border-black/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedNominee(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm text-white hover:bg-black hover:scale-110 transition-all flex items-center justify-center border border-white/30 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col lg:flex-row">
                  {/* Image Side */}
                  <div className="lg:w-2/5 relative">
                    <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden lg:rounded-l-2xl">
                      <img
                        src={selectedNominee.image}
                        alt={selectedNominee.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      {/* Artist Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm font-inter text-xs uppercase tracking-wider border border-white/30 rounded-full" style={{ color: 'white' }}>
                            {selectedNominee.genre}
                          </span>
                        </div>
                        <h2 className="font-raleway text-3xl lg:text-4xl font-bold mb-2 leading-tight" style={{ color: 'white' }}>
                          {selectedNominee.name}
                        </h2>
                        <p className="font-inter text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {selectedNominee.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="lg:w-3/5 p-6 lg:p-8">
                    {/* Song/Album Title */}
                    <div className="mb-6">
                      <h3 className="font-raleway text-2xl lg:text-3xl font-bold dark:text-white light:text-black mb-2 leading-tight">
                        {selectedNominee.songTitle}
                      </h3>
                      <p className="font-inter text-base dark:text-white/60 light:text-black/60">
                        {selectedNominee.album}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.producer')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.producer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.writers')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.writers}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.label')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.label}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.released')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.releaseDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.duration')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="pt-4 border-t dark:border-white/10 light:border-black/10">
                      <p className="font-inter text-sm lg:text-base dark:text-white/70 light:text-black/70 leading-relaxed">
                        {t(selectedNominee.descriptionKey)}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-6 border-t dark:border-white/10 light:border-black/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Play music for:', selectedNominee.name);
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-sm rounded-full hover:opacity-90 transition-opacity"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{t('modal.playTrack')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function NomineesShowcase({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const leftNominees = [
    { id: 1, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
    { id: 2, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
    { id: 3, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80' },
  ];

  const rightNominees = [
    { id: 4, image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' },
    { id: 5, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80' },
    { id: 6, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80' },
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-raleway text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              {t('home.nomineesShowcaseTitle')}
            </h2>
            <p className="font-inter text-lg text-white/70 mb-12 leading-relaxed">
              {t('home.nomineesShowcaseDescription')}
            </p>
            <button
              onClick={() => onNavigate('nominees')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-lg hover:opacity-90 transition-opacity group"
            >
              {t('home.exploreAllNominees')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right: Scrolling Images - Desktop & Mobile */}
          <div className="relative">
            {/* Desktop: 2 columns */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4 h-[600px]">
              {/* Column 1 - Scroll Up */}
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, -100] }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  className="flex flex-col gap-4"
                  style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                >
                  {[...leftNominees, ...leftNominees].map((nominee, index) => (
                    <div
                      key={`left-${index}`}
                      onClick={() => onNavigate('nominees')}
                      className="group cursor-pointer relative overflow-hidden bg-neutral-900 aspect-[3/4] flex-shrink-0"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={nominee.image}
                        alt="Nominee"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Bottom fade to black */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Column 2 - Scroll Down */}
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{ y: [-100, 0] }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  className="flex flex-col gap-4"
                  style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                >
                  {[...rightNominees, ...rightNominees].map((nominee, index) => (
                    <div
                      key={`right-${index}`}
                      onClick={() => onNavigate('nominees')}
                      className="group cursor-pointer relative overflow-hidden bg-neutral-900 aspect-[3/4] flex-shrink-0"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={nominee.image}
                        alt="Nominee"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Bottom fade to black */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Mobile & Tablet: 2 columns with opposite scroll */}
            <div className="grid grid-cols-2 lg:hidden gap-4 h-[500px]">
              {/* Left Column - Scroll Up */}
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, -100] }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  className="flex flex-col gap-4"
                  style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                >
                  {[...leftNominees, ...leftNominees, ...leftNominees].map((nominee, index) => (
                    <div
                      key={`mobile-left-${index}`}
                      onClick={() => onNavigate('nominees')}
                      className="group cursor-pointer relative overflow-hidden bg-neutral-900 aspect-[3/4] flex-shrink-0"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={nominee.image}
                        alt="Nominee"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column - Scroll Down */}
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{ y: [-100, 0] }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop"
                  }}
                  className="flex flex-col gap-4"
                  style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
                >
                  {[...rightNominees, ...rightNominees, ...rightNominees].map((nominee, index) => (
                    <div
                      key={`mobile-right-${index}`}
                      onClick={() => onNavigate('nominees')}
                      className="group cursor-pointer relative overflow-hidden bg-neutral-900 aspect-[3/4] flex-shrink-0"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={nominee.image}
                        alt="Nominee"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 lg:mb-4">
            {t('home.latestNews')}
          </h2>
          <p className="font-inter text-sm lg:text-lg text-white/60 max-w-2xl">
            {t('home.latestNewsDescription')}
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* News Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group cursor-pointer relative"
          >
            {/* Image Container - Smaller aspect ratio */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 mb-4">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80"
                alt="News Item 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Bottom fade to black */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/20 light:from-white light:via-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Hover Arrow - Bottom Right */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Content - Below Image */}
            <div className="space-y-1">
              <h3 className="font-raleway text-lg lg:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6401CF] group-hover:to-[#FF4350] group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                AMI 2026 Announces Nominees
              </h3>
              <p className="font-inter text-xs text-white/60 uppercase tracking-wider">
                March 10, 2026
              </p>
            </div>
          </motion.div>

          {/* News Item 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group cursor-pointer relative"
          >
            {/* Image Container - Smaller aspect ratio */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 mb-4">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
                alt="News Item 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Bottom fade to black */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/20 light:from-white light:via-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Hover Arrow - Bottom Right */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Content - Below Image */}
            <div className="space-y-1">
              <h3 className="font-raleway text-lg lg:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6401CF] group-hover:to-[#FF4350] group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                AMI 2026: A Night to Remember
              </h3>
              <p className="font-inter text-xs text-white/60 uppercase tracking-wider">
                March 12, 2026
              </p>
            </div>
          </motion.div>

          {/* News Item 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group cursor-pointer relative"
          >
            {/* Image Container - Smaller aspect ratio */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 mb-4">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"
                alt="News Item 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Bottom fade to black */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/20 light:from-white light:via-white/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Hover Arrow - Bottom Right */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Content - Below Image */}
            <div className="space-y-1">
              <h3 className="font-raleway text-lg lg:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6401CF] group-hover:to-[#FF4350] group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                AMI 2026: Celebrating African Talent
              </h3>
              <p className="font-inter text-xs text-white/60 uppercase tracking-wider">
                March 14, 2026
              </p>
            </div>
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <button
            onClick={() => onNavigate('news')}
            className="inline-flex items-center gap-2 px-8 lg:px-10 py-3 lg:py-4 border border-white/30 text-white font-inter text-sm lg:text-base font-medium hover:bg-white/5 hover:border-[#6401CF] transition-all duration-300 group"
          >
            {t('home.viewAllNews')}
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function HallOfFameSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  const featuredLegend = {
    id: 1,
    name: 'Fela Kuti',
    title: 'Pioneer of Afrobeat',
    era: '1938 - 1997',
    achievements: 'Revolutionary musician, composer, and political activist who created Afrobeat',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80'
  };

  const legends = [
    {
      id: 2,
      name: 'Miriam Makeba',
      title: 'Mama Africa',
      era: '1932 - 2008',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'
    },
    {
      id: 3,
      name: 'King Sunny Ade',
      title: 'King of Juju Music',
      era: '1946 - Present',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80'
    },
    {
      id: 4,
      name: 'Youssou N\'Dour',
      title: 'Voice of Senegal',
      era: '1959 - Present',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80'
    },
    {
      id: 5,
      name: 'Hugh Masekela',
      title: 'Father of South African Jazz',
      era: '1939 - 2018',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80'
    },
    {
      id: 6,
      name: 'Angelique Kidjo',
      title: 'Queen of African Music',
      era: '1960 - Present',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80'
    },
    {
      id: 7,
      name: 'Salif Keita',
      title: 'Golden Voice of Africa',
      era: '1949 - Present',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'
    },
    {
      id: 8,
      name: 'Ali Farka Toure',
      title: 'Maestro of Malian Blues',
      era: '1939 - 2006',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80'
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-black">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-3 lg:mb-4">
            {t('home.hallOfFame')}
          </h2>
          <p className="font-inter text-sm lg:text-lg text-white/60 max-w-2xl">
            {t('home.hallOfFameDescription')}
          </p>
        </motion.div>

        {/* Featured Legend - Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => onNavigate('hall-of-fame')}
          className="group cursor-pointer relative mb-12 lg:mb-16"
        >
          <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden dark:bg-neutral-900 light:bg-neutral-100">
            <img
              src={featuredLegend.image}
              alt={featuredLegend.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/60 light:from-white light:via-white/60 to-transparent" />
            
            {/* Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
              <div className="max-w-4xl">
                {/* Era Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                  <Trophy className="w-4 h-4 text-[#FDD103]" />
                  <span className="font-oswald text-xs text-white tracking-widest font-semibold">
                    {featuredLegend.era}
                  </span>
                </div>

                <h3 className="font-raleway text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6401CF] group-hover:to-[#FF4350] group-hover:bg-clip-text transition-all duration-500">
                  {featuredLegend.name}
                </h3>
                
                <p className="font-inter text-xl lg:text-2xl text-[#FDD103] mb-6">
                  {featuredLegend.title}
                </p>

                <p className="font-inter text-base lg:text-lg text-white/70 max-w-2xl mb-8">
                  {featuredLegend.achievements}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                  <span className="font-inter font-medium">Explore Legacy</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Hover Arrow - Top Right */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Legends Grid - 4 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legends.map((legend, index) => (
            <motion.div
              key={legend.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => onNavigate('hall-of-fame')}
              className="group cursor-pointer relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-4">
                <img
                  src={legend.image}
                  alt={legend.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Bottom fade to black */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black light:to-white" />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/40 light:from-white light:via-white/40 to-transparent" />
                
                {/* Era Badge - Top */}
                <div className="absolute top-3 left-3">
                  <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="font-oswald text-[10px] text-white/80 tracking-widest font-semibold">
                      {legend.era}
                    </span>
                  </div>
                </div>

                {/* Hover Arrow - Bottom Right */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Content - Below Image */}
              <div className="space-y-1">
                <h3 className="font-raleway text-lg lg:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#6401CF] group-hover:to-[#FF4350] group-hover:bg-clip-text transition-all duration-500">
                  {legend.name}
                </h3>
                <p className="font-inter text-xs text-white/60 line-clamp-2">
                  {legend.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <button
            onClick={() => onNavigate('hall-of-fame')}
            className="inline-flex items-center gap-2 px-8 lg:px-10 py-3 lg:py-4 border border-white/30 text-white font-inter text-sm lg:text-base font-medium hover:bg-white/5 hover:border-[#6401CF] transition-all duration-300 group"
          >
            View All Legends
            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function VideosSection() {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<{ youtubeId: string; title: string } | null>(null);

  const videos = [
    {
      id: 1,
      title: 'AMIA 2025 Highlights',
      thumbnail: 'https://images.unsplash.com/photo-1566735355837-2269c24e644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njg3MTYxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: '2.4M',
      duration: '12:45',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: 'Burna Boy - Last Last (Live Performance)',
      thumbnail: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzY4NjgxMDY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      views: '1.8M',
      duration: '4:32',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 3,
      title: 'Behind the Scenes: AMIA 2026 Preparations',
      thumbnail: 'https://images.unsplash.com/photo-1619973226698-b77a5b5dd14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBwZXJmb3JtYW5jZSUyMGxpZ2h0c3xlbnwxfHx8fDE3Njg3MTYxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: '956K',
      duration: '8:20',
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 4,
      title: 'Wizkid & Tems - Essence (Award Show Performance)',
      thumbnail: 'https://images.unsplash.com/photo-1630510590330-758f9428eb7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzaWMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3Njg3MTYxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      views: '3.2M',
      duration: '5:15',
      youtubeId: 'dQw4w9WgXcQ',
    },
  ];

  const handleVideoClick = (youtubeId: string, title: string) => {
    setSelectedVideo({ youtubeId, title });
  };

  return (
    <>
      <section className="py-16 lg:py-24 px-6 lg:px-12 dark:bg-black light:bg-white">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <p className="font-oswald text-xs lg:text-sm tracking-[0.3em] dark:text-white/40 light:text-black/40 mb-4 uppercase text-center lg:text-left">
            {t('videos.subtitle')}
          </p>
          <h2 className="font-raleway text-3xl lg:text-5xl font-bold dark:text-white light:text-black text-center lg:text-left mb-4">
            {t('videos.title')}
          </h2>
          <p className="font-inter text-base lg:text-lg dark:text-white/60 light:text-black/60 text-center lg:text-left max-w-2xl">
            {t('videos.description')}
          </p>
        </motion.div>

        {/* Videos Grid - Apple Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleVideoClick(video.youtubeId, video.title)}
              className="group cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden dark:bg-neutral-900 light:bg-neutral-100 mb-4">
                {/* Video Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent dark:to-black/60 light:to-white/60" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 dark:bg-black/0 light:bg-white/0 dark:group-hover:bg-black/30 light:group-hover:bg-white/30 transition-colors duration-300" />

                {/* Play Button - Center with Brand Gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6401CF] to-[#FF4350] opacity-95 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Frosted Glass Overlay */}
                    <div className="absolute inset-0 rounded-full backdrop-blur-xl bg-white/10" />
                    
                    {/* Play Icon */}
                    <Play className="relative w-7 h-7 lg:w-9 lg:h-9 text-white fill-current ml-1 drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Duration Badge - Bottom Right */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg dark:bg-black/80 light:bg-white/80 backdrop-blur-md">
                  <span className="font-inter text-xs font-medium dark:text-white light:text-black">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-2">
                <h3 className="font-raleway text-lg lg:text-xl font-semibold dark:text-white light:text-black group-hover:dark:text-white/80 group-hover:light:text-black/80 transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                <p className="font-inter text-sm dark:text-white/50 light:text-black/50">
                  {video.views} {t('videos.views')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional subtle divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 lg:mt-20 w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </section>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        youtubeId={selectedVideo?.youtubeId || ''}
        title={selectedVideo?.title || ''}
      />
    </>
  );
}

function PartnersSection() {
  const { t } = useLanguage();
  
  // Partner logos with images - varied sizes for freestyle layout
  const partners = [
    { 
      name: 'Spotify', 
      logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'Apple Music', 
      logo: 'https://images.unsplash.com/photo-1722665600826-f054f8fe6f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'YouTube Music', 
      logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'Amazon Music', 
      logo: 'https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'Tidal', 
      logo: 'https://images.unsplash.com/photo-1551817958-795f9440ce4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'Deezer', 
      logo: 'https://images.unsplash.com/photo-1622651132634-a7ed1fbb86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'SoundCloud', 
      logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    { 
      name: 'Audiomack', 
      logo: 'https://images.unsplash.com/photo-1551817958-795f9440ce4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
  ];

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12 dark:bg-black light:bg-white">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <p className="font-oswald text-xs lg:text-sm tracking-[0.3em] dark:text-white/40 light:text-black/40 mb-4 uppercase">
            {t('partners.subtitle')}
          </p>
          <h2 className="font-raleway text-3xl lg:text-5xl font-bold dark:text-white light:text-black">
            {t('partners.title')}
          </h2>
        </motion.div>

        {/* Partners Grid - Grammy.com Style (Clean, No Frames) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 lg:gap-x-20 lg:gap-y-16 items-center justify-items-center max-w-5xl mx-auto"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col items-center justify-center gap-4 group cursor-pointer"
            >
              {/* Logo - No frame, just the image */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-20 h-20 lg:w-24 lg:h-24 object-contain dark:opacity-60 light:opacity-50 dark:group-hover:opacity-100 light:group-hover:opacity-90 transition-all duration-500 dark:brightness-95 light:brightness-100 dark:group-hover:brightness-110 group-hover:scale-110"
              />
              
              {/* Partner Name */}
              <p className="font-inter text-xs lg:text-sm font-medium dark:text-white/50 light:text-black/50 dark:group-hover:text-white/80 light:group-hover:text-black/80 transition-all duration-300 text-center">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional subtle divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 lg:mt-20 w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </section>
  );
}

function FinalCTA({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative h-screen dark:bg-black light:bg-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/video/Landing video.MP4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 dark:bg-black/50 light:bg-white/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-raleway text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 lg:mb-12 leading-tight"
        >
          Be Part of<br />the Moment
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          disabled
          className="px-8 lg:px-12 py-3 lg:py-5 dark:bg-neutral-800 dark:text-neutral-500 light:bg-neutral-200 light:text-neutral-400 font-inter font-semibold text-sm lg:text-lg cursor-not-allowed opacity-60"
          title="Voting opens soon"
        >
          Vote • Coming Soon
        </motion.button>
      </div>
    </section>
  );
}
