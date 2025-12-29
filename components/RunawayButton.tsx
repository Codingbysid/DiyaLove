'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RunawayButtonProps {
  onMouseEnter?: () => void
  className?: string
  children: React.ReactNode
}

export default function RunawayButton({ onMouseEnter, className, children }: RunawayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isHovered) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Trigger distance - when cursor gets within 100px
    if (distance < 100) {
      moveButtonAway()
    }
  }

  const moveButtonAway = () => {
    if (!buttonRef.current) return

    setIsHovered(true)

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const maxX = window.innerWidth - buttonRect.width - 20
    const maxY = window.innerHeight - buttonRect.height - 20
    const minX = 20
    const minY = 20

    const randomX = Math.random() * (maxX - minX) + minX
    const randomY = Math.random() * (maxY - minY) + minY

    setPosition({ x: randomX, y: randomY })

    // Reset hover state after animation completes
    setTimeout(() => {
      setIsHovered(false)
    }, 500)
  }

  const handleMouseLeave = () => {
    // Don't reset position immediately, let it stay moved
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative px-10 py-4 rounded-full font-semibold text-lg uppercase tracking-wide',
        'bg-gradient-to-r from-pink-300 to-pink-400 text-white',
        'shadow-lg cursor-pointer z-[1000]',
        className
      )}
      style={{
        position: isHovered ? 'fixed' : 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
        rotate: isHovered ? Math.random() * 20 - 10 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
