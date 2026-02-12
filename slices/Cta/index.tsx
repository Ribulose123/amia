import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Cta`.
 */
export type CtaProps = SliceComponentProps<any>;

/**
 * Component for "Cta" Slices.
 */
export default function Cta({ slice }: CtaProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 px-6 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white"
    >
      <div className="container mx-auto max-w-4xl text-center">
        {slice.primary.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {slice.primary.title}
          </h2>
        )}

        {slice.primary.description && (
          <div className="mb-8 text-lg opacity-90">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}

        {slice.primary.button_text && slice.primary.button_link && (
          <PrismicNextLink
            field={slice.primary.button_link}
            className="inline-block px-8 py-4 bg-white text-[#6401CF] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {slice.primary.button_text}
          </PrismicNextLink>
        )}
      </div>
    </section>
  );
}

