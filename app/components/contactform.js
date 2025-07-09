"use client";

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const countryCurrencyMap = {
  India: {
    symbol: "₹",
    ranges: ["₹5,000–₹10,000", "₹10,000–₹50,000", "₹50,000–₹80,000"],
  },
  USA: { symbol: "$", ranges: ["$500–$1000", "$1000–$3000", "$3000–$5000"] },
  UK: { symbol: "£", ranges: ["£400–£1000", "£1000–£2500", "£2500–£4000"] },
  Australia: {
    symbol: "A$",
    ranges: ["A$500–A$1500", "A$1500–A$3000", "A$3000+"],
  },
  Canada: {
    symbol: "C$",
    ranges: ["C$500–C$1500", "C$1500–C$3000", "C$3000+"],
  },
  Germany: { symbol: "€", ranges: ["€500–€1000", "€1000–€3000", "€3000+"] },
  France: { symbol: "€", ranges: ["€500–€1000", "€1000–€3000", "€3000+"] },
  Italy: { symbol: "€", ranges: ["€500–€1000", "€1000–€3000", "€3000+"] },
  Japan: {
    symbol: "¥",
    ranges: ["¥50,000–¥100,000", "¥100,000–¥300,000", "¥300,000+"],
  },
  default: { symbol: "$", ranges: ["<$500", "$500–$1000", "$1000+"] },
};

const countryList = Object.keys(countryCurrencyMap).filter(
  (c) => c !== "default"
);

export default function ContactForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [budgetOptions, setBudgetOptions] = useState(
    countryCurrencyMap.default.ranges
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    country: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const data = countryCurrencyMap[country] || countryCurrencyMap.default;
    setBudgetOptions(data.ranges);
    setFormData((prev) => ({ ...prev, country }));
  };

  const validate = () => {
    const { name, email, phone, interest, country, budget, message } = formData;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international format
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

    if (
      !name ||
      !email ||
      !phone ||
      !interest ||
      !country ||
      !budget ||
      !message
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (!gmailRegex.test(email.trim())) {
      toast.error("Please enter a valid Gmail address");
      return false;
    }
    if (!phoneRegex.test(phone.trim())) {
      toast.error("Please enter a valid international phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      toast.success("Submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        country: "",
        budget: "",
        message: "",
      });
      setSelectedCountry("");
      setBudgetOptions(countryCurrencyMap.default.ranges);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full overflow-hidden py-16 px-6 md:px-20 bg-white text-[var(--color-dark)]">
      <Toaster />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
      >
        <motion.div className="space-y-6">
          <h4 className="text-[var(--color-orange-accent)] font-medium">
            — Contact Us
          </h4>
          <h2 className="text-3xl font-bold">
            Let’s Talk for{" "}
            <span className="text-[var(--color-orange-accent)] italic font-semibold">
              Your Next Projects
            </span>
          </h2>
          <p className="text-[var(--color-dark-gray)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <div className="space-y-4">
            <ContactInfo icon={<FaPhone />} text="+1 (406) 555–0120" />
            <ContactInfo
              icon={<FaEnvelope />}
              text="varadnikharage201@gmail.com"
            />
            <ContactInfo
              icon={<FaMapMarkerAlt />}
              text="Ratnagiri, Maharashtra, India"
            />
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Your Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex. John Doe"
            />
            <InputField
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
            <InputField
              label="Phone *"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
            />
            <SelectField
              label="I’m Interested in *"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              options={["Web Design", "Mobile App", "Branding"]}
            />
            <SelectField
              label="Country *"
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              options={countryList}
            />
            <SelectField
              label="Budget Range *"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              options={budgetOptions}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Your Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter here.."
              rows={5}
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-[var(--color-orange-accent)]"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`mt-2 px-6 py-3 rounded-full text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--color-orange-accent)] hover:bg-opacity-90"
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

function ContactInfo({ icon, text }) {
  return (
    <motion.div className="flex items-start gap-4">
      <div className="bg-[var(--color-orange-accent)] text-white p-2 rounded-full text-lg">
        {icon}
      </div>
      <p className="text-[var(--color-dark)] text-sm md:text-base">{text}</p>
    </motion.div>
  );
}

function InputField({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-[var(--color-orange-accent)]"
      />
    </div>
  );
}

function SelectField({ label, options, name, value, onChange }) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-[var(--color-orange-accent)]"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
