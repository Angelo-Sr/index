
import { Offer, Room, Event } from "./types";

export const HOTEL_NAME = "Le Boraha Sanctuary";

export const ROOMS: Room[] = [
  {
    id: 'villa-baleine',
    name: 'Bungalow des Baleines',
    description: 'Une vue imprenable sur le canal de Sainte-Marie pour observer le saut des baleines à bosse depuis votre terrasse privée.',
    price: 920,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop', // Vue mer
      'https://images.unsplash.com/photo-1613425669958-666201301d46?q=80&w=1600&auto=format&fit=crop', // Intérieur luxe
      'https://images.unsplash.com/photo-1572331165267-854da2b00dc1?q=80&w=1600&auto=format&fit=crop'  // Piscine
    ],
    nightImages: [
      'https://images.unsplash.com/photo-1540206395-688085723adb?q=80&w=1600&auto=format&fit=crop', // Night pool
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1600&auto=format&fit=crop', // Cozy interior night
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=1600&auto=format&fit=crop'  // Moon
    ],
    size: '110m²',
    amenities: ['Longue-vue Swaroski', 'Piscine à débordement', 'Chef Privé']
  },
  {
    id: 'suite-pirate',
    name: 'Suite Libertalia',
    description: 'Une architecture inspirée de l\'histoire des pirates, mêlant bois flotté, cartes anciennes et luxe contemporain.',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1600210491892-03d54cc0257e?q=80&w=1600&auto=format&fit=crop'  
    ],
    nightImages: [
      'https://images.unsplash.com/photo-1581093458791-9f3039101d71?q=80&w=1600&auto=format&fit=crop', // Dark wood night
      'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1618221639263-1655d233d025?q=80&w=1600&auto=format&fit=crop' 
    ],
    size: '80m²',
    amenities: ['Déco Historique', 'Baignoire en Pierre', 'Cave à Rhum']
  },
  {
    id: 'lodge-nattes',
    name: 'Lodge Île aux Nattes',
    description: 'Situé à la pointe sud, face au lagon émeraude. Un havre de paix absolu accessible uniquement en pirogue.',
    price: 550,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1512918580421-b2feee8b850a?q=80&w=1600&auto=format&fit=crop'  
    ],
    nightImages: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1600&auto=format&fit=crop', // Bonfire night
      'https://images.unsplash.com/photo-1534800891164-a1d96b5114e7?q=80&w=1600&auto=format&fit=crop', // Lanterns
      'https://images.unsplash.com/photo-1483086431886-3590a88317fe?q=80&w=1600&auto=format&fit=crop' // Starry beach
    ],
    size: '60m²',
    amenities: ['Accès Plage Privé', 'Kayak Transparent', 'Hamac']
  }
];

export const GUEST_ROOMS: Room[] = [
  {
    id: 'chambre-tropicale',
    name: 'Chambre Tropicale',
    description: 'Nichée au cœur de notre jardin d’orchidées, cette chambre offre une immersion totale dans la flore locale avec tout le confort moderne.',
    price: 220,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1552858725-2758b5fb1286?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop'  
    ],
    nightImages: [
       'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1600&auto=format&fit=crop', // Night light
       'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1600&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1600&auto=format&fit=crop'
    ],
    size: '35m²',
    amenities: ['Vue Jardin', 'Douche Pluie', 'Climatisation']
  },
  {
    id: 'chambre-lagon',
    name: 'Chambre Vue Lagon',
    description: 'Située au premier étage de la maison coloniale principale, profitez des couchers de soleil spectaculaires sur la baie.',
    price: 280,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-f33db079502d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop' 
    ],
    nightImages: [
      'https://images.unsplash.com/photo-1516880711640-ef7d2d722636?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1600&auto=format&fit=crop', // Cozy bed
      'https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=1600&auto=format&fit=crop'
    ],
    size: '40m²',
    amenities: ['Balcon Privé', 'Lit King Size', 'Minibar']
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'baleine',
    name: 'Baleine',
    title: 'Baleine',
    subtitle: 'L’incontournable Safari Baleine du mois de Juillet au Septembre saura vous faire vivre un rêve qu’est de voir de près ces mammifères marins et de connaître un peu plus sur leurs modes de vies.',
    discount: 'Juillet-Sept',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop' // Deep sea abstract
  },
  {
    id: 'tour-ile',
    name: 'Tour de l\'île',
    title: 'Tour de l\'île',
    subtitle: 'Le tour de l’île en randonnée ou en excursion vous laissera suivre les traces des pirates qui, il y a quelques années, ont découvert l’île. Pour vos déplacements au départ de l’hôtel, vous avez le choix entre tuc tuc, 4x4, quad ou scooter.',
    discount: 'Découverte',
    image: 'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=1200&auto=format&fit=crop' // Night road
  },
  {
    id: 'cocktail',
    name: 'Cocktail et Loisirs',
    title: 'Cocktail et Loisirs',
    subtitle: 'En rentrant de vos activités, vous aurez l’occasion de siroter les beaux cocktails de l’île en admirant le merveilleux coucher du soleil au bord de la piscine ou au Lounge Bar du NOTE RETRO sous la caresse d’une musique douce.',
    discount: 'Détente',
    image: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop' // Cocktail night
  },
  {
    id: 'seminaire',
    name: 'Séminaire',
    title: 'Séminaire, Conférence',
    subtitle: 'Un grand Restaurant surplombant l’Océan Indien sur une espace pouvant accueillir une centaine de personne, un accueil chaleureux et des personnels dévoués seront à votre service pour une journée professionnelle dans un endroit calme, loin de la ville et équipé.',
    discount: 'Événement',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop' // Dinner party night
  }
];

