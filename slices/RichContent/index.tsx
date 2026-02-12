import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `RichContent`.
 */
export type RichContentProps = SliceComponentProps<any>;

/**
 * Component for "RichContent" Slices.
 */
export default function RichContent({ slice }: RichContentProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-12 px-6 dark:bg-black light:bg-white"
    >
      <div className="container mx-auto max-w-4xl">
        {slice.primary.content && (
          <div className="prose prose-lg dark:prose-invert max-w-none dark:text-white light:text-black">
            <PrismicRichText field={slice.primary.content} />
          </div>
        )}
      </div>
    </section>
  );
}

