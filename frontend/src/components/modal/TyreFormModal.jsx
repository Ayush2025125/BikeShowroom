import React, { useState, useEffect } from "react";
import { X, Loader2, Save } from "lucide-react";

const TyreFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  tyre = null,
  isLoading,
}) => {
  const initialFormState = {
    brand: "",
    model: "",
    images: "",
    price: "",
    originalPrice: "",
    discount: "",
    size: "",
    type: "",
    pattern: "",
    compound: "",
    maxLoad: "",
    maxSpeed: "",
    offers: "",
    features: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (tyre) {
      setFormData({
        brand: tyre.brand || "",
        model: tyre.model || "",
        images: Array.isArray(tyre.images)
          ? tyre.images.join(", ")
          : tyre.images || "",
        price: tyre.price || "",
        originalPrice: tyre.originalPrice || "",
        discount: tyre.discount || "",
        size: tyre.size || "",
        type: tyre.type || "",
        pattern: tyre.pattern || "",
        compound: tyre.compound || "",
        maxLoad: tyre.maxLoad || "",
        maxSpeed: tyre.maxSpeed || "",
        offers: Array.isArray(tyre.offers)
          ? tyre.offers.join(", ")
          : tyre.offers || "",
        features: Array.isArray(tyre.features)
          ? tyre.features.join(", ")
          : tyre.features || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [tyre, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const processArrayField = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = () => {
    const processedData = {
      ...formData,
      images: processArrayField(formData.images),
      offers: processArrayField(formData.offers),
      features: processArrayField(formData.features),
    };
    onSubmit(processedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {tyre ? "Edit Tyre" : "Add New Tyre"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "brand", label: "Brand *" },
                  { name: "model", label: "Model *" },
                  { name: "price", label: "Price *", placeholder: "₹5,000" },
                  { name: "size", label: "Size *", placeholder: "195/65R15" },
                  {
                    name: "originalPrice",
                    label: "Original Price",
                    placeholder: "₹7,000",
                  },
                  {
                    name: "discount",
                    label: "Discount",
                    placeholder: "₹2,000 OFF",
                  },
                  {
                    name: "type",
                    label: "Type",
                    placeholder: "All-Season, Summer, Winter",
                  },
                  {
                    name: "pattern",
                    label: "Pattern",
                    placeholder: "Directional, Asymmetric",
                  },
                  {
                    name: "compound",
                    label: "Compound",
                    placeholder: "Hard, Soft, Medium",
                  },
                  { name: "maxLoad", label: "Max Load", placeholder: "91V" },
                  {
                    name: "maxSpeed",
                    label: "Max Speed",
                    placeholder: "240 km/h",
                  },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder || ""}
                      required={label.includes("*")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Extra Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images (comma-separated)
                </label>
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="tyre1.jpg, tyre2.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offers (comma-separated)
                </label>
                <textarea
                  name="offers"
                  value={formData.offers}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Free installation, Extended warranty, Old tyre exchange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (comma-separated)
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="All-weather performance, Enhanced grip, Low noise"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {tyre ? "Update Tyre" : "Add Tyre"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TyreFormModal;
