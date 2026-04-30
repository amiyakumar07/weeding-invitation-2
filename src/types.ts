export type Language = 'en' | 'hi';

export interface EventDetails {
  name: string;
  nameHi: string;
  date: string;
  time: string;
  venue: string;
  venueHi: string;
  googleMapsLink: string;
}

export interface CoupleDetails {
  brideName: string;
  brideNameHi: string;
  groomName: string;
  groomNameHi: string;
  story: string;
  storyHi: string;
}

export interface WeddingData {
  couple: CoupleDetails;
  events: EventDetails[];
  countdownDate: string;
  galleryImages: { url: string; caption: string }[];
}
