import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { FiSearch, FiTrash2, FiRefreshCw, FiPhone, FiMail } from 'react-icons/fi'
import { adminAPI } from '../../utils/api'
import AdminLayout from '../../components/AdminLayout'

const STATUS_OPTIONS = ['new', 'contacted', 'enrolled', 'closed']
const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
  enrolled: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  closed: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const fetch = () => {
    setLoading(true)
    adminAPI.getEnquiries({ search, status: statusFilter })
      .then((r) => setEnquiries(r.data.results || r.data))
      .catch(() => toast.error('Failed to load enquiries'))
      .finally(() => setLoading(false))
  }

  useEffect(fetch, [search, statusFilter])

  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateEnquiry(id, { status })
      toast.success('Status updated')
      setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e))
    } catch { toast.error('Failed to update') }
  }

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    try {
      await adminAPI.deleteEnquiry(id)
      toast.success('Enquiry deleted')
      setEnquiries((prev) => prev.filter((e) => e.id !== id))
    } catch { toast.error('Failed to delete') }
  }

  return (
    <AdminLayout title="Enquiries">
      <Helmet><title>Enquiries | ThiSu Tech Admin</title></Helmet>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl">Enquiries</h2>
          <p className="text-gray-500 text-sm">{enquiries.length} enquiry(s)</p>
        </div>
        <button onClick={fetch} className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors">
          <FiRefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, email, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-orange-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-orange-400"
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">No enquiries found.</div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Info */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-semibold text-navy-900 dark:text-white">{e.name}</h3>
                    <span className={`badge text-xs ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><FiPhone size={11} /> {e.phone}</span>
                    <span className="flex items-center gap-1"><FiMail size={11} /> {e.email}</span>
                    <span>📚 {e.course}</span>
                    <span>🕒 {new Date(e.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  {e.message && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 italic">"{e.message}"</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={e.status}
                    onChange={(ev) => updateStatus(e.id, ev.target.value)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-orange-400"
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                  <a href={`tel:${e.phone}`} className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <FiPhone size={13} />
                  </a>
                  <button onClick={() => deleteEnquiry(e.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
