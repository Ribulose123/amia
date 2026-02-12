import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ImageGallery`.
 */
export type ImageGalleryProps = SliceComponentProps<any>;

/**
 * Component for "ImageGallery" Slices.
 */
export default function ImageGallery({ slice }: ImageGalleryProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 px-6 dark:bg-black light:bg-white"
    >
      <div className="container mx-auto">
        {slice.primary.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white light:text-black">
            {slice.primary.title}
          </h2>
        )}

        {slice.items && slice.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slice.items.map((item: any, index: number) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                {item.image && (
                  <PrismicNextImage
                    field={item.image}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm">{item.caption}</p>
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

