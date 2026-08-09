import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryImage {
  url: string;
  publicId: string;
}

export interface IAstrology {
  planet?: string;
  zodiacSigns?: string[];
  wearDay?: string;
  wearMethod?: string;
  finger?: string;
  metal?: string;
  threadColor?: string;
  purificationMethod?: string;
}

export interface ICertification {
  certified?: boolean;
  certificationType?: string;
  labName?: string;
  certificateNumber?: string;
  issueDate?: string;
  xrayVerified?: boolean;
  certificatePdf?: string;
  certificateImage?: string;
}

export interface IPricing {
  currency?: string;
  costPrice?: number;
  sellingPrice?: number;
  salePrice?: number;
  discount?: number;
  gst?: number;
  taxClass?: string;
}

export interface IInventory {
  stock?: number;
  stockStatus?: "In Stock" | "Out of Stock" | "Low Stock";
  lowStockAlert?: number;
}

export interface ISeo {
  metaTitle?: string;
  metaDescription?: string;
}

export interface ICareInstructions {
  cleaning?: string;
  storage?: string;
  precautions?: string;
}

export interface IProduct extends Document {
  productType: "gemstone" | "rudraksha";

  sku: string;
  name: string;
  indianName?: string;
  slug: string;
  description?: string;

  gallery: IGalleryImage[];

  category?: string;
  subCategory?: string;

  specifications: Record<string, any>;

  astrology?: IAstrology;

  certification?: ICertification;

  pricing?: IPricing;

  inventory?: IInventory;

  benefits?: string[];

  seo?: ISeo;

  careInstructions?: ICareInstructions;

  status?: "Draft" | "Published" | "Archived";

  createdBy?: string;
  updatedBy?: string;
}

const AstrologySchema = new Schema<IAstrology>(
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

const CertificationSchema = new Schema<ICertification>(
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

const PricingSchema = new Schema<IPricing>(
  {
    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    costPrice: {
      type: Number,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      min: 0,
    },

    salePrice: {
      type: Number,
      min: 0,
    },

    discount: {
      type: Number,
      min: 0,
    },

    gst: {
      type: Number,
      default: 3,
      min: 0,
    },

    taxClass: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const InventorySchema = new Schema<IInventory>(
  {
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Low Stock"],
      default: "In Stock",
    },

    lowStockAlert: {
      type: Number,
      default: 5,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const SeoSchema = new Schema<ISeo>(
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

const GallerySchema = new Schema<IGalleryImage>(
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

const CareInstructionsSchema = new Schema<ICareInstructions>(
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

const ProductSchema = new Schema<IProduct>(
  {
    productType: {
      type: String,
      enum: ["gemstone", "rudraksha"],
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    indianName: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    gallery: {
      type: [GallerySchema],
      default: [],
    },

    category: {
      type: String,
      trim: true,
    },

    subCategory: {
      type: String,
      trim: true,
    },

    specifications: {
      type: Schema.Types.Mixed,
      default: {},
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
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
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