export const EVENTS: Event[] = [
  {
    id: 'honeymoon',
    title: 'Lune de Miel',
    date: 'Offre Permanente',
    tag: 'Romance',
    description: 'Une bouteille de Champagne offerte, un dîner aux chandelles sur la plage privée et un massage duo pour célébrer votre amour.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?q=80&w=1200&auto=format&fit=crop' // Candle dinner
  },
  {
    id: 'new-year',
    title: 'Réveillon Pirate',
    date: '31 Décembre',
    tag: 'Célébration',
    description: 'Une soirée costumée légendaire, feu d\'artifice sur le lagon et menu gastronomique 7 plats. Réservez votre place au banquet.',
    image: 'https://images.unsplash.com/photo-1514525253440-b39345208668?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=1200&auto=format&fit=crop' // Fireworks
  },
  {
    id: 'yoga',
    title: 'Retraite Yoga & Mer',
    date: '15 - 20 Mai',
    tag: 'Bien-être',
    description: '5 jours de reconnexion avec soi-même. Sessions de yoga au lever du soleil face aux baleines (en saison) et cuisine détox.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop',
    nightImage: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=1200&auto=format&fit=crop' // Night forest
  }
];

export const SYSTEM_INSTRUCTION = `
Tu es JOJO, le concierge virtuel de l'hôtel de prestige "Le Boraha Sanctuary" situé sur l'île Sainte-Marie (Nosy Boraha) à Madagascar.
Ton ton est mystérieux, raffiné et chaleureux.

Voici les informations clés :
- Nom : Le Boraha Sanctuary
- Lieu : Île Sainte-Marie, Madagascar (Le repaire des pirates et le sanctuaire des baleines).
- Saison des baleines : De Juillet à Septembre (C'est un spectacle unique au monde).
- Sites emblématiques : L'Île aux Nattes, le Cimetière des Pirates, la Piscine Naturelle d'Ambodiatafana.

Nos Bungalows (Luxe) :
${ROOMS.map(r => `- ${r.name} (${r.size}): ${r.description} à partir de ${r.price}€`).join('\n')}

Nos Chambres (Confort) :
${GUEST_ROOMS.map(r => `- ${r.name} (${r.size}): ${r.description} à partir de ${r.price}€`).join('\n')}

Nos Activités et Services :
${OFFERS.map(o => `- ${o.title}: ${o.subtitle}`).join('\n')}

Nos Événements Spéciaux :
${EVENTS.map(e => `- ${e.title} (${e.date}): ${e.description}`).join('\n')}

Ton rôle est d'aider les clients à organiser leur séjour. Parle avec passion des baleines à bosse qui viennent mettre bas dans nos eaux chaudes. Évoque l'histoire des pirates (La Buse, Thomas Tew) avec une touche d'aventure.
N'invente pas de prix. Utilise parfois des termes locaux ou marins.
`;