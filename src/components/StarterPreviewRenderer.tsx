import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/context/OrderContext";
import { starterServices } from "@/data/services";
import { Check, MessageCircle, Zap, Clock } from "lucide-react";

interface StarterPreviewRendererProps {
  templateName: string;
  templateId: string;
}

export function StarterPreviewRenderer({
  templateName,
  templateId,
}: StarterPreviewRendererProps) {
  const { openOrderModal } = useOrder();

  useEffect(() => {
    // Track starter preview viewed event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "preview_viewed", {
        tier: "starter",
        template_id: templateId,
        template_name: templateName,
      });
    }
  }, [templateId, templateName]);

  const handleOrder = () => {
    openOrderModal("starter", templateId);
  };

  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-[5%] text-center relative z-10">
          <Badge variant="secondary" className="mb-6 inline-flex">
            <Zap className="w-3 h-3 mr-1" />
            Paket Starter
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {templateName}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Template profesional dan terjangkau untuk memulai kehadiran online Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleOrder}
              size="lg"
              className="text-base h-12 px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Order Sekarang
            </Button>
            <Button variant="outline" size="lg" className="text-base h-12 px-8">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tentang Template Ini
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Template Starter kami dirancang khusus untuk individu dan bisnis kecil
              yang ingin memiliki kehadiran online profesional tanpa harus mengeluarkan
              budget besar.
            </p>
            <p className="text-lg text-muted-foreground">
              Dengan desain modern, responsif di semua perangkat, dan fitur-fitur
              essential yang Anda butuhkan, template ini adalah solusi sempurna untuk
              memulai perjalanan digital Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Fitur Unggulan Paket Starter
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk memulai dalam satu paket terjangkau
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starterServices.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Harga Terjangkau, Kualitas Terjamin
            </h2>
            <div className="bg-card rounded-lg border p-8 md:p-12">
              <p className="text-muted-foreground mb-4">Paket Starter dimulai dari</p>
              <div className="text-4xl md:text-5xl font-bold mb-4">
                Rp350.000
              </div>
              <p className="text-muted-foreground mb-8">
                Termasuk domain, hosting 1 tahun, dan SSL gratis
              </p>

              <div className="space-y-3 mb-8 text-left inline-block">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>1 halaman utama profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Desain responsif (mobile, tablet, desktop)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>Pengerjaan 3-5 hari</span>
                </div>
              </div>

              <Button onClick={handleOrder} size="lg" className="w-full h-12">
                <MessageCircle className="w-4 h-4 mr-2" />
                Order di WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ada Pertanyaan?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tim kami siap membantu Anda. Hubungi kami melalui WhatsApp atau email
              untuk konsultasi gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleOrder}
                size="lg"
                className="text-base h-12 px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>
              <Button variant="outline" size="lg" className="text-base h-12 px-8">
                hello@tigaplus.id
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
