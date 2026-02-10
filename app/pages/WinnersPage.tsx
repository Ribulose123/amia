import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Award, Play } from 'lucide-react';

interface WinnersPageProps {
  onNavigate: (page: string) => void;
}

type Winner = {
  id: number;
  year: number;
  category: string;
  winner: string;
  image: string;
  achievement: string;
};

const winners: Winner[] = [
  {
    id: 1,
    year: 2025,
    category: 'Artist of the Year',
    winner: 'Burna Boy',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    achievement: 'Global Afrobeats dominance',
  },
  {
    id: 2,
    year: 2025,
    category: 'Album of the Year',
    winner: 'Love, Damini',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80',
    achievement: 'Chart-topping masterpiece',
  },
  {
    id: 3,
    year: 2025,
    category: 'Song of the Year',
    winner: 'Last Last',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
    achievement: 'International breakthrough hit',
  },
  {
    id: 4,
    year: 2025,
    category: 'Best New Artist',
    winner: 'Asake',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
    achievement: 'Meteoric rise to stardom',
  },
  {
    id: 5,
    year: 2025,
    category: 'Best Female Artist',
    winner: 'Tiwa Savage',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    achievement: 'Consistent excellence',
  },
  {
    id: 6,
    year: 2025,
    category: 'Best Collaboration',
    winner: 'Peru (Remix)',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80',
    achievement: 'Global collaboration success',
  },
];

export function WinnersPage({ onNavigate }: WinnersPageProps) {
  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section - Video */}
      <HeroSection />

      {/* Winners Year Selector */}
      <YearSelector />

      {/* Featured Winner - Large */}
      <FeaturedWinner winner={winners[0]} />

      {/* Winners Grid */}
      <WinnersGrid winners={winners.slice(1)} />

      {/* Hall of Fame CTA */}
      <HallOfFameCTA onNavigate={onNavigate} />
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1692856135967-89f9b37aa8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMHRyb3BoeSUyMHNwb3RsaWdodHxlbnwxfHx8fDE3Njg2NTA2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Winners Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b dark:from-black/60 dark:via-black/30 dark:to-black light:from-white/60 light:via-white/30 light:to-white" />
      </motion.div>

      <div className="relative h-full flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-6 lg:mb-8 bg-gradient-to-br from-[#6401CF] to-[#FF4350] rounded-full"
          >
            <Award className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </motion.div>

          <h1 className="font-raleway text-4xl sm:text-6xl lg:text-9xl font-bold text-white mb-4 lg:mb-6 tracking-tighter">
            Winners
          </h1>
          <p className="font-inter text-base lg:text-xl text-white/70">
            Celebrating African music excellence
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function YearSelector() {
  const years = [2025, 2024, 2023, 2022, 2021];

  return (
    <section className="sticky top-20 z-40 py-4 lg:py-8 bg-black/95 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-full lg:max-w-[80%] mx-auto px-4 lg:px-12">
        <div className="flex gap-6 lg:gap-8 justify-center overflow-x-auto scrollbar-hide">
          {years.map((year) => (
            <button
              key={year}
              className={`font-inter text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                year === 2025 ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWinner({ winner }: { winner: Winner }) {
  return (
    <section className="relative py-16 lg:py-32 px-4 lg:px-12 overflow-hidden">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-black border border-white/10"
        >
          {/* Image with enhanced overlay */}
          <div className="absolute inset-0">
            <img
              src={winner.image}
              alt={winner.winner}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layer gradient for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-4 sm:px-8 lg:px-20 max-w-4xl">
              {/* Award Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-2 lg:px-5 lg:py-3 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-4 lg:mb-8 shadow-2xl"
              >
                <Award className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="line-clamp-1">{winner.category}</span>
              </motion.div>

              {/* Winner Name - Extra Large */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="font-raleway text-3xl sm:text-5xl lg:text-8xl xl:text-9xl font-black text-white mb-3 lg:mb-6 tracking-tighter leading-[0.9] drop-shadow-2xl"
              >
                {winner.winner}
              </motion.h2>

              {/* Achievement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="font-inter text-sm sm:text-base lg:text-xl text-white/90 mb-4 lg:mb-10 max-w-xl line-clamp-2"
              >
                {winner.achievement}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 lg:gap-3 px-6 lg:px-10 py-3 lg:py-5 bg-white text-black font-inter font-bold text-xs lg:text-base hover:bg-white/90 transition-all shadow-2xl"
              >
                <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-black" />
                <span className="hidden sm:inline">Watch Acceptance Speech</span>
                <span className="sm:hidden">Watch</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WinnersGrid({ winners }: { winners: Winner[] }) {
  return (
    <section className="py-12 lg:py-20 px-4 lg:px-12">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
          {winners.map((winner, index) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer relative overflow-hidden bg-black border border-white/10"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={winner.image}
                  alt={winner.winner}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Strong gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/70 light:from-white light:via-white/70 to-transparent" />
                
                {/* Purple hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6401CF]/0 to-[#6401CF]/0 group-hover:from-[#6401CF]/30 group-hover:to-[#6401CF]/10 transition-all duration-500" />
                
                {/* Award badge - top corner */}
                <div className="absolute top-2 lg:top-6 left-2 lg:left-6">
                  <div className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 bg-black/70 backdrop-blur-md border border-white/20">
                    <Award className="w-3 h-3 lg:w-4 lg:h-4 text-[#6401CF]" />
                    <span className="font-inter text-[10px] lg:text-xs text-white/90 uppercase tracking-wider font-semibold">
                      Winner
                    </span>
                  </div>
                </div>

                {/* Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-8">
                  {/* Category */}
                  <p className="font-inter text-[10px] lg:text-xs text-[#FF4350] uppercase tracking-widest mb-1.5 lg:mb-3 font-bold line-clamp-1">
                    {winner.category}
                  </p>

                  {/* Winner Name */}
                  <h3 className="font-raleway text-base lg:text-3xl xl:text-4xl font-black text-white mb-1.5 lg:mb-3 leading-tight tracking-tight line-clamp-2">
                    {winner.winner}
                  </h3>

                  {/* Achievement */}
                  <p className="font-inter text-[10px] lg:text-sm text-white/80 leading-relaxed line-clamp-2">
                    {winner.achievement}
                  </p>

                  {/* Play button on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1,
                      y: 0 
                    }}
                    className="mt-3 lg:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block"
                  >
                    <button className="flex items-center gap-2 text-white">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                      <span className="font-inter text-sm font-semibold">View Moment</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HallOfFameCTA({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80"
          alt="Hall of Fame"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-raleway text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Legends of<br />African Music
          </h2>
          <p className="font-inter text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Explore the Hall of Fame to see the artists who have shaped the sound of Africa
          </p>
          <button
            onClick={() => onNavigate('hall-of-fame')}
            className="px-12 py-5 bg-white text-black font-inter font-semibold text-lg hover:bg-white/90 transition-all"
          >
            Visit Hall of Fame
          </button>
        </motion.div>
      </div>
    </section>
  );
}
