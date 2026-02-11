'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Tv, Bell } from 'lucide-react';
import { useNavigation } from '@/src/lib/useNavigation';
import { type Locale } from '@/src/config/i18n';

interface EventNightPageProps {
  lang: Locale;
}

export function EventNightPage({ lang }: EventNightPageProps) {
  const onNavigate = useNavigation(lang);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date('2026-03-15T20:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Video */}
      <HeroSection />

      {/* Event Details */}
      <EventDetails />

      {/* Countdown */}
      <CountdownSection timeLeft={timeLeft} />

      {/* How to Watch */}
      <HowToWatch />

      {/* Schedule */}
      <ScheduleSection />

      {/* CTA */}
      <EventCTA />
    </div>
  );
}

function HeroSection() {
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
            src="https://cdn.coverr.co/videos/coverr-stage-lights-and-smoke-5737/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 dark:bg-black/50 light:bg-white/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black dark:to-black light:to-white" />
      </div>

      <div className="relative h-full flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-5xl"
        >
          <h1 className="font-raleway text-6xl sm:text-7xl lg:text-9xl font-bold dark:text-white light:text-black mb-8 tracking-tighter leading-[0.9]">
            Event Night
          </h1>
          <p className="font-inter text-2xl dark:text-white/90 light:text-black/90 mb-2">March 15, 2026</p>
          <p className="font-inter text-xl dark:text-white/70 light:text-black/70">Lagos, Nigeria</p>
        </motion.div>
      </div>
    </section>
  );
}

function EventDetails() {
  const details = [
    {
      icon: Calendar,
      label: 'Date',
      value: 'March 15, 2026',
    },
    {
      icon: Clock,
      label: 'Time',
      value: '8:00 PM WAT',
    },
    {
      icon: MapPin,
      label: 'Venue',
      value: 'Eko Convention Centre',
    },
    {
      icon: Tv,
      label: 'Broadcast',
      value: 'Live Worldwide',
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="w-[80%] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 bg-neutral-900"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-[#6401CF] to-[#FF4350] rounded-full">
                <detail.icon className="w-8 h-8 text-white" />
              </div>
              <div className="font-inter text-xs text-white/40 uppercase tracking-wider mb-2">
                {detail.label}
              </div>
              <div className="font-raleway text-xl font-bold text-white">
                {detail.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountdownSection({ timeLeft }: { timeLeft: any }) {
  return (
    <section className="py-40 px-6 bg-gradient-to-b from-black via-[#6401CF]/10 to-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-raleway text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Countdown to Glory
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-6 sm:gap-12">
          <div className="text-center">
            <div className="font-raleway text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-2 tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="font-inter text-sm text-neutral-500 uppercase tracking-widest">
              <span className="hidden sm:inline">Days</span>
              <span className="sm:hidden">Days</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-raleway text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-2 tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="font-inter text-sm text-neutral-500 uppercase tracking-widest">
              <span className="hidden sm:inline">Hours</span>
              <span className="sm:hidden">Hrs</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-raleway text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-2 tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="font-inter text-sm text-neutral-500 uppercase tracking-widest">
              <span className="hidden sm:inline">Minutes</span>
              <span className="sm:hidden">Min</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-raleway text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-2 tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="font-inter text-sm text-neutral-500 uppercase tracking-widest">
              <span className="hidden sm:inline">Seconds</span>
              <span className="sm:hidden">Sec</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToWatch() {
  const platforms = [
    { name: 'YouTube', logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80' },
    { name: 'Twitter/X', logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&q=80' },
    { name: 'Facebook', logo: 'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=400&q=80' },
    { name: 'Instagram', logo: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&q=80' },
  ];

  return (
    <section className="py-32 px-6 lg:px-12">
      <div className="w-[80%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-raleway text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            How to Watch
          </h2>
          <p className="font-inter text-xl text-white/60">
            Stream live on your favorite platform
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer relative aspect-square overflow-hidden bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-raleway text-2xl font-bold text-white">
                  {platform.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const schedule = [
    { time: '7:00 PM', event: 'Red Carpet' },
    { time: '8:00 PM', event: 'Opening Performance' },
    { time: '8:30 PM', event: 'Awards Ceremony Begins' },
    { time: '10:30 PM', event: 'Closing Performance' },
    { time: '11:00 PM', event: 'After Party' },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-raleway text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            Event Schedule
          </h2>
        </motion.div>

        <div className="space-y-6">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-8 p-6 bg-neutral-900 border-l-4 border-[#6401CF]"
            >
              <div className="font-raleway text-2xl font-bold text-white min-w-[120px]">
                {item.time}
              </div>
              <div className="font-inter text-lg text-white/80">
                {item.event}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCTA() {
  const addToCalendar = () => {
    const eventDetails = {
      text: 'African Music Icon Awards 2026',
      dates: '20260315T200000/20260315T230000',
      details: 'The biggest celebration of African music excellence',
      location: 'Eko Convention Centre, Lagos, Nigeria',
    };

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.text
    )}&dates=${eventDetails.dates}&details=${encodeURIComponent(
      eventDetails.details
    )}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(url, '_blank');
  };

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80"
          alt="Event"
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
            Don't Miss It
          </h2>
          <p className="font-inter text-lg text-white/70 mb-12">
            Add to your calendar and get reminded before the show starts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={addToCalendar}
              className="flex items-center justify-center gap-3 px-12 py-5 bg-white text-black font-inter font-semibold text-lg hover:bg-white/90 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Add to Calendar
            </button>
            <button className="flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-lg hover:opacity-90 transition-opacity">
              <Bell className="w-5 h-5" />
              Set Reminder
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
