import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    pincode: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
