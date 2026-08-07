import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  password: string;

  profileImage?: string;

  status: "active" | "inactive" | "blocked";

  emailVerified: boolean;
  phoneVerified: boolean;

  provider: "email" | "google";

  lastLogin?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
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

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Don't return password by default
    },

    profileImage: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },

    lastLogin: {
      type: Date,
      default: null,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Customer: Model<IUser> =
  mongoose.models.Customer || mongoose.model<IUser>("Customer", UserSchema);

export default Customer;