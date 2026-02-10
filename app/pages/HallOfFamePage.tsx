import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, Star } from 'lucide-react';

interface HallOfFamePageProps {
  onNavigate: (page: string) => void;
}

type Legend = {
  id: number;
  name: string;
  title: string;
  image: string;
  years: string;
  achievements: string;
  awards: number;
};

const legends: Legend[] = [
  {
    id: 1,
    name: 'Fela Kuti',
    title: 'Pioneer of Afrobeat',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    years: '1970-1997',
    achievements: '45 albums, Global icon',
    awards: 12,
  },
  {
    id: 2,
    name: 'Miriam Makeba',
    title: 'Mama Africa',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    years: '1950-2008',
    achievements: 'Grammy winner, UN Ambassador',
    awards: 15,
  },
  {
    id: 3,
    name: 'King Sunny Adé',
    title: 'King of Jùjú Music',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80',
    years: '1960-Present',
    achievements: 'Grammy nominations, Global tours',
    awards: 18,
  },
  {
    id: 4,
    name: 'Youssou N\'Dour',
    title: 'Senegalese Icon',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80',
    years: '1970-Present',
    achievements: 'Grammy winner, UNESCO Artist',
    awards: 20,
  },
  {
    id: 5,
    name: 'Salif Keita',
    title: 'Golden Voice of Africa',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    years: '1970-Present',
    achievements: 'International acclaim',
    awards: 14,
  },
  {
    id: 6,
    name: 'Angelique Kidjo',
    title: 'Grammy Legend',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&q=80',
    years: '1980-Present',
    achievements: '5 Grammy Awards',
    awards: 25,
  },
];

export function HallOfFamePage({ onNavigate }: HallOfFamePageProps) {
  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section - Parallax */}
      <ParallaxHero />

      {/* Intro Section */}
      <IntroSection />

      {/* Legends Grid - Large Format */}
      <LegendsGrid legends={legends} />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA */}
      <NominationCTA onNavigate={onNavigate} />
    </div>
  );
}

function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80"
          alt="Hall of Fame"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b dark:from-black/60 dark:via-black/30 dark:to-black light:from-white/60 light:via-white/30 light:to-white" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center justify-center px-6 pt-20"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-[#6401CF] to-[#FF4350] rounded-full"
          >
            <Star className="w-12 h-12 text-white fill-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-raleway text-4xl sm:text-6xl lg:text-9xl font-black dark:text-white light:text-black mb-4 lg:mb-6 tracking-tighter leading-[0.85]"
          >
            Hall of Fame
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-inter text-base lg:text-xl dark:text-white/70 light:text-black/70 max-w-2xl mx-auto"
          >
            Honoring the legends who shaped the sound of Africa
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-raleway text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white light:text-black mb-8 tracking-tight">
            Celebrating Timeless Greatness
          </h2>
          <p className="font-inter text-lg dark:text-white/60 light:text-black/60 leading-relaxed">
            The AMI Hall of Fame honors artists whose groundbreaking work has transcended 
            time and borders, shaping the sound of African music and inspiring generations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function LegendsGrid({ legends }: { legends: Legend[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-12 lg:py-20 px-4 lg:px-12">
      <div className="max-w-full lg:max-w-[80%] mx-auto space-y-4 lg:space-y-6">
        {legends.map((legend, index) => (
          <motion.div
            key={legend.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredId(legend.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`group relative overflow-hidden dark:bg-neutral-900 light:bg-neutral-100 transition-all duration-500 ${
              index % 2 === 0 ? 'h-[400px] lg:h-[600px]' : 'h-[350px] lg:h-[500px]'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={legend.image}
                alt={legend.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredId === legend.id ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r dark:from-black dark:via-black/80 light:from-white light:via-white/80 to-transparent" />
            </div>

            <div className="relative h-full flex items-center">
              <div className="px-6 lg:px-20 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                    <Star className="w-4 h-4 lg:w-6 lg:h-6 text-[#FF4350] fill-[#FF4350]" />
                    <p className="font-inter text-[10px] lg:text-sm text-white/60 uppercase tracking-wider">
                      {legend.years}
                    </p>
                  </div>

                  <h2 className="font-raleway text-3xl sm:text-4xl lg:text-7xl font-bold text-white mb-2 lg:mb-3 tracking-tight">
                    {legend.name}
                  </h2>

                  <p className="font-inter text-base lg:text-2xl text-[#6401CF] mb-3 lg:mb-6 line-clamp-1">
                    {legend.title}
                  </p>

                  <p className="font-inter text-sm lg:text-lg text-white/70 mb-3 lg:mb-6 line-clamp-2">
                    {legend.achievements}
                  </p>

                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 lg:w-5 lg:h-5 text-[#FF4350]" />
                    <span className="font-inter text-xs lg:text-sm text-white/80">
                      {legend.awards} Major Awards
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { label: 'Inductees', value: '24' },
    { label: 'Total Awards', value: '187' },
    { label: 'Countries', value: '18' },
    { label: 'Years Active', value: '70+' },
  ];

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 border-y border-white/5">
      <div className="max-w-full lg:max-w-[80%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-raleway text-4xl sm:text-5xl lg:text-8xl font-bold text-white mb-2 lg:mb-3 tabular-nums">
                {stat.value}
              </div>
              <div className="font-inter text-[10px] lg:text-sm text-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NominationCTA({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative py-24 lg:py-40 px-6 overflow-hidden">
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
          <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 lg:mb-8 tracking-tight">
            The Next Legends<br />Start Today
          </h2>
          <p className="font-inter text-sm lg:text-lg text-white/60 mb-8 lg:mb-12 max-w-2xl mx-auto">
            Support today's artists as they create tomorrow's classics
          </p>
          <button
            disabled
            className="px-8 lg:px-12 py-3 lg:py-5 bg-neutral-800 text-neutral-500 font-inter font-semibold text-sm lg:text-lg cursor-not-allowed opacity-60"
            title="Voting opens soon"
          >
            Vote • Coming Soon
          </button>
        </motion.div>
      </div>
    </section>
  );
}
