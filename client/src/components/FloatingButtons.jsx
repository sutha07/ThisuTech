import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 left-4 z-40 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919597869958?text=Hi%20ThiSu%20Tech%2C%20I%20want%20to%20know%20more%20about%20your%20courses."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="w-14 h-14 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
      >
        <FaWhatsapp size={28} />
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:9597869958"
        aria-label="Call us"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        className="w-14 h-14 rounded-full bg-orange-500 shadow-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
      >
        <FiPhone size={24} />
      </motion.a>
    </div>
  )
}
