// African Music Icon Awards - Mock Data

export interface Artist {
  id: string;
  name: string;
  country: string;
  genre: string;
  image: string;
  bio: string;
  achievements: string[];
  socialMedia: {
    spotify?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  icon: string;
  nominees?: string[]; // Artist IDs
}

export interface Winner {
  year: number;
  category: string;
  artist: string;
  videoUrl?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver';
  logo: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface LegendaryArtist {
  id: string;
  name: string;
  country: string;
  yearInducted: number;
  image: string;
  bio: string;
  quote: string;
  achievements: string[];
}

export const categories: Category[] = [
  {
    id: 'aoty',
    name: 'Album of the Year',
    description: 'Recognizing the most outstanding album released in the past year',
    eligibility: 'Albums released between Jan 1 - Dec 31 of the award year',
    icon: 'disc',
  },
  {
    id: 'artist',
    name: 'Artist of the Year',
    description: 'Celebrating the artist with the most significant impact and achievement',
    eligibility: 'Active artists with releases in the award year',
    icon: 'award',
  },
  {
    id: 'song',
    name: 'Song of the Year',
    description: 'Honoring the most popular and impactful single',
    eligibility: 'Singles released in the award year',
    icon: 'music',
  },
  {
    id: 'new-artist',
    name: 'Best New Artist',
    description: 'Celebrating breakthrough talent',
    eligibility: 'Artists with their first major release in the past 2 years',
    icon: 'star',
  },
  {
    id: 'afrobeats',
    name: 'Best Afrobeats',
    description: 'Excellence in Afrobeats music',
    eligibility: 'Afrobeats songs or albums released in the award year',
    icon: 'drum',
  },
  {
    id: 'hiphop',
    name: 'Best Hip Hop',
    description: 'Outstanding Hip Hop performance',
    eligibility: 'Hip Hop songs or albums released in the award year',
    icon: 'mic',
  },
  {
    id: 'gospel',
    name: 'Best Gospel',
    description: 'Excellence in Gospel music',
    eligibility: 'Gospel songs or albums released in the award year',
    icon: 'heart',
  },
  {
    id: 'video',
    name: 'Best Music Video',
    description: 'Excellence in visual storytelling',
    eligibility: 'Music videos released in the award year',
    icon: 'video',
  },
  {
    id: 'collaboration',
    name: 'Best Collaboration',
    description: 'Outstanding collaborative performance',
    eligibility: 'Songs featuring multiple artists',
    icon: 'users',
  },
  {
    id: 'producer',
    name: 'Producer of the Year',
    description: 'Recognizing excellence in music production',
    eligibility: 'Producers with releases in the award year',
    icon: 'headphones',
  },
  {
    id: 'female',
    name: 'Best Female Artist',
    description: 'Outstanding female artist',
    eligibility: 'Female artists with releases in the award year',
    icon: 'user',
  },
  {
    id: 'male',
    name: 'Best Male Artist',
    description: 'Outstanding male artist',
    eligibility: 'Male artists with releases in the award year',
    icon: 'user',
  },
];

export const artists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Amara Celestine',
    country: 'Nigeria',
    genre: 'Afrobeats',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Multi-award winning Afrobeats sensation known for chart-topping hits and electrifying performances.',
    achievements: ['3x AMIA Winner', '50M+ Streams', 'International Tours'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 'artist-2',
    name: 'Kwame Storm',
    country: 'Ghana',
    genre: 'Hip Hop',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Lyrical genius bringing authentic African hip hop to the global stage.',
    achievements: ['Best Hip Hop 2025', '100M+ Views', 'Platinum Album'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
    },
  },
  {
    id: 'artist-3',
    name: 'Zanele Harmony',
    country: 'South Africa',
    genre: 'Gospel',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
    bio: 'Soulful voice inspiring millions across the continent with uplifting gospel music.',
    achievements: ['2x Gospel Artist', 'Worship Leader', '20M+ Streams'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 'artist-4',
    name: 'Ibrahim Waves',
    country: 'Kenya',
    genre: 'Afrobeats',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    bio: 'East African sensation blending traditional sounds with modern Afrobeats.',
    achievements: ['Rising Star 2025', 'Sold Out Shows', '30M+ Streams'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
    },
  },
  {
    id: 'artist-5',
    name: 'Chiamaka Divine',
    country: 'Nigeria',
    genre: 'Afro-Soul',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bio: 'Mesmerizing vocalist known for powerful ballads and emotional depth.',
    achievements: ['Best Female Artist', 'Voice of Africa', '40M+ Streams'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 'artist-6',
    name: 'Tendai Rhythm',
    country: 'Zimbabwe',
    genre: 'Afro-Pop',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Dynamic performer bringing Zimbabwe to the forefront of African pop music.',
    achievements: ['Best New Artist', 'Chart Topper', '25M+ Streams'],
    socialMedia: {
      spotify: '#',
    },
  },
  {
    id: 'artist-7',
    name: 'Nia Starlight',
    country: 'Tanzania',
    genre: 'Bongo Flava',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
    bio: 'Queen of Bongo Flava with infectious rhythms and captivating stage presence.',
    achievements: ['3x East African Winner', 'Global Tours', '60M+ Streams'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
      twitter: '#',
    },
  },
  {
    id: 'artist-8',
    name: 'Malik Thunder',
    country: 'Senegal',
    genre: 'Hip Hop',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    bio: 'Pioneering Senegalese rapper pushing boundaries with conscious lyrics.',
    achievements: ['Best Rap Album', 'Cultural Ambassador', '35M+ Streams'],
    socialMedia: {
      spotify: '#',
      instagram: '#',
    },
  },
];

export const winners: Winner[] = [
  { year: 2025, category: 'Artist of the Year', artist: 'Amara Celestine' },
  { year: 2025, category: 'Album of the Year', artist: 'Kwame Storm' },
  { year: 2025, category: 'Best Afrobeats', artist: 'Ibrahim Waves' },
  { year: 2025, category: 'Best Female Artist', artist: 'Chiamaka Divine' },
  { year: 2024, category: 'Artist of the Year', artist: 'Nia Starlight' },
  { year: 2024, category: 'Best Hip Hop', artist: 'Malik Thunder' },
  { year: 2024, category: 'Best Gospel', artist: 'Zanele Harmony' },
  { year: 2023, category: 'Artist of the Year', artist: 'Kwame Storm' },
];

export const legends: LegendaryArtist[] = [
  {
    id: 'legend-1',
    name: 'Fela Kuti',
    country: 'Nigeria',
    yearInducted: 2020,
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500',
    bio: 'Pioneer of Afrobeat music and human rights activist whose revolutionary sound changed African music forever.',
    quote: 'Music is the weapon of the future.',
    achievements: [
      'Pioneer of Afrobeat Genre',
      'Human Rights Activist',
      '70+ Albums',
      'Global Icon',
    ],
  },
  {
    id: 'legend-2',
    name: 'Miriam Makeba',
    country: 'South Africa',
    yearInducted: 2021,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
    bio: 'Mama Africa - the voice of freedom who brought African music to the world stage.',
    quote: 'I kept my culture. I kept the music of my roots.',
    achievements: [
      'Grammy Award Winner',
      'UN Goodwill Ambassador',
      'Civil Rights Icon',
      '30+ Studio Albums',
    ],
  },
  {
    id: 'legend-3',
    name: 'Youssou N\'Dour',
    country: 'Senegal',
    yearInducted: 2022,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
    bio: 'Senegalese singing icon who popularized mbalax and brought African music to international prominence.',
    quote: 'I respect music, I do what I think is better.',
    achievements: [
      'Grammy Award Winner',
      'UNESCO Artist for Peace',
      '40+ Year Career',
      'International Superstar',
    ],
  },
];

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'AfriBank',
    tier: 'platinum',
    logo: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=300',
    description: 'Banking on African excellence',
  },
  {
    id: 'sponsor-2',
    name: 'Savanna Energy',
    tier: 'platinum',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300',
    description: 'Powering African creativity',
  },
  {
    id: 'sponsor-3',
    name: 'Ubuntu Telecom',
    tier: 'gold',
    logo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300',
    description: 'Connecting Africa',
  },
  {
    id: 'sponsor-4',
    name: 'Kente Fashion',
    tier: 'gold',
    logo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300',
    description: 'Style meets heritage',
  },
  {
    id: 'sponsor-5',
    name: 'Sahara Airlines',
    tier: 'silver',
    logo: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=300',
    description: 'Flying African dreams',
  },
];

export const news: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'AMIA 2026 Nominations Open: Celebrating Excellence in African Music',
    excerpt: 'The African Music Icon Awards opens nominations for the 2026 edition, inviting artists across the continent to submit their work.',
    content: 'Full article content...',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    date: '2026-01-10',
    author: 'Chioma Adeleke',
  },
  {
    id: 'news-2',
    title: 'Record-Breaking Voting Numbers as Fans Rally Behind Favorites',
    excerpt: 'Over 5 million votes cast in the first week as African music fans show unprecedented engagement.',
    content: 'Full article content...',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    date: '2026-01-08',
    author: 'Kwame Asante',
  },
  {
    id: 'news-3',
    title: 'Behind the Scenes: Preparing for the Biggest Night in African Music',
    excerpt: 'An exclusive look at the preparations for the 2026 AMIA ceremony.',
    content: 'Full article content...',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    date: '2026-01-05',
    author: 'Amina Hassan',
  },
];

