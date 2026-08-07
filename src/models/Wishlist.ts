import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlist extends Document {
  customer: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
      index: true,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;
