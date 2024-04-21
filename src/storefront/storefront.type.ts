interface Instruction {
  periodStartDate: string;
  periodStartDateValue: number;
  current: boolean;
  type: string;
  productPath: string;
  intervalUnit: string;
  intervalLength: number;
  price: string;
  priceValue: number;
  priceTotal: string;
  priceTotalValue: number;
  unitPrice: string;
  unitPriceValue: number;
  unitDiscount: string;
  unitDiscountValue: number;
  discountPercent: string;
  discountPercentValue: number;
  discountTotal: string;
  discountTotalValue: number;
  total: string;
  totalValue: number;
  regularPeriodTaxValue: number;
  chargeableSubTotalValue: number;
  preTaxSubTotalValue: number;
}

interface Subscription {
  nextChargeDate: string;
  nextChargeDateValue: number;
  nextChargeTotal: string;
  nextChargeTotalValue: number;
  nextChargeCurrency: string;
  intervalUnit: string;
  intervalLength: number;
  repeatingInstruction: boolean;
  instructions: Instruction[];
  currency: string;
  addons: any[]; // Depending on the actual type of addons, this can be defined more specifically
  active: boolean;
  cancelled: boolean;
  completed: boolean;
  allowReactivation: boolean;
  remainingReactivationDays: number;
  subscriptionSetToDisableNextPeriod: boolean;
}

export interface Product {
  selected: boolean;
  path: string;
  pid: string;
  quantity: number;
  price: string;
  priceValue: number;
  priceTotal: string;
  priceTotalValue: number;
  unitPrice: string;
  unitPriceValue: number;
  unitDiscountValue: number;
  discountPercentValue: number;
  discountTotal: string;
  discountTotalValue: number;
  total: string;
  totalValue: number;
  priceWithoutTax: string;
  priceValueWithoutTax: number;
  quantityEditable: boolean;
  removable: boolean;
  autoRenew: boolean;
  bundle: boolean;
  image: string;
  display: string;
  sku: string;
  description: {
    summary?: string;
    full?: string;
  };
  pricing: {
    quantity: string; // Depending on the actual type, this can be defined more specifically
  };
  future: {
    intervalUnit: string;
    intervalLength: number;
    price: string;
    priceValue: number;
    priceTotal: string;
    priceTotalValue: number;
    unitPrice: string;
    unitPriceValue: number;
    unitDiscountValue: number;
    discountPercentValue: number;
    discountTotal: string;
    discountTotalValue: number;
    total: string;
    totalValue: number;
  };
  subscription: Subscription;
  groups: any[]; // Depending on the actual type of groups, this can be defined more specifically
  productFormat: string;
  priceWithoutTaxAndDiscounts: string;
  priceValueWithoutTaxAndDiscounts: number;
  variation: string;
  attributes: {
    downloadUrl: string;
  };
  product: string;
}

interface Group {
  display: string;
  items: Product[];
  driver: string;
  required: boolean;
  type: string;
  selections: boolean;
}

export interface Storefront {
  currency: string;
  country: string;
  taxExemptionAllowed: boolean;
  taxExempt: boolean;
  taxExemptionIdApplied: boolean;
  total: string;
  totalValue: number;
  tax: string;
  taxValue: number;
  totalWithTax: string;
  totalWithTaxValue: number;
  discountTotal: string;
  discountTotalValue: number;
  discountTotalPercentValue: number;
  originalTotal: string;
  originalTotalValue: number;
  subtotal: string;
  subtotalValue: number;
  taxPriceType: string;
  taxType: string;
  taxRate: string;
  groups: Group[];
  coupons: any[]; // Depending on the actual type of coupons, this can be defined more specifically
  payments: any[]; // Depending on the actual type of payments, this can be defined more specifically
  fields: any[]; // Depending on the actual type of fields, this can be defined more specifically
  gift: boolean;
  availablePaymentMethods: any[]; // Depending on the actual type of payment methods, this can be defined more specifically
  includesPhysicalGoods: boolean;
  shippingCost: string;
  shippingCostValue: number;
  storeTaxPriceMode: string;
  allCrossSells: any[]; // Depending on the actual type of cross-sells, this can be defined more specifically
  firstUpsellConfigurationDisplay: string;
  language: string;
  expires: number;
  messages: any[]; // Depending on the actual type of messages, this can be defined more specifically
  selections: boolean;
  creationTime: number;
  modifiedSubscriptionId: string;
  modifiedSubscriptionDefaultQuantity: number;
  modifiedSubscriptionJson: string;
}

export type StorefrontPayloadSubscription = Pick<
  Subscription,
  | "nextChargeDateValue"
  | "intervalUnit"
  | "intervalLength"
  | "nextChargeCurrency"
  | "nextChargeTotalValue"
> | null;

export type StorefrontPayloadProduct = Pick<
  Product,
  | "path"
  | "priceTotalValue"
  | "totalValue"
  | "discountPercentValue"
  | "discountTotalValue"
  | "autoRenew"
  | "image"
  | "display"
  | "sku"
  | "description"
> & { subscription: StorefrontPayloadSubscription };

export type StorefrontPayload = Pick<
  Storefront,
  | "currency"
  | "totalWithTaxValue"
  | "discountTotalValue"
  | "discountTotalPercentValue"
> & {
  products: StorefrontPayloadProduct[];
};
