import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Calendar, Package } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PricingSectionProps {
  duration: string;
  variant: string;
  currentPrice: number;
  productVariants: string[];
  availableMonths: number[];
  onDurationChange: (value: string) => void;
  onVariantChange: (value: string) => void;
  onMonthsChange?: (value: string) => void;
  selectedMonths?: string;
  onSubmitClick: () => void;
}

export const PricingSection = ({
  duration,
  variant,
  currentPrice,
  productVariants,
  availableMonths,
  onVariantChange,
  onMonthsChange,
  selectedMonths,
  onSubmitClick,
}: PricingSectionProps) => {
  const startingMonth = availableMonths[0];
  const priceLabel = !selectedMonths
    ? `Starting from ${startingMonth} months`
    : `per ${selectedMonths} months`;

  return (
    <>
      <style>
        {`
          .card {
            background-color: #f4f0e8;
            border-radius: 8px;
          }
          .variant {
            background-color: #fff;
            border: 2px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
          }
          .variant:hover {
            border-color: #555;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .variant.selected {
            border-color: #0055a4;
            background-color: rgba(0, 85, 164, 0.1);
            color: #0055a4;
          }
          .variant-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          @media (max-width: 768px) {
            .variant-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 480px) {
            .variant-grid {
              grid-template-columns: 1fr;
            }
          }
          .button {
            background-color: #d32f2f;
            color: white;
            padding: 16px;
            font-weight: bold;
            border-radius: 8px;
            transition: background-color 0.2s ease-in-out;
          }
          .button:hover {
            background-color: #b71c1c;
          }
        `}
      </style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="card shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Rental Options
              </h2>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{currentPrice}
                </p>
                <p className="text-sm text-gray-600">{priceLabel}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <Calendar className="h-4 w-4 text-gray-600" /> Number of
                  Months
                </Label>
                <Select onValueChange={onMonthsChange} value={selectedMonths}>
                  <SelectTrigger className="w-full bg-white text-gray-800 border-gray-300 hover:border-gray-500 focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <SelectValue
                      placeholder={`Select duration (min. ${startingMonth} months)`}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-800">
                    {availableMonths.map((month) => (
                      <SelectItem
                        key={month}
                        value={month.toString()}
                        className="hover:bg-gray-100"
                      >
                        {month} months
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                  <Package className="h-4 w-4 text-gray-600" /> Capacity Variant
                </Label>
                <RadioGroup
                  value={variant}
                  onValueChange={onVariantChange}
                  className="variant-grid"
                >
                  {productVariants?.map((v) => (
                    <div key={v} className="w-full">
                      <RadioGroupItem
                        value={v}
                        id={v}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={v}
                        className={`variant ${
                          variant === v ? "selected" : ""
                        } flex justify-center items-center`}
                      >
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {v}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Refundable security deposit: ₹2,000</p>
                  <p>• Advance payment required on delivery</p>
                  <p>• Complimenttary maintainance included</p>
                </div>

                <Button
                  onClick={onSubmitClick}
                  className="button w-full py-5 text-base font-semibold"
                >
                  Rent Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};
