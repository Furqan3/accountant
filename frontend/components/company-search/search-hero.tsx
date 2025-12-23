"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { StarsBackground } from "../ui/stars"
import Header from "../layout/header"

interface SearchHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchResults?: (companies: any[]) => void
}

const SearchHero: React.FC<SearchHeroProps> = ({ searchQuery, onSearchChange, onSearchResults }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSearch()
  }

  const handleSearch = async () => {
    if (!searchQuery) return

    setIsLoading(true) // Start loading

    try {
      const res = await fetch(`/api/companiessearch/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()

      if (!res.ok) {
        console.error(data.error || "Failed to fetch companies")
        setIsLoading(false)
        return
      }

      if (onSearchResults) {
        onSearchResults(data.companies || [])
      }
    } catch (err) {
      console.error("Search error:", err)
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <>
      <div className="relative z-50 bg-header-gradient px-6 pt-6">
        <Header />
      </div>

      <section className="relative bg-custom-gradient pb-6 px-6 overflow-hidden">
        <StarsBackground />
        <div className="max-w-2xl mx-auto text-center p-16 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your Company
          </h1>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Search for your company to view filing deadlines, compliance status, and available services — all in one place.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search Company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white focus:ring-2 focus:ring-teal-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default SearchHero
