import { WeddingData } from './types';

export const WEDDING_DATA: WeddingData = {
  couple: {
    brideName: 'Riya',
    brideNameHi: 'रिया',
    groomName: 'Aman',
    groomNameHi: 'अमन',
    story: 'Two souls meeting in the magic of love, starting a journey that will last forever.',
    storyHi: 'प्यार के जादू में मिलने वाली दो आत्माएं, एक ऐसी यात्रा शुरू कर रही हैं जो हमेशा के लिए चलेगी।',
  },
  events: [
    {
      name: 'Haldi Ceremony',
      nameHi: 'हल्दी समारोह',
      date: 'Dec 12, 2026',
      time: '10:00 AM',
      venue: 'The Grand Palace, Delhi',
      venueHi: 'द ग्रैंड पैलेस, दिल्ली',
      googleMapsLink: 'https://maps.google.com',
    },
    {
      name: 'Sangeet Night',
      nameHi: 'संगीत की रात',
      date: 'Dec 13, 2026',
      time: '07:00 PM',
      venue: 'Symphony Gardens, Gurgaon',
      venueHi: 'सिम्फनी गार्डन, गुड़गांव',
      googleMapsLink: 'https://maps.google.com',
    },
    {
      name: 'Wedding Ceremony',
      nameHi: 'शादी समारोह',
      date: 'Dec 14, 2026',
      time: '08:00 PM',
      venue: 'Rosewood Manor, Delhi',
      venueHi: 'रोजवुड मनोर, दिल्ली',
      googleMapsLink: 'https://maps.google.com',
    }
  ],
  countdownDate: '2026-12-14T20:00:00',
  galleryImages: [
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop', caption: 'Dreamy Moments' },
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', caption: 'The Beginning' },
    { url: 'https://images.unsplash.com/photo-1549333321-22f8d5f7ce39?q=80&w=2070&auto=format&fit=crop', caption: 'Laughter' },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop', caption: 'Together' },
  ]
};
