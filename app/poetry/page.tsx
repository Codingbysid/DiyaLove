'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Heart, Plus, X } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface Poem {
  id: number
  title: string
  content: string
  date: string
  language: 'en' | 'ml'
}

// Sample poems - you can add more here or connect to a database
const initialPoems: Poem[] = [
  {
    id: 1,
    title: 'My Heart',
    content: `In your eyes, I see the stars
In your smile, I find my home
Every moment with you
Is a treasure I'll never let go`,
    date: '2024-02-14',
    language: 'en',
  },
  {
    id: 2,
    title: 'എന്റെ ഹൃദയം',
    content: `നിന്റെ കണ്ണുകളിൽ ഞാൻ നക്ഷത്രങ്ങൾ കാണുന്നു
നിന്റെ പുഞ്ചിരിയിൽ ഞാൻ എന്റെ വീട് കണ്ടെത്തുന്നു
നിന്നോടൊപ്പമുള്ള ഓരോ നിമിഷവും
ഞാൻ ഒരിക്കലും വിട്ടുപോകാത്ത ഒരു നിധിയാണ്`,
    date: '2024-02-14',
    language: 'ml',
  },
]

export default function PoetryPage() {
  const [poems, setPoems] = useState<Poem[]>(initialPoems)
  const [isAdding, setIsAdding] = useState(false)
  const [newPoem, setNewPoem] = useState({ title: '', content: '', language: 'en' as 'en' | 'ml' })

  const handleAddPoem = () => {
    if (newPoem.title && newPoem.content) {
      const poem: Poem = {
        id: Date.now(),
        title: newPoem.title,
        content: newPoem.content,
        date: new Date().toISOString().split('T')[0],
        language: newPoem.language,
      }
      setPoems([poem, ...poems])
      setNewPoem({ title: '', content: '', language: 'en' })
      setIsAdding(false)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Navigation />
      
      {/* Animated Background */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #43e97b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              Poetry Collection 📝
            </h1>
            <p className="text-xl text-white/90 mb-2" style={{ fontFamily: 'Noto Sans Malayalam, sans-serif' }}>
              കവിതാ ശേഖരണം 📝
            </p>
            <p className="text-lg text-white/80 italic mb-6">
              Words from the heart, written with love
            </p>
            
            {!isAdding && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAdding(true)}
                className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold flex items-center gap-2 mx-auto transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Poem
              </motion.button>
            )}
          </motion.div>

          {/* Add Poem Form */}
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-xl bg-white/20 rounded-3xl border-2 border-white/40 p-6 mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Add New Poem</h2>
                <button
                  onClick={() => {
                    setIsAdding(false)
                    setNewPoem({ title: '', content: '', language: 'en' })
                  }}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Title</label>
                  <input
                    type="text"
                    value={newPoem.title}
                    onChange={(e) => setNewPoem({ ...newPoem, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Enter poem title..."
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Language</label>
                  <select
                    value={newPoem.language}
                    onChange={(e) => setNewPoem({ ...newPoem, language: e.target.value as 'en' | 'ml' })}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="en">English</option>
                    <option value="ml">Malayalam</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/90 mb-2 font-medium">Content</label>
                  <textarea
                    value={newPoem.content}
                    onChange={(e) => setNewPoem({ ...newPoem, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    placeholder="Write your poem here..."
                  />
                </div>
                
                <button
                  onClick={handleAddPoem}
                  disabled={!newPoem.title || !newPoem.content}
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Save Poem
                </button>
              </div>
            </motion.div>
          )}

          {/* Poems List */}
          <div className="space-y-6">
            {poems.map((poem, index) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/20 rounded-3xl border-2 border-white/40 p-8 hover:bg-white/25 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                      {poem.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {new Date(poem.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white/80 text-xs font-medium">
                    {poem.language === 'en' ? 'English' : 'Malayalam'}
                  </span>
                </div>
                
                <div
                  className="text-white/90 text-lg leading-relaxed whitespace-pre-line"
                  style={{
                    fontFamily: poem.language === 'ml' ? 'Noto Sans Malayalam, sans-serif' : 'inherit',
                  }}
                >
                  {poem.content}
                </div>
              </motion.div>
            ))}
          </div>

          {poems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-xl text-white/80 mb-2">No poems yet</p>
              <p className="text-white/60">Click "Add New Poem" to get started</p>
            </motion.div>
          )}
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

