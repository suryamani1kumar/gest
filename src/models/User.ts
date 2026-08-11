import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;

  email: string;
  phone?: string;

  profileImage?: string;

  status: "pending" | "active" | "inactive" | "blocked";

  emailVerified: boolean;

  provider: "email" | "google";

  emailOtpHash?: string;
  emailOtpExpiresAt?: Date;
  emailOtpAttempts: number;

  sessionToken?: string;
  sessionExpiresAt?: Date;

  lastLogin?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
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
      default: null,
      trim: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "active", "inactive", "blocked"],
      default: "pending",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },

    emailOtpHash: {
      type: String,
      default: null,
      select: false,
    },

    emailOtpExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },

    emailOtpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },

    sessionToken: {
      type: String,
      default: null,
      select: false,
      index: true,
    },

    sessionExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Customer: Model<IUser> =
  mongoose.models.Customer ||
  mongoose.model<IUser>("Customer", UserSchema);

export default Customer;
