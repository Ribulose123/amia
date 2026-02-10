import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import YouTube from 'react-youtube';
import { useLanguage } from '@/app/context/LanguageContext';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId: string;
  title: string;
}

export function VideoPlayerModal({ isOpen, onClose, youtubeId, title }: VideoPlayerModalProps) {
  const { t } = useLanguage();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
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
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] dark:bg-black/95 light:bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Apple Style */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="absolute -top-12 right-0 lg:-right-12 lg:top-0 z-10 w-10 h-10 rounded-full dark:bg-white/10 light:bg-white/20 backdrop-blur-md flex items-center justify-center dark:hover:bg-white/20 light:hover:bg-white/30 transition-all duration-300"
              >
                <X className="w-5 h-5 dark:text-white light:text-white" />
              </motion.button>

              {/* Video Container */}
              <div className="relative w-full bg-black rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                {/* 16:9 Aspect Ratio */}
                <div className="relative w-full pt-[56.25%]">
                  <div className="absolute inset-0">
                    <YouTube
                      videoId={youtubeId}
                      opts={opts}
                      className="w-full h-full"
                      iframeClassName="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Video Title - Below player on mobile, subtle */}
              {title && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center"
                >
                  <h3 className="font-raleway text-lg lg:text-xl font-semibold dark:text-white light:text-white">
                    {title}
                  </h3>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
