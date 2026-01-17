import { PackageTier } from './packages';

export type TemplateCategory = 'portfolio' | 'business' | 'landing' | 'corporate' | 'creative' | 'restaurant' | 'service';

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  categoryLabel: string;
  includedTier: PackageTier;
  shortDescription: string;
  description: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  features: string[];
}

export const categoryLabels: Record<TemplateCategory, string> = {
  portfolio: 'Portfolio',
  business: 'Bisnis',
  landing: 'Landing Page',
  corporate: 'Korporat',
  creative: 'Kreatif',
  restaurant: 'Restoran',
  service: 'Jasa',
};

export const templates: Template[] = [
  // Starter tier templates
  {
    id: 'personal-01',
    name: 'Personal Card',
    category: 'portfolio',
    categoryLabel: 'Portfolio',
    includedTier: 'starter',
    shortDescription: 'Kartu nama digital dengan bio dan link sosial media',
    description: 'Template kartu nama digital yang modern dan minimalis. Cocok untuk freelancer, profesional, dan kreator konten yang ingin tampil profesional online.',
    tags: ['minimalis', 'personal', 'link-tree'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Bio singkat', 'Link sosial media', 'Formulir kontak', 'Desain responsif'],
  },
  {
    id: 'portfolio-simple',
    name: 'Portfolio Minimal',
    category: 'portfolio',
    categoryLabel: 'Portfolio',
    includedTier: 'starter',
    shortDescription: 'Portfolio sederhana untuk showcase karya Anda',
    description: 'Template portfolio dengan desain bersih dan fokus pada karya Anda. Ideal untuk fotografer, desainer, dan seniman.',
    tags: ['minimalis', 'portfolio', 'galeri'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Galeri karya', 'Tentang saya', 'Kontak', 'Layout bersih'],
  },
  {
    id: 'landing-simple',
    name: 'Landing Basic',
    category: 'landing',
    categoryLabel: 'Landing Page',
    includedTier: 'starter',
    shortDescription: 'Landing page sederhana untuk produk atau layanan',
    description: 'Template landing page yang efektif untuk memperkenalkan produk atau layanan tunggal. Fokus pada konversi.',
    tags: ['landing', 'konversi', 'CTA'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Hero section', 'Fitur highlight', 'CTA utama', 'Formulir kontak'],
  },
  // Business tier templates
  {
    id: 'umkm-starter',
    name: 'UMKM Starter',
    category: 'business',
    categoryLabel: 'Bisnis',
    includedTier: 'business',
    shortDescription: 'Website lengkap untuk UMKM dengan katalog produk',
    description: 'Solusi website lengkap untuk usaha kecil menengah. Dilengkapi katalog produk, profil bisnis, dan integrasi WhatsApp.',
    tags: ['UMKM', 'katalog', 'toko'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Katalog produk', 'Tentang kami', 'Galeri', 'Kontak & lokasi', 'WhatsApp order'],
  },
  {
    id: 'corporate-01',
    name: 'Corporate Clean',
    category: 'corporate',
    categoryLabel: 'Korporat',
    includedTier: 'business',
    shortDescription: 'Profil perusahaan profesional dan modern',
    description: 'Template profil perusahaan dengan tampilan profesional. Cocok untuk startup, agency, dan perusahaan yang ingin tampil kredibel.',
    tags: ['korporat', 'profesional', 'company-profile'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Profil perusahaan', 'Layanan', 'Tim', 'Portfolio', 'Kontak'],
  },
  {
    id: 'cafe-resto',
    name: 'Cafe & Resto',
    category: 'restaurant',
    categoryLabel: 'Restoran',
    includedTier: 'business',
    shortDescription: 'Website restoran dengan menu digital',
    description: 'Template khusus untuk kafe dan restoran. Menu digital yang menarik, galeri makanan, dan reservasi via WhatsApp.',
    tags: ['restoran', 'menu', 'F&B'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Menu digital', 'Galeri makanan', 'Info lokasi', 'Jam operasional', 'Reservasi WA'],
  },
  {
    id: 'jasa-pro',
    name: 'Service Pro',
    category: 'service',
    categoryLabel: 'Jasa',
    includedTier: 'business',
    shortDescription: 'Website jasa profesional dengan daftar layanan',
    description: 'Template untuk penyedia jasa profesional seperti konsultan, kontraktor, atau agensi. Tampilkan layanan dan portofolio dengan jelas.',
    tags: ['jasa', 'layanan', 'profesional'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Daftar layanan', 'Harga/paket', 'Portfolio', 'Testimoni', 'Booking WA'],
  },
  // Premium tier templates
  {
    id: 'agency-premium',
    name: 'Agency Premium',
    category: 'creative',
    categoryLabel: 'Kreatif',
    includedTier: 'premium',
    shortDescription: 'Website agency kreatif dengan animasi modern',
    description: 'Template premium untuk agency kreatif dan digital. Dilengkapi animasi halus, transisi modern, dan showcase portfolio yang memukau.',
    tags: ['agency', 'animasi', 'kreatif', 'premium'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Animasi scroll', 'Portfolio interaktif', 'Case study', 'Blog', 'Tim & budaya'],
  },
  {
    id: 'corporate-elite',
    name: 'Corporate Elite',
    category: 'corporate',
    categoryLabel: 'Korporat',
    includedTier: 'premium',
    shortDescription: 'Company profile premium dengan fitur lengkap',
    description: 'Template korporat premium dengan semua fitur yang dibutuhkan perusahaan besar. Multi-halaman, blog, dan integrasi lengkap.',
    tags: ['korporat', 'premium', 'enterprise'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Multi-halaman', 'Blog', 'Karir', 'News/event', 'Investor relations'],
  },
  {
    id: 'portfolio-pro',
    name: 'Portfolio Pro',
    category: 'portfolio',
    categoryLabel: 'Portfolio',
    includedTier: 'premium',
    shortDescription: 'Portfolio profesional dengan case study detail',
    description: 'Template portfolio profesional untuk desainer dan developer senior. Case study detail, animasi halus, dan blog terintegrasi.',
    tags: ['portfolio', 'case-study', 'premium'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Case study', 'Blog', 'Animasi', 'Testimoni', 'Skill showcase'],
  },
  {
    id: 'startup-launch',
    name: 'Startup Launch',
    category: 'landing',
    categoryLabel: 'Landing Page',
    includedTier: 'premium',
    shortDescription: 'Landing page startup dengan fitur SaaS',
    description: 'Template landing page khusus untuk startup dan produk SaaS. Pricing table, feature showcase, dan conversion-optimized.',
    tags: ['startup', 'SaaS', 'konversi'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Hero animasi', 'Feature grid', 'Pricing table', 'FAQ', 'CTA multiple'],
  },
  {
    id: 'resto-premium',
    name: 'Resto Exclusive',
    category: 'restaurant',
    categoryLabel: 'Restoran',
    includedTier: 'premium',
    shortDescription: 'Website restoran premium dengan reservasi online',
    description: 'Template premium untuk restoran fine dining dan hotel. Menu elegan, galeri full-screen, dan sistem reservasi lengkap.',
    tags: ['restoran', 'fine-dining', 'premium'],
    thumbnail: '/placeholder-template.jpg',
    gallery: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    features: ['Menu elegan', 'Galeri fullscreen', 'Reservasi', 'Event/private dining', 'Chef spotlight'],
  },
];

export const categories: { value: TemplateCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'business', label: 'Bisnis' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'corporate', label: 'Korporat' },
  { value: 'creative', label: 'Kreatif' },
  { value: 'restaurant', label: 'Restoran' },
  { value: 'service', label: 'Jasa' },
];

export const tierFilters: { value: PackageTier | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'starter', label: 'Starter' },
  { value: 'business', label: 'Business' },
  { value: 'premium', label: 'Premium' },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

export function getTemplatesByTier(tier: PackageTier): Template[] {
  return templates.filter(t => t.includedTier === tier);
}

export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return templates.filter(t => t.category === category);
}

export function getFeaturedTemplates(count: number = 6): Template[] {
  return templates.slice(0, count);
}
