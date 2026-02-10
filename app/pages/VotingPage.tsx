import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface VotingPageProps {
  onNavigate: (page: string) => void;
}

const votingCategories = [
  {
    id: 1,
    category: 'Artist of the Year',
    nominees: [
      { id: 1, name: 'Burna Boy', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80' },
      { id: 2, name: 'Wizkid', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80' },
      { id: 3, name: 'Davido', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80' },
      { id: 4, name: 'Tiwa Savage', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80' },
      { id: 5, name: 'Asake', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80' },
    ],
  },
  {
    id: 2,
    category: 'Album of the Year',
    nominees: [
      { id: 6, name: 'Love, Damini', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80' },
      { id: 7, name: 'Made in Lagos', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80' },
      { id: 8, name: 'Timeless', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80' },
      { id: 9, name: 'Work of Art', image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&q=80' },
      { id: 10, name: '19 & Dangerous', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' },
    ],
  },
  {
    id: 3,
    category: 'Song of the Year',
    nominees: [
      { id: 11, name: 'Last Last', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80' },
      { id: 12, name: 'Essence', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80' },
      { id: 13, name: 'Stand Strong', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
      { id: 14, name: 'Terminator', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80' },
      { id: 15, name: 'Rush', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80' },
    ],
  },
  {
    id: 4,
    category: 'Best New Artist',
    nominees: [
      { id: 16, name: 'Asake', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80' },
      { id: 17, name: 'Ayra Starr', image: 'https://images.unsplash.com/photo-1494790778202-cad84cf45f1d?w=600&q=80' },
      { id: 18, name: 'Omah Lay', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
      { id: 19, name: 'Rema', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80' },
      { id: 20, name: 'Black Sherif', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
    ],
  },
];

export function VotingPage({ onNavigate }: VotingPageProps) {
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleVote = (categoryId: number, nomineeId: number) => {
    setVotes((prev) => ({
      ...prev,
      [categoryId]: nomineeId,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(votes).length > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setVotes({});
      }, 3000);
    }
  };

  const totalVotes = Object.keys(votes).length;

  return (
    <div className="min-h-screen dark:bg-black light:bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600&q=80"
            alt="Voting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b dark:from-black/60 dark:to-black light:from-white/60 light:to-white" />
        </div>

        <div className="relative h-full flex items-center justify-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-raleway text-6xl sm:text-7xl lg:text-9xl font-bold text-white mb-6 tracking-tighter">
              Vote
            </h1>
            <p className="font-inter text-xl text-white/70">
              Your voice. Their legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Voting Progress - Sticky */}
      {!submitted && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="sticky top-20 z-40 bg-black/95 backdrop-blur-2xl border-y border-white/5"
        >
          <div className="w-[80%] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <div className="font-inter text-sm text-white/60">
                {totalVotes} of {votingCategories.length} categories selected
              </div>
              {totalVotes > 0 && (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Submit Votes
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-32 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white text-black font-inter font-semibold rounded-full shadow-2xl flex items-center gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          Votes submitted successfully!
        </motion.div>
      )}

      {/* Voting Categories */}
      <section className="py-20 px-6 lg:px-12">
        <div className="w-[80%] mx-auto space-y-24">
          {votingCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Category Title */}
              <div className="mb-10">
                <h2 className="font-raleway text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {category.category}
                </h2>
                <p className="font-inter text-sm text-white/40">
                  Select one nominee
                </p>
              </div>

              {/* Nominees Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {category.nominees.map((nominee) => {
                  const isSelected = votes[category.id] === nominee.id;

                  return (
                    <motion.button
                      key={nominee.id}
                      onClick={() => handleVote(category.id, nominee.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <div
                        className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                          isSelected
                            ? 'ring-4 ring-[#6401CF]'
                            : 'ring-0 ring-transparent'
                        }`}
                      >
                        <img
                          src={nominee.image}
                          alt={nominee.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay */}
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            isSelected
                              ? 'bg-gradient-to-t from-[#6401CF]/80 to-transparent'
                              : 'bg-black/0 group-hover:bg-black/20'
                          }`}
                        />

                        {/* Check Mark */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-[#6401CF]" />
                          </motion.div>
                        )}
                      </div>

                      {/* Name */}
                      <div className="mt-3 text-center">
                        <p
                          className={`font-inter text-sm font-medium transition-colors ${
                            isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'
                          }`}
                        >
                          {nominee.name}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      {totalVotes > 0 && !submitted && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-raleway text-3xl sm:text-4xl font-bold text-white mb-8">
                Ready to Submit?
              </h3>
              <button
                onClick={handleSubmit}
                className="px-16 py-6 bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-inter font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Submit {totalVotes} {totalVotes === 1 ? 'Vote' : 'Votes'}
              </button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

