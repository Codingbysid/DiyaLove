'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Sparkles, Image, BookOpen, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const pages = [
  {
    href: '/valentine',
    title: 'The Proposal',
    description: 'A special question for you...',
    icon: Heart,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    href: '/shrine',
    title: 'The Shrine',
    description: 'A sacred space for my goddess',
    icon: Sparkles,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    href: '/gallery',
    title: 'Our Memories',
    description: 'Moments captured in time',
    icon: Image,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    href: '/poetry',
    title: 'Love Letters',
    description: 'Words from my heart to yours',
    icon: BookOpen,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fafafa]">
      <Navigation />
      
      {/* --- Professional Soft Background --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-200/40 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-200/40 blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Floating Bokeh Particles (Replaces Emoji Rain) */}
      <BokehParticles />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-12 pt-24">
        <div className="w-full max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16 md:mb-20 space-y-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
               <span className="inline-block py-1 px-4 rounded-full bg-white/60 border border-white/60 backdrop-blur-sm text-sm font-medium text-rose-500 mb-6 shadow-sm">
                 EST. 2025
               </span>
               <h1 
                className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 leading-tight tracking-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Love Story
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-gray-600 font-medium"
              style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}
            >
              നമ്മുടെ സ്നേഹകഥ
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-gray-500 max-w-lg mx-auto leading-relaxed"
            >
              Every moment with you is a page I want to read forever. 
              Explore the chapters of our journey below.
            </motion.p>
          </motion.div>

          {/* Elegant Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pages.map((page, index) => {
              const Icon = page.icon
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                >
                  <Link href={page.href} className="block group">
                    <motion.div
                      className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-[0_4px_20px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-1px_rgba(0,0,0,0.1)] transition-all duration-300"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-4">
                          <div className={`w-12 h-12 ${page.bg} rounded-xl flex items-center justify-center ${page.color} transition-transform group-hover:scale-110 duration-300`}>
                            <Icon size={24} strokeWidth={2} />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                              {page.title}
                            </h2>
                            <p className="text-gray-500 text-sm font-medium">
                              {page.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:bg-rose-500 group-hover:border-rose-500 group-hover:text-white transition-all duration-300">
                          <ArrowRight size={14} />
                        </div>
                      </div>

                      {/* Subtle Shine Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-20"
          >
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
              Designed with love for her
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Subtle Background Particles (The "Bokeh" Effect)
function BokehParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-sm"
          style={{
            background: Math.random() > 0.5 ? 'rgba(255, 228, 230, 0.5)' : 'rgba(230, 240, 255, 0.5)', // Very subtle pinks/blues
            width: Math.random() * 100 + 50 + 'px',
            height: Math.random() * 100 + 50 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
