import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/TemplateCard";
import { Badge } from "@/components/ui/badge";
import { templates, categories, tierFilters, TemplateCategory } from "@/data/templates";
import { PackageTier } from "@/data/packages";
import { Search, LayoutGrid, Zap, ArrowRight } from "lucide-react";

type TierFilter = PackageTier | "all";
type CategoryFilter = TemplateCategory | "all";

export default function PreviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Tier filter
      const matchesTier =
        tierFilter === "all" || template.includedTier === tierFilter;

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || template.category === categoryFilter;

      return matchesSearch && matchesTier && matchesCategory;
    });
  }, [searchQuery, tierFilter, categoryFilter]);

  const activeFiltersCount = [
    tierFilter !== "all",
    categoryFilter !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setTierFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <LayoutGrid className="w-3 h-3 mr-1" />
            {templates.length} Template Tersedia
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Preview Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jelajahi koleksi template website kami. Pilih yang sesuai dengan bisnis Anda
            dan mulai order via WhatsApp.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-30">
        <div className="container mx-auto px-[5%]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari template..."
                className="pl-10 w-full"
              />
            </div>

            {/* Paket Filter */}
            <div className="w-full lg:w-48">
              <Select
                options={tierFilters}
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as TierFilter)}
              />
            </div>

            {/* Kategori Filter */}
            <div className="w-full lg:w-56">
              <Select
                options={categories}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              />
            </div>
          </div>

          {/* Active filters summary */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                {filteredTemplates.length} hasil ditemukan
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Reset filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Starter Preview Banner */}
      <section className="py-12 md:py-16 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-[5%]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="default" className="gap-1">
                  <Zap className="w-3 h-3" />
                  Paket Terpopuler
                </Badge>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Starter Package Preview
              </h3>
              <p className="text-muted-foreground mb-4 md:mb-0">
                Lihat langsung seperti apa tampilan website Starter Anda. Hemat, profesional, dan cepat jadi dalam 3-5 hari.
              </p>
            </div>
            <Link to="/preview/personal-01?tier=starter&mode=preview" className="shrink-0">
              <Button size="lg" className="gap-2">
                Lihat Preview Starter
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-[5%]">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Template tidak ditemukan
              </h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Reset semua filter
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
