"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Logo from "./logo"
import { Menu, X } from "lucide-react"

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative flex h-14 items-center justify-between px-5 bg-white rounded-lg">
      <Logo />

      <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 text-gray-600">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <Link href="#" className="hover:text-gray-900">
          About Us
        </Link>
        <Link href="#" className="hover:text-gray-900">
          Services
        </Link>
        <Link href="#" className="hover:text-gray-900">
          Company Search
        </Link>
      </nav>

      {/* Auth buttons - desktop */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/signin" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
          Sign In
        </Link>
        <Link
          href="/signup"
          className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50">
          <nav className="flex flex-col space-y-3 text-gray-600">
            <Link href="/" className="hover:text-gray-900 py-2">
              Home
            </Link>
            <Link href="#" className="hover:text-gray-900 py-2">
              About Us
            </Link>
            <Link href="#" className="hover:text-gray-900 py-2">
              Services
            </Link>
            <Link href="#" className="hover:text-gray-900 py-2">
              Company Search
            </Link>
            <hr className="my-2" />
            <Link href="/signin" className="hover:text-gray-900 py-2">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2 rounded-lg text-center"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
