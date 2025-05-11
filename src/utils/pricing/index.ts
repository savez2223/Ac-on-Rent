import { acPricing, heaterPricing, geyserPricing, washingMachinePricing, refrigeratorPricing } from './productPricing';

const allPricing = {
  ...acPricing,
  ...heaterPricing,
  ...geyserPricing,
  ...washingMachinePricing,
  ...refrigeratorPricing,
};

export const getAvailableMonths = (productId: string, variant: string) => {
  try {
    const productPricing = allPricing[productId as keyof typeof allPricing];
    if (!productPricing) {
      console.warn(`No pricing found for product: ${productId}`);
      return [3, 4, 5, 6];
    }

    const variantPricing = productPricing[variant as keyof typeof productPricing];
    if (!variantPricing) {
      console.warn(`No pricing found for variant: ${variant} of product: ${productId}`);
      return [3, 4, 5, 6];
    }

    const months = Object.keys(variantPricing).map(Number).sort((a, b) => a - b);
    console.log(`Available months for ${productId} ${variant}:`, months);
    return months;
  } catch (error) {
    console.error('Error in getAvailableMonths:', error);
    return [3, 4, 5, 6];
  }
};

export const getPricing = (
  productId: string,
  duration: string,
  variant: string,
  months: number = 1
) => {
  try {
    const productPricing = allPricing[productId as keyof typeof allPricing];
    if (!productPricing) {
      console.warn(`No pricing found for product: ${productId}`);
      return 2999;
    }

    const variantPricing = productPricing[variant as keyof typeof productPricing];
    if (!variantPricing) {
      console.warn(`No pricing found for variant: ${variant} of product: ${productId}`);
      return 2999;
    }

    const monthlyPrice = variantPricing[months as keyof typeof variantPricing];
    if (!monthlyPrice) {
      console.warn(`No pricing found for ${months} months of ${productId} ${variant}`);
      return 2999;
    }

    if (duration === "yearly") {
      return Math.round(monthlyPrice * 0.9); // 10% discount for yearly rentals
    }

    return monthlyPrice;
  } catch (error) {
    console.error('Error in getPricing:', error);
    return 2999;
  }
};