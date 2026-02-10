"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.nominees': 'Nominees',
    'nav.winners': 'Winners',
    'nav.news': 'News & Updates',
    'nav.about': 'About',
    'nav.hallOfFame': 'Hall of Fame',
    'nav.vote': 'Vote • Coming Soon',
    
    // Hero
    'hero.tagline': "Celebrating Africa's finest musical talent on the world stage",
    'hero.date': 'March 15, 2026 • Lagos, Nigeria',
    
    // Stats
    'stats.nominees': 'Nominees',
    'stats.categories': 'Categories',
    'stats.countries': 'Countries',
    'stats.inductees': 'Inductees',
    'stats.totalAwards': 'Total Awards',
    'stats.yearsActive': 'Years Active',
    
    // Countdown
    'countdown.title': 'The Countdown Begins',
    'countdown.eventCountdown': 'Event Countdown',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Seconds',
    'countdown.viewNominees': 'View Nominees',
    'countdown.setReminder': 'Set Reminder',
    
    // Interludes
    'interlude.celebrating': "Celebrating Africa's Finest",
    'interlude.oneNight': 'One Night. Infinite Talent.',
    
    // Categories
    'categories.title': 'Categories',
    'categories.subtitle': 'Celebrating Excellence Across All Genres',
    'categories.description': 'From Afrobeats to Gospel, discover the diverse range of musical excellence recognized at AMIA',
    'categories.viewAll': 'View all categories',
    'categories.afrobeats': 'Afrobeats',
    'categories.hiphop': 'Hip Hop',
    'categories.rnb': 'R&B',
    'categories.gospel': 'Gospel',
    'categories.allCategories': 'All Categories',
    'categories.general': 'General',
    'categories.genreSpecific': 'Genre Specific',
    'categories.awardsText': 'awards celebrating African music excellence',
    'categories.nominees': 'Nominees',
    'categories.viewNominees': 'View Nominees',
    'categories.voteTitle': 'Vote for Your Favorites',
    'categories.voteDescription': 'Your voice matters. Support the artists who inspire you.',
    'categories.voteComingSoon': 'Vote • Coming Soon',
    
    // HomePage specific
    'home.categoriesTitle': 'Categories',
    'home.viewAllCategories': 'View all categories',
    'home.topNominees': 'Top Nominees',
    'home.topNomineesDescription': "Meet some of this year's most nominated artists across all categories",
    'home.noms': 'Noms',
    'home.viewAllNominees': 'View All Nominees',
    'home.nomineesShowcaseTitle': '2026 Nominees',
    'home.nomineesShowcaseDescription': 'Over 100 exceptional artists nominated across 50 categories, representing the pinnacle of African musical excellence and creativity.',
    'home.exploreAllNominees': 'Explore All Nominees',
    'home.latestNews': 'Latest News',
    'home.latestNewsDescription': 'Stay updated with the latest news and announcements from AMI 2026',
    'home.viewAllNews': 'View All News',
    'home.news1Title': 'AMI 2026 Announces Nominees',
    'home.news1Date': 'March 10, 2026',
    'home.news2Title': 'Exclusive: Behind the Scenes',
    'home.news2Date': 'March 8, 2026',
    'home.news3Title': 'Meet the Jury Panel',
    'home.news3Date': 'March 5, 2026',
    'home.hallOfFame': 'Hall of Fame',
    'home.hallOfFameDescription': 'Honoring the legends who shaped the sound of Africa',
    'home.viewAllLegends': 'View All Legends',
    'home.exploreLegacy': 'Explore Legacy',
    'home.hallOfFamePreview': 'Hall of Fame Preview',
    'home.iconicLegends': 'Iconic Legends',
    'home.discoverMore': 'Discover More',
    'home.finalCTATitle': 'Be Part of the Moment',
    'home.finalCTADescription': 'Experience African musical excellence live',
    'home.getTickets': 'Get Tickets',
    'home.exploreNominees': 'Explore Nominees',
    'home.voteComingSoon': 'Vote • Coming Soon',
    
    // Partners
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Trusted by industry leaders',
    
    // Platform Modal
    'platform.modal.title': 'Listen Now',
    'platform.modal.subtitle': 'Choose Your Platform',
    
    // Videos
    'videos.title': 'Videos & Performances',
    'videos.subtitle': 'Watch Exclusive Content',
    'videos.description': 'Experience unforgettable performances and behind-the-scenes moments',
    'videos.watchNow': 'Watch Now',
    'videos.views': 'views',
    
    // Nominees
    'nominees.title': '2026 Nominees',
    'nominees.subtitle': "Africa's finest artists",
    'nominees.topTitle': 'Top Nominees',
    'nominees.topDescription': "Meet some of this year's most nominated artists across all categories",
    'nominees.noms': 'Noms',
    'nominees.viewAll': 'View All Nominees',
    'nominees.showcaseTitle': '2026 Nominees',
    'nominees.showcaseDescription': 'Over 100 exceptional artists nominated across 50 categories, representing the pinnacle of African musical excellence and creativity.',
    'nominees.explore': 'Explore All Nominees',
    'nominees.allNominees': 'All Nominees',
    'nominees.listen': 'Listen',
    'nominees.supportTitle': 'Support Your Favorite Artists',
    
    // Winners
    'winners.title': 'Winners',
    'winners.subtitle': 'Celebrating African music excellence',
    'winners.winner': 'Winner',
    'winners.viewMoment': 'View Moment',
    'winners.watchSpeech': 'Watch Acceptance Speech',
    'winners.watch': 'Watch',
    'winners.hallOfFameCTA': 'Discover the legends who paved the way for today\'s stars',
    'winners.exploreHallOfFame': 'Explore Hall of Fame',
    
    // Hall of Fame
    'hallOfFame.title': 'Hall of Fame',
    'hallOfFame.subtitle': 'Honoring the legends who shaped the sound of Africa',
    'hallOfFame.intro': 'Celebrating Timeless Excellence',
    'hallOfFame.introDescription': 'The AMIA Hall of Fame honors the extraordinary artists who have defined African music and inspired generations. These legends have left an indelible mark on the global music landscape.',
    'hallOfFame.majorAwards': 'Major Awards',
    'hallOfFame.ctaTitle': 'The Next Legends Start Today',
    'hallOfFame.ctaDescription': "Support today's artists as they create tomorrow's classics",
    
    // News
    'news.title': 'Latest News',
    'news.subtitle': 'Stay Updated',
    'news.description': 'Stay updated with the latest news and announcements from AMI 2026',
    'news.viewAll': 'View All News',
    'news.readMore': 'Read More',
    'news.readArticle': 'Read Article',
    
    // About
    'about.title': 'About AMIA',
    'about.subtitle': 'Celebrating African Musical Excellence Since 2020',
    'about.missionTitle': 'Our Mission',
    'about.missionText': 'The African Music Icon Awards (AMIA) celebrates and honors the vibrant diversity of African music on the global stage. We recognize excellence, innovation, and cultural impact across all genres and generations.',
    'about.visionTitle': 'Our Vision',
    'about.visionText': 'To create a platform that elevates African artists, connects cultures through music, and showcases the richness of African musical heritage to the world.',
    'about.impactTitle': 'Global Impact',
    'about.impactText': 'Since our inception, AMIA has become a beacon of excellence, bringing together artists, industry leaders, and music lovers from across the continent and beyond.',
    'about.yearsOfExcellence': 'Years of Excellence',
    'about.artistsHonored': 'Artists Honored',
    'about.countriesRepresented': 'Countries Represented',
    'about.globalViewers': 'Global Viewers',
    'about.valuesTitle': 'Our Values',
    'about.excellenceTitle': 'Excellence',
    'about.excellenceText': 'Recognizing outstanding musical achievement and artistic innovation',
    'about.diversityTitle': 'Diversity',
    'about.diversityText': 'Celebrating all genres, languages, and styles across Africa',
    'about.integrityTitle': 'Integrity',
    'about.integrityText': 'Maintaining transparent and fair judging processes',
    'about.unityTitle': 'Unity',
    'about.unityText': 'Bringing together the African music community',
    'about.joinTitle': 'Join the Movement',
    'about.joinDescription': 'Be part of celebrating African musical excellence',
    
    // Categories (Artist)
    'category.artistOfTheYear': 'Artist of the Year',
    'category.bestFemale': 'Best Female Artist',
    'category.songOfTheYear': 'Song of the Year',
    'category.bestMale': 'Best Male Artist',
    'category.bestNew': 'Best New Artist',
    'category.bestAfrobeats': 'Best Afrobeats',
    'category.bestCollaboration': 'Best Collaboration',
    'category.albumOfTheYear': 'Album of the Year',
    
    // Final CTA
    'cta.title': 'Be Part of the Moment',
    'cta.getTickets': 'Get Tickets',
    
    // Reminder Modal
    'reminder.title': 'Set Reminder',
    'reminder.description': 'Set a reminder to be notified when the event starts.',
    'reminder.cancel': 'Cancel',
    'reminder.confirm': 'Confirm',
    
    // Footer
    'footer.tagline': 'Celebrating African Musical Excellence',
    'footer.about': 'About AMIA',
    'footer.connect': 'Connect',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Subscribe for updates and announcements',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Modal
    'modal.producer': 'Producer',
    'modal.writers': 'Writers',
    'modal.label': 'Label',
    'modal.released': 'Released',
    'modal.duration': 'Duration',
    'modal.playTrack': 'Play Track',
    
    // Nominee Descriptions
    'nominee.burnaboy.desc': 'A global Afrobeats anthem that samples Toni Braxton\'s "He Wasn\'t Man Enough", blending heartbreak with infectious rhythms.',
    'nominee.tiwasavage.desc': 'A soulful collaboration featuring Brandy, exploring themes of love and connection with Afrobeats and R&B fusion.',
    'nominee.wizkid.desc': 'A global smash hit featuring Tems that defined the sound of Afrobeats worldwide, earning Grammy recognition.',
    'nominee.davido.desc': 'A triumphant anthem featuring The Samples, celebrating resilience and success with infectious Afrobeats energy.',
    'nominee.tems.desc': 'A mesmerizing blend of Afrobeats and alternative R&B, showcasing Tems\' signature ethereal vocals and introspective lyricism.',
    'nominee.asake.desc': 'A high-energy Amapiano-Afrobeats fusion that showcases Asake\'s unique street-pop sound and charismatic delivery.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.categories': 'Catégories',
    'nav.nominees': 'Nominés',
    'nav.winners': 'Gagnants',
    'nav.news': 'Actualités & Mises à Jour',
    'nav.about': 'À propos',
    'nav.hallOfFame': 'Temple de la Renommée',
    'nav.vote': 'Voter • Bientôt',
    
    // Hero
    'hero.tagline': "Célébrer les meilleurs talents musicaux d'Afrique sur la scène mondiale",
    'hero.date': '15 mars 2026 • Lagos, Nigeria',
    
    // Stats
    'stats.nominees': 'Nominés',
    'stats.categories': 'Catégories',
    'stats.countries': 'Pays',
    'stats.inductees': 'Intronisés',
    'stats.totalAwards': 'Prix Totaux',
    'stats.yearsActive': 'Années Actives',
    
    // Countdown
    'countdown.title': 'Le Compte à Rebours Commence',
    'countdown.eventCountdown': 'Compte à Rebours de l\'Événement',
    'countdown.days': 'Jours',
    'countdown.hours': 'Heures',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Secondes',
    'countdown.viewNominees': 'Voir les Nominés',
    'countdown.setReminder': 'Définir un Rappel',
    
    // Interludes
    'interlude.celebrating': "Célébrer les Meilleurs d'Afrique",
    'interlude.oneNight': 'Une Nuit. Talent Infini.',
    
    // Categories
    'categories.title': 'Catégories',
    'categories.subtitle': "Célébrer l'Excellence à Travers Tous les Genres",
    'categories.description': "De l'Afrobeats au Gospel, découvrez la diversité de l'excellence musicale reconnue à AMIA",
    'categories.viewAll': 'Voir toutes les catégories',
    'categories.afrobeats': 'Afrobeats',
    'categories.hiphop': 'Hip Hop',
    'categories.rnb': 'R&B',
    'categories.gospel': 'Gospel',
    'categories.allCategories': 'Toutes les Catégories',
    'categories.general': 'Général',
    'categories.genreSpecific': 'Genre Spécifique',
    'categories.awardsText': 'prix célébrant l\'excellence de la musique africaine',
    'categories.nominees': 'Nominés',
    'categories.viewNominees': 'Voir les Nominés',
    'categories.voteTitle': 'Votez pour Vos Favoris',
    'categories.voteDescription': 'Votre voix compte. Soutenez les artistes qui vous inspirent.',
    'categories.voteComingSoon': 'Voter • Bientôt',
    
    // HomePage specific
    'home.categoriesTitle': 'Catégories',
    'home.viewAllCategories': 'Voir toutes les catégories',
    'home.topNominees': 'Meilleurs Nominés',
    'home.topNomineesDescription': "Rencontrez certains des artistes les plus nominés de cette année dans toutes les catégories",
    'home.noms': 'Noms',
    'home.viewAllNominees': 'Voir Tous les Nominés',
    'home.nomineesShowcaseTitle': 'Nominés 2026',
    'home.nomineesShowcaseDescription': 'Plus de 100 artistes exceptionnels nominés dans 50 catégories, représentant le summum de l\'excellence musicale africaine et de la créativité.',
    'home.exploreAllNominees': 'Explorer Tous les Nominés',
    'home.latestNews': 'Dernières Nouvelles',
    'home.latestNewsDescription': 'Restez à jour avec les dernières nouvelles et annonces de AMI 2026',
    'home.viewAllNews': 'Voir Toutes les Nouvelles',
    'home.news1Title': 'AMI 2026 Announces Nominees',
    'home.news1Date': 'March 10, 2026',
    'home.news2Title': 'Exclusive: Behind the Scenes',
    'home.news2Date': 'March 8, 2026',
    'home.news3Title': 'Meet the Jury Panel',
    'home.news3Date': 'March 5, 2026',
    'home.hallOfFame': 'Temple de la Renommée',
    'home.hallOfFameDescription': "Honorer les légendes qui ont façonné le son de l'Afrique",
    'home.viewAllLegends': 'Voir Toutes les Légendes',
    'home.exploreLegacy': "Explorer l'Héritage",
    'home.hallOfFamePreview': 'Aperçu du Temple de la Renommée',
    'home.iconicLegends': 'Légendes Iconiques',
    'home.discoverMore': 'Découvrir Plus',
    'home.finalCTATitle': 'Faites Partie du Moment',
    'home.finalCTADescription': "Expérience l'excellence musicale africaine en direct",
    'home.getTickets': 'Obtenir des Billets',
    'home.exploreNominees': 'Explorer les Nominés',
    'home.voteComingSoon': 'Voter • Bientôt',
    
    // Partners
    'partners.title': 'Nos Partenaires',
    'partners.subtitle': 'Fiables pour les leaders de l\'industrie',
    
    // Platform Modal
    'platform.modal.title': 'Écouter Maintenant',
    'platform.modal.subtitle': 'Choisissez Votre Plateforme',
    
    // Videos
    'videos.title': 'Vidéos & Performances',
    'videos.subtitle': 'Regardez le Contenu Exclusif',
    'videos.description': 'Expérimentez des performances inoubliables et des moments derrière les coulisses',
    'videos.watchNow': 'Regarder Maintenant',
    'videos.views': 'vues',
    
    // Nominees
    'nominees.title': 'Nominés 2026',
    'nominees.subtitle': "Les meilleurs artistes d'Afrique",
    'nominees.topTitle': 'Meilleurs Nominés',
    'nominees.topDescription': "Rencontrez certains des artistes les plus nominés de cette année dans toutes les catégories",
    'nominees.noms': 'Noms',
    'nominees.viewAll': 'Voir Tous les Nominés',
    'nominees.showcaseTitle': 'Nominés 2026',
    'nominees.showcaseDescription': 'Plus de 100 artistes exceptionnels nominés dans 50 catégories, représentant le summum de l\'excellence musicale africaine et de la créativité.',
    'nominees.explore': 'Explorer Tous les Nominés',
    'nominees.allNominees': 'Tous les Nominés',
    'nominees.listen': 'Écouter',
    'nominees.supportTitle': 'Soutenez Vos Artistes Préférés',
    
    // Winners
    'winners.title': 'Gagnants',
    'winners.subtitle': "Célébrer l'excellence de la musique africaine",
    'winners.winner': 'Gagnant',
    'winners.viewMoment': 'Voir le Moment',
    'winners.watchSpeech': "Regarder le Discours d'Acceptation",
    'winners.watch': 'Regarder',
    'winners.hallOfFameCTA': "Découvrez les légendes qui ont ouvert la voie aux stars d'aujourd'hui",
    'winners.exploreHallOfFame': 'Explorer le Temple de la Renommée',
    
    // Hall of Fame
    'hallOfFame.title': 'Temple de la Renommée',
    'hallOfFame.subtitle': "Honorer les légendes qui ont façonné le son de l'Afrique",
    'hallOfFame.intro': "Célébrer l'Excellence Intemporelle",
    'hallOfFame.introDescription': "Le Temple de la Renommée AMIA honore les artistes extraordinaires qui ont défini la musique africaine et inspiré des générations. Ces légendes ont laissé une marque indélébile sur le paysage musical mondial.",
    'hallOfFame.majorAwards': 'Prix Majeurs',
    'hallOfFame.ctaTitle': "Les Prochaines Légendes Commencent Aujourd'hui",
    'hallOfFame.ctaDescription': "Soutenez les artistes d'aujourd'hui alors qu'ils créent les classiques de demain",
    
    // News
    'news.title': 'Dernières Nouvelles',
    'news.subtitle': 'Restez Informé',
    'news.description': 'Restez à jour avec les dernières nouvelles et annonces de AMI 2026',
    'news.viewAll': 'Voir Toutes les Nouvelles',
    'news.readMore': 'Lire Plus',
    'news.readArticle': "Lire l'Article",
    
    // About
    'about.title': 'À Propos de AMIA',
    'about.subtitle': "Célébrer l'Excellence Musicale Africaine Depuis 2020",
    'about.missionTitle': 'Notre Mission',
    'about.missionText': "Les African Music Icon Awards (AMIA) célèbrent et honorent la diversité vibrante de la musique africaine sur la scène mondiale. Nous reconnaissons l'excellence, l'innovation et l'impact culturel à travers tous les genres et générations.",
    'about.visionTitle': 'Notre Vision',
    'about.visionText': "Créer une plateforme qui élève les artistes africains, connecte les cultures à travers la musique et met en valeur la richesse du patrimoine musical africain au monde.",
    'about.impactTitle': 'Impact Mondial',
    'about.impactText': "Depuis notre création, AMIA est devenu un phare d'excellence, réunissant des artistes, des leaders de l'industrie et des amateurs de musique de tout le continent et au-delà.",
    'about.yearsOfExcellence': "Années d'Excellence",
    'about.artistsHonored': 'Artistes Honorés',
    'about.countriesRepresented': 'Pays Représentés',
    'about.globalViewers': 'Téléspectateurs Mondiaux',
    'about.valuesTitle': 'Nos Valeurs',
    'about.excellenceTitle': 'Excellence',
    'about.excellenceText': "Reconnaître les réalisations musicales exceptionnelles et l'innovation artistique",
    'about.diversityTitle': 'Diversité',
    'about.diversityText': "Célébrer tous les genres, langues et styles à travers l'Afrique",
    'about.integrityTitle': 'Intégrité',
    'about.integrityText': 'Maintenir des processus de jugement transparents et équitables',
    'about.unityTitle': 'Unité',
    'about.unityText': 'Rassembler la communauté musicale africaine',
    'about.joinTitle': 'Rejoignez le Mouvement',
    'about.joinDescription': "Faites partie de la célébration de l'excellence musicale africaine",
    
    // Categories (Artist)
    'category.artistOfTheYear': 'Artiste de l\'Année',
    'category.bestFemale': 'Meilleure Artiste Féminine',
    'category.songOfTheYear': 'Chanson de l\'Année',
    'category.bestMale': 'Meilleur Artiste Masculin',
    'category.bestNew': 'Meilleur Nouvel Artiste',
    'category.bestAfrobeats': 'Meilleur Afrobeats',
    'category.bestCollaboration': 'Meilleure Collaboration',
    'category.albumOfTheYear': 'Album de l\'Année',
    
    // Final CTA
    'cta.title': 'Faites Partie du Moment',
    'cta.getTickets': 'Obtenir des Billets',
    
    // Reminder Modal
    'reminder.title': 'Définir un Rappel',
    'reminder.description': 'Définissez un rappel pour être notifié lorsque l\'événement commence.',
    'reminder.cancel': 'Annuler',
    'reminder.confirm': 'Confirmer',
    
    // Footer
    'footer.tagline': 'Celebrating African Musical Excellence',
    'footer.about': 'About AMIA',
    'footer.connect': 'Connect',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Subscribe for updates and announcements',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Modal
    'modal.producer': 'Producteur',
    'modal.writers': 'Auteurs',
    'modal.label': 'Label',
    'modal.released': 'Sorti',
    'modal.duration': 'Durée',
    'modal.playTrack': 'Écouter le Morceau',
    
    // Nominee Descriptions
    'nominee.burnaboy.desc': 'Un hymne Afrobeats mondial qui échantillonne "He Wasn\'t Man Enough" de Toni Braxton, mêlant le chagrin d\'amour avec des rythmes contagieux.',
    'nominee.tiwasavage.desc': 'Une collaboration âmeuse avec Brandy, explorant des thèmes d\'amour et de connexion avec une fusion d\'Afrobeats et de R&B.',
    'nominee.wizkid.desc': 'Un hit mondial avec Tems qui a défini le son des Afrobeats à l\'échelle mondiale, remportant un Grammy.',
    'nominee.davido.desc': 'Un hymne triomphal avec The Samples, célébrant la résilience et le succès avec une énergie Afrobeats contagieuse.',
    'nominee.tems.desc': 'Une mélodie captivante de Afrobeats et de R&B alternatif, mettant en avant les vocaux éthérés de Tems et sa lyrique introspective.',
    'nominee.asake.desc': 'Une fusion Amapiano-Afrobeats à haute énergie qui met en avant le son de rue de Asake et sa délivrance charismatique.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.categories': 'Categorías',
    'nav.nominees': 'Nominados',
    'nav.winners': 'Ganadores',
    'nav.news': 'Noticias & Actualizaciones',
    'nav.about': 'Acerca de',
    'nav.hallOfFame': 'Salón de la Fama',
    'nav.vote': 'Votar • Próximamente',
    
    // Hero
    'hero.tagline': 'Celebrando el mejor talento musical de África en el escenario mundial',
    'hero.date': '15 de marzo de 2026 • Lagos, Nigeria',
    
    // Stats
    'stats.nominees': 'Nominados',
    'stats.categories': 'Categorías',
    'stats.countries': 'Países',
    'stats.inductees': 'Integrantes',
    'stats.totalAwards': 'Premios Totales',
    'stats.yearsActive': 'Años Activos',
    
    // Countdown
    'countdown.title': 'Comienza la Cuenta Regresiva',
    'countdown.eventCountdown': 'Cuenta Regresiva del Evento',
    'countdown.days': 'Días',
    'countdown.hours': 'Horas',
    'countdown.minutes': 'Minutos',
    'countdown.seconds': 'Segundos',
    'countdown.viewNominees': 'Ver Nominados',
    'countdown.setReminder': 'Configurar Recordatorio',
    
    // Interludes
    'interlude.celebrating': 'Celebrando lo Mejor de África',
    'interlude.oneNight': 'Una Noche. Talento Infinito.',
    
    // Categories
    'categories.title': 'Categorías',
    'categories.subtitle': 'Celebrando la Excelencia en Todos los Géneros',
    'categories.description': 'Desde Afrobeats hasta Gospel, descubre la diversidad de la excelencia musical reconocida en AMIA',
    'categories.viewAll': 'Ver todas las categorías',
    'categories.afrobeats': 'Afrobeats',
    'categories.hiphop': 'Hip Hop',
    'categories.rnb': 'R&B',
    'categories.gospel': 'Gospel',
    'categories.allCategories': 'Todas las Categorías',
    'categories.general': 'General',
    'categories.genreSpecific': 'Específico del Género',
    'categories.awardsText': 'premios celebrando la excelencia de la música africana',
    'categories.nominees': 'Nominados',
    'categories.viewNominees': 'Ver Nominados',
    'categories.voteTitle': 'Vota por Tus Favoritos',
    'categories.voteDescription': 'Tu voz importa. Apoya a los artistas que te inspiran.',
    'categories.voteComingSoon': 'Votar • Próximamente',
    
    // HomePage specific
    'home.categoriesTitle': 'Categorías',
    'home.viewAllCategories': 'Ver todas las categorías',
    'home.topNominees': 'Principales Nominados',
    'home.topNomineesDescription': 'Conoce a algunos de los artistas más nominados de este año en todas las categorías',
    'home.noms': 'Noms',
    'home.viewAllNominees': 'Ver Todos los Nominados',
    'home.nomineesShowcaseTitle': 'Nominados 2026',
    'home.nomineesShowcaseDescription': 'Más de 100 artistas excepcionales nominados en 50 categorías, representando la cumbre de la excelencia musical africana y la creatividad.',
    'home.exploreAllNominees': 'Explorar Todos los Nominados',
    'home.latestNews': 'Últimas Noticias',
    'home.latestNewsDescription': 'Mantente al día con las últimas noticias y anuncios de AMI 2026',
    'home.viewAllNews': 'Ver Todas las Noticias',
    'home.news1Title': 'AMI 2026 Announces Nominees',
    'home.news1Date': 'March 10, 2026',
    'home.news2Title': 'Exclusive: Behind the Scenes',
    'home.news2Date': 'March 8, 2026',
    'home.news3Title': 'Meet the Jury Panel',
    'home.news3Date': 'March 5, 2026',
    'home.hallOfFame': 'Salón de la Fama',
    'home.hallOfFameDescription': 'Honrando a las leyendas que dieron forma al sonido de África',
    'home.viewAllLegends': 'Ver Todas las Leyendas',
    'home.exploreLegacy': 'Explorar el Legado',
    'home.hallOfFamePreview': 'Vista Previa del Salón de la Fama',
    'home.iconicLegends': 'Leyendas Icónicas',
    'home.discoverMore': 'Descubrir Más',
    'home.finalCTATitle': 'Sé Parte del Momento',
    'home.finalCTADescription': 'Experimenta la excelencia musical africana en vivo',
    'home.getTickets': 'Obtener Boletos',
    'home.exploreNominees': 'Explorar Nominados',
    'home.voteComingSoon': 'Votar • Próximamente',
    
    // Partners
    'partners.title': 'Nuestros Socios',
    'partners.subtitle': 'Confiables para los líderes de la industria',
    
    // Platform Modal
    'platform.modal.title': 'Escuchar Ahora',
    'platform.modal.subtitle': 'Elige tu Plataforma',
    
    // Videos
    'videos.title': 'Vídeos & Performances',
    'videos.subtitle': 'Ver Contenido Exclusivo',
    'videos.description': 'Experimenta performances inolvidables y momentos detrás de escena',
    'videos.watchNow': 'Ver Ahora',
    'videos.views': 'vistas',
    
    // Nominees
    'nominees.title': 'Nominados 2026',
    'nominees.subtitle': 'Los mejores artistas de África',
    'nominees.topTitle': 'Principales Nominados',
    'nominees.topDescription': 'Conoce a algunos de los artistas más nominados de este año en todas las categorías',
    'nominees.noms': 'Noms',
    'nominees.viewAll': 'Ver Todos los Nominados',
    'nominees.showcaseTitle': 'Nominados 2026',
    'nominees.showcaseDescription': 'Más de 100 artistas excepcionales nominados en 50 categorías, representando la cumbre de la excelencia musical africana y la creatividad.',
    'nominees.explore': 'Explorar Todos los Nominados',
    'nominees.allNominees': 'Todos los Nominados',
    'nominees.listen': 'Escuchar',
    'nominees.supportTitle': 'Apoya a Tus Artistas Favoritos',
    
    // Winners
    'winners.title': 'Ganadores',
    'winners.subtitle': 'Celebrando la excelencia de la música africana',
    'winners.winner': 'Ganador',
    'winners.viewMoment': 'Ver Momento',
    'winners.watchSpeech': 'Ver Discurso de Aceptación',
    'winners.watch': 'Ver',
    'winners.hallOfFameCTA': 'Descubre las leyendas que allanaron el camino para las estrellas de hoy',
    'winners.exploreHallOfFame': 'Explorar Salón de la Fama',
    
    // Hall of Fame
    'hallOfFame.title': 'Salón de la Fama',
    'hallOfFame.subtitle': 'Honrando a las leyendas que dieron forma al sonido de África',
    'hallOfFame.intro': 'Celebrando la Excelencia Atemporal',
    'hallOfFame.introDescription': 'El Salón de la Fama de AMIA honra a los artistas extraordinarios que han definido la música africana e inspirado generaciones. Estas leyendas han dejado una marca indeleble en el panorama musical global.',
    'hallOfFame.majorAwards': 'Premios Mayores',
    'hallOfFame.ctaTitle': 'Las Próximas Leyendas Comienzan Hoy',
    'hallOfFame.ctaDescription': 'Apoya a los artistas de hoy mientras crean los clásicos del mañana',
    
    // News
    'news.title': 'Últimas Noticias',
    'news.subtitle': 'Mantente Actualizado',
    'news.description': 'Mantente al día con las últimas noticias y anuncios de AMI 2026',
    'news.viewAll': 'Ver Todas las Noticias',
    'news.readMore': 'Leer Más',
    'news.readArticle': 'Leer Artículo',
    
    // About
    'about.title': 'Acerca de AMIA',
    'about.subtitle': 'Celebrando la Excelencia Musical Africana Desde 2020',
    'about.missionTitle': 'Nuestra Misión',
    'about.missionText': 'Los African Music Icon Awards (AMIA) celebran y honran la vibrante diversidad de la música africana en el escenario mundial. Reconocemos la excelencia, la innovación y el impacto cultural en todos los géneros y generaciones.',
    'about.visionTitle': 'Nuestra Visión',
    'about.visionText': 'Crear una plataforma que eleve a los artistas africanos, conecte culturas a través de la música y muestre la riqueza del patrimonio musical africano al mundo.',
    'about.impactTitle': 'Impacto Global',
    'about.impactText': 'Desde nuestra creación, AMIA se ha convertido en un faro de excelencia, reuniendo artistas, líderes de la industria y amantes de la música de todo el continente y más allá.',
    'about.yearsOfExcellence': 'Años de Excelencia',
    'about.artistsHonored': 'Artistas Honrados',
    'about.countriesRepresented': 'Países Representados',
    'about.globalViewers': 'Espectadores Globales',
    'about.valuesTitle': 'Nuestros Valores',
    'about.excellenceTitle': 'Excelencia',
    'about.excellenceText': 'Reconocer logros musicales sobresalientes e innovación artística',
    'about.diversityTitle': 'Diversidad',
    'about.diversityText': 'Celebrar todos los géneros, idiomas y estilos en toda África',
    'about.integrityTitle': 'Integridad',
    'about.integrityText': 'Mantener procesos de juicio transparentes y justos',
    'about.unityTitle': 'Unidad',
    'about.unityText': 'Reunir a la comunidad musical africana',
    'about.joinTitle': 'Únete al Movimiento',
    'about.joinDescription': 'Sé parte de la celebración de la excelencia musical africana',
    
    // Categories (Artist)
    'category.artistOfTheYear': 'Artista del Año',
    'category.bestFemale': 'Mejor Artista Femenina',
    'category.songOfTheYear': 'Canción del Año',
    'category.bestMale': 'Mejor Artista Masculino',
    'category.bestNew': 'Mejor Artista Nuevo',
    'category.bestAfrobeats': 'Mejor Afrobeats',
    'category.bestCollaboration': 'Mejor Colaboración',
    'category.albumOfTheYear': 'Álbum del Año',
    
    // Final CTA
    'cta.title': 'Sé Parte del Momento',
    'cta.getTickets': 'Obtener Boletos',
    
    // Reminder Modal
    'reminder.title': 'Configurar Recordatorio',
    'reminder.description': 'Configure un recordatorio para que le notifiquen cuando comience el evento.',
    'reminder.cancel': 'Cancelar',
    'reminder.confirm': 'Confirmar',
    
    // Footer
    'footer.tagline': 'Celebrating African Musical Excellence',
    'footer.about': 'About AMIA',
    'footer.connect': 'Connect',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'Subscribe for updates and announcements',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Modal
    'modal.producer': 'Productor',
    'modal.writers': 'Escritores',
    'modal.label': 'Sello',
    'modal.released': 'Lanzado',
    'modal.duration': 'Duración',
    'modal.playTrack': 'Reproducir Pista',
    
    // Nominee Descriptions
    'nominee.burnaboy.desc': 'Un himno Afrobeats mundial que muestrea "He Wasn\'t Man Enough" de Toni Braxton, mezclando el dolor de amor con ritmos contagiosos.',
    'nominee.tiwasavage.desc': 'Una colaboración almaica con Brandy, explorando temas de amor y conexión con una fusión de Afrobeats y R&B.',
    'nominee.wizkid.desc': 'Un hit mundial con Tems que definió el sonido de los Afrobeats a nivel mundial, ganando un Grammy.',
    'nominee.davido.desc': 'Un himno triunfal con The Samples, celebrando la resiliencia y el éxito con una energía Afrobeats contagiosa.',
    'nominee.tems.desc': 'Una mezcla cautivadora de Afrobeats y R&B alternativo, mostrando los vocales etéreos de Tems y su letra introspectiva.',
    'nominee.asake.desc': 'Una fusión Amapiano-Afrobeats a alta energía que muestra el sonido de calle de Asake y su entrega carismática.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
