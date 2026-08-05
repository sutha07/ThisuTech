import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { adminAPI } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import ThiSuLogo from '../../components/ThiSuLogo'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      toast.error('Please enter username and password')
      return
    }
    setLoading(true)
    try {
      const res = await adminAPI.login(form)
      login(res.data.user, res.data.access)
      toast.success(`Welcome back, ${res.data.user.username}!`)
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed. Check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Admin Login | ThiSu Tech</title></Helmet>
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <ThiSuLogo size="lg" dark={true} />
            </div>
            <p className="text-gray-400 text-sm mt-2">Admin Dashboard</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            <h2 className="text-white font-heading font-bold text-xl mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Username</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    placeholder="admin"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary justify-center py-3.5 mt-2 disabled:opacity-60"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : 'Sign In'}
              </motion.button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            © 2026 ThiSu Tech Admin Panel
          </p>
        </motion.div>
      </div>
    </>
  )
}
