import type React from "react"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderSummaryProps {
  items: OrderItem[]
  total: number
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity.toString().padStart(2, "0")}</p>
            </div>
            <span className="text-lg font-semibold text-gray-900">${item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-teal-700">${total.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default OrderSummary
