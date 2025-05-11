import { Link } from "react-router-dom";
import { getProductImage } from "@/utils/productImages";
import { getPricing } from "@/utils/pricing";

interface SimilarProductsProps {
  currentProductId: string;
  productVariants: Record<string, string[]>;
}

export const SimilarProducts = ({ currentProductId, productVariants }: SimilarProductsProps) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(productVariants)
          .filter((p) => p !== currentProductId)
          .slice(0, 3)
          .map((p) => (
            <Link key={p} to={`/rent/${p}`} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 p-4 bg-gray-50">
                  <img
                    src={getProductImage(p)}
                    alt={p.split("-").join(" ")}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold capitalize text-gray-900">
                    {p.split("-").join(" ")}
                  </h3>
                  {/* <p className="text-primary font-medium mt-2">
                    Starting from ₹{getPricing(p, "monthly", productVariants[p][0], 3)}/month
                  </p> */}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};