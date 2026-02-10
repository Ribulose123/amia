import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Info, Play, X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MusicPlatformModal } from '@/components/MusicPlatformModal';

interface NomineesPageProps {
  onNavigate: (page: string) => void;
}

const nominees = [
  {
    id: 1,
    name: 'Burna Boy',
    category: 'Artist of the Year',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    genre: 'Afrobeats',
    songTitle: 'Last Last',
    album: 'Love, Damini',
    producer: 'Chopstix',
    releaseDate: 'May 13, 2022',
    label: 'Atlantic Records',
    duration: '2:47',
    writers: 'Damini Ogulu, Toni Braxton, Kenneth Edmonds',
    descriptionKey: 'nominee.burnaboy.desc',
  },
  {
    id: 2,
    name: 'Tiwa Savage',
    category: 'Artist of the Year',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    genre: 'Afrobeats',
    songTitle: 'Somebody\'s Son',
    album: 'Water & Garri',
    producer: 'P2J',
    releaseDate: 'December 3, 2021',
    label: 'Motown Records',
    duration: '3:21',
    writers: 'Tiwa Savage, P2J, Brandy Norwood',
    descriptionKey: 'nominee.tiwasavage.desc',
  },
  {
    id: 3,
    name: 'Wizkid',
    category: 'Artist of the Year',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    genre: 'Afrobeats',
    songTitle: 'Essence',
    album: 'Made in Lagos',
    producer: 'Legendury Beatz, P2J',
    releaseDate: 'October 30, 2020',
    label: 'Starboy Entertainment',
    duration: '4:07',
    writers: 'Ayodeji Balogun, Temilade Openiyi',
    descriptionKey: 'nominee.wizkid.desc',
  },
  {
    id: 4,
    name: 'Tems',
    category: 'Best Female Artist',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    genre: 'R&B/Soul',
    songTitle: 'Free Mind',
    album: 'If Orange Was A Place (EP)',
    producer: 'Spax',
    releaseDate: 'September 15, 2021',
    label: 'Since \'93 / RCA Records',
    duration: '3:07',
    writers: 'Temilade Openiyi, Uzezi Oniko',
    descriptionKey: 'nominee.tems.desc',
  },
  {
    id: 5,
    name: 'Davido',
    category: 'Artist of the Year',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    genre: 'Afrobeats',
    songTitle: 'Stand Strong',
    album: 'Timeless',
    producer: 'Magicsticks, Rage',
    releaseDate: 'March 31, 2023',
    label: 'Davido Music Worldwide',
    duration: '3:18',
    writers: 'David Adeleke, Sunday Ginikachukwu',
    descriptionKey: 'nominee.davido.desc',
  },
  {
    id: 6,
    name: 'Asake',
    category: 'Best New Artist',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    genre: 'Afrobeats',
    songTitle: 'Terminator',
    album: 'Work of Art',
    producer: 'Magicsticks',
    releaseDate: 'June 14, 2023',
    label: 'YBNL Nation / Empire',
    duration: '3:33',
    writers: 'Ahmed Ololade, Magicsticks',
    descriptionKey: 'nominee.asake.desc',
  },
];

