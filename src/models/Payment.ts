import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Your internal order
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    // User who made the payment
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    // Razorpay Order ID
    razorpayOrderId: {
      type: String,
      required: true,
      index: true,
    },

    // Razorpay Payment ID
    razorpayPaymentId: {
      type: String,
      index: true,
      sparse: true,
    },

    // Razorpay signature
    razorpaySignature: {
      type: String,
    },

    // Amount in smallest currency unit
    // Example: ₹5,000 = 500000 paise
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // Payment status
    status: {
      type: String,
      enum: [
        "created",
        "authorized",
        "captured",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      default: "created",
      index: true,
    },

    // Payment method
    method: {
      type: String,
      enum: [
        "card",
        "upi",
        "netbanking",
        "wallet",
        "emi",
        "bank_transfer",
        "other",
      ],
    },

    // Customer details returned by Razorpay
    email: {
      type: String,
    },

    contact: {
      type: String,
    },

    // UPI VPA
    vpa: {
      type: String,
    },

    // Bank information
    bank: {
      type: String,
    },

    // Wallet name
    wallet: {
      type: String,
    },

    // Razorpay fee
    fee: {
      type: Number,
      default: 0,
    },

    // Razorpay tax
    tax: {
      type: Number,
      default: 0,
    },

    // Total amount refunded
    amountRefunded: {
      type: Number,
      default: 0,
    },

    refundStatus: {
      type: String,
      enum: ["pending", "processed", "failed", null],
      default: null,
    },

    // Failure information
    errorCode: {
      type: String,
    },

    errorDescription: {
      type: String,
    },

    errorReason: {
      type: String,
    },

    // Razorpay acquirer information
    acquirerData: {
      type: mongoose.Schema.Types.Mixed,
    },

    // Useful for webhook duplicate protection
    lastWebhookEventId: {
      type: String,
    },

    paidAt: {
      type: Date,
    },

    failedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;