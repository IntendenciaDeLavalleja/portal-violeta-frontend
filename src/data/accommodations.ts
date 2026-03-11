
export type AccommodationType = 'cabin' | 'motorhome' | 'camping';

export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface Accommodation {
  id: string;
  type: AccommodationType;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  capacity: number;
  available: number;
  total: number;
  images: string[];
  amenities: Amenity[];
  featured?: boolean;
  promo?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  message: string;
  accommodation?: string;
}

export const testimonials: Testimonial[] = [];
export const heroImages: string[] = [];