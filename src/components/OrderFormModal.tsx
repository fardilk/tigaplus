import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "@/components/ui/dialog";
import { OrderForm } from "@/components/OrderForm";
import { useOrder } from "@/context/OrderContext";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderFormModal() {
  const { isOrderModalOpen, closeOrderModal, selectedPackage, selectedTemplate } = useOrder();

  return (
    <Dialog open={isOrderModalOpen} onClose={closeOrderModal}>
      <div className="flex items-center justify-between mb-4">
        <DialogHeader>
          <DialogTitle>Order Website</DialogTitle>
          <DialogDescription>
            Lengkapi form berikut untuk memesan website Anda via WhatsApp
          </DialogDescription>
        </DialogHeader>
        <Button variant="ghost" size="icon" onClick={closeOrderModal} className="shrink-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <DialogContent>
        <OrderForm
          initialPackage={selectedPackage}
          initialTemplate={selectedTemplate}
          onSuccess={closeOrderModal}
        />
      </DialogContent>
    </Dialog>
  );
}
