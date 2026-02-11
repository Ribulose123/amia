'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Award, Globe, Heart, Users } from 'lucide-react';
import { useNavigation } from '@/src/lib/useNavigation';
import { type Locale } from '@/src/config/i18n';

interface AboutPageProps {
  lang: Locale;
}

export function AboutPage({ lang }: AboutPageProps) {
  const onNavigate = useNavigation(lang);
  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement */}
      <MissionSection />

      {/* Video Section */}
      <VideoSection />

      {/* Values */}
      <ValuesSection />

      {/* Impact Stats */}
      <ImpactSection />

      {/* Team Section */}
      <TeamSection />

      {/* CTA */}
      <AboutCTA onNavigate={onNavigate} />
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80"
          alt="About AMI"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b dark:from-black/60 dark:via-black/40 dark:to-black light:from-white/60 light:via-white/40 light:to-white" />
      </motion.div>

      <div className="relative h-full flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-5xl"
        >
          <h1 className="font-raleway text-4xl sm:text-7xl lg:text-9xl font-bold text-white mb-6 sm:mb-8 tracking-tighter leading-[0.95]">
            Celebrating<br />African Music
          </h1>
          <p className="font-inter text-lg sm:text-2xl text-white/80">
            One award. One continent. Infinite talent.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-20 sm:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-raleway text-3xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-12 tracking-tight">
            Our Mission
          </h2>
          <p className="font-inter text-lg sm:text-3xl text-white/70 leading-relaxed">
            To honor, celebrate, and amplify the voices that define African music—
            recognizing excellence, inspiring innovation, and connecting our continent's 
            rich musical heritage with the world.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-african-drummer-performing-8637/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 dark:bg-black/40 light:bg-white/40" />
      </div>

      <div className="relative h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <h2 className="font-raleway text-4xl sm:text-6xl lg:text-8xl font-bold dark:text-white light:text-black mb-8 leading-tight">
            The Rhythm of Africa
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Recognizing outstanding artistic achievement across all genres',
    },
    {
      icon: Globe,
      title: 'Unity',
      description: 'Celebrating the diversity and richness of African music',
    },
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'Honoring genuine artistry and cultural heritage',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building bridges between artists, fans, and the industry',
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-6 lg:px-12">
      <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-raleway text-3xl sm:text-6xl font-bold text-white mb-12 sm:mb-20 text-center tracking-tight"
        >
          Our Values
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 bg-gradient-to-br from-[#6401CF] to-[#FF4350] rounded-full">
                <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="font-raleway text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                {value.title}
              </h3>
              <p className="font-inter text-[15px] sm:text-base text-white/60 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const stats = [
    { value: '54', label: 'African Countries' },
    { value: '500M+', label: 'Fans Worldwide' },
    { value: '1000+', label: 'Artists Recognized' },
    { value: '50+', label: 'Music Genres' },
  ];

  return (
    <section className="relative py-24 sm:py-40 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80"
          alt="Impact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative w-full sm:w-[90%] lg:w-[80%] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-raleway text-3xl sm:text-6xl font-bold text-white mb-12 sm:mb-20 text-center tracking-tight"
        >
          Our Impact
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-raleway text-3xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 tabular-nums">
                {stat.value}
              </div>
              <div className="font-inter text-xs sm:text-sm text-white/60 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-20 sm:py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-raleway text-3xl sm:text-6xl font-bold text-white mb-6 sm:mb-8 tracking-tight">
            Built by Music Lovers
          </h2>
          <p className="font-inter text-base sm:text-xl text-white/60 leading-relaxed mb-8 sm:mb-12">
            The African Music Icon Awards is powered by a passionate team of music 
            industry professionals, artists, and fans dedicated to celebrating African excellence.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="p-6 sm:p-8 bg-neutral-900">
              <div className="font-raleway text-3xl sm:text-4xl font-bold text-white mb-2">50+</div>
              <div className="font-inter text-xs sm:text-sm text-white/60">Team Members</div>
            </div>
            <div className="p-6 sm:p-8 bg-neutral-900">
              <div className="font-raleway text-3xl sm:text-4xl font-bold text-white mb-2">200+</div>
              <div className="font-inter text-xs sm:text-sm text-white/60">Industry Partners</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutCTA({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
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
          <h2 className="font-raleway text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Join the Movement
          </h2>
          <p className="font-inter text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Be part of celebrating Africa's musical excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled
              className="px-12 py-5 bg-neutral-800 text-neutral-500 font-inter font-semibold text-lg cursor-not-allowed opacity-60"
              title="Voting opens soon"
            >
              Vote • Coming Soon
            </button>
            <button
              onClick={() => onNavigate('nominees')}
              className="px-12 py-5 border-2 border-white/30 text-white font-inter font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              View Nominees
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
