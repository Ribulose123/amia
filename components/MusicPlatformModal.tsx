import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface MusicPlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName?: string;
  trackName?: string;
}

export function MusicPlatformModal({ isOpen, onClose, artistName, trackName }: MusicPlatformModalProps) {
  const { t } = useLanguage();
  
  const platforms = [
    {
      name: 'Spotify',
      logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      color: 'from-[#1DB954] to-[#1ed760]',
      url: '#'
    },
    {
      name: 'Apple Music',
      logo: 'https://images.unsplash.com/photo-1722665600826-f054f8fe6f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      color: 'from-[#FA243C] to-[#fc3c4c]',
      url: '#'
    },
    {
      name: 'YouTube Music',
      logo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      color: 'from-[#FF0000] to-[#ff0033]',
      url: '#'
    },
    {
      name: 'Amazon Music',
      logo: 'https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      color: 'from-[#00A8E1] to-[#00c3ff]',
      url: '#'
    },
    {
      name: 'Tidal',
      logo: 'https://images.unsplash.com/photo-1551817958-795f9440ce4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      color: 'from-[#000000] to-[#1a1a1a]',
      url: '#'
    },
    {
      name: 'Deezer',
      logo: 'https://images.unsplash.com/photo-1622651132634-a7ed1fbb86dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      color: 'from-[#FF0092] to-[#ff33ab]',
      url: '#'
    },
  ];

  const handlePlatformClick = (platform: typeof platforms[0]) => {
    // In production, this would open the actual music platform URL
    console.log(`Opening ${platform.name} for ${artistName} - ${trackName}`);
    // Simulate opening a new tab
    window.open(platform.url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Bottom Sheet Modal - Apple Style */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 400,
              mass: 1
            }}
            className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto max-w-2xl"
          >
            <div className="dark:bg-neutral-900/95 light:bg-white/95 backdrop-blur-2xl border-t dark:border-white/10 light:border-black/10 rounded-t-3xl shadow-2xl">
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 dark:bg-white/30 light:bg-black/30 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b dark:border-white/10 light:border-black/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-raleway text-xl lg:text-2xl font-bold dark:text-white light:text-black">
                      {t('platform.modal.title') || 'Listen Now'}
                    </h3>
                    {(artistName || trackName) && (
                      <p className="font-inter text-sm dark:text-white/60 light:text-black/60 mt-1">
                        {artistName} {trackName && `• ${trackName}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full dark:bg-white/10 light:bg-black/10 dark:hover:bg-white/20 light:hover:bg-black/20 flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-4 h-4 dark:text-white light:text-black" />
                  </button>
                </div>
              </div>

              {/* Platform Grid */}
              <div className="p-6">
                <p className="font-inter text-xs uppercase tracking-wider dark:text-white/40 light:text-black/40 mb-4">
                  {t('platform.modal.subtitle') || 'Choose Your Platform'}
                </p>
                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                  {platforms.map((platform, index) => (
                    <motion.button
                      key={platform.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handlePlatformClick(platform)}
                      className="group relative overflow-hidden rounded-2xl dark:bg-white/5 light:bg-black/5 dark:hover:bg-white/10 light:hover:bg-black/10 border dark:border-white/10 light:border-black/10 p-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {/* Gradient Overlay on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Logo */}
                      <div className="relative flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden dark:bg-white/10 light:bg-black/10 flex items-center justify-center">
                          <img
                            src={platform.logo}
                            alt={platform.name}
                            className="w-10 h-10 lg:w-12 lg:h-12 object-contain dark:opacity-80 light:opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        
                        {/* Platform Name */}
                        <span className="font-inter text-xs lg:text-sm font-medium dark:text-white/70 light:text-black/70 dark:group-hover:text-white light:group-hover:text-black transition-colors duration-300 text-center">
                          {platform.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Safe Area Bottom Padding */}
              <div className="h-8 lg:h-4" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
