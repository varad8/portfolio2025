import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expiresAt: Date,
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
