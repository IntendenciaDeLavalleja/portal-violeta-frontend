import axios from 'axios';
import type { Accommodation, Testimonial } from '../data/accommodations';

// PUBLIC_API_URL is the canonical variable (e.g. https://api.campingarequita.uy/api).
// PUBLIC_API_BASE_URL is kept for backward compatibility.
// In production, set PUBLIC_API_URL as a build arg in Coolify/Docker.
const API_BASE_URL =
  import.meta.env.PUBLIC_API_URL ||
  import.meta.env.PUBLIC_API_BASE_URL ||
  'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchHeroImages = async (): Promise<string[]> => {
  try {
    const response = await api.get('/public/hero-images');
    return response.data;
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }
};

export const fetchServices = async (lang: string = 'es', query: string = '', type: string = 'all'): Promise<Accommodation[]> => {
  try {
    const response = await api.get('/public/services', {
      params: { lang, q: query, type },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const fetchFeaturedServices = async (lang: string = 'es'): Promise<Accommodation[]> => {
  const services = await fetchServices(lang);
  const featured = services.filter(s => s.featured);
  // Si no hay destacados, mostrar los primeros 3 para que la sección no quede vacía
  return featured.length > 0 ? featured : services.slice(0, 3);
};

export interface TestimonialsResponse {
  testimonials: Testimonial[];
  total: number;
  pages: number;
  current_page: number;
}

export const fetchTestimonials = async (
  lang: string = 'es', 
  serviceId?: string | number, 
  page: number = 1, 
  perPage: number = 8
): Promise<TestimonialsResponse> => {
  try {
    const response = await api.get('/public/testimonios', {
      params: { lang, service_id: serviceId, page, per_page: perPage },
    });
    
    const rawData = response.data.testimonials || response.data.reviews || [];
    
    // Map backend fields to frontend interface
    const mapped = rawData.map((item: any) => ({
      id: item.id.toString(),
      author: item.author_name,
      avatar: item.image_url,
      date: item.created_at,
      message: item.message,
      accommodation: item.service_name
    }));

    return {
      testimonials: mapped,
      total: response.data.total || mapped.length,
      pages: response.data.pages || 1,
      current_page: response.data.current_page || 1
    };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return {
      testimonials: [],
      total: 0,
      pages: 1,
      current_page: 1
    };
  }
};

export const createPreReservation = async (data: any) => {
  const response = await api.post('/public/pre-reservations', data);
  return response.data;
};

export const createSuggestion = async (data: any) => {
  const response = await api.post('/public/suggestions', data);
  return response.data;
};

// -------------------------------------------------------
// Aliases semánticos para uso interno y legibilidad
// Las imágenes vienen como URLs completas desde el backend.
// No modificar ni reconstruir las URLs aquí.
// -------------------------------------------------------

/** Imágenes del carrusel hero. Devuelve URLs públicas completas de MinIO. */
export const getHeroImages = fetchHeroImages;

/** Servicios de tipo cabaña. */
export const getCabins = (lang: string = 'es') =>
  fetchServices(lang, '', 'cabin');

/** Servicios de tipo parcela/camping. */
export const getParcels = (lang: string = 'es') =>
  fetchServices(lang, '', 'camping');

