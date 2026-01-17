export type PackageTier = 'starter' | 'business' | 'premium' | 'custom';

export interface PackageFeature {
  name: string;
  included: boolean;
}

export interface Package {
  id: string;
  name: string;
  tier: PackageTier;
  price: number | null;
  priceDisplay: string;
  highlight: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isCustom?: boolean;
}

// Base features for each tier - stacked inclusion
const starterFeatures = [
  'Desain responsif (mobile-first)',
  '1 halaman utama',
  'Formulir kontak WhatsApp',
  'Domain gratis .my.id / subdomain',
  'Hosting 1 tahun',
  'SSL gratis',
  'Waktu pengerjaan 3-5 hari',
];

const businessFeatures = [
  ...starterFeatures,
  'Hingga 5 halaman',
  'Desain kustom sesuai brand',
  'Optimasi SEO dasar',
  '2x revisi desain',
  'Google Analytics integration',
  'Waktu pengerjaan 5-7 hari',
];

const premiumFeatures = [
  ...businessFeatures,
  'Hingga 10 halaman',
  'Animasi & efek interaktif',
  'Optimasi kecepatan lanjutan',
  'Blog/artikel sederhana',
  'Revisi unlimited (14 hari)',
  'Dukungan prioritas 30 hari',
  'Waktu pengerjaan 7-10 hari',
];

export const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    tier: 'starter',
    price: 350000,
    priceDisplay: 'Rp350.000',
    highlight: 'Cocok untuk personal & portfolio sederhana',
    description: 'Paket ideal untuk memulai kehadiran online Anda dengan website profesional yang simpel dan efektif.',
    features: starterFeatures,
  },
  {
    id: 'business',
    name: 'Business',
    tier: 'business',
    price: 750000,
    priceDisplay: 'Rp750.000',
    highlight: 'Lengkap untuk bisnis kecil & UMKM',
    description: 'Solusi lengkap untuk bisnis yang membutuhkan website profesional dengan fitur marketing dasar.',
    features: businessFeatures,
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 1000000,
    priceDisplay: 'Rp1.000.000',
    highlight: 'Fitur lengkap untuk pertumbuhan bisnis',
    description: 'Paket premium dengan fitur lengkap dan dukungan prioritas untuk bisnis yang serius berkembang.',
    features: premiumFeatures,
  },
  {
    id: 'custom',
    name: 'Paket Khusus',
    tier: 'custom',
    price: null,
    priceDisplay: 'Hubungi Kami',
    highlight: 'Sesuai kebutuhan spesifik Anda',
    description: 'Butuh fitur khusus seperti e-commerce, sistem booking, atau integrasi custom? Konsultasikan dengan kami.',
    features: [
      'Konsultasi kebutuhan gratis',
      'Desain & fitur 100% kustom',
      'Integrasi sistem pihak ketiga',
      'E-commerce & payment gateway',
      'Sistem booking/reservasi',
      'Dashboard admin custom',
      'Maintenance & support fleksibel',
    ],
    isCustom: true,
  },
];

// For comparison table
export interface ComparisonFeature {
  name: string;
  starter: boolean | string;
  business: boolean | string;
  premium: boolean | string;
}

export const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Jumlah Halaman', starter: '1 halaman', business: '5 halaman', premium: '10 halaman' },
  { name: 'Desain Responsif', starter: true, business: true, premium: true },
  { name: 'Desain Kustom', starter: false, business: true, premium: true },
  { name: 'Formulir WhatsApp', starter: true, business: true, premium: true },
  { name: 'Domain Gratis', starter: '.my.id', business: '.my.id', premium: '.my.id' },
  { name: 'Hosting', starter: '1 tahun', business: '1 tahun', premium: '1 tahun' },
  { name: 'SSL Gratis', starter: true, business: true, premium: true },
  { name: 'SEO Dasar', starter: false, business: true, premium: true },
  { name: 'Google Analytics', starter: false, business: true, premium: true },
  { name: 'Animasi Interaktif', starter: false, business: false, premium: true },
  { name: 'Blog/Artikel', starter: false, business: false, premium: true },
  { name: 'Revisi Desain', starter: '1x', business: '2x', premium: 'Unlimited' },
  { name: 'Waktu Pengerjaan', starter: '3-5 hari', business: '5-7 hari', premium: '7-10 hari' },
  { name: 'Dukungan', starter: '7 hari', business: '14 hari', premium: '30 hari' },
];

// Add-ons
export interface AddOn {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  description: string;
}

export const addOns: AddOn[] = [
  {
    id: 'extra-pages',
    name: 'Halaman Tambahan',
    price: 75000,
    priceDisplay: 'Rp75.000/halaman',
    description: 'Tambahkan halaman ekstra sesuai kebutuhan Anda.',
  },
  {
    id: 'copywriting',
    name: 'Jasa Copywriting',
    price: 150000,
    priceDisplay: 'Rp150.000',
    description: 'Konten website profesional yang menarik dan menjual.',
  },
  {
    id: 'maintenance',
    name: 'Maintenance Bulanan',
    price: 100000,
    priceDisplay: 'Rp100.000/bulan',
    description: 'Update konten, backup rutin, dan monitoring website.',
  },
  {
    id: 'domain-com',
    name: 'Upgrade Domain .com',
    price: 150000,
    priceDisplay: 'Rp150.000/tahun',
    description: 'Upgrade ke domain .com untuk tampilan lebih profesional.',
  },
  {
    id: 'logo-design',
    name: 'Desain Logo',
    price: 250000,
    priceDisplay: 'Rp250.000',
    description: 'Desain logo profesional untuk brand Anda.',
  },
];

export function getPackageById(id: string): Package | undefined {
  return packages.find(p => p.id === id);
}

export function getPackageByTier(tier: PackageTier): Package | undefined {
  return packages.find(p => p.tier === tier);
}

export function getTierLevel(tier: PackageTier): number {
  const levels: Record<PackageTier, number> = {
    starter: 1,
    business: 2,
    premium: 3,
    custom: 4,
  };
  return levels[tier];
}
