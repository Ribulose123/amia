import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<any>;

/**
 * Component for "Hero" Slices.
 */
export default function Hero({ slice }: HeroProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      {slice.primary.background_image && (
        <div className="absolute inset-0 z-0">
          <PrismicNextImage
            field={slice.primary.background_image}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {slice.primary.heading && (
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {slice.primary.heading}
          </h1>
        )}

        {slice.primary.subheading && (
          <div className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {slice.primary.primary_button_text && slice.primary.primary_button_link && (
            <PrismicNextLink
              field={slice.primary.primary_button_link}
              className="px-8 py-4 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {slice.primary.primary_button_text}
            </PrismicNextLink>
          )}

          {slice.primary.secondary_button_text && slice.primary.secondary_button_link && (
            <PrismicNextLink
              field={slice.primary.secondary_button_link}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              {slice.primary.secondary_button_text}
            </PrismicNextLink>
          )}
        </div>
      </div>
    </section>
  );
}

