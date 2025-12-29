'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import RunawayButton from '@/components/RunawayButton'
import Navigation from '@/components/Navigation'
import { recordYesClick } from '@/lib/actions'

export default function ValentinePage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const handleYesClick = async () => {
    setIsTransitioning(true)
    await recordYesClick()

    // Elegant Confetti (Gold and Rose)
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#e11d48', '#fb7185', '#f43f5e', '#ffe4e6']

    ;(function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()

    // Navigate
    setTimeout(() => {
      router.push('/shrine')
    }, 2500)
  }

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#fafafa]">
      <Navigation />
      
      {/* Soft Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-rose-100/50 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-100/50 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <ProposalCard onYesClick={handleYesClick} isTransitioning={isTransitioning} />
      </div>
    </div>
  )
}

function ProposalCard({ onYesClick, isTransitioning }: { onYesClick: () => void; isTransitioning: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative backdrop-blur-xl bg-white/70 rounded-[2rem] border border-white/80 p-8 md:p-12 text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
        
        {/* Cute Floating Icon */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm"
        >
          <Sparkles className="w-10 h-10 text-rose-400" />
        </motion.div>

        {/* Main Text */}
        <h1 
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Will you be my Valentine?
        </h1>

        <p className="text-xl text-rose-500 font-medium mb-6" style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}>
          നീ എന്റെ വാലന്റൈൻ ആകുമോ? 💖
        </p>

        <p className="text-gray-500 mb-10 leading-relaxed">
          You make every ordinary moment feel like a celebration. I can't imagine this journey without you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[60px]">
          <motion.button
            onClick={onYesClick}
            disabled={isTransitioning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-semibold text-lg bg-rose-500 text-white shadow-lg shadow-rose-200 hover:bg-rose-600 hover:shadow-rose-300 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white" />
            Yes, I will!
          </motion.button>

          <RunawayButton className="px-8 py-4 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full font-medium w-full sm:w-auto">
            No, thanks
          </RunawayButton>
        </div>
      </div>
    </motion.div>
  )
}
