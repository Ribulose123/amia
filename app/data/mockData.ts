export interface Nominee {
  id: string;
  name: string;
  category: string;
  country: string;
  genre: string;
  image: string;
  achievements: string[];
  votes?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Winner {
  id: string;
  name: string;
  category: string;
  year: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Artist of the Year',
    description: 'Celebrating the most outstanding artist across all genres',
    icon: 'trophy'
  },
  {
    id: '2',
    name: 'Song of the Year',
    description: 'The most impactful and memorable song of the year',
    icon: 'music'
  },
  {
    id: '3',
    name: 'Best New Artist',
    description: 'Recognizing breakthrough talent making their mark',
    icon: 'star'
  },
  {
    id: '4',
    name: 'Best Afrobeats',
    description: 'Excellence in Afrobeats music and performance',
    icon: 'disc'
  },
  {
    id: '5',
    name: 'Best Hip-Hop/Rap',
    description: 'Outstanding achievements in Hip-Hop and Rap',
    icon: 'mic'
  },
  {
    id: '6',
    name: 'Best R&B/Soul',
    description: 'Celebrating soulful and R&B excellence',
    icon: 'heart'
  }
];

export const nominees: Nominee[] = [
  {
    id: '1',
    name: 'Burna Boy',
    category: 'Artist of the Year',
    country: 'Nigeria',
    genre: 'Afrobeats',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    achievements: ['Grammy Winner', '5x Platinum Albums', 'Global Tours'],
    votes: 45230
  },
  {
    id: '2',
    name: 'Wizkid',
    category: 'Artist of the Year',
    country: 'Nigeria',
    genre: 'Afrobeats',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
    achievements: ['Grammy Winner', 'Billboard Chart-topper', 'International Collaborations'],
    votes: 43120
  },
  {
    id: '3',
    name: 'Tems',
    category: 'Best New Artist',
    country: 'Nigeria',
    genre: 'R&B/Afrobeats',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    achievements: ['Grammy Winner', 'Oscar Nomination', 'Global Breakthrough'],
    votes: 38750
  },
  {
    id: '4',
    name: 'Black Sherif',
    category: 'Best New Artist',
    country: 'Ghana',
    genre: 'Hip-Hop',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    achievements: ['Viral Sensation', 'Chart-topping Singles', 'Youth Icon'],
    votes: 32100
  },
  {
    id: '5',
    name: 'Asake',
    category: 'Song of the Year',
    country: 'Nigeria',
    genre: 'Afrobeats',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    achievements: ['Streaming Records', 'Hit Singles', 'Rising Star'],
    votes: 41200
  },
  {
    id: '6',
    name: 'Ayra Starr',
    category: 'Best R&B/Soul',
    country: 'Nigeria',
    genre: 'R&B/Afrobeats',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    achievements: ['International Recognition', 'Chart Success', 'Rising Icon'],
    votes: 35890
  }
];

export const pastWinners: Winner[] = [
  {
    id: '1',
    name: 'Burna Boy',
    category: 'Artist of the Year',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  },
  {
    id: '2',
    name: 'Wizkid',
    category: 'Artist of the Year',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400'
  }
];

export const eventDate = new Date('2026-03-15T20:00:00');
