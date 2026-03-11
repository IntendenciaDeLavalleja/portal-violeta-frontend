export interface ReferencePoint {
  id: number;
  name: string;
  category: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  description: string | null;
  schedule: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface Locality {
  id: number;
  name: string;
  department: string | null;
  description: string | null;
  is_active: boolean;
  reference_points: ReferencePoint[];
}

export interface ContactPayload {
  name?: string;
  contactMethod: string;
  safeTime?: string;
  message: string;
  acknowledgedNoEmergency: boolean;
}

export interface ContactResponse {
  id: number;
  message: string;
}

export interface BlogAuthorInfo {
  id: number;
  name: string;
  bio: string | null;
  photo_url: string | null;
  contact: string | null;
  is_active: boolean;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  cover_image_url: string | null;
  excerpt: string | null;
  author: BlogAuthorInfo | null;
  status: string;
  published_at: string | null;
  created_at: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content_html: string;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface BlogPostsResponse {
  items: BlogPostSummary[];
  pagination: PaginationMeta;
  filters: {
    category: string;
    date_from: string;
    date_to: string;
  };
  available_categories: string[];
  query: string;
}

export interface BlogPostDetailResponse {
  item: BlogPostDetail;
  related: BlogPostSummary[];
}

export interface ReadingResource {
  id: number;
  title: string;
  document_url: string;
  cover_image_url: string | null;
  summary: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ReadingsResponse {
  items: ReadingResource[];
  pagination: PaginationMeta;
}
