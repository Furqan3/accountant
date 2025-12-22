import type React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import Logo from "./logo"
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Logo + Main page links */}
        <div className="flex flex-col justify-between">
          {/* Logo at top */}
          <div>
            <Logo />
          </div>

          {/* Main page links aligned middle */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Main page</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Newsletter + Contact + Socials */}
        <div className="flex flex-col gap-8">
          {/* Row 1: Newsletter */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email..."
              className="px-4 py-3 rounded-md border border-gray-300 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
            <button className="bg-teal-700 text-white px-8 py-3 rounded-md hover:bg-teal-800 transition">Submit</button>
          </div>

          {/* Row 2: Contact + Socials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            {/* Contact info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#004250]" />
                  <span className="text-gray-700">Accounts12@email.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#004250]" />
                  <span className="text-gray-700">415-201-2194</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#004250]" />
                  <span className="text-gray-700">7490 Columbia Avenue</span>
                </li>
              </ul>
            </div>

            {/* Social icons */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="bg-[#004250] rounded-full p-3 hover:bg-teal-800 transition"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  aria-label="X (Twitter)"
                  className="bg-[#004250] rounded-full p-3 hover:bg-teal-800 transition"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="bg-[#004250] rounded-full p-3 hover:bg-teal-800 transition"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="bg-[#004250] rounded-full p-3 hover:bg-teal-800 transition"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
