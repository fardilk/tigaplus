import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useOrder } from "@/context/OrderContext";
import { getTemplateById } from "@/data/templates";
import { packages, getTierLevel, PackageTier } from "@/data/packages";
import { 
  ArrowLeft, 
  Check, 
  ImageIcon, 
  MessageCircle, 
  AlertTriangle,
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

const tierLabels: Record<PackageTier, string> = {
  starter: "Starter",
  business: "Business",
  premium: "Premium",
  custom: "Custom",
};

export default function PreviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { openOrderModal, selectedPackage } = useOrder();

  const template = id ? getTemplateById(id) : undefined;

  if (!template) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Template tidak ditemukan</h1>
        <p className="text-muted-foreground mb-8">
          Template yang Anda cari tidak tersedia.
        </p>
        <Link to="/preview">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Preview
          </Button>
        </Link>
      </div>
    );
  }

  const templateTierLevel = getTierLevel(template.includedTier);
  const selectedPkgLevel = selectedPackage 
    ? getTierLevel(packages.find(p => p.id === selectedPackage)?.tier || 'starter')
    : 0;
  
  const needsUpgrade = selectedPackage && selectedPkgLevel < templateTierLevel;
  const minimumPackage = packages.find(p => p.tier === template.includedTier);

  const handleOrder = () => {
    // If user needs upgrade, suggest the minimum required package
    if (needsUpgrade && minimumPackage) {
      openOrderModal(minimumPackage.id, template.id);
    } else {
      openOrderModal(selectedPackage || minimumPackage?.id, template.id);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/preview" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali ke Preview
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main image placeholder */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
                <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
              </div>
            </div>

            {/* Gallery placeholders */}
            <div className="grid grid-cols-3 gap-4">
              {template.gallery.map((_, index) => (
                <div
                  key={index}
                  className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all"
                >
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
              <p className="text-muted-foreground leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Key features */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Fitur Utama</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {template.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                  >
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Template info card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Title and badges */}
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{template.name}</h1>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={template.includedTier as "starter" | "business" | "premium"}>
                          {tierLabels[template.includedTier]}
                        </Badge>
                        <Badge variant="outline">{template.categoryLabel}</Badge>
                      </div>
                    </div>

                    {/* Short description */}
                    <p className="text-muted-foreground text-sm">
                      {template.shortDescription}
                    </p>

                    {/* Minimum package info */}
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Tersedia di paket:</span>{" "}
                        <span className="font-semibold">
                          {tierLabels[template.includedTier]} ke atas
                        </span>
                      </p>
                      {minimumPackage && minimumPackage.price && (
                        <p className="text-sm text-muted-foreground">
                          Mulai dari {minimumPackage.priceDisplay}
                        </p>
                      )}
                    </div>

                    {/* Upgrade warning */}
                    {needsUpgrade && minimumPackage && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium">Upgrade diperlukan</p>
                          <p>
                            Paket yang Anda pilih tidak mencakup template ini. 
                            Upgrade ke paket {minimumPackage.name} untuk menggunakan template ini.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CTA buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleOrder}
                        className="w-full"
                        size="lg"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {needsUpgrade 
                          ? `Order dengan ${minimumPackage?.name}` 
                          : "Order Template Ini"
                        }
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        disabled
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Preview Demo
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Segera
                        </Badge>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related packages */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Paket Tersedia</h3>
                  <div className="space-y-2">
                    {packages
                      .filter((pkg) => !pkg.isCustom && getTierLevel(pkg.tier) >= templateTierLevel)
                      .map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => openOrderModal(pkg.id, template.id)}
                          className={cn(
                            "w-full p-3 rounded-lg border text-left transition-colors hover:bg-muted/50",
                            pkg.isPopular && "border-primary"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{pkg.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {pkg.priceDisplay}
                              </p>
                            </div>
                            {pkg.isPopular && (
                              <Badge variant="default" className="text-xs">
                                Populer
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
