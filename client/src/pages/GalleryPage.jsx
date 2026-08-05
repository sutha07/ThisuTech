import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { galleryAPI } from '../utils/api'

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Course Posters', value: 'course_poster' },
  { label: 'Certificates', value: 'certificate' },
  { label: 'Internship', value: 'internship' },
  { label: 'Events', value: 'event' },
  { label: 'Workshops', value: 'workshop' },
]

// Placeholder gallery items shown when API returns empty
const PLACEHOLDERS = [
  { id: 1, title: 'Frontend Developer Internship', category: 'internship', image: '/assets/frontend-poster.jpg' },
  { id: 2, title: 'Spoken English 30 Days Course', category: 'course_poster', image: '/assets/english-poster.jpg' },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 3,
    title: ['Python Workshop', 'Web Dev Bootcamp', 'Certificate Award', 'Networking Event', 'Digital Marketing', 'Office Training', 'Live Session', 'Project Demo', 'Batch Completion', 'Guest Lecture'][i],
    category: ['workshop', 'event', 'certificate', 'event', 'course_poster', 'course_poster', 'event', 'internship', 'certificate', 'event'][i],
    image: null,
  }))
]

const COLORS = [
  'from-blue-500 to-blue-700', 'from-purple-500 to-purple-700', 'from-green-500 to-green-700',
  'from-orange-500 to-red-600', 'from-pink-500 to-rose-600', 'from-teal-500 to-teal-700',
  'from-indigo-500 to-indigo-700', 'from-yellow-500 to-orange-500', 'from-cyan-500 to-cyan-700',
  'from-emerald-500 to-emerald-700', 'from-violet-500 to-violet-700', 'from-rose-500 to-rose-700',
]

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    galleryAPI.getAll()
      .then((r) => {
        const data = r.data.results || r.data
        setItems(data.length > 0 ? data : PLACEHOLDERS)
      })
      .catch(() => setItems(PLACEHOLDERS))
  }, [])

  useEffect(() => {
    setFiltered(category ? items.filter((i) => i.category === category) : items)
  }, [items, category])

  const openLightbox = (index) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox((l) => (l - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightbox((l) => (l + 1) % filtered.length)

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <>
      <Helmet>
        <title>Gallery | ThiSu Tech</title>
        <meta name="description" content="Browse ThiSu Tech gallery — course posters, certificates, internship photos, events and workshops." />
      </Helmet>

      {/* Header */}
      <div className="bg-navy-900 pt-28 pb-16 px-4">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-black text-white">
            Our Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-gray-400 mt-3 text-lg">
            Memories, achievements, and moments from ThiSu Tech
          </motion.p>
        </div>
      </div>

      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  category === cat.value
                    ? 'bg-orange-500 text-white shadow-orange'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(index)}
                  className="aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover relative group"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${COLORS[index % COLORS.length]} flex flex-col items-center justify-center p-4`}>
                      <span className="text-4xl mb-2">
                        {item.category === 'certificate' ? '🏆' : item.category === 'event' ? '🎉' : item.category === 'workshop' ? '💻' : item.category === 'internship' ? '🎯' : '📚'}
                      </span>
                      <span className="text-white font-medium text-sm text-center">{item.title}</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium line-clamp-2">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              <FiX size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              <FiChevronLeft size={20} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden"
            >
              {filtered[lightbox]?.image ? (
                <img src={filtered[lightbox].image} alt={filtered[lightbox].title} className="max-h-[80vh] object-contain" />
              ) : (
                <div className={`w-96 h-64 bg-gradient-to-br ${COLORS[lightbox % COLORS.length]} flex flex-col items-center justify-center rounded-2xl`}>
                  <span className="text-6xl mb-4">
                    {filtered[lightbox]?.category === 'certificate' ? '🏆' : '📚'}
                  </span>
                  <span className="text-white font-bold text-xl text-center px-4">{filtered[lightbox]?.title}</span>
                </div>
              )}
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
            >
              <FiChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 text-gray-400 text-sm">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
