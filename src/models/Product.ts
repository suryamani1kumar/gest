import mongoose, { Document, Model, Schema, Types } from "mongoose";

import type {
  ProductType,
  ProductStatus,
  StockStatus,
  WeightUnit,
  GemstoneWeightUnit,
  MakingChargesType,
  GalleryImage,
  GemstoneData,
  RudrakshaData,
  JewelleryData,
  AstrologyData,
  CertificationData,
  PricingData,
  InventoryData,
  SeoData,
  CareInstructionsData,
} from "@/lib/type";

export const PRODUCT_TYPES: ProductType[] = [
  "gemstone",
  "rudraksha",
  "jewellery",
];

export const PRODUCT_STATUSES: ProductStatus[] = [
  "Draft",
  "Published",
  "Archived",
];

export const STOCK_STATUSES: StockStatus[] = [
  "In Stock",
  "Out of Stock",
  "Low Stock",
];

export const WEIGHT_UNITS: WeightUnit[] = ["gram", "kg"];

export const GEMSTONE_WEIGHT_UNITS: GemstoneWeightUnit[] = ["carat", "gram"];

export const MAKING_CHARGES_TYPES: MakingChargesType[] = [
  "fixed",
  "percentage",
];

const GallerySchema = new Schema<GalleryImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const GemstoneSchema = new Schema<GemstoneData>(
  {
    indianName: {
      type: String,
      trim: true,
    },
    variety: {
      type: String,
      trim: true,
    },

    color: {
      type: String,
      trim: true,
    },

    shape: {
      type: String,
      trim: true,
    },

    cut: {
      type: String,
      trim: true,
    },

    transparency: {
      type: String,
      trim: true,
    },

    origin: {
      type: String,
      trim: true,
    },

    treatment: {
      type: String,
      trim: true,
    },

    weight: {
      type: Number,
      min: 0,
    },

    weightUnit: {
      type: String,
      enum: GEMSTONE_WEIGHT_UNITS,
      default: "gram",
    },

    dimension: {
      type: String,
      trim: true,
    },

    hardness: {
      type: String,
      trim: true,
    },

    refractiveIndex: {
      type: String,
      trim: true,
    },

    specificGravity: {
      type: String,
      trim: true,
    },

    luster: {
      type: String,
      trim: true,
    },

    qualityGrade: {
      type: String,
      trim: true,
    },

    clarity: {
      type: String,
      trim: true,
    },

    colorGrade: {
      type: String,
      trim: true,
    },

    natural: {
      type: Boolean,
      default: false,
    },

    synthetic: {
      type: Boolean,
      default: false,
    },

    heated: {
      type: Boolean,
      default: false,
    },

    enhancement: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const RudrakshaSchema = new Schema<RudrakshaData>(
  {
    mukhi: {
      type: Number,
      min: 1,
    },

    beadType: {
      type: String,
      trim: true,
    },

    origin: {
      type: String,
      trim: true,
    },

    size: {
      type: Number,
      min: 0,
    },

    sizeUnit: {
      type: String,
      trim: true,
    },

    color: {
      type: String,
      trim: true,
    },

    shape: {
      type: String,
      trim: true,
    },

    weight: {
      type: Number,
      min: 0,
    },

    weightUnit: {
      type: String,
      enum: WEIGHT_UNITS,
      default: "gram",
    },

    quality: {
      type: String,
      trim: true,
    },

    energized: {
      type: Boolean,
      default: false,
    },

    labCertified: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const JewellerySchema = new Schema<JewelleryData>(
  {
    metalType: {
      type: String,
      trim: true,
    },

    purity: {
      type: String,
      trim: true,
    },

    metalColor: {
      type: String,
      trim: true,
    },

    metalWeight: {
      type: Number,
      min: 0,
    },

    metalWeightUnit: {
      type: String,
      enum: WEIGHT_UNITS,
      default: "gram",
    },

    makingCharges: {
      type: Number,
      min: 0,
    },

    makingChargesType: {
      type: String,
      enum: MAKING_CHARGES_TYPES,
      default: "fixed",
    },

    makingChargesPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    hasDiamond: {
      type: Boolean,
      default: false,
    },

    diamondType: {
      type: String,
      trim: true,
    },

    diamondCount: {
      type: Number,
      min: 0,
    },

    diamondWeight: {
      type: Number,
      min: 0,
    },

    diamondWeightUnit: {
      type: String,
      enum: GEMSTONE_WEIGHT_UNITS,
      default: "carat",
    },

    diamondColor: {
      type: String,
      trim: true,
    },

    diamondClarity: {
      type: String,
      trim: true,
    },

    diamondCut: {
      type: String,
      trim: true,
    },

    diamondShape: {
      type: String,
      trim: true,
    },

    hasGemstone: {
      type: Boolean,
      default: false,
    },

    gemstoneType: {
      type: String,
      trim: true,
    },

    gemstoneCount: {
      type: Number,
      min: 0,
    },

    gemstoneWeight: {
      type: Number,
      min: 0,
    },

    gemstoneWeightUnit: {
      type: String,
      enum: GEMSTONE_WEIGHT_UNITS,
      default: "carat",
    },

    grossWeight: {
      type: Number,
      min: 0,
    },

    netWeight: {
      type: Number,
      min: 0,
    },

    length: {
      type: Number,
      min: 0,
    },

    width: {
      type: Number,
      min: 0,
    },

    size: {
      type: String,
      trim: true,
    },

    dimensions: {
      type: String,
      trim: true,
    },

    settingType: {
      type: String,
      trim: true,
    },

    hallmark: {
      type: String,
      trim: true,
    },

    hallmarkNumber: {
      type: String,
      trim: true,
    },

    hallmarkVerified: {
      type: Boolean,
      default: false,
    },

    collection: {
      type: String,
      trim: true,
    },

    occasion: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },

    availableSizes: {
      type: [String],
      default: [],
    },

    customizable: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const AstrologySchema = new Schema<AstrologyData>(
  {
    planet: {
      type: String,
      trim: true,
    },

    zodiacSigns: {
      type: [String],
      default: [],
    },

    wearDay: {
      type: String,
      trim: true,
    },

    wearMethod: {
      type: String,
      trim: true,
    },

    finger: {
      type: String,
      trim: true,
    },

    metal: {
      type: String,
      trim: true,
    },

    threadColor: {
      type: String,
      trim: true,
    },

    purificationMethod: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const CertificationSchema = new Schema<CertificationData>(
  {
    certified: {
      type: Boolean,
      default: false,
    },

    certificationType: {
      type: String,
      trim: true,
    },

    labName: {
      type: String,
      trim: true,
    },

    certificateNumber: {
      type: String,
      trim: true,
    },

    issueDate: {
      type: String,
      trim: true,
    },

    xrayVerified: {
      type: Boolean,
      default: false,
    },

    certificatePdf: {
      type: String,
      trim: true,
    },

    certificateImage: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const PricingSchema = new Schema<PricingData>(
  {
    currency: {
      type: String,
      default: "INR",
      trim: true,
      uppercase: true,
    },

    costPrice: {
      type: Number,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      min: 0,
    },

    buyUnitPrice: {
      type: Number,
      min: 0,
    },

    sellUnitPrice: {
      type: Number,
      min: 0,
    },

    WeightUnit: {
      type: String,
    },
    
    salePrice: {
      type: Number,
      min: 0,
    },

    discount: {
      type: Number,
      min: 0,
      max: 100,
    },

    gst: {
      type: Number,
      min: 0,
      max: 100,
      default: 3,
    },
  },
  {
    _id: false,
  },
);

const InventorySchema = new Schema<InventoryData>(
  {
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    stockStatus: {
      type: String,
      enum: STOCK_STATUSES,
      default: "In Stock",
    },

    lowStockAlert: {
      type: Number,
      default: 5,
      min: 0,
    },

    reservedStock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const SeoSchema = new Schema<SeoData>(
  {
    metaTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const CareInstructionsSchema = new Schema<CareInstructionsData>(
  {
    cleaning: {
      type: String,
      trim: true,
    },

    storage: {
      type: String,
      trim: true,
    },

    precautions: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
}

export interface IProduct extends Document {
  productType: ProductType;

  sku: string;
  name: string;

  slug: string;
  description?: string;

  category: Types.ObjectId | ICategory;

  gallery: GalleryImage[];

  gemstone?: GemstoneData;
  rudraksha?: RudrakshaData;
  jewellery?: JewelleryData;

  astrology?: AstrologyData;

  certification?: CertificationData;

  pricing?: PricingData;

  inventory?: InventoryData;

  benefits?: string[];

  seo?: SeoData;

  careInstructions?: CareInstructionsData;

  status?: ProductStatus;

  createdBy?: string;
  updatedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    productType: {
      type: String,
      enum: PRODUCT_TYPES,
      required: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    gallery: {
      type: [GallerySchema],
      default: [],
    },

    gemstone: {
      type: GemstoneSchema,
      default: undefined,
    },

    rudraksha: {
      type: RudrakshaSchema,
      default: undefined,
    },

    jewellery: {
      type: JewellerySchema,
      default: undefined,
    },

    astrology: {
      type: AstrologySchema,
      default: undefined,
    },

    certification: {
      type: CertificationSchema,
      default: undefined,
    },

    pricing: {
      type: PricingSchema,
      default: undefined,
    },

    inventory: {
      type: InventorySchema,
      default: undefined,
    },

    benefits: {
      type: [String],
      default: [],
    },

    seo: {
      type: SeoSchema,
      default: undefined,
    },

    careInstructions: {
      type: CareInstructionsSchema,
      default: undefined,
    },

    status: {
      type: String,
      enum: PRODUCT_STATUSES,
      default: "Draft",
      index: true,
    },

    createdBy: {
      type: String,
      trim: true,
    },

    updatedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
