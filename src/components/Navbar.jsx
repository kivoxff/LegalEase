'use client'

import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Adds a subtle shadow and background opacity change when scrolling down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-6'} px-4 sm:px-6 pointer-events-none`}>
      
      {/* Floating Pill Container */}
      <div className={`mx-auto max-w-3xl pointer-events-auto transition-all duration-500 flex items-center justify-between px-6 py-3 rounded-full border ${
        scrolled 
          ? 'bg-neutral-900/80 border-neutral-700/50 shadow-2xl shadow-black/50 backdrop-blur-xl' 
          : 'bg-neutral-900/40 border-neutral-800/40 backdrop-blur-md'
      }`}>
        
        {/* Typographic Logo */}
        <a href="#" className="relative group flex items-center">
          <h1 className="text-2xl font-display font-bold tracking-tight">
            {/* White/Silver to subtle accent gradient */}
            <span className="bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent transition-all duration-500 group-hover:via-primary-300 group-hover:to-primary-500">
              LegalEase
            </span>
          </h1>
        </a>

        {/* Desktop Links Container */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-950/50 p-1 rounded-full border border-neutral-800/50">
          <NavLink href="#summarize">Summarize</NavLink>
          <NavLink href="#create">Create</NavLink>
          <NavLink href="#convert">Convert</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors bg-neutral-800/50 hover:bg-neutral-700/50 rounded-full"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute left-4 right-4 top-full mt-3 transition-all duration-300 origin-top pointer-events-auto ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
      }`}>
        <div className="p-3 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl flex flex-col gap-1">
          <MobileNavLink href="#summarize" onClick={() => setIsOpen(false)}>Summarize</MobileNavLink>
          <MobileNavLink href="#create" onClick={() => setIsOpen(false)}>Create</MobileNavLink>
          <MobileNavLink href="#convert" onClick={() => setIsOpen(false)}>Convert</MobileNavLink>
        </div>
      </div>
      
    </nav>
  )
}

// Reusable Desktop Link Component
function NavLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="px-5 py-2.5 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-300"
    >
      {children}
    </a>
  )
}

// Reusable Mobile Link Component
function MobileNavLink({ href, onClick, children }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="px-4 py-3 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-all duration-300"
    >
      {children}
    </a>
  )
}