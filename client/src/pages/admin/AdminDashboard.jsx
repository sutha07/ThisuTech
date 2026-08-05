import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiBookOpen, FiMail, FiAward, FiTrendingUp, FiRefreshCw } from 'react-icons/fi'
import { adminAPI } from '../../utils/api'
import AdminLayout from '../../components/AdminLayout'

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.08 } } }

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className={`text-3xl font-heading font-black ${color}`}>{value ?? '—'}</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
          <Icon className={color} size={24} />
        </div>
      </div>
    </motion.div>
  )
}

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
  enrolled: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  closed: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = () => {
    setLoading(true)
    adminAPI.getDashboard()
      .then((r) => setStats(r.data))
      .catch(() => setStats({
        total_courses: 0, total_enquiries: 0, new_enquiries: 0,
        total_certificates: 0, recent_enquiries: [], enquiries_by_course: []
      }))
      .finally(() => setLoading(false))
  }

  useEffect(fetchStats, [])

  return (
    <AdminLayout title="Dashboard">
      <Helmet><title>Dashboard | ThiSu Tech Admin</title></Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl">Overview</h2>
          <p className="text-gray-500 text-sm">Welcome back! Here's what's happening.</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors"
        >
          <FiRefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        <StatCard icon={FiBookOpen} label="Total Courses" value={stats?.total_courses}
          color="text-blue-600 dark:text-blue-400" bg="bg-blue-50 dark:bg-blue-500/10" />
        <StatCard icon={FiMail} label="Total Enquiries" value={stats?.total_enquiries}
          color="text-orange-600 dark:text-orange-400" bg="bg-orange-50 dark:bg-orange-500/10" />
        <StatCard icon={FiTrendingUp} label="New Enquiries" value={stats?.new_enquiries}
          color="text-green-600 dark:text-green-400" bg="bg-green-50 dark:bg-green-500/10" />
        <StatCard icon={FiAward} label="Certificates" value={stats?.total_certificates}
          color="text-purple-600 dark:text-purple-400" bg="bg-purple-50 dark:bg-purple-500/10" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
          <h3 className="font-heading font-bold text-navy-900 dark:text-white mb-4">Recent Enquiries</h3>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : stats?.recent_enquiries?.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_enquiries.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-navy-900 dark:text-white text-sm">{e.name}</p>
                    <p className="text-xs text-gray-500">{e.course} • {e.phone}</p>
                  </div>
                  <span className={`badge text-xs ${STATUS_COLORS[e.status] || STATUS_COLORS.new}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-8">No enquiries yet.</p>
          )}
        </motion.div>

        {/* Enquiries by Course */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6">
          <h3 className="font-heading font-bold text-navy-900 dark:text-white mb-4">Top Enquired Courses</h3>
          {stats?.enquiries_by_course?.length > 0 ? (
            <div className="space-y-3">
              {stats.enquiries_by_course.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{item.course}</span>
                    <span className="font-semibold text-navy-900 dark:text-white">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${Math.min((item.count / (stats.total_enquiries || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-8">No data yet.</p>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  )
}
