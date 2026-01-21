import { useEffect, useState } from "react";
import { useOrder } from "@/context/OrderContext";
import {
  PreviewProvider,
  PreviewFloatingMenu,
  PreviewCard,
  PreviewButton,
  getPreviewTheme,
  generateCSSVariables,
} from "@/components/preview-templates";
import { starterServices } from "@/data/services";
import styles from "./starter-preview-renderer.module.css";

interface StarterPreviewRendererProps {
  templateName: string;
  templateId: string;
}

export function StarterPreviewRenderer({
  templateName,
  templateId,
}: StarterPreviewRendererProps) {
  const { openOrderModal } = useOrder();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const theme = getPreviewTheme(templateId);

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
    setIsOrderModalOpen(true);
    openOrderModal("starter", templateId);

    // Track floating CTA click event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "floating_cta_clicked", {
        tier: "starter",
        template_id: templateId,
      });
    }
  };

  return (
    <div
      className={styles.previewContainer}
      style={generateCSSVariables(theme) as React.CSSProperties}
    >
      <PreviewProvider templateId={templateId}>
        {/* Floating CTA Menu - Always on top */}
        <PreviewFloatingMenu
          previewLabel="Mode Preview"
          ctaLabel="Miliki Website Ini"
          onCtaClick={handleOrder}
          variant="default"
          isOpen={!isOrderModalOpen}
        />

        {/* Main Content with padding to prevent floating menu overlap */}
        <div className={styles.mainContent}>
          {/* Hero/Banner Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroBackground}>
              <div className={styles.heroBlob1}></div>
              <div className={styles.heroBlob2}></div>
            </div>

            <div className={styles.heroContent}>
              <div className={styles.badge} aria-label="Package type">
                <span className={styles.badgeIcon}>⚡</span>
                <span>Paket Starter</span>
              </div>

              <h1 className={styles.heroTitle}>{templateName}</h1>

              <p className={styles.heroSubtitle}>
                Template profesional dan terjangkau untuk memulai kehadiran
                online Anda
              </p>

              <div className={styles.heroActions}>
                <PreviewButton
                  variant="primary"
                  size="lg"
                  onClick={handleOrder}
                  className={styles.ctaButton}
                >
                  Order Sekarang
                </PreviewButton>
                <PreviewButton
                  variant="outline"
                  size="lg"
                  className={styles.secondaryButton}
                >
                  Hubungi Kami
                </PreviewButton>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className={styles.aboutSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.aboutContent}>
                <h2 className={styles.sectionTitle}>Tentang Template Ini</h2>

                <PreviewCard padding="lg" className={styles.aboutCard}>
                  <p className={styles.aboutText}>
                    Template Starter kami dirancang khusus untuk individu dan
                    bisnis kecil yang ingin memiliki kehadiran online
                    profesional tanpa harus mengeluarkan budget besar.
                  </p>
                  <p className={styles.aboutText}>
                    Dengan desain modern, responsif di semua perangkat, dan
                    fitur-fitur essential yang Anda butuhkan, template ini
                    adalah solusi sempurna untuk memulai perjalanan digital
                    Anda.
                  </p>
                </PreviewCard>
              </div>
            </div>
          </section>

          {/* Services/Features Section */}
          <section className={styles.servicesSection}>
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle}>Fitur Unggulan Paket Starter</h2>
              <p className={styles.sectionSubtitle}>
                Semua yang Anda butuhkan untuk memulai dalam satu paket
                terjangkau
              </p>

              <div className={styles.servicesGrid}>
                {starterServices.map((service) => (
                  <PreviewCard
                    key={service.id}
                    elevated
                    hoverable
                    padding="md"
                    className={styles.serviceCard}
                  >
                    <div className={styles.serviceIcon}>✓</div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                  </PreviewCard>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className={styles.pricingSection}>
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle}>
                Harga Terjangkau, Kualitas Terjamin
              </h2>

              <PreviewCard padding="lg" className={styles.pricingCard}>
                <p className={styles.pricingLabel}>
                  Paket Starter dimulai dari
                </p>
                <div className={styles.pricingAmount}>Rp350.000</div>
                <p className={styles.pricingDescription}>
                  Termasuk domain, hosting 1 tahun, dan SSL gratis
                </p>

                <div className={styles.pricingFeatures}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>1 halaman utama profesional</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>Desain responsif (mobile, tablet, desktop)</span>
                  </div>
                  <div className={styles.featureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    <span>Pengerjaan 3-5 hari</span>
                  </div>
                </div>

                <PreviewButton
                  variant="primary"
                  size="lg"
                  onClick={handleOrder}
                  className={styles.pricingCta}
                  fullWidth
                >
                  Order di WhatsApp
                </PreviewButton>
              </PreviewCard>
            </div>
          </section>

          {/* Contact Section */}
          <section className={styles.contactSection}>
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle}>Ada Pertanyaan?</h2>
              <p className={styles.sectionSubtitle}>
                Tim kami siap membantu Anda. Hubungi kami melalui WhatsApp atau
                email untuk konsultasi gratis.
              </p>

              <div className={styles.contactActions}>
                <PreviewButton
                  variant="primary"
                  size="lg"
                  onClick={handleOrder}
                >
                  Chat WhatsApp
                </PreviewButton>
                <PreviewButton
                  variant="outline"
                  size="lg"
                >
                  hello@tigaplus.id
                </PreviewButton>
              </div>
            </div>
          </section>
        </div>
      </PreviewProvider>
    </div>
  );
}
