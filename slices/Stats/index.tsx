import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Stats`.
 */
export type StatsProps = SliceComponentProps<any>;

/**
 * Component for "Stats" Slices.
 */
export default function Stats({ slice }: StatsProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 px-6 dark:bg-black light:bg-white"
    >
      <div className="container mx-auto">
        {slice.items && slice.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {slice.items.map((item: any, index: number) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              >
                {item.icon && (
                  <div className="mb-4 flex justify-center">
                    <PrismicNextImage
                      field={item.icon}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                {item.number && (
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#6401CF] to-[#FF4350] bg-clip-text text-transparent">
                    {item.number}
                  </div>
                )}
                {item.label && (
                  <div className="text-lg dark:text-white/70 light:text-black/70">
                    {item.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

