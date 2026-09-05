import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type CustomerStatus = "pending" | "active" | "inactive" | "blocked";

export type AddressType = "billing" | "shipping";

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export type DeviceType = "desktop" | "mobile" | "tablet";

export interface IAddress {
  _id?: Types.ObjectId;

  type: AddressType;

  firstName?: string;
  lastName?: string;
  phone?: string;

  addressLine1: string;
  addressLine2?: string;
  landmark?: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  isDefault: boolean;
}

export interface ILoginHistory {
  _id?: Types.ObjectId;

  loginAt: Date;
  logoutAt?: Date;

  ipAddress?: string;

  device?: {
    type?: DeviceType;
    name?: string;
  };

  browser?: {
    name?: string;
  };

  location?: {
    country?: string;
    state?: string;
    city?: string;
  };

  success: boolean;
  failureReason?: string;
}

export interface ICustomer extends Document {
  customerId: string;

  firstName?: string;
  lastName?: string;

  email: string;
  phone?: string;

  profileImage?: string;

  status: CustomerStatus;

  emailVerified: boolean;

  // Email OTP
  emailOtpHash?: string;
  emailOtpExpiresAt?: Date;
  emailOtpAttempts: number;

  // Session
  sessionToken?: string;
  sessionExpiresAt?: Date;

  // Login history
  loginHistory: ILoginHistory[];

  // Addresses
  addresses: IAddress[];

  // Customer information
  dateOfBirth?: Date;
  gender?: Gender;

  // CRM
  tags?: string[];
  source?: string;

  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    type: {
      type: String,
      enum: ["billing", "shipping"],
      required: true,
    },

    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    phone: {
      type: String,
      trim: true,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    addressLine2: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    landmark: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      default: "India",
      maxlength: 100,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  },
);

const LoginHistorySchema = new Schema<ILoginHistory>(
  {
    loginAt: {
      type: Date,
      required: true,
    },

    logoutAt: {
      type: Date,
      default: undefined,
    },

    ipAddress: {
      type: String,
      trim: true,
    },

    device: {
      type: {
        type: String,
        enum: ["desktop", "mobile", "tablet"],
      },

      name: {
        type: String,
        trim: true,
      },
    },

    browser: {
      name: {
        type: String,
        trim: true,
      },
    },

    location: {
      country: {
        type: String,
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },
    },

    success: {
      type: Boolean,
      required: true,
    },

    failureReason: {
      type: String,
      trim: true,
    },
  },
  {
    _id: true,
  },
);

const CustomerSchema = new Schema<ICustomer>(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    firstName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "active", "inactive", "blocked"],
      default: "pending",
      index: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailOtpHash: {
      type: String,
      select: false,
    },

    emailOtpExpiresAt: {
      type: Date,
      select: false,
    },

    emailOtpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },

    sessionToken: {
      type: String,
      select: false,
      index: true,
    },

    sessionExpiresAt: {
      type: Date,
      select: false,
    },

    loginHistory: {
      type: [LoginHistorySchema],
      default: [],
    },

    addresses: {
      type: [AddressSchema],
      default: [],
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    source: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Customer: Model<ICustomer> =
  mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;
