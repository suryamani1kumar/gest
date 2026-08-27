export type ProductType = "gemstone" | "rudraksha" | "jewellery";

export type ProductStatus = "Draft" | "Published" | "Archived";

export type Gender = "Men" | "Women" | "Unisex";

export type StockStatus = "In Stock" | "Out of Stock" | "Low Stock";

export type WeightUnit = "gram" | "kg";

export type GemstoneWeightUnit = "carat" | "gram";

export type MakingChargesType = "fixed" | "percentage";

export interface GalleryImage {
  url: string;
  publicId: string;
}

export interface GemstoneData {
  indianName?: string;
  variety?: string;
  color?: string;
  shape?: string;
  cut?: string;
  transparency?: string;
  origin?: string;
  treatment?: string;

  weight?: number;
  weightUnit?: WeightUnit;

  dimension?: string;

  hardness?: string;
  refractiveIndex?: string;
  specificGravity?: string;
  luster?: string;

  qualityGrade?: string;
  clarity?: string;
  colorGrade?: string;

  natural?: boolean;
  synthetic?: boolean;
  heated?: boolean;
  enhancement?: string;
}

export interface RudrakshaData {
  mukhi?: number;
  beadType?: string;
  origin?: string;

  size?: number;
  sizeUnit?: string;

  color?: string;
  shape?: string;

  weight?: number;
  weightUnit?: WeightUnit;

  quality?: string;

  energized?: boolean;
  labCertified?: boolean;
}

export interface JewelleryData {
  metalType?: string;
  purity?: string;
  metalColor?: string;

  metalWeight?: number;
  metalWeightUnit?: WeightUnit;

  makingCharges?: number;
  makingChargesType?: MakingChargesType;
  makingChargesPercentage?: number;

  hasDiamond?: boolean;
  diamondType?: string;
  diamondCount?: number;

  diamondWeight?: number;
  diamondWeightUnit?: GemstoneWeightUnit;

  diamondColor?: string;
  diamondClarity?: string;
  diamondCut?: string;
  diamondShape?: string;

  hasGemstone?: boolean;
  gemstoneType?: string;
  gemstoneCount?: number;

  gemstoneWeight?: number;
  gemstoneWeightUnit?: GemstoneWeightUnit;

  grossWeight?: number;
  netWeight?: number;

  length?: number;
  width?: number;

  size?: string;
  dimensions?: string;

  settingType?: string;
  hallmark?: string;
  hallmarkNumber?: string;
  hallmarkVerified?: boolean;

  collection?: string;
  occasion?: string;
  gender?: Gender;

  availableSizes?: string[];

  customizable?: boolean;
}

export interface AstrologyData {
  planet?: string;
  zodiacSigns?: string[];

  wearDay?: string;
  wearMethod?: string;
  finger?: string;

  metal?: string;
  threadColor?: string;

  purificationMethod?: string;
}

export interface CertificationData {
  certified?: boolean;

  certificationType?: string;
  labName?: string;
  certificateNumber?: string;

  issueDate?: string;

  xrayVerified?: boolean;

  certificatePdf?: string;
  certificateImage?: string;
}

export interface PricingData {
  currency?: string;
  costPrice?: number;
  sellingPrice?: number;
  salePrice?: number;
  buyUnitPrice?: number;
  sellUnitPrice?: number;
  WeightUnit?: string;
  discount?: number;
  gst?: number;
}

export interface InventoryData {
  stock?: number;
  stockStatus?: StockStatus;

  lowStockAlert?: number;
  reservedStock?: number; // why reserved stock
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
}

export interface CareInstructionsData {
  cleaning?: string;
  storage?: string;
  precautions?: string;
}

export interface ProductFormData {
  productType: ProductType;

  name: string;

  slug: string;
  description: string;

  category: string;

  gallery: GalleryImage[];

  gemstone?: GemstoneData;
  rudraksha?: RudrakshaData;
  jewellery?: JewelleryData;

  astrology?: AstrologyData;

  certification?: CertificationData;

  pricing?: PricingData;

  inventory?: InventoryData;

  benefits: string[];

  seo?: SeoData;

  careInstructions?: CareInstructionsData;

  status: ProductStatus;

  createdBy?: string;
  updatedBy?: string;
}
