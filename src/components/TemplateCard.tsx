import { Template } from "@/data/templates";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { PackageTier } from "@/data/packages";

interface TemplateCardProps {
  template: Template;
  showDetails?: boolean;
}

const tierLabels: Record<PackageTier, string> = {
  starter: "Starter",
  business: "Business",
  premium: "Premium",
  custom: "Custom",
};

export function TemplateCard({ template, showDetails = true }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all">
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
          <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 px-4">
          <Link to={`/preview/${template.id}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Lihat Detail
            </Button>
          </Link>
          {template.includedTier === "starter" && (
            <Link to={`/preview/${template.id}?tier=starter&mode=preview`} className="flex-1">
              <Button variant="secondary" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </Link>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{template.name}</h3>
          <Badge variant={template.includedTier as "starter" | "business" | "premium"} className="shrink-0">
            {tierLabels[template.includedTier]}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {template.categoryLabel}
        </Badge>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.shortDescription}
        </p>
      </CardContent>

      {showDetails && (
        <CardFooter className="pt-2">
          <Link to={`/preview/${template.id}`} className="w-full">
            <Button variant="ghost" className="w-full" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Lihat Detail
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
