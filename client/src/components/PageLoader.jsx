import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-900"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-orange-500/30 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white font-heading font-black text-xl">T</span>
              </div>
            </div>
            <p className="text-white font-heading font-semibold tracking-widest text-sm uppercase">
              ThiSu Tech
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
