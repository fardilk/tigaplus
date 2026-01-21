export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export const starterServices: Service[] = [
  {
    id: 'responsive',
    title: 'Desain Responsif',
    description: 'Website yang sempurna di semua perangkat - desktop, tablet, dan mobile.',
  },
  {
    id: 'fast-delivery',
    title: 'Pengerjaan Cepat',
    description: 'Selesai dalam 3-5 hari kerja. Website Anda siap online segera.',
  },
  {
    id: 'seo-ready',
    title: 'SEO Friendly',
    description: 'Dioptimasi untuk mesin pencari agar mudah ditemukan di Google.',
  },
  {
    id: 'hosting-included',
    title: 'Hosting Gratis 1 Tahun',
    description: 'Domain .my.id atau subdomain gratis + hosting reliable dengan SSL.',
  },
  {
    id: 'contact-form',
    title: 'Formulir Kontak WhatsApp',
    description: 'Pengunjung bisa langsung hubungi Anda melalui WhatsApp.',
  },
  {
    id: 'support',
    title: 'Support & Maintenance',
    description: 'Kami siap membantu jika ada yang perlu diperbarui atau diperbaiki.',
  },
];
