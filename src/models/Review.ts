import mongoose, { Document, Model, Schema } from "mongoose";

export interface IReviewImage {
  url: string;
  publicId: string;
}

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;

  rating: number;
  title?: string;
  comment: string;

  images: IReviewImage[];

  status: "Pending" | "Approved" | "Rejected";

  createdAt: Date;
  updatedAt: Date;
}

const ReviewImageSchema = new Schema<IReviewImage>(
  {
    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const ReviewSchema = new Schema<IReview>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: false,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 3000,
    },

    images: {
      type: [ReviewImageSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
      index: true,
    },
  },

  {
    timestamps: true,
  },
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
