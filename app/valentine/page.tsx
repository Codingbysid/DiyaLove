'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import RunawayButton from '@/components/RunawayButton'
import Navigation from '@/components/Navigation'
import { recordYesClick } from '@/lib/actions'

export default function ValentinePage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const handleYesClick = async () => {
    setIsTransitioning(true)

    // Record the yes click
    await recordYesClick()

    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b9d', '#ff8fab', '#ffb3d9', '#ffc1cc', '#ff9ec7', '#dc143c', '#c41e3a'],
    })

    // Create falling lilies and roses
    const favoriteFlowers = ['🌺', '🌹']
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const flower = document.createElement('div')
        flower.textContent = favoriteFlowers[Math.floor(Math.random() * favoriteFlowers.length)]
        flower.style.position = 'fixed'
        flower.style.fontSize = '35px'
        flower.style.left = Math.random() * 100 + '%'
        flower.style.top = '-50px'
        flower.style.pointerEvents = 'none'
        flower.style.zIndex = '1000'
        flower.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`
        document.body.appendChild(flower)
        setTimeout(() => flower.remove(), 5000)
      }, i * 50)
    }

    // Navigate to shrine after delay
    setTimeout(() => {
      router.push('/shrine')
    }, 2000)
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Navigation />
      
      {/* Animated Background */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(-45deg, #c41e3a, #ff6b9d, #ffc1cc, #ffb3d9, #ff9ec7, #dc143c, #8b0000)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Floating Hearts/Flowers */}
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
        <ProposalCard onYesClick={handleYesClick} isTransitioning={isTransitioning} />
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

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Proposal Card Component
function ProposalCard({
  onYesClick,
  isTransitioning,
}: {
  onYesClick: () => void
  isTransitioning: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        className="backdrop-blur-xl bg-white/20 rounded-3xl border-2 border-white/40 p-8 md:p-12 text-center shadow-2xl relative"
        style={{
          boxShadow: `
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            0 0 60px rgba(255, 107, 157, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5)
          `,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Decorative Flowers */}
        <motion.div
          className="absolute -top-6 right-8 text-5xl"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌹
        </motion.div>
        <motion.div
          className="absolute -bottom-6 left-8 text-5xl"
          animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          🌺
        </motion.div>

        {/* GIF/Image Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 relative inline-block"
        >
          <div
            className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl blur-xl opacity-50"
            style={{
              background: 'linear-gradient(45deg, #ff6b9d, #ff8fab, #ffb3d9, #ff6b9d)',
              backgroundSize: '400% 400%',
              animation: 'gradientShift 3s ease infinite',
            }}
          />
          <img
            src="https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif"
            alt="Cute animation"
            className="relative w-48 h-48 md:w-56 md:h-56 object-contain rounded-2xl shadow-xl"
          />
        </motion.div>

        {/* Main Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.3)]"
          style={{
            textShadow: `
              2px 2px 8px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(255, 215, 0, 0.6),
              0 0 30px rgba(196, 30, 58, 0.5)
            `,
          }}
        >
          Will you be my Valentine? 💖
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-6"
          style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}
        >
          നീ എന്റെ വാലന്റൈൻ ആകുമോ? 💖
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-xl text-white/90 mb-8 italic"
        >
          You make every day feel like a celebration
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-base md:text-lg text-white/80 mb-10"
          style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}
        >
          നിങ്ങൾ എല്ലാ ദിവസവും ആഘോഷം പോലെ തോന്നിക്കുന്നു
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            onClick={onYesClick}
            disabled={isTransitioning}
            className="px-12 py-4 rounded-full font-bold text-xl uppercase tracking-wide
                       bg-gradient-to-r from-red-600 via-pink-500 to-red-600
                       text-yellow-100 border-2 border-yellow-300
                       shadow-[0_6px_20px_rgba(255,107,157,0.4),0_0_0_0_rgba(255,107,157,0.7)]
                       hover:scale-110 hover:shadow-[0_10px_40px_rgba(255,107,157,0.8),0_0_0_15px_rgba(255,107,157,0.3)]
                       active:scale-105 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Yes! 💖
            </span>
          </motion.button>

          <RunawayButton className="px-10 py-4">
            No 😢
          </RunawayButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Floating Elements Component
function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 15 }).map((_, i) => {
        const items = ['💖', '💕', '💗', '💓', '💝', '❤️', '💞', '🌺', '🌹', '🌺', '🌹']
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

