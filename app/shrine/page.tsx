'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Flower2, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { recordYesClick, incrementFlowerCount } from '@/lib/actions'

export default function ShrinePage() {
  const [flowerCount, setFlowerCount] = useState(0)

  useEffect(() => { recordYesClick() }, [])

  const handleOfferFlowers = async () => {
    const result = await incrementFlowerCount()
    setFlowerCount(result.count || flowerCount + 1)

    ;(function frame() {
      const end = Date.now() + 2000
      if (Date.now() < end) {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#fbbf24', '#f59e0b'], shapes: ['circle'] })
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#fbbf24', '#f59e0b'], shapes: ['circle'] })
        requestAnimationFrame(frame)
      }
    })()
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      <Navigation />
      
      {/* Divine Golden Glow Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] rounded-full bg-amber-100/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-orange-50/60 blur-[100px]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl text-center">
          
          <div className="mb-12 space-y-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-2 mb-4">
              <Sparkles className="text-amber-400 w-6 h-6" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Goddess
            </h1>
            <h2 className="text-2xl text-amber-600 font-medium" style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}>
              എന്റെ ഹൃദയത്തിന്റെ രാജ്ഞി
            </h2>
          </div>

          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-300 to-yellow-200 rounded-[2.5rem] blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative p-2 bg-white rounded-[2.5rem] shadow-xl">
               <div className="relative rounded-[2rem] overflow-hidden border-4 border-amber-50">
                 <img src="/DPZY-165.jpg" alt="Goddess" className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               </div>
            </div>
          </div>

          <div className="mt-16">
            <motion.button onClick={handleOfferFlowers} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative px-8 py-4 bg-white border border-amber-200 rounded-full shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 text-amber-700 font-semibold text-lg">
                <Flower2 className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                <span>Offer Flowers</span>
              </div>
            </motion.button>
            <p className="mt-4 text-amber-800/60 text-sm font-medium">{flowerCount > 0 ? `${flowerCount} flowers offered` : 'Click to offer your love'}</p>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
