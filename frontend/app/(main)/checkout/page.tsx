"use client"
import Footer from "@/components/layout/footer"
import PageHero from "@/components/shared/page-hero"
import CheckoutForm from "@/components/checkout/checkout-form"
import OrderSummary from "@/components/checkout/order-summary"

const orderItems = [
  { name: "Express Service", quantity: 2, price: 30 },
  { name: "Confirmation Statement", quantity: 2, price: 30 },
  { name: "Register company as dormant & file Confirmation Statement", quantity: 2, price: 30 },
]

const total = 269.97

export default function CheckoutPage() {
  const handleSubmit = (data: any) => {
    console.log("Payment submitted:", data)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      <PageHero title="Checkout" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CheckoutForm total={438} onSubmit={handleSubmit} />
          <OrderSummary items={orderItems} total={total} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
