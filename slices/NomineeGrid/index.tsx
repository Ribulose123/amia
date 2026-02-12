import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useNavigation } from "@/src/lib/useNavigation";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * Props for `NomineeGrid`.
 */
export type NomineeGridProps = SliceComponentProps<any>;

/**
 * Component for "NomineeGrid" Slices.
 */
export default function NomineeGrid({ slice }: NomineeGridProps) {
  const { t } = useLanguage();
  // Note: lang should be passed from parent or extracted from context
  // For now, using default navigation
  const onNavigate = useNavigation('en'); // This should be dynamic based on locale

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 px-6 dark:bg-black light:bg-white"
    >
      <div className="container mx-auto">
        {slice.primary.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center dark:text-white light:text-black">
            {slice.primary.title}
          </h2>
        )}

        {slice.primary.description && (
          <div className="text-center mb-12 max-w-2xl mx-auto dark:text-white/70 light:text-black/70">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}

        {slice.items && slice.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slice.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {item.nominee?.data?.photo && (
                  <PrismicNextImage
                    field={item.nominee.data.photo}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  {item.nominee?.data?.name && (
                    <h3 className="text-xl font-bold mb-2 dark:text-white light:text-black">
                      {item.nominee.data.name}
                    </h3>
                  )}
                  {item.nominee?.data?.nominated_for && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {item.nominee.data.nominated_for}
                    </p>
                  )}
                  {item.nominee?.uid && (
                    <PrismicNextLink
                      href={`/nominees/${item.nominee.uid}`}
                      className="text-[#6401CF] hover:underline font-semibold"
                    >
                      {t('common.viewDetails') || 'View Details'} →
                    </PrismicNextLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

