import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICategoryImage {
  url: string;
  publicId: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory: mongoose.Types.ObjectId | null;
  productCount: number;
  image: ICategoryImage | null;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

const CategoryImageSchema = new Schema<ICategoryImage>(
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

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    image: {
      type: CategoryImageSchema,
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.index(
  {
    name: 1,
    parentCategory: 1,
  },
  {
    unique: true,
  },
);

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;