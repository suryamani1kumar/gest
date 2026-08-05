import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRudraksha extends Document {
  sku: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  status: "Draft" | "Published" | "Archived";

  description: string;

  gallery: string[];
  certificateImage: string;
  videoUrl?: string;

  mukhi: number;
  type: string;
  species: string;
  origin: string;
  shape: string;
  color: string;
  surface: string;

  astrology: {
    rulingPlanet: string;
    zodiacSigns: string[];
    wearDay: string;
    wearTime: string;
    wearMethod: string;
    metal: string;
    threadColor: string;
    purificationMethod: string;
  };

  holes: number;
  naturalHole: boolean;

  natural: boolean;
  original: boolean;

  certification: {
    labCertified: boolean;
    certificationType: string;
    certificateNumber: string;
    labName: string;
    xrayVerified: boolean;
  };

  treatment: string;

  benefits: string[];

  pricing: {
    currency: string;
    costPrice: number;
    sellingPrice: number;
    discountPrice: number;
    taxClass: string;
  };

  inventory: {
    stock: number;
    stockStatus: string;
    lowStockThreshold: number;
  };

  seo: {
    metaTitle: string;
    metaDescription: string;
  };

  careInstructions: {
    cleaning: string;
    storage: string;
    precautions: string;
  };
  
  createdBy?: string;
  updatedBy?: string;
}

const AstrologySchema = new Schema(
  {
    rulingPlanet: String,
    zodiacSigns: [String],
    wearDay: String,
    wearTime: String,
    wearMethod: String,
    metal: String,
    threadColor: String,
    purificationMethod: String,
  },
  { _id: false },
);

const CertificationSchema = new Schema(
  {
    labCertified: {
      type: Boolean,
      default: false,
    },
    certificationType: String,
    certificateNumber: String,
    labName: String,
    xrayVerified: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const PricingSchema = new Schema(
  {
    currency: {
      type: String,
      default: "INR",
    },
    costPrice: Number,
    sellingPrice: Number,
    discountPrice: Number,
    taxClass: String,
  },
  { _id: false },
);

const InventorySchema = new Schema(
  {
    stock: {
      type: Number,
      default: 0,
    },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Low Stock"],
      default: "In Stock",
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
  },
  { _id: false },
);

const SeoSchema = new Schema(
  {
    metaTitle: String,
    metaDescription: String,
  },
  { _id: false },
);

const CareSchema = new Schema(
  {
    cleaning: String,
    storage: String,
    precautions: String,
  },
  { _id: false },
);

const RudrakshaSchema = new Schema<IRudraksha>(
  {
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

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      default: "Rudraksha",
    },

    subCategory: String,

    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },

    description: String,

    gallery: [String],

    certificateImage: String,

    videoUrl: String,

    mukhi: {
      type: Number,
      required: true,
    },

    type: String,

    species: String,

    origin: String,

    shape: String,

    color: String,

    surface: String,

    astrology: AstrologySchema,

    holes: {
      type: Number,
      default: 1,
    },

    naturalHole: {
      type: Boolean,
      default: true,
    },

    natural: {
      type: Boolean,
      default: true,
    },

    original: {
      type: Boolean,
      default: true,
    },

    certification: CertificationSchema,

    treatment: {
      type: String,
      default: "Untreated",
    },

    benefits: [String],

    pricing: PricingSchema,

    inventory: InventorySchema,

    seo: SeoSchema,

    careInstructions: CareSchema,
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  {
    timestamps: true,
  },
);

const Rudraksha: Model<IRudraksha> =
  mongoose.models.Rudraksha ||
  mongoose.model<IRudraksha>("Rudraksha", RudrakshaSchema);

export default Rudraksha;
