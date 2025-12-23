"use client"

import type React from "react"
import { useState } from "react"

interface CheckoutFormProps {
  total: number
  onSubmit: (data: FormData) => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ total, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Your Details */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Your Firstname"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Your Lastname"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Your Phonenumber"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Payment Details */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 5678 90123"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            placeholder="--/--"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">cvv</label>
          <input
            type="text"
            name="cvv"
            placeholder="123"
            value={formData.cvv}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
      >
        Pay {total}$
      </button>
    </form>
  )
}

export default CheckoutForm
