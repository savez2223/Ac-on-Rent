import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductDisplayProps {
  productId: string;
  productImage: string;
  variant: string;
}

export const ProductDisplay = ({ productId, productImage, variant }: ProductDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[400px] mx-auto"
    >
      <style>
        {`
          .card {
            background-color: #f4f0e8; /* Light background */
            border-radius: 8px;
            border: 2px solid #d4c7a3; /* Border matching the theme */
          }
          .badge {
            background-color: #0055a4; /* Primary blue */
            color: #fff; /* White text */
            border-radius: 12px;
            padding: 4px 12px;
          }
          .badge:hover {
            background-color: #003d79; /* Hover darker blue */
          }
          .product-title {
            color: #0055a4; /* Primary blue for title */
            font-weight: bold;
          }
          .product-description {
            color: #4a4a4a; /* Neutral text color */
          }
        `}
      </style>

      <Card className="card shadow-lg">
        <CardContent className="p-6">
          <div className="relative rounded-lg overflow-hidden p-3">
            <div className="aspect-square w-full max-w-[350px] mx-auto">
              <img
                src={productImage}
                alt={`${productId?.split("-").join(" ")} ${variant}`}
                className="w-full h-full object-contain"
              />
            </div>
            <Badge className="badge absolute top-3 right-3 text-sm">
              Available for Rent
            </Badge>
          </div>
          <div className="mt-5 text-left">
            <h1 className="text-2xl product-title capitalize mb-2">
              {productId?.split("-").join(" ")}
            </h1>
            <p className="text-base product-description">
              Premium quality {productId?.split("-").join(" ")} available for flexible rental periods.
              Perfect for homes and offices.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