export function NomineesPage({ onNavigate }: NomineesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedNominee, setSelectedNominee] = useState<typeof nominees[0] | null>(null);
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<{ artist: string; track?: string } | null>(null);
  const { t } = useLanguage();

  const handlePlayClick = (artistName: string, trackName?: string) => {
    setSelectedTrack({ artist: artistName, track: trackName });
    setPlatformModalOpen(true);
  };

  const categories = [
    'all',
    'Artist of the Year',
    'Best Male Artist',
    'Best Female Artist',
    'Best New Artist',
  ];

  // Helper function to translate categories
  const translateCategory = (category: string) => {
    const categoryMap: Record<string, string> = {
      'all': t('nominees.allNominees'),
      'Artist of the Year': t('category.artistOfTheYear'),
      'Best Male Artist': t('category.bestMale'),
      'Best Female Artist': t('category.bestFemale'),
      'Best New Artist': t('category.bestNew'),
    };
    return categoryMap[category] || category;
  };

  const filteredNominees =
    selectedCategory === 'all'
      ? nominees
      : nominees.filter((n) => n.category === selectedCategory);

  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section - Minimal */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1709731191876-899e32264420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY4NTQ5NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Nominees Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 dark:bg-black/50 light:bg-white/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black dark:to-black light:to-white" />
        </div>

        <div className="relative h-full flex items-center justify-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl"
          >
            <h1 className="font-raleway text-4xl sm:text-6xl lg:text-8xl font-bold dark:text-white light:text-black mb-4 lg:mb-6 leading-tight">
              {t('nominees.title')}
            </h1>
            <p className="font-inter text-base lg:text-xl text-white/70">
              {t('nominees.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter - Apple Style Segmented Control */}
      <section className="sticky top-20 z-40 py-4 lg:py-6 dark:bg-black/80 light:bg-white/80 backdrop-blur-2xl border-b dark:border-white/[0.08] light:border-black/[0.08]">
        <div className="max-w-full lg:max-w-[80%] mx-auto">
          {/* Mobile: Horizontal scroll with padding, Desktop: Centered */}
          <div className="relative">
            {/* Gradient fade on left - mobile only */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r dark:from-black/80 light:from-white/80 to-transparent z-10 pointer-events-none lg:hidden" />
            
            {/* Gradient fade on right - mobile only */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l dark:from-black/80 light:from-white/80 to-transparent z-10 pointer-events-none lg:hidden" />
            
            <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2 px-4 lg:px-0 scrollbar-hide snap-x snap-mandatory lg:snap-none lg:justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileTap={{ scale: 0.96 }}
                  className={`font-inter text-[13px] lg:text-sm font-semibold whitespace-nowrap transition-all duration-300 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full snap-center lg:snap-align-none relative overflow-hidden flex-shrink-0 ${
                    selectedCategory === category
                      ? 'dark:text-white light:text-white shadow-lg scale-[1.02]'
                      : 'dark:text-white/60 light:text-black/60 dark:hover:text-white light:hover:text-black dark:bg-white/[0.08] light:bg-black/[0.06] dark:hover:bg-white/[0.12] light:hover:bg-black/[0.1] backdrop-blur-sm'
                  }`}
                >
                  {/* Active state gradient background */}
                  {selectedCategory === category && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-[#6401CF] to-[#FF4350]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Text */}
                  <span className="relative z-10">
                    {translateCategory(category)}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nominees Grid - Visual First */}
      <section className="py-12 lg:py-20 px-4 lg:px-12">
        <div className="max-w-full lg:max-w-[80%] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
            {filteredNominees.map((nominee, index) => (
              <motion.div
                key={nominee.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(nominee.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer relative overflow-hidden bg-neutral-900"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={nominee.image}
                    alt={nominee.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Strong Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/70 light:from-white light:via-white/70 to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#6401CF]/0 group-hover:bg-[#6401CF]/20 transition-colors duration-500" />
                  
                  {/* Genre Badge - Top */}
                  <div className="absolute top-2 lg:top-4 left-2 lg:left-4 right-2 lg:right-4">
                    <span className="inline-block px-2 lg:px-3 py-1 dark:bg-black/60 light:bg-white/60 backdrop-blur-sm dark:text-white/90 light:text-black/90 font-inter text-[10px] lg:text-xs uppercase tracking-wider dark:border-white/10 light:border-black/10 border">
                      {nominee.genre}
                    </span>
                  </div>

                  {/* Info - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-6 bg-gradient-to-t dark:from-black light:from-white to-transparent">
                    <h3 className="font-raleway text-base lg:text-2xl xl:text-3xl font-bold dark:text-white light:text-black mb-1 lg:mb-2 leading-tight">
                      {nominee.name}
                    </h3>
                    <p className="font-inter text-[10px] lg:text-sm dark:text-white/80 light:text-black/80 line-clamp-2">
                      {nominee.category}
                    </p>
                  </div>

                  {/* Info Button - Bottom Left */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: hoveredId === nominee.id ? 1 : 0,
                      scale: hoveredId === nominee.id ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNominee(nominee);
                    }}
                    className="absolute bottom-3 left-3 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 dark:bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/50 hover:scale-110 transition-transform duration-200"
                  >
                    <Info className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                  </motion.button>

                  {/* Play Button - Bottom Right (Grammy Style) */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: hoveredId === nominee.id ? 1 : 0,
                      scale: hoveredId === nominee.id ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayClick(nominee.name, nominee.songTitle);
                    }}
                    className="absolute bottom-3 right-3 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 dark:bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/50 hover:scale-110 transition-transform duration-200"
                  >
                    <Play className="w-4 h-4 lg:w-5 lg:h-5 text-black fill-black ml-0.5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nominee Details Modal */}
      <AnimatePresence>
        {selectedNominee && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNominee(null)}
              className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto dark:bg-neutral-900/95 light:bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border dark:border-white/10 light:border-black/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedNominee(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm text-white hover:bg-black hover:scale-110 transition-all flex items-center justify-center border border-white/30 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col lg:flex-row">
                  {/* Image Side */}
                  <div className="lg:w-2/5 relative">
                    <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden lg:rounded-l-2xl">
                      <img
                        src={selectedNominee.image}
                        alt={selectedNominee.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      {/* Artist Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm font-inter text-xs uppercase tracking-wider border border-white/30 rounded-full" style={{ color: 'white' }}>
                            {selectedNominee.genre}
                          </span>
                        </div>
                        <h2 className="font-raleway text-3xl lg:text-4xl font-bold mb-2 leading-tight" style={{ color: 'white' }}>
                          {selectedNominee.name}
                        </h2>
                        <p className="font-inter text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {selectedNominee.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="lg:w-3/5 p-6 lg:p-8">
                    {/* Song/Album Title */}
                    <div className="mb-6">
                      <h3 className="font-raleway text-2xl lg:text-3xl font-bold dark:text-white light:text-black mb-2 leading-tight">
                        {selectedNominee.songTitle}
                      </h3>
                      <p className="font-inter text-base dark:text-white/60 light:text-black/60">
                        {selectedNominee.album}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.producer')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.producer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.writers')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.writers}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.label')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.label}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.released')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.releaseDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40">
                            {t('modal.duration')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-inter text-sm dark:text-white light:text-black">
                            {selectedNominee.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="pt-4 border-t dark:border-white/10 light:border-black/10">
                      <p className="font-inter text-sm lg:text-base dark:text-white/70 light:text-black/70 leading-relaxed">
                        {t(selectedNominee.descriptionKey)}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-6 border-t dark:border-white/10 light:border-black/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayClick(selectedNominee.name, selectedNominee.songTitle);
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-sm rounded-full hover:opacity-90 transition-opacity"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>{t('modal.playTrack')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-40 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1600&q=80"
            alt="Vote"
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
            <h2 className="font-raleway text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              {t('nominees.supportTitle')}
            </h2>
            <button
              disabled
              className="px-8 lg:px-12 py-3 lg:py-5 bg-neutral-800 text-neutral-500 font-inter font-semibold text-sm lg:text-lg cursor-not-allowed opacity-60"
              title="Voting opens soon"
            >
              {t('nav.vote')}
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Music Platform Modal */}
      <MusicPlatformModal
        isOpen={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        artistName={selectedTrack?.artist}
        trackName={selectedTrack?.track}
      />
    </div>
  );
}

