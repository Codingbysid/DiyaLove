'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Home, Image, BookOpen, Sparkles, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/valentine', label: 'Proposal', icon: Heart },
  { href: '/shrine', label: 'Shrine', icon: Sparkles },
  { href: '/gallery', label: 'Gallery', icon: Image },
  { href: '/poetry', label: 'Poetry', icon: BookOpen },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Glassmorphism Bar */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-rose-50 rounded-lg group-hover:bg-rose-100 transition-colors">
                 <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
                Diya Love
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
                      isActive
                        ? 'text-rose-600 bg-rose-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <Icon className={cn('w-4 h-4', isActive && 'fill-rose-200')} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-xl md:hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                      isActive ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
