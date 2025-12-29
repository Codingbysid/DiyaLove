'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus, X, Feather } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface Poem {
  id: number
  title: string
  content: string
  date: string
  language: 'en' | 'ml'
}

const initialPoems: Poem[] = [
  {
    id: 1,
    title: 'My Heart',
    content: `In your eyes, I see the stars\nIn your smile, I find my home\nEvery moment with you\nIs a treasure I'll never let go`,
    date: '2024-02-14',
    language: 'en',
  },
  {
    id: 2,
    title: 'എന്റെ ഹൃദയം',
    content: `നിന്റെ കണ്ണുകളിൽ ഞാൻ നക്ഷത്രങ്ങൾ കാണുന്നു\nനിന്റെ പുഞ്ചിരിയിൽ ഞാൻ എന്റെ വീട് കണ്ടെത്തുന്നു`,
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
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-50/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
          <div>
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Love Letters
            </h1>
            <p className="text-gray-500 italic flex items-center gap-2">
              <Feather className="w-4 h-4" />
              Written from the heart
            </p>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
          >
            <Plus className="w-4 h-4" />
            Write New
          </button>
        </div>

        {/* Add Form (Modal-like expansion) */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">New Entry</h3>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newPoem.title}
                    onChange={(e) => setNewPoem({ ...newPoem, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                </div>
                <select
                  value={newPoem.language}
                  onChange={(e) => setNewPoem({ ...newPoem, language: e.target.value as 'en' | 'ml' })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  <option value="en">English</option>
                  <option value="ml">Malayalam</option>
                </select>
              </div>
              
              <textarea
                value={newPoem.content}
                onChange={(e) => setNewPoem({ ...newPoem, content: e.target.value })}
                rows={6}
                placeholder="Write your thoughts..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
              />
              
              <div className="flex justify-end">
                <button
                  onClick={handleAddPoem}
                  disabled={!newPoem.title || !newPoem.content}
                  className="px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Poems Feed */}
        <div className="grid grid-cols-1 gap-8">
          {poems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-serif mb-1">{poem.title}</h3>
                  <p className="text-sm text-gray-400">{poem.date}</p>
                </div>
                {poem.language === 'ml' && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                    Malayalam
                  </span>
                )}
              </div>
              
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line" style={{ fontFamily: poem.language === 'ml' ? 'Noto Sans Malayalam' : 'inherit' }}>
                {poem.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
