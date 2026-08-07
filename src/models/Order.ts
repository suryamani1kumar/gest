import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;

  name: string;

  image: string;

  quantity: number;

  price: number;

  subtotal: number;
}

export interface IOrder extends Document {
  customer: mongoose.Types.ObjectId;

  orderNumber: string;

  items: IOrderItem[];

  shippingAddress: mongoose.Types.ObjectId;

  paymentMethod: "COD" | "CARD" | "UPI" | "PAYPAL";

  paymentStatus: "pending" | "paid" | "failed" | "refunded";

  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  subtotal: number;

  shippingCharge: number;

  tax: number;

  discount: number;

  total: number;

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const OrderSchema = new Schema<IOrder>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
    },

    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "UPI", "PAYPAL"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    subtotal: {
      type: Number,
      required: true,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ user: 1, createdAt: -1 });

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;