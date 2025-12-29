'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Flower2, Heart } from 'lucide-react'
import { recordYesClick, incrementFlowerCount } from '@/lib/actions'

interface ShrineProps {
  imageUrl?: string
}

export default function Shrine({ imageUrl = '/DPZY-165.jpg' }: ShrineProps) {
  const [flowerCount, setFlowerCount] = useState(0)
  const [isOffering, setIsOffering] = useState(false)

  useEffect(() => {
    // Record the yes click when shrine appears
    recordYesClick()
  }, [])

  const handleOfferFlowers = async () => {
    setIsOffering(true)

    // Record flower offering
    const result = await incrementFlowerCount()
    setFlowerCount(result.count || flowerCount + 1)

    // Create flower/heart emoji confetti
    const flowers = ['🌺', '🌹', '🌸', '🌼', '💐']
    const duration = 3000
    const animationEnd = Date.now() + duration

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        setIsOffering(false)
        return
      }

      const particleCount = 30

      // Left side burst
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706', '#dc143c', '#c41e3a'],
        shapes: ['square'],
      })

      // Right side burst
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706', '#dc143c', '#c41e3a'],
        shapes: ['square'],
      })

      // Center burst
      confetti({
        particleCount: 20,
        spread: 80,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706', '#dc143c', '#c41e3a'],
        shapes: ['square'],
      })
    }, 100)

    // Create falling flower emojis
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const flower = document.createElement('div')
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)]
        flower.style.position = 'fixed'
        flower.style.fontSize = '30px'
        flower.style.left = Math.random() * 100 + '%'
        flower.style.top = '-50px'
        flower.style.pointerEvents = 'none'
        flower.style.zIndex = '1000'
        flower.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`
        document.body.appendChild(flower)

        setTimeout(() => flower.remove(), 5000)
      }, i * 50)
    }

    // Final massive burst
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 120,
            origin: {
              x: Math.random() * 0.6 + 0.2,
              y: Math.random() * 0.4 + 0.3,
            },
            colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706', '#dc143c', '#c41e3a'],
            shapes: ['square'],
          })
        }, i * 200)
      }
    }, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-4 py-8 text-center"
    >
      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-6xl font-bold text-yellow-300 mb-4 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        The Queen of My Heart
      </motion.h1>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-white mb-8"
        style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}
      >
        എന്റെ ഹൃദയത്തിന്റെ രാജ്ഞി
      </motion.h2>

      {/* Shrine Frame */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
        className="relative inline-block p-8 my-8"
        style={{
          background: 'linear-gradient(135deg, #ffd700, #fbbf24, #f59e0b, #d97706, #8b4513)',
          border: '8px solid #ffd700',
          borderRadius: '20px',
          boxShadow: `
            0 0 0 4px #f59e0b,
            0 0 0 8px #c41e3a,
            0 0 40px rgba(255, 215, 0, 0.9),
            0 0 80px rgba(255, 215, 0, 0.7),
            0 0 120px rgba(196, 30, 58, 0.6),
            inset 0 0 30px rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        {/* Diyas (Oil Lamps) */}
        <Diya position="left" />
        <Diya position="right" />

        {/* Decorative Flowers */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌺
        </motion.div>
        <motion.div
          className="absolute -bottom-6 right-8 text-5xl"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          🌹
        </motion.div>

        {/* Photo Frame */}
        <div className="relative">
          <img
            src={imageUrl}
            alt="My Goddess"
            className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-xl border-4 border-yellow-300 shadow-2xl"
            style={{
              boxShadow: `
                0 10px 40px rgba(0, 0, 0, 0.4),
                inset 0 0 20px rgba(255, 215, 0, 0.3),
                0 0 20px rgba(255, 215, 0, 0.5)
              `,
            }}
          />
        </div>
      </motion.div>

      {/* Offer Flowers Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleOfferFlowers}
        disabled={isOffering}
        className="mt-8 px-12 py-4 rounded-full font-bold text-xl uppercase tracking-wider
                   bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600
                   text-yellow-100 border-3 border-yellow-300
                   shadow-[0_8px_25px_rgba(0,0,0,0.3),0_0_20px_rgba(255,215,0,0.6)]
                   hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_40px_rgba(255,215,0,1)]
                   active:scale-105 transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center gap-2">
          <Flower2 className="w-6 h-6" />
          Offer Flowers 🌺🌹
        </span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 text-yellow-300 text-lg"
        style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}
      >
        പൂക്കൾ അർപ്പിക്കുക 🌺🌹
      </motion.p>

      {flowerCount > 0 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-yellow-200 text-sm"
        >
          Flowers offered: {flowerCount}
        </motion.p>
      )}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  )
}

// Diya Component
function Diya({ position }: { position: 'left' | 'right' }) {
  return (
    <motion.div
      className={`absolute -bottom-8 ${position === 'left' ? 'left-4' : 'right-4'} text-5xl`}
      animate={{
        scale: [1, 1.1, 1],
        filter: [
          'drop-shadow(0 0 10px rgba(251,191,36,0.8))',
          'drop-shadow(0 0 15px rgba(251,191,36,1))',
          'drop-shadow(0 0 10px rgba(251,191,36,0.8))',
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      🪔
    </motion.div>
  )
}

