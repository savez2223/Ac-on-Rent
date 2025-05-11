import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tag, Gift, X, ArrowRight } from "lucide-react";

interface OfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OfferDialog = ({ open, onOpenChange }: OfferDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Tag className="h-6 w-6 text-primary" />
            Special Offers!
          </DialogTitle>
          <DialogDescription>
            Limited time offers for our valued customers
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="rounded-lg border p-4 bg-primary/5">
            <div className="flex items-start gap-3">
              <Gift className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">First-Time Renter Discount</h3>
                <p className="text-sm text-muted-foreground">
                  Get 10% off on your first month's rent
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4 bg-primary/5">
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Long-Term Rental Benefits</h3>
                <p className="text-sm text-muted-foreground">
                  15% discount on yearly rentals
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <DialogClose asChild>
          <Button className="w-full mt-4">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
