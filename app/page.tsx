'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Sparkles, Image, BookOpen, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

const pages = [
  {
    href: '/valentine',
    title: 'Valentine Proposal',
    description: 'Will you be my Valentine?',
    icon: Heart,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    emoji: '💖',
  },
  {
    href: '/shrine',
    title: 'The Shrine',
    description: 'A sacred place dedicated to you',
    icon: Sparkles,
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    emoji: '🪔',
  },
  {
    href: '/gallery',
    title: 'Gallery',
    description: 'Beautiful memories together',
    icon: Image,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    emoji: '📸',
  },
  {
    href: '/poetry',
    title: 'Poetry',
    description: 'Words from the heart',
    icon: BookOpen,
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    emoji: '📝',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <Navigation />
      
      {/* Animated Background */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(-45deg, #ff6b9d, #ff8fab, #ffb3d9, #ffc1cc, #ff9ec7, #dc143c)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Floating Hearts */}
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pt-24 pb-16">
        <div className="w-full max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-7xl md:text-8xl mb-4"
              >
                💕
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl leading-tight"
              style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.6)',
              }}
            >
              Welcome to Our Love Story
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-3 font-medium"
              style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}
            >
              നമ്മുടെ സ്നേഹകഥയിലേക്ക് സ്വാഗതം
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg lg:text-xl text-white/80 italic max-w-2xl mx-auto"
            >
              Explore the pages of our journey together
            </motion.p>
          </motion.div>

          {/* Page Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {pages.map((page, index) => {
              const Icon = page.icon
              return (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <Link href={page.href} className="block h-full">
                    <motion.div
                      className="group relative backdrop-blur-xl bg-white/25 rounded-3xl border-2 border-white/50 p-6 md:p-8 h-full cursor-pointer overflow-hidden transition-all duration-300"
                      style={{
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 60px rgba(255, 107, 157, 0.3)',
                      }}
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Gradient Overlay on Hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-0 group-hover:opacity-25 transition-opacity duration-300`}
                      />

                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                          <motion.div
                            className={`p-3 md:p-4 rounded-2xl bg-gradient-to-br ${page.gradient} shadow-lg group-hover:shadow-xl transition-shadow`}
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </motion.div>
                          <motion.div
                            className="text-4xl md:text-5xl"
                            animate={{ 
                              y: [0, -5, 0],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          >
                            {page.emoji}
                          </motion.div>
                        </div>

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                          {page.title}
                        </h2>
                        <p className="text-white/90 text-base md:text-lg mb-6 leading-relaxed">
                          {page.description}
                        </p>

                        <div className="flex items-center text-white font-semibold group-hover:text-yellow-200 transition-colors">
                          <span className="text-sm md:text-base">Explore</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-12 md:mt-16"
          >
            <p className="text-white/70 text-sm md:text-base italic">
              Made with 💖 for someone special
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}

// Floating Elements Component
function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => {
        const items = ['💖', '💕', '💗', '💓', '💝', '❤️', '💞', '🌺', '🌹']
        const item = items[Math.floor(Math.random() * items.length)]
        const isFlower = item === '🌺' || item === '🌹'
        return (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: isFlower ? '25px' : '20px',
            }}
            animate={{
              y: ['100vh', '-100px'],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            {item}
          </motion.div>
        )
      })}
    </div>
  )
}
