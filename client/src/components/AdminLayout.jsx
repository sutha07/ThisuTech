import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGrid, FiBookOpen, FiMail, FiLogOut, FiMenu, FiX, FiExternalLink } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import ThiSuLogo from './ThiSuLogo'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/courses', label: 'Courses', icon: FiBookOpen },
  { to: '/admin/enquiries', label: 'Enquiries', icon: FiMail },
]

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-navy-900 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <ThiSuLogo size="sm" dark={true} />
      </div>

      {/* Nav */}
      <nav className="flex-grow p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          <FiExternalLink size={16} /> View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
        >
          <FiLogOut size={16} /> Logout
        </button>
        <div className="px-4 py-2 text-xs text-gray-500">
          Signed in as <span className="text-white font-medium">{user?.username}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0">
        <div className="fixed w-64 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 md:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiMenu size={20} />
            </button>
            <h1 className="font-heading font-bold text-navy-900 dark:text-white text-lg">{title}</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
