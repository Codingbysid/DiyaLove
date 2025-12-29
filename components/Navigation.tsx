'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Home, Image, BookOpen, Sparkles, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  icon: typeof Home
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/valentine', label: 'Valentine', icon: Heart },
  { href: '/shrine', label: 'Shrine', icon: Sparkles },
  { href: '/gallery', label: 'Gallery', icon: Image },
  { href: '/poetry', label: 'Poetry', icon: BookOpen },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Diya Love
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    'flex items-center gap-2',
                    isActive
                      ? 'text-pink-500'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn('w-4 h-4 relative z-10', isActive && 'text-pink-500')} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu pathname={pathname} navItems={navItems} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ pathname, navItems }: { pathname: string; navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white/80 hover:text-white transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 min-w-[200px] shadow-xl"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'text-pink-500 bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