export const eventSchedule = [
  { time: '18:00', event: 'Red Carpet Opens', description: 'Celebrities arrive in style' },
  { time: '19:30', event: 'Pre-Show Performance', description: 'Special opening acts' },
  { time: '20:00', event: 'Main Ceremony Begins', description: 'Awards presentation starts' },
  { time: '20:30', event: 'First Award Category', description: 'Best New Artist reveal' },
  { time: '21:00', event: 'Special Tribute', description: 'Honoring African legends' },
  { time: '22:00', event: 'Artist of the Year', description: 'The most anticipated award' },
  { time: '22:30', event: 'Closing Performance', description: 'All-star finale' },
];

export const awardNightDate = new Date('2026-03-15T20:00:00');

export const aboutAMIA = {
  mission: 'To celebrate, promote, and preserve the excellence of African music and its creators, while fostering unity and cultural pride across the continent.',
  vision: 'To be the most prestigious and authoritative music awards ceremony in Africa, setting the global standard for recognizing African musical talent.',
  values: [
    'Excellence in artistry and performance',
    'Integrity and transparency in voting',
    'Cultural authenticity and pride',
    'Unity across African nations',
    'Innovation in music and production',
  ],
  history: 'Founded in 2018, the African Music Icon Awards (AMIA) has quickly become the most prestigious celebration of African musical excellence. What started as a vision to unite and celebrate Africa\'s diverse musical heritage has grown into a continental phenomenon, bringing together artists, fans, and industry leaders from across all 54 African nations.',
};
