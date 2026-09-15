import mongoose, { Document, Schema, Types } from "mongoose";
import { AddressSchema, IAddress } from "./User";

export interface IOrderItem {
  product: Types.ObjectId;

  name: string;
  sku: string;
  slug: string;
  image?: string;

  quantity: number;

  unitPrice: number;
  discount: number;
  tax: number;
  totalPrice: number;

  weight?: number;
  weightUnit?: string;
  size?: string;

  metalType?: string;
  purity?: string;
}

// ==========================================
// PRICING
// ==========================================

export interface IOrderPricing {
  subtotal: number;

  itemDiscount: number;
  couponDiscount: number;

  taxAmount: number;

  shippingCharge: number;

  giftWrapCharge: number;

  platformFee: number;

  grandTotal: number;

  currency: string;
}

// ==========================================
// PAYMENT
// ==========================================

export interface IOrderPayment {
  method: string;
  // stripe | razorpay | cod | bank_transfer

  status: string;
  // Pending | Paid | Failed | Refunded | PartiallyRefunded

  paymentGateway?: string;

  paymentId?: string;

  transactionId?: string;

  paymentGatewayOrderId?: string;

  paymentGatewayPaymentId?: string;

  paymentGatewaySignature?: string;

  paidAt?: Date;
}

// ==========================================
// SHIPPING
// ==========================================

export interface IOrderShipping {
  method?: string;

  courierName?: string;

  trackingNumber?: string;

  trackingUrl?: string;

  estimatedDeliveryDate?: Date;

  shippedAt?: Date;

  deliveredAt?: Date;
}

// ==========================================
// CANCELLATION
// ==========================================

export interface IOrderCancellation {
  reason?: string;

  cancelledBy?: Types.ObjectId;

  note?: string;

  cancelledAt?: Date;
}

// ==========================================
// RETURN
// ==========================================

export interface IOrderReturn {
  requested: boolean;

  reason?: string;

  requestedAt?: Date;

  approvedAt?: Date;

  receivedAt?: Date;
}

// ==========================================
// REFUND
// ==========================================

export interface IOrderRefund {
  status: string;
  // NotRequested | Pending | Processing | Refunded | Failed

  amount?: number;

  refundId?: string;

  reason?: string;

  refundedAt?: Date;
}

// ==========================================
// ORDER DOCUMENT
// ==========================================

export interface IOrder extends Document {
  orderNumber: string;

  customer: Types.ObjectId;

  items: IOrderItem[];

  pricing: IOrderPricing;

  coupon?: Types.ObjectId;

  couponCode?: string;

  shippingAddress: IAddress;

  payment: IOrderPayment;

  orderStatus: string;
  // Pending | Confirmed | Processing | Shipped |
  // Delivered | Cancelled | Returned | Refunded

  confirmedAt?: Date;

  processingAt?: Date;

  shippedAt?: Date;

  deliveredAt?: Date;

  cancelledAt?: Date;

  returnedAt?: Date;

  refundedAt?: Date;

  shipping: IOrderShipping;

  cancellation?: IOrderCancellation;

  return: IOrderReturn;

  refund: IOrderRefund;

  invoiceNumber?: string;

  invoiceUrl?: string;

  invoiceGeneratedAt?: Date;

  customerNote?: string;

  adminNote?: string;

  isGift: boolean;

  giftMessage?: string;

  giftWrap: boolean;

  source: string;
  // Website | Admin | WhatsApp | Phone

  createdBy?: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

// ==========================================
// ORDER ITEM SCHEMA
// ==========================================

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
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: Number,
      min: 0,
    },

    weightUnit: {
      type: String,
      trim: true,
    },

    size: {
      type: String,
      trim: true,
    },

    metalType: {
      type: String,
      trim: true,
    },

    purity: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

// ==========================================
// PRICING SCHEMA
// ==========================================

const OrderPricingSchema = new Schema<IOrderPricing>(
  {
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    itemDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },

    couponDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    giftWrapCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    platformFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },
  },
  { _id: false },
);

// ==========================================
// PAYMENT SCHEMA
// ==========================================

const OrderPaymentSchema = new Schema<IOrderPayment>(
  {
    method: {
      type: String,
      required: true,
      enum: ["stripe", "razorpay", "cod", "bank_transfer"],
    },

    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Failed", "Refunded", "PartiallyRefunded"],
      default: "Pending",
    },

    paymentGateway: {
      type: String,
      trim: true,
    },

    paymentId: {
      type: String,
      trim: true,
    },

    transactionId: {
      type: String,
      trim: true,
    },

    paymentGatewayOrderId: {
      type: String,
      trim: true,
    },

    paymentGatewayPaymentId: {
      type: String,
      trim: true,
    },

    paymentGatewaySignature: {
      type: String,
      trim: true,
    },

    paidAt: {
      type: Date,
    },
  },
  { _id: false },
);

