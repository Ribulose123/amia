'use client';

import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { useState, useEffect } from "react";

/**
 * Props for `Countdown`.
 */
export type CountdownProps = SliceComponentProps<any>;

/**
 * Component for "Countdown" Slices - AMIA specific countdown timer
 */
export default function Countdown({ slice }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!slice.primary.event_date) return;

    const eventDate = new Date(slice.primary.event_date).getTime();

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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [slice.primary.event_date]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 px-6 dark:bg-black light:bg-white"
    >
      <div className="container mx-auto max-w-4xl text-center">
        {slice.primary.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white light:text-black">
            {slice.primary.title}
          </h2>
        )}

        {slice.primary.description && (
          <div className="mb-12 dark:text-white/70 light:text-black/70">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#6401CF] to-[#FF4350] text-white p-6 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.days}</div>
            <div className="text-sm uppercase">Days</div>
          </div>
          <div className="bg-gradient-to-br from-[#6401CF] to-[#FF4350] text-white p-6 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.hours}</div>
            <div className="text-sm uppercase">Hours</div>
          </div>
          <div className="bg-gradient-to-br from-[#6401CF] to-[#FF4350] text-white p-6 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.minutes}</div>
            <div className="text-sm uppercase">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-[#6401CF] to-[#FF4350] text-white p-6 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.seconds}</div>
            <div className="text-sm uppercase">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  );
}

