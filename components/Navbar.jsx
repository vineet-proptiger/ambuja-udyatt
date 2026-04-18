'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { logoImages } from '../lib/images'

const GOLD = 'var(--color-gold)'

const navLinks = [
  { name: 'Overview', href: '#overview' },
  { name: 'Highlights', href: '#highlights' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Price', href: '#pricing' },
  { name: 'Location', href: '#location' },
  { name: 'Floor Plan', href: '#masterplan' },
  { name: 'Developer', href: '#developer' },
]

/* ── Inline SVG Logo ─────────────────────────────────────────── */
const ProjectLogo = () => (
  <img
    src={logoImages.tarc}
    alt="Ambuja Udyatt"
    className="h-[70px] md:h-[80px] w-auto object-contain transition-all scale-[1.25] md:scale-[1.3] origin-left"
    style={{ maxWidth: '450px' }}
  />
)

const Navbar = ({ setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Gold accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, var(--color-gold), var(--color-gold-light), var(--color-gold))` }} />

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[80px]">

          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <ProjectLogo />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.name} href={link.href}
                className="text-[13px] font-medium text-[var(--color-text-mid)] hover:text-gold transition-colors tracking-wide relative group"
                style={{ fontFamily: 'var(--font-sans)' }}>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: GOLD }} />
              </a>
            ))}
          </div>

          {/* Enquire Now — Desktop */}
          <button onClick={() => setIsOpen(true)}
            className="hidden lg:flex btn-gold"
            style={{ borderRadius: '50px' }}>
            Enquire Now <span className="text-base leading-none">→</span>
          </button>

          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[var(--color-text-mid)] p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[var(--color-bg)] border-t border-gray-100 shadow-lg">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3.5 text-sm text-[var(--color-text-mid)] hover:bg-[var(--color-bg-light)] border-b border-gray-50 hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}>
              {link.name}
            </a>
          ))}
          <div className="p-4">
            <button onClick={() => { setIsOpen(true); setMobileOpen(false) }}
              className="w-full btn-gold"
              style={{ borderRadius: '50px' }}>
              Enquire Now →
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
