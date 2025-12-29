'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Navigation from '@/components/Navigation'

// Sample images - replace with your actual images
const galleryImages = [
  {
    id: 1,
    src: '/DPZY-165.jpg',
    title: 'Beautiful Memory',
    description: 'A special moment captured forever',
  },
  // Add more images here as needed
  // You can add more images to the public folder and reference them here
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Navigation />
      
      {/* Animated Background */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              Our Gallery 📸
            </h1>
            <p className="text-xl text-white/90 mb-2" style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}>
              നമ്മുടെ ഗാലറി 📸
            </p>
            <p className="text-lg text-white/80 italic">
              Beautiful memories captured in time
            </p>
          </motion.div>

          {/* Gallery Grid */}
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform z-20">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📸</div>
              <p className="text-xl text-white/80 mb-2">Gallery is empty</p>
              <p className="text-white/60">
                Add images to the <code className="bg-white/20 px-2 py-1 rounded">public</code> folder
                <br />
                and update <code className="bg-white/20 px-2 py-1 rounded">app/gallery/page.tsx</code>
              </p>
            </motion.div>
          )}

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-5xl max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {galleryImages[selectedImage].title}
                    </h3>
                    <p className="text-white/80">
                      {galleryImages[selectedImage].description}
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 text-white transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setSelectedImage((selectedImage + 1) % galleryImages.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 text-white transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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

