"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CompanyInfoCards from "@/components/company/company-info-cards"
import ServiceCard from "@/components/company/service-card"

export default function CompanyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [company, setCompany] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/companies/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.error || `HTTP ${res.status}`)
        }
        return res.json()
      })
      .then(setCompany)
      .catch((err) => {
        console.error("Fetch error:", err.message)
        setCompany(null)
      })
  }, [id])

  if (!company) return <p className="text-center mt-20">Loading...</p>

  // Sample services data
  const services = [
    {
      title: "File Confirmation Statement",
      description: "Ensure your confirmation statement is filed on time.",
      dueIn: company.confirmation_statement?.last_made_up_to
        ? `Due by ${company.confirmation_statement.last_made_up_to}`
        : undefined,
      price: 50,
    },
    {
      title: "File Annual Accounts",
      description: "Prepare and file your annual accounts easily.",
      dueIn: company.accounts?.last_accounts?.made_up_to
        ? `Due by ${company.accounts.last_accounts.made_up_to}`
        : undefined,
      price: 75,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-screen">
      <Header />

      <main className="flex-1 w-full">
        {/* Full-width container */}
        <div className="w-full px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            {company.company_name}
          </h1>

          <CompanyInfoCards
            info={{
              incorporationDate: company.date_of_creation,
              registeredAddress: [
                company.registered_office_address?.address_line_1,
                company.registered_office_address?.address_line_2,
                company.registered_office_address?.locality,
                company.registered_office_address?.postal_code,
                company.registered_office_address?.country,
              ]
                .filter(Boolean)
                .join(", "),
              confirmationStatementDue: company.confirmation_statement?.last_made_up_to,
              accountsDue: company.accounts?.last_accounts?.made_up_to,
            }}
          />

          {/* Services Section */}
          <section className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                dueIn={service.dueIn}
                price={service.price}
                onAdd={() => alert(`Added service: ${service.title}`)}
              />
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
