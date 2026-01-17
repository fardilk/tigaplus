import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { packages, getPackageById, getTierLevel } from "@/data/packages";
import { templates, getTemplateById } from "@/data/templates";
import { generateWhatsAppMessage, generateWhatsAppUrl, WHATSAPP_PHONE } from "@/context/OrderContext";
import { MessageCircle, Copy, Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderFormProps {
  initialPackage?: string | null;
  initialTemplate?: string | null;
  embedded?: boolean;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  whatsapp: string;
  packageId: string;
  templateId: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  packageId?: string;
}

export function OrderForm({
  initialPackage,
  initialTemplate,
  embedded = false,
  onSuccess,
}: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    packageId: initialPackage || "",
    templateId: initialTemplate || "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "copied">("idle");
  const [tierWarning, setTierWarning] = useState<string | null>(null);

  // Update form when initial values change
  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({ ...prev, packageId: initialPackage }));
    }
    if (initialTemplate) {
      setFormData((prev) => ({ ...prev, templateId: initialTemplate }));
    }
  }, [initialPackage, initialTemplate]);

  // Check tier compatibility
  useEffect(() => {
    if (formData.packageId && formData.templateId) {
      const pkg = getPackageById(formData.packageId);
      const template = getTemplateById(formData.templateId);

      if (pkg && template && pkg.tier !== "custom") {
        const pkgLevel = getTierLevel(pkg.tier);
        const templateLevel = getTierLevel(template.includedTier);

        if (pkgLevel < templateLevel) {
          const requiredPkg = packages.find((p) => p.tier === template.includedTier);
          setTierWarning(
            `Template "${template.name}" membutuhkan paket ${requiredPkg?.name || template.includedTier} atau lebih tinggi.`
          );
        } else {
          setTierWarning(null);
        }
      } else {
        setTierWarning(null);
      }
    } else {
      setTierWarning(null);
    }
  }, [formData.packageId, formData.templateId]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.whatsapp.replace(/\s/g, ""))) {
      newErrors.whatsapp = "Format nomor WhatsApp tidak valid";
    }

    if (!formData.packageId) {
      newErrors.packageId = "Pilih paket terlebih dahulu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const pkg = getPackageById(formData.packageId);
    const template = formData.templateId ? getTemplateById(formData.templateId) : undefined;

    const message = generateWhatsAppMessage({
      name: formData.name,
      whatsapp: formData.whatsapp,
      packageName: pkg?.name || formData.packageId,
      templateName: template?.name,
      notes: formData.notes,
    });

    const url = generateWhatsAppUrl(message);

    // Open WhatsApp in new tab
    window.open(url, "_blank");

    setIsSubmitting(false);
    setSubmitState("success");
    onSuccess?.();

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitState("idle");
    }, 3000);
  };

  const handleCopyMessage = () => {
    const pkg = getPackageById(formData.packageId);
    const template = formData.templateId ? getTemplateById(formData.templateId) : undefined;

    const message = generateWhatsAppMessage({
      name: formData.name || "[Nama Anda]",
      whatsapp: formData.whatsapp || "[Nomor WhatsApp]",
      packageName: pkg?.name || "[Pilih Paket]",
      templateName: template?.name,
      notes: formData.notes,
    });

    navigator.clipboard.writeText(message);
    setSubmitState("copied");

    setTimeout(() => {
      setSubmitState("idle");
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const packageOptions = [
    { value: "", label: "Pilih paket..." },
    ...packages.map((p) => ({
      value: p.id,
      label: p.isCustom ? p.name : `${p.name} - ${p.priceDisplay}`,
    })),
  ];

  const templateOptions = [
    { value: "", label: "Pilih template (opsional)..." },
    ...templates.map((t) => ({
      value: t.id,
      label: `${t.name} (${t.categoryLabel})`,
    })),
  ];

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", embedded && "bg-card")}>
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nama Lengkap <span className="text-destructive">*</span>
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          className={cn(errors.name && "border-destructive")}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <label htmlFor="whatsapp" className="text-sm font-medium">
          Nomor WhatsApp <span className="text-destructive">*</span>
        </label>
        <Input
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="08xxxxxxxxxx"
          className={cn(errors.whatsapp && "border-destructive")}
        />
        {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
      </div>

      {/* Package */}
      <div className="space-y-2">
        <label htmlFor="packageId" className="text-sm font-medium">
          Pilih Paket <span className="text-destructive">*</span>
        </label>
        <Select
          id="packageId"
          name="packageId"
          value={formData.packageId}
          onChange={handleChange}
          options={packageOptions}
          className={cn(errors.packageId && "border-destructive")}
        />
        {errors.packageId && <p className="text-sm text-destructive">{errors.packageId}</p>}
      </div>

      {/* Template */}
      <div className="space-y-2">
        <label htmlFor="templateId" className="text-sm font-medium">
          Pilih Template
        </label>
        <Select
          id="templateId"
          name="templateId"
          value={formData.templateId}
          onChange={handleChange}
          options={templateOptions}
        />
      </div>

      {/* Tier Warning */}
      {tierWarning && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm">{tierWarning}</p>
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Catatan Tambahan
        </label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Jelaskan kebutuhan website Anda..."
          rows={3}
        />
      </div>

      {/* Submit buttons */}
      <div className="space-y-2 pt-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || submitState === "success"}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Membuka WhatsApp...
            </>
          ) : submitState === "success" ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              WhatsApp Terbuka!
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4 mr-2" />
              Order via WhatsApp
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleCopyMessage}
        >
          {submitState === "copied" ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Pesan Disalin!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Salin Pesan
            </>
          )}
        </Button>
      </div>

      {/* WhatsApp number info */}
      <p className="text-xs text-center text-muted-foreground">
        WhatsApp: +{WHATSAPP_PHONE.slice(0, 2)} {WHATSAPP_PHONE.slice(2, 5)}-{WHATSAPP_PHONE.slice(5, 9)}-{WHATSAPP_PHONE.slice(9)}
      </p>
    </form>
  );
}
