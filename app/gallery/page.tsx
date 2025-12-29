'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Navigation from '@/components/Navigation'

const galleryImages = [
  {
    id: 1,
    src: '/DPZY-165.jpg',
    title: 'The Beginning',
    description: 'Where it all started.',
  },
  // Add more images here
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />
      
      {/* Soft Violet Haze */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Memories
          </h1>
          <p className="text-gray-500 text-lg">
            Moments frozen in time, held forever in my heart.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur rounded-full p-3 text-gray-900">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 text-lg font-serif">{image.title}</h3>
                <p className="text-gray-500 text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xl p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-50"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={galleryImages[selectedImage].src}
                  className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
                />
                
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">{galleryImages[selectedImage].title}</h3>
                  <p className="text-gray-500">{galleryImages[selectedImage].description}</p>
                </div>

                {/* Nav Buttons */}
                <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
                   }}
                   className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setSelectedImage((selectedImage + 1) % galleryImages.length);
                   }}
                   className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
