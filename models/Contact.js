import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interest: { type: String, required: true },
    country: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Active", "Accepted", "Rejected"],
      default: "Active",
    },
    remark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);