// ==========================================
// SHIPPING SCHEMA
// ==========================================

const OrderShippingSchema = new Schema<IOrderShipping>(
  {
    method: {
      type: String,
      trim: true,
    },

    courierName: {
      type: String,
      trim: true,
    },

    trackingNumber: {
      type: String,
      trim: true,
    },

    trackingUrl: {
      type: String,
      trim: true,
    },

    estimatedDeliveryDate: {
      type: Date,
    },

    shippedAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },
  },
  { _id: false },
);

// ==========================================
// CANCELLATION SCHEMA
// ==========================================

const OrderCancellationSchema = new Schema<IOrderCancellation>(
  {
    reason: {
      type: String,
      trim: true,
    },

    cancelledBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    note: {
      type: String,
      trim: true,
    },

    cancelledAt: {
      type: Date,
    },
  },
  { _id: false },
);

// ==========================================
// RETURN SCHEMA
// ==========================================

const OrderReturnSchema = new Schema<IOrderReturn>(
  {
    requested: {
      type: Boolean,
      default: false,
    },

    reason: {
      type: String,
      trim: true,
    },

    requestedAt: {
      type: Date,
    },

    approvedAt: {
      type: Date,
    },

    receivedAt: {
      type: Date,
    },
  },
  { _id: false },
);

// ==========================================
// REFUND SCHEMA
// ==========================================

const OrderRefundSchema = new Schema<IOrderRefund>(
  {
    status: {
      type: String,
      enum: ["NotRequested", "Pending", "Processing", "Refunded", "Failed"],
      default: "NotRequested",
    },

    amount: {
      type: Number,
      min: 0,
    },

    refundId: {
      type: String,
      trim: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    refundedAt: {
      type: Date,
    },
  },
  { _id: false },
);

// ==========================================
// MAIN ORDER SCHEMA
// ==========================================

const OrderSchema = new Schema<IOrder>(
  {
    // -------------------------------
    // ORDER IDENTIFICATION
    // -------------------------------

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    // -------------------------------
    // ITEMS
    // -------------------------------

    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: function (items: IOrderItem[]) {
          return items.length > 0;
        },
        message: "Order must contain at least one item.",
      },
    },

    // -------------------------------
    // PRICING
    // -------------------------------

    pricing: {
      type: OrderPricingSchema,
      required: true,
    },

    // -------------------------------
    // COUPON
    // -------------------------------

    coupon: {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },

    couponCode: {
      type: String,
      trim: true,
      uppercase: true,
    },

    // -------------------------------
    // ADDRESSES
    // -------------------------------

    shippingAddress: {
      type: AddressSchema,
      required: true,
    },

    // -------------------------------
    // PAYMENT
    // -------------------------------

    payment: {
      type: OrderPaymentSchema,
      required: true,
    },

    // -------------------------------
    // ORDER STATUS
    // -------------------------------

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refunded",
      ],
      default: "Pending",
      index: true,
    },

    confirmedAt: Date,

    processingAt: Date,

    shippedAt: Date,

    deliveredAt: Date,

    cancelledAt: Date,

    returnedAt: Date,

    refundedAt: Date,

    // -------------------------------
    // SHIPPING
    // -------------------------------

    shipping: {
      type: OrderShippingSchema,
      default: {},
    },

    // -------------------------------
    // CANCELLATION
    // -------------------------------

    cancellation: {
      type: OrderCancellationSchema,
    },

    // -------------------------------
    // RETURN
    // -------------------------------

    return: {
      type: OrderReturnSchema,
      default: {
        requested: false,
      },
    },

    // -------------------------------
    // REFUND
    // -------------------------------

    refund: {
      type: OrderRefundSchema,
      default: {
        status: "NotRequested",
      },
    },

    // -------------------------------
    // INVOICE
    // -------------------------------

    invoiceNumber: {
      type: String,
      trim: true,
    },

    invoiceUrl: {
      type: String,
      trim: true,
    },

    invoiceGeneratedAt: {
      type: Date,
    },

    // -------------------------------
    // NOTES
    // -------------------------------

    customerNote: {
      type: String,
      trim: true,
    },

    adminNote: {
      type: String,
      trim: true,
    },

    // -------------------------------
    // GIFT
    // -------------------------------

    isGift: {
      type: Boolean,
      default: false,
    },

    giftMessage: {
      type: String,
      trim: true,
    },

    giftWrap: {
      type: Boolean,
      default: false,
    },

    // -------------------------------
    // ORDER SOURCE
    // -------------------------------

    source: {
      type: String,
      enum: ["Website", "Admin", "WhatsApp", "Phone"],
      default: "Website",
    },

    // -------------------------------
    // AUDIT
    // -------------------------------

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
