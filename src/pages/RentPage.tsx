import { db } from "../firebase-config"; // Import the initialized Firebase app
import { ref, push } from "firebase/database";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDisplay } from "@/components/rent/ProductDisplay";
import { PricingSection } from "@/components/rent/PricingSection";
import { RentalForm } from "@/components/rent/RentalForm";
import { ProductSpecifications } from "@/components/rent/ProductSpecifications";
import { SimilarProducts } from "@/components/rent/SimilarProducts";
import { getProductImage } from "@/utils/productImages";
import { getAvailableMonths, getPricing } from "@/utils/pricing";
import ThankYou from "@/pages/ThankYou";

const productVariants = {
  "window-ac": ["0.75 TON", "1.0 TON", "1.5 TON", "2.0 TON"],
  "split-ac": ["1.0 TON", "1.5 TON", "2.0 TON"],
  "room-heater": ["9Fin", "11Fin", "12Fin", "13Fin"],
  geyser: ["15L - 20L"],
  refrigerator: ["150-220L", "220-400L"],
  "washing-machine": ["semi-automatic", "fully-automatic"],
};

const RentPage = () => {

  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    duration: "monthly",
    variant:
      productVariants[productId as keyof typeof productVariants]?.[0] || "",
    months: "",
  });

  // Ensure valid productId
  if (!productId) {
    console.error("Product ID is not defined!");
    return <div className="text-center mt-20">Invalid Product ID</div>;
  }

  const availableMonths = getAvailableMonths(productId || "", formData.variant);
  const currentPrice = getPricing(
    productId,
    formData.duration,
    formData.variant,
    parseInt(formData.months) || availableMonths[0]
  );
  const productImage = getProductImage(productId);


  const handleFormSubmit = async (customerData: any) => {
    try {
      // Firebase submission
      const rentalRequestRef = ref(db, "rentalRequests");
      await push(rentalRequestRef, {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        productId: productId,
        variant: formData.variant,
        duration: formData.duration,
        months: formData.months,
        price: currentPrice,
        timestamp: new Date().toISOString(),
      });

      // Telegram submission
      const botToken = "7890027454:AAH9eCTnijNXPuR701y0NfdcrEw6lfuIfqk";
      const chatId = "1684000886";
      const message = `
  🆕 New Rental Request
  
  👤 Customer Details:
  Name: ${customerData.name}
  Email: ${customerData.email}
  Phone: ${customerData.phone}
  Address: ${customerData.address}
  
  📦 Product Details:
  Product ID: ${productId}
  Variant: ${formData.variant}
  Duration: ${formData.duration}
  Months: ${formData.months}
  Price: ₹${currentPrice}
  
  ⏰ Timestamp: ${new Date().toLocaleString()}
      `;

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      setFormDialogOpen(false);
      setShowThankYou(true);

      toast({
        title: "Success",
        description: "Your rental request has been submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Submission Failed",
        description: "Unable to send your request. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (showThankYou) {
    return <ThankYou />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>
          Rent {productId.split("-").join(" ")} | Ac On Rent Gurugram
        </title>
        <meta
          name="description"
          content={`Rent a premium ${productId
            .split("-")
            .join(" ")} with flexible rental periods. Available in ${
            formData.variant
          } variant. Starting from ₹${currentPrice} per ${formData.duration}.`}
        />
        <meta property="og:title" content={`Rent ${productId}`} />
      </Helmet>

      <Navbar />

      <main className="flex-grow py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="lg:sticky lg:top-24">
              <ProductDisplay
                productId={productId}
                productImage={productImage}
                variant={formData.variant}
              />
            </div>

            <div>
              <PricingSection
                duration={formData.duration}
                variant={formData.variant}
                currentPrice={currentPrice}
                productVariants={
                  productVariants[productId as keyof typeof productVariants] ||
                  []
                }
                availableMonths={availableMonths}
                onDurationChange={(value) =>
                  setFormData({ ...formData, duration: value })
                }
                onVariantChange={(value) =>
                  setFormData({ ...formData, variant: value })
                }
                onMonthsChange={(value) =>
                  setFormData({ ...formData, months: value })
                }
                selectedMonths={formData.months}
                onSubmitClick={() => setFormDialogOpen(true)}
              />
            </div>
          </div>
          <SimilarProducts
            currentProductId={productId}
            productVariants={productVariants}
          />

          <ProductSpecifications productId={productId} />

        </div>
      </main>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Rental Request</DialogTitle>
          </DialogHeader>
          <RentalForm onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};
export default RentPage;
