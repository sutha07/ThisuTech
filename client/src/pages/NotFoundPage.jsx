import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[120px] md:text-[180px] font-heading font-black text-navy-900/10 dark:text-white/5 leading-none select-none"
        >
          404
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="-mt-8"
        >
          <h1 className="text-3xl font-heading font-bold text-navy-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
          <Link to="/" className="btn-primary">
            <FiArrowLeft /> Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
