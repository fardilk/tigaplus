import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface OrderState {
  selectedPackage: string | null;
  selectedTemplate: string | null;
  isOrderModalOpen: boolean;
}

interface OrderContextType extends OrderState {
  setSelectedPackage: (pkg: string | null) => void;
  setSelectedTemplate: (template: string | null) => void;
  openOrderModal: (pkg?: string, template?: string) => void;
  closeOrderModal: () => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OrderState>({
    selectedPackage: null,
    selectedTemplate: null,
    isOrderModalOpen: false,
  });

  const setSelectedPackage = useCallback((pkg: string | null) => {
    setState(prev => ({ ...prev, selectedPackage: pkg }));
  }, []);

  const setSelectedTemplate = useCallback((template: string | null) => {
    setState(prev => ({ ...prev, selectedTemplate: template }));
  }, []);

  const openOrderModal = useCallback((pkg?: string, template?: string) => {
    setState(prev => ({
      ...prev,
      isOrderModalOpen: true,
      selectedPackage: pkg ?? prev.selectedPackage,
      selectedTemplate: template ?? prev.selectedTemplate,
    }));
  }, []);

  const closeOrderModal = useCallback(() => {
    setState(prev => ({ ...prev, isOrderModalOpen: false }));
  }, []);

  const resetOrder = useCallback(() => {
    setState({
      selectedPackage: null,
      selectedTemplate: null,
      isOrderModalOpen: false,
    });
  }, []);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setSelectedPackage,
        setSelectedTemplate,
        openOrderModal,
        closeOrderModal,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

// Helper to parse query params
export function parseOrderParams(searchParams: URLSearchParams): {
  package?: string;
  template?: string;
} {
  return {
    package: searchParams.get('package') || undefined,
    template: searchParams.get('template') || undefined,
  };
}

// Helper to build query string
export function buildOrderParams(pkg?: string, template?: string): string {
  const params = new URLSearchParams();
  if (pkg) params.set('package', pkg);
  if (template) params.set('template', template);
  const str = params.toString();
  return str ? `?${str}` : '';
}

// WhatsApp phone number (placeholder - replace with actual number)
export const WHATSAPP_PHONE = '6281234567890';

// Generate WhatsApp message
export function generateWhatsAppMessage(data: {
  name: string;
  whatsapp: string;
  packageName: string;
  templateName?: string;
  notes?: string;
}): string {
  const lines = [
    `Halo TigaPlus! 👋`,
    ``,
    `Saya ingin memesan website:`,
    ``,
    `*Nama:* ${data.name}`,
    `*WhatsApp:* ${data.whatsapp}`,
    `*Paket:* ${data.packageName}`,
  ];

  if (data.templateName) {
    lines.push(`*Template:* ${data.templateName}`);
  }

  if (data.notes) {
    lines.push(``, `*Catatan:*`, data.notes);
  }

  lines.push(``, `Mohon informasi lebih lanjut. Terima kasih! 🙏`);

  return lines.join('\n');
}

// Generate WhatsApp URL
export function generateWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
