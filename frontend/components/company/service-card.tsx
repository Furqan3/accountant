"use client"

import type React from "react"
import { Calendar } from "lucide-react"

interface ServiceCardProps {
  title: string
  description?: string
  dueIn?: string
  bulletPoints?: string[]
  price: number
  onAdd: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, dueIn, bulletPoints, price, onAdd }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {dueIn && <p className="text-sm text-gray-500 mb-2">{dueIn}</p>}
          {description && <p className="text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>}
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {bulletPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          <button onClick={onAdd} className="p-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition">
            <Calendar className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
