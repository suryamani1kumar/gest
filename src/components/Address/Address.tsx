"use client";
import { ShippingForm } from "@/app/checkout/page";
import { indianStatesAndUTs } from "@/lib/data";
import { AddressType } from "@/models/User";
import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";

const Address = ({
  form,
  setForm,
  formError,
  addresses,
  selectedAddressId,
}: {
  form: ShippingForm;
  setForm: Dispatch<SetStateAction<ShippingForm>>;
  formError: string;
  addresses: any[];
  selectedAddressId: string | null;
}) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addAddress = async () => {
    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          isDefault: false,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add address");
      }

      return result.data;
    } catch (error: any) {
      console.error("Add address error:", error);
      return null;
    }
  };
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-serif text-[#1A1A1A]">Shipping Address</h2>
      </div>

      {addresses.length > 0 && !showAddressForm ? (
        <>
          {(() => {
            const selectedAddress = addresses.find(
              (address) => address._id === selectedAddressId,
            );

            if (!selectedAddress) return null;

            return (
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#7A1F1F] px-3 py-1 text-xs font-medium capitalize text-white">
                      {selectedAddress.type}
                    </span>

                    {selectedAddress.isDefault && (
                      <span className="text-xs text-gray-500">Default</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddressList(true)}
                    className="text-sm font-medium text-[#7A1F1F]"
                  >
                    Change
                  </button>
                </div>

                <p className="font-medium text-gray-900">
                  {selectedAddress.firstName} {selectedAddress.lastName}{" "}
                  {"     "} {selectedAddress.phone}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {selectedAddress.addressLine1}
                  {selectedAddress.addressLine2 &&
                    `, ${selectedAddress.addressLine2}`}
                </p>

                {selectedAddress.landmark && (
                  <p className="text-sm text-gray-600">
                    {selectedAddress.landmark}
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  {selectedAddress.city}, {selectedAddress.state}{" "}
                  {selectedAddress.postalCode}
                </p>
              </div>
            );
          })()}

          <button
            type="button"
            onClick={() => {
              setShowAddressForm(true);
              setShowAddressList(false);
            }}
            className="mt-4 w-full rounded-lg border border-dashed border-[#7A1F1F] px-4 py-3 text-sm font-medium text-[#7A1F1F] transition hover:bg-[#7A1F1F] hover:text-white"
          >
            + Add New Address
          </button>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleFormChange}
                placeholder="First name"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleFormChange}
                placeholder="Last name"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleFormChange}
                placeholder="Street address"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* Landmark */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Landmark <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleFormChange}
                placeholder="Nearby landmark"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* City */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleFormChange}
                placeholder="City"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* State */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                State <span className="text-red-500">*</span>
              </label>

              <select
                name="state"
                value={form.state}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              >
                <option value="">Select State</option>

                {indianStatesAndUTs.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Postal Code */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleFormChange}
                placeholder="Postal code"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Phone number"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm transition-colors focus:border-[#7A1F1F] focus:outline-none"
              />
            </div>

            {/* Address Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Type of address
              </label>

              <div className="flex gap-3">
                {(["home", "work"] as AddressType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        type,
                      }))
                    }
                    className={`rounded-lg border px-5 py-2 text-sm font-medium capitalize transition-colors ${
                      form.type === type
                        ? "border-[#7A1F1F] bg-[#7A1F1F] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#7A1F1F]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {/* Form error */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                {formError}
              </div>
            )}

            {/* Pay Button */}
          </div>
          <button
            type="button"
            onClick={addAddress}
            className="w-full bg-[#7A1F1F] text-white p-3 mt-5 uppercase tracking-widest text-sm font-medium hover:bg-[#B8860B] transition-colors rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            Save Address
          </button>
        </>
      )}
    </section>
  );
};

export default Address;
