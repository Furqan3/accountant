"use client"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Footer from "@/components/layout/footer"
import PageHero from "@/components/shared/page-hero"
import OrderCard from "@/components/orders/order-card"

const orders = [
  {
    id: "ORD-000003",
    items: [
      { name: "Registered Office Address (x1)", price: 30 },
      { name: "Confirmation Statement", price: 45.3 },
      { name: "Register company as dormant & file Confirmation Statement", price: 12.56 },
    ],
    status: "Pending" as const,
    isPaid: true,
  },
  {
    id: "ORD-000003",
    items: [
      { name: "Registered Office Address (x1)", price: 30 },
      { name: "Confirmation Statement", price: 45.3 },
      { name: "Register company as dormant & file Confirmation Statement", price: 12.56 },
    ],
    status: "Completed" as const,
    isPaid: true,
  },
]

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    }
  }, [status, router])

  const handleWithdraw = (orderId: string) => {
    console.log("Withdrawing order:", orderId)
  }

  const handleReview = (orderId: string) => {
    console.log("Writing review for order:", orderId)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
   

      <PageHero title="My Orders" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <OrderCard
              key={idx}
              orderId={order.id}
              items={order.items}
              status={order.status}
              isPaid={order.isPaid}
              onWithdraw={order.status === "Pending" ? () => handleWithdraw(order.id) : undefined}
              onReview={order.status === "Completed" ? () => handleReview(order.id) : undefined}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
