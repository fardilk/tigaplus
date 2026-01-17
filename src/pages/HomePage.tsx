import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TemplateCard } from "@/components/TemplateCard";
import { useOrder } from "@/context/OrderContext";
import { packages } from "@/data/packages";
import { getFeaturedTemplates } from "@/data/templates";
import {
  Zap,
  Shield,
  DollarSign,
  Layers,
  Smartphone,
  RefreshCw,
  Search,
  Headphones,
  Package,
  Eye,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Core values data
const coreValues = [
  {
    icon: Zap,
    title: "Pengerjaan Cepat",
    description: "Website selesai dalam 3-10 hari kerja, tergantung paket yang dipilih.",
  },
  {
    icon: Shield,
    title: "Stabil & Andal",
    description: "Hosting terpercaya dengan uptime tinggi dan SSL gratis untuk keamanan.",
  },
  {
    icon: DollarSign,
    title: "Harga Transparan",
    description: "Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga final.",
  },
  {
    icon: Layers,
    title: "Proses Simpel",
    description: "Pilih paket, tentukan template, order via WhatsApp. Semudah itu!",
  },
];

// Supporting points
const supportingPoints = [
  { icon: Smartphone, text: "Mobile-first design" },
  { icon: RefreshCw, text: "Revisi sesuai paket" },
  { icon: Search, text: "SEO-ready structure" },
  { icon: Headphones, text: "Support pasca launch" },
];

// How it works steps
const howItWorks = [
  {
    step: 1,
    icon: Package,
    title: "Pilih Paket",
    description: "Tentukan paket yang sesuai dengan kebutuhan dan budget Anda.",
  },
  {
    step: 2,
    icon: Eye,
    title: "Pilih Template",
    description: "Lihat preview template dan pilih yang cocok untuk bisnis Anda.",
  },
  {
    step: 3,
    icon: MessageCircle,
    title: "Order via WhatsApp",
    description: "Isi form order dan langsung terhubung dengan tim kami via WhatsApp.",
  },
];

// FAQ data
const faqs = [
  {
    question: "Berapa lama waktu pengerjaan website?",
    answer: "Waktu pengerjaan tergantung paket: Starter 3-5 hari, Business 5-7 hari, Premium 7-10 hari. Untuk paket custom, waktu akan disesuaikan dengan kompleksitas project.",
  },
  {
    question: "Apakah bisa request revisi?",
    answer: "Tentu! Paket Starter mendapat 1x revisi, Business 2x revisi, dan Premium unlimited revisi selama 14 hari. Revisi di luar kuota akan dikenakan biaya tambahan.",
  },
  {
    question: "Apakah domain dan hosting termasuk?",
    answer: "Ya, semua paket sudah termasuk domain gratis .my.id dan hosting selama 1 tahun. Untuk domain .com atau TLD lainnya, ada biaya tambahan.",
  },
  {
    question: "Bagaimana cara pembayarannya?",
    answer: "Pembayaran dilakukan 50% di awal sebagai DP, dan 50% sisanya setelah website selesai dan siap publish. Kami menerima transfer bank dan e-wallet.",
  },
  {
    question: "Apakah saya bisa edit sendiri setelah website jadi?",
    answer: "Untuk konten dasar seperti teks dan gambar, kami akan memberikan panduan. Untuk perubahan struktur atau fitur, silakan hubungi tim kami.",
  },
  {
    question: "Apakah ada garansi?",
    answer: "Ya, kami memberikan garansi support sesuai paket: Starter 7 hari, Business 14 hari, Premium 30 hari. Untuk bug dan error, kami perbaiki gratis.",
  },
  {
    question: "Bagaimana jika saya butuh fitur tambahan?",
    answer: "Anda bisa memilih add-on yang tersedia atau konsultasikan kebutuhan spesifik Anda. Tim kami akan memberikan penawaran sesuai kebutuhan.",
  },
];

export default function HomePage() {
  const { openOrderModal } = useOrder();
  const featuredTemplates = getFeaturedTemplates(6);
  const pricedPackages = packages.filter((p) => !p.isCustom);
  const customPackage = packages.find((p) => p.isCustom);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Website Profesional Mulai Rp350rb
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Website Profesional untuk{" "}
              <span className="text-primary">Bisnis Anda</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dapatkan website modern, responsif, dan cepat dengan harga terjangkau. 
              Proses mudah, hasil profesional, dan delivery cepat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/packages">
                <Button size="lg" className="w-full sm:w-auto">
                  Lihat Paket
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/preview">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Eye className="w-4 h-4 mr-2" />
                  Lihat Preview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why TigaPlus Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa TigaPlus?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan solusi website terbaik untuk bisnis Anda
            </p>
          </div>

          {/* Core values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Supporting points */}
          <div className="flex flex-wrap justify-center gap-4">
            {supportingPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border"
              >
                <point.icon className="w-4 h-4 text-primary" />
                <span className="text-sm">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cara Kerjanya
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hanya 3 langkah mudah untuk memiliki website profesional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Previews Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Template Pilihan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lihat berbagai template website yang bisa Anda pilih
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/preview">
              <Button variant="outline" size="lg">
                Lihat Semua Preview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mini Packages Teaser */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Paket Harga
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {pricedPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={cn(
                  "text-center hover:shadow-lg transition-all flex flex-col",
                  pkg.isPopular && "border-primary shadow-md"
                )}
              >
                {pkg.isPopular && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3">
                    Paling Populer
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <p className="text-2xl font-bold">{pkg.priceDisplay}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{pkg.highlight}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    onClick={() => openOrderModal(pkg.id)}
                    variant={pkg.isPopular ? "default" : "outline"}
                    className="w-full"
                  >
                    Pilih Paket
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Custom package card */}
            {customPackage && (
              <Card className="text-center hover:shadow-lg transition-all flex flex-col border-dashed border-2">
                <CardHeader>
                  <CardTitle>{customPackage.name}</CardTitle>
                  <p className="text-xl font-semibold text-muted-foreground">
                    {customPackage.priceDisplay}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {customPackage.highlight}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    onClick={() => openOrderModal(customPackage.id)}
                    variant="outline"
                    className="w-full"
                  >
                    Konsultasi
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="text-center">
            <Link to="/packages">
              <Button variant="outline" size="lg">
                Lihat Detail Paket
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform",
                      openFaq === index && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memiliki Website Profesional?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan website Anda sekarang. Tim kami siap membantu!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => openOrderModal()}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Order Sekarang
            </Button>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary border border-primary hover:bg-gray-100">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
