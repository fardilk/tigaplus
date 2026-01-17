import { Package } from "@/data/packages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  pkg: Package;
  onOrder: (pkgId: string) => void;
}

export function PricingCard({ pkg, onOrder }: PricingCardProps) {
  const isCustom = pkg.isCustom;
  const isPopular = pkg.isPopular;

  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all hover:shadow-lg",
        isPopular && "border-primary shadow-md scale-[1.02]",
        isCustom && "border-dashed border-2"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Paling Populer
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl">{pkg.name}</CardTitle>
        <CardDescription className="text-sm">{pkg.highlight}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="text-center mb-6">
          <span className={cn(
            "text-3xl font-bold",
            isCustom && "text-xl"
          )}>
            {pkg.priceDisplay}
          </span>
          {!isCustom && <span className="text-muted-foreground text-sm"> / website</span>}
        </div>

        <ul className="space-y-2">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={() => onOrder(pkg.id)}
          className="w-full"
          variant={isPopular ? "default" : isCustom ? "outline" : "secondary"}
        >
          {isCustom ? "Konsultasi via WhatsApp" : "Order via WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  );
}
