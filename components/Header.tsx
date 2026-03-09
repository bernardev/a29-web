"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="https://khaki-chough-664761.hostingersite.com/wp-content/uploads/2025/11/WhatsApp_Image_2025-10-23_at_14.05.56-removebg-preview.png"
            alt="A29 Imóveis"
            className="h-14 sm:h-16 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white/80 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Início
          </Link>
          <Link href="/imoveis" className="text-white/80 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Imóveis
          </Link>
          <Link href="/contato" className="text-white/80 hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase">
            Contato
          </Link>
          <a
            href="https://wa.me/5541996595055?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            <Phone size={16} />
            Fale Conosco
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-primary/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 border-t border-white/10" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-white/90 hover:text-accent text-lg font-medium tracking-wide"
          >
            Início
          </Link>
          <Link
            href="/imoveis"
            onClick={() => setMenuOpen(false)}
            className="text-white/90 hover:text-accent text-lg font-medium tracking-wide"
          >
            Imóveis
          </Link>
          <Link
            href="/contato"
            onClick={() => setMenuOpen(false)}
            className="text-white/90 hover:text-accent text-lg font-medium tracking-wide"
          >
            Contato
          </Link>
          <a
            href="https://wa.me/5541996595055?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white py-3 rounded-full text-base font-semibold mt-2 transition-colors"
          >
            <Phone size={18} />
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  )
}
