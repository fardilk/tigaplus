import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderForm } from "@/components/OrderForm";
import { WHATSAPP_PHONE } from "@/context/OrderContext";
import { MessageCircle, Mail, Clock, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialPackage = searchParams.get("package");
  const initialTemplate = searchParams.get("template");

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <MessageCircle className="w-3 h-3 mr-1" />
            Hubungi Kami
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Siap Membantu Anda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Punya pertanyaan atau siap memesan? Tim kami siap membantu Anda 
            mewujudkan website profesional.
          </p>
        </div>
      </section>

      {/* Two column layout */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
                
                <div className="space-y-6">
                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <p className="text-muted-foreground mb-1">
                        +{WHATSAPP_PHONE.slice(0, 2)} {WHATSAPP_PHONE.slice(2, 5)}-{WHATSAPP_PHONE.slice(5, 9)}-{WHATSAPP_PHONE.slice(9)}
                      </p>
                      <a
                        href={`https://wa.me/${WHATSAPP_PHONE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Chat sekarang →
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground mb-1">
                        hello@tigaplus.id
                      </p>
                      <a
                        href="mailto:hello@tigaplus.id"
                        className="text-sm text-primary hover:underline"
                      >
                        Kirim email →
                      </a>
                    </div>
                  </div>

                  {/* Working hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Jam Kerja</h3>
                      <p className="text-muted-foreground">
                        Senin - Jumat: 09:00 - 18:00 WIB
                      </p>
                      <p className="text-muted-foreground">
                        Sabtu: 09:00 - 15:00 WIB
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Lokasi</h3>
                      <p className="text-muted-foreground">
                        Indonesia (Remote)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Respon Cepat</h3>
                      <p className="text-sm text-muted-foreground">
                        Kami berkomitmen membalas pesan Anda dalam waktu maksimal 
                        2 jam pada jam kerja. Untuk pertanyaan mendesak, 
                        silakan hubungi via WhatsApp.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ teaser */}
              <div>
                <h3 className="font-semibold mb-3">Pertanyaan Umum</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Berapa lama waktu pengerjaan?
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Apakah domain dan hosting sudah termasuk?
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Bagaimana cara pembayaran?
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Apakah bisa request revisi?
                  </li>
                </ul>
                <a
                  href="/#faq"
                  className="text-sm text-primary hover:underline inline-block mt-2"
                >
                  Lihat semua FAQ →
                </a>
              </div>
            </div>

            {/* Right: Order form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Form Pemesanan</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Lengkapi form berikut dan kami akan menghubungi Anda via WhatsApp
                  </p>
                </CardHeader>
                <CardContent>
                  <OrderForm
                    initialPackage={initialPackage}
                    initialTemplate={initialTemplate}
                    embedded
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
