import { useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/context/OrderContext";
import { packages, comparisonFeatures, addOns } from "@/data/packages";
import { Check, X, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PackagesPage() {
  const { openOrderModal } = useOrder();
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);

  const toggleFeature = (id: string) => {
    setExpandedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleOrder = (pkgId: string) => {
    openOrderModal(pkgId);
  };

  const pricedPackages = packages.filter((p) => !p.isCustom);
  const customPackage = packages.find((p) => p.isCustom);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Harga Transparan
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pilih Paket Terbaik
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Semua paket sudah termasuk domain, hosting, dan SSL gratis selama 1 tahun.
            Pilih yang sesuai kebutuhan bisnis Anda.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} onOrder={handleOrder} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table - Desktop */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perbandingan Fitur
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lihat detail fitur yang didapat dari setiap paket
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full bg-background rounded-lg border">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-4 text-left font-semibold">Fitur</th>
                  {pricedPackages.map((pkg) => (
                    <th key={pkg.id} className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold">{pkg.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {pkg.priceDisplay}
                        </span>
                        {pkg.isPopular && (
                          <Badge variant="default" className="text-xs">
                            Populer
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "border-b",
                      index % 2 === 0 ? "bg-muted/30" : ""
                    )}
                  >
                    <td className="px-6 py-4 font-medium">{feature.name}</td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.starter)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.business)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderFeatureValue(feature.premium)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50">
                  <td className="px-6 py-4"></td>
                  {pricedPackages.map((pkg) => (
                    <td key={pkg.id} className="px-6 py-4 text-center">
                      <Button
                        onClick={() => handleOrder(pkg.id)}
                        variant={pkg.isPopular ? "default" : "outline"}
                        className="w-full"
                      >
                        Pilih {pkg.name}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile accordion */}
          <div className="lg:hidden space-y-4">
            {pricedPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={cn(pkg.isPopular && "border-primary")}
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleFeature(pkg.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        {pkg.isPopular && (
                          <Badge variant="default" className="text-xs">
                            Populer
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{pkg.priceDisplay}</CardDescription>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform",
                        expandedFeatures.includes(pkg.id) && "rotate-180"
                      )}
                    />
                  </div>
                </CardHeader>
                {expandedFeatures.includes(pkg.id) && (
                  <CardContent>
                    <div className="space-y-3">
                      {comparisonFeatures.map((feature, index) => {
                        const value =
                          pkg.tier === "starter"
                            ? feature.starter
                            : pkg.tier === "business"
                            ? feature.business
                            : feature.premium;

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <span className="text-sm">{feature.name}</span>
                            <span>{renderFeatureValue(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <Button
                      onClick={() => handleOrder(pkg.id)}
                      variant={pkg.isPopular ? "default" : "outline"}
                      className="w-full mt-4"
                    >
                      Pilih {pkg.name}
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Custom package note */}
          {customPackage && (
            <div className="mt-8 p-6 bg-background rounded-lg border-2 border-dashed text-center">
              <h3 className="text-xl font-semibold mb-2">{customPackage.name}</h3>
              <p className="text-muted-foreground mb-4">
                {customPackage.description}
              </p>
              <Button
                onClick={() => handleOrder(customPackage.id)}
                variant="outline"
              >
                Konsultasi Gratis
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-[5%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Add-ons & Layanan Tambahan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tingkatkan website Anda dengan layanan tambahan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <Card key={addon.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline">{addon.priceDisplay}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{addon.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {addon.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Butuh layanan yang tidak ada di list?
            </p>
            <Button onClick={() => openOrderModal("custom")} variant="outline">
              Konsultasikan Kebutuhan Anda
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function renderFeatureValue(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-green-600 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
}
