import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/context/OrderContext";
import { MessageCircle, ArrowRight, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Attar Asmawan",
    role: "Project Lead & Business Development",
    description:
      "Project Lead and Business Development specialist. Currently CEO of Sevenrose, ready to help with growth and business expansion.",
    image: "https://cdn-fardil-2025.s3.us-east-2.amazonaws.com/tigaplus/attar.jpg",
  },
  {
    id: 2,
    name: "Andika Pradana Putra",
    role: "Creative Director & UI/UX Expert",
    description:
      "Creative Director and UI/UX expert with extensive experience. Former Creative Director at MocaasTV, bringing design excellence to every project.",
    image: "https://cdn-fardil-2025.s3.us-east-2.amazonaws.com/tigaplus/andika.jpg",
  },
  {
    id: 3,
    name: "Fardil Khalidi",
    role: "Web Development Expert",
    description:
      "Expert in website development with deep expertise in the healthcare industry. Currently involved in Hospital industry development at Primya Hospital.",
    image: "https://cdn-fardil-2025.s3.us-east-2.amazonaws.com/tigaplus/fardil.jpg",
  },
];

export default function OurTeamPage() {
  const { openOrderModal } = useOrder();
  const [hoveredTeamId, setHoveredTeamId] = useState<number | null>(null);

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
              <Users className="w-3 h-3 mr-1" />
              Tim Profesional TigaPlus
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Berkenalan dengan{" "}
              <span className="text-primary">Tim Kami</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tim profesional yang berdedikasi untuk memberikan solusi website
              terbaik untuk bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Siapa Kita Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siapa Kita?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              TigaPlus adalah tim yang terdiri dari developer, designer, dan
              project manager berpengalaman dalam industri web development. Kami
              memahami kebutuhan bisnis Anda dan berkomitmen untuk memberikan
              solusi website yang tidak hanya profesional, tetapi juga
              menghasilkan ROI yang nyata.
            </p>
            <p className="text-lg text-muted-foreground">
              Dengan pengalaman bertahun-tahun, kami telah membantu ratusan bisnis
              dari berbagai industri untuk memiliki kehadiran online yang kuat dan
              efektif.
            </p>
          </div>
        </div>
      </section>

      {/* Apa Visi Kita Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Apa Visi Kita?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Visi kami adalah menjadi mitra terpercaya dalam transformasi digital
              bisnis Anda. Kami percaya bahwa setiap bisnis, besar atau kecil,
              berhak memiliki website berkualitas tinggi dengan harga yang
              terjangkau.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Misi kami adalah menyediakan layanan pembuatan website yang:
            </p>
            <ul className="text-lg text-muted-foreground space-y-2 pl-4">
              <li>✓ Cepat dan efisien dalam proses pengerjaan</li>
              <li>✓ Berkualitas tinggi dengan standar internasional</li>
              <li>✓ Transparan dalam harga dan proses</li>
              <li>✓ Memberikan dukungan berkelanjutan setelah launch</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tim Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesional berpengalaman siap mewujudkan website impian Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredTeamId(member.id)}
                onMouseLeave={() => setHoveredTeamId(null)}
                className="h-full"
              >
                <Card
                  className={cn(
                    "h-full flex flex-col overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg",
                    hoveredTeamId === member.id && "shadow-lg"
                  )}
                >
                  {/* Avatar Section */}
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-sm text-primary font-semibold">
                      {member.role}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p
                      className={cn(
                        "text-muted-foreground transition-all duration-300",
                        hoveredTeamId === member.id
                          ? "opacity-100 h-auto"
                          : "opacity-0 h-0 overflow-hidden"
                      )}
                    >
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Membuat Website Impian Anda?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hubungi tim kami sekarang untuk konsultasi gratis dan penawaran
              khusus untuk website Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => openOrderModal()}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Hubungi Kami Sekarang
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Lihat Form Kontak
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
