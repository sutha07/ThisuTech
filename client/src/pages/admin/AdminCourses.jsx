import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi'
import { adminAPI } from '../../utils/api'
import AdminLayout from '../../components/AdminLayout'

const EMPTY = {
  title: '', slug: '', category: 'programming', duration: '', mode: 'online',
  fee: '', offer_price: '', description: '', overview: '', who_can_join: '',
  topics_covered: '', certificate_available: true, live_classes: true,
  study_materials: true, mini_projects: false, is_active: true, is_featured: false,
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const fetch = () => {
    setLoading(true)
    adminAPI.getCourses()
      .then((r) => setCourses(r.data.results || r.data))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false))
  }

  useEffect(fetch, [])

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true) }
  const openEdit = (c) => {
    setEditing(c)
    setForm({
      ...c,
      topics_covered: Array.isArray(c.topics_covered) ? c.topics_covered.join('\n') : c.topics_covered || '',
    })
    setShowModal(true)
  }
  const closeModal = () => { setShowModal(false); setEditing(null); setForm(EMPTY) }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'title' && !editing ? { slug: slugify(value) } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.duration || !form.fee || !form.offer_price) {
      toast.error('Please fill in required fields')
      return
    }
    setSaving(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'topics_covered') {
        const arr = v.split('\n').map((s) => s.trim()).filter(Boolean)
        fd.append(k, JSON.stringify(arr))
      } else if (k === 'image' && v instanceof File) {
        fd.append(k, v)
      } else if (k !== 'image') {
        fd.append(k, v)
      }
    })
    try {
      if (editing) {
        await adminAPI.updateCourse(editing.id, fd)
        toast.success('Course updated!')
      } else {
        await adminAPI.createCourse(fd)
        toast.success('Course created!')
      }
      closeModal()
      fetch()
    } catch (err) {
      const data = err.response?.data
      const msg = data ? Object.values(data).flat().join(', ') : 'Something went wrong'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteCourse(id)
      toast.success('Course deleted')
      setDeleteId(null)
      fetch()
    } catch { toast.error('Failed to delete course') }
  }

  return (
    <AdminLayout title="Courses">
      <Helmet><title>Courses | ThiSu Tech Admin</title></Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl">Manage Courses</h2>
          <p className="text-gray-500 text-sm">{courses.length} course(s) total</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <FiPlus size={16} /> Add Course
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card h-40 animate-pulse bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-heading font-semibold text-navy-900 dark:text-white line-clamp-2">{c.title}</h3>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(c)} className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <FiEdit2 size={13} />
                  </button>
                  <button onClick={() => setDeleteId(c.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors">
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="badge bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">₹{c.offer_price}</span>
                <span className="badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{c.duration}</span>
                <span className={`badge ${c.is_active ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-gray-100 text-gray-500'}`}>
                  {c.is_active ? 'Active' : 'Inactive'}
                </span>
                {c.is_featured && <span className="badge bg-yellow-100 text-yellow-700">⭐ Featured</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Course Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h3 className="font-heading font-bold text-navy-900 dark:text-white text-lg">
                  {editing ? 'Edit Course' : 'Add New Course'}
                </h3>
                <button onClick={closeModal} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <FiX size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'title', label: 'Title *', type: 'text' },
                    { name: 'slug', label: 'Slug *', type: 'text' },
                    { name: 'duration', label: 'Duration *', type: 'text', placeholder: '8 Weeks' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name} className={name === 'title' ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                      <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-orange-400" />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
                    <select name="category" value={form.category} onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-orange-400 text-gray-800 dark:text-white">
                      {[['programming','Programming'],['web','Web Dev'],['networking','Networking'],['digital_marketing','Digital Marketing'],['office','Office'],['language','Language'],['internship','Internship']].map(([v,l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Mode</label>
                    <select name="mode" value={form.mode} onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-orange-400 text-gray-800 dark:text-white">
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  {[['fee','Original Fee *'],['offer_price','Offer Price *']].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                      <input type="number" name={name} value={form[name]} onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-orange-400 text-gray-800 dark:text-white" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-orange-400 text-gray-800 dark:text-white resize-none" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Topics Covered <span className="text-gray-400">(one per line)</span>
                  </label>
                  <textarea name="topics_covered" value={form.topics_covered} onChange={handleChange} rows={4}
                    placeholder="Python Basics&#10;OOP Concepts&#10;Mini Projects"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-orange-400 text-gray-800 dark:text-white resize-none" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Who Can Join</label>
                  <textarea name="who_can_join" value={form.who_can_join} onChange={handleChange} rows={2}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:border-orange-400 text-gray-800 dark:text-white resize-none" />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Course Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, image: e.target.files[0] }))}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ['certificate_available','Certificate'],
                    ['live_classes','Live Classes'],
                    ['study_materials','Study Materials'],
                    ['mini_projects','Mini Projects'],
                    ['is_active','Active'],
                    ['is_featured','Featured'],
                  ].map(([name, label]) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name={name} checked={form[name]} onChange={handleChange}
                        className="w-4 h-4 accent-orange-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center py-2.5 disabled:opacity-60">
                    {saving ? 'Saving...' : editing ? 'Update Course' : 'Add Course'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-red-500" size={24} />
              </div>
              <h3 className="font-heading font-bold text-navy-900 dark:text-white text-lg mb-2">Delete Course?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
