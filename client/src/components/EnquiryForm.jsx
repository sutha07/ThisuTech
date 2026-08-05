import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { enquiryAPI } from '../utils/api'
import { FiUser, FiPhone, FiMail, FiBookOpen, FiMessageSquare, FiSend } from 'react-icons/fi'

const COURSES = [
  'Core Python', 'Frontend Development', 'C Programming', 'C++',
  'Networking', 'Digital Marketing', 'Microsoft Office', 'Spoken English',
  'Frontend Internship', 'Backend Internship', 'Python Internship', 'Other',
]

export default function EnquiryForm({ defaultCourse = '' }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', course: defaultCourse, message: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
      e.phone = 'Valid phone number required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Valid email required'
    if (!form.course) e.course = 'Please select a course'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      await enquiryAPI.submit(form)
      toast.success('Enquiry submitted! We will contact you soon. 🎉')
      setForm({ name: '', phone: '', email: '', course: defaultCourse, message: '' })
      setErrors({})
    } catch (err) {
      const msg = err.response?.data?.detail || 'Something went wrong. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: FiUser, placeholder: 'Your full name' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: FiPhone, placeholder: '+91 99999 99999' },
    { name: 'email', label: 'Email Address', type: 'email', icon: FiMail, placeholder: 'you@example.com' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {fields.map(({ name, label, type, icon: Icon, placeholder }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors bg-white dark:bg-gray-800 text-gray-800 dark:text-white ${
                errors[name]
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-gray-200 dark:border-gray-700 focus:border-orange-400 focus:ring-orange-100 dark:focus:ring-orange-500/20'
              } focus:outline-none focus:ring-2`}
            />
          </div>
          {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
      ))}

      {/* Course Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Course Interested
        </label>
        <div className="relative">
          <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-colors ${
              errors.course
                ? 'border-red-400'
                : 'border-gray-200 dark:border-gray-700 focus:border-orange-400 focus:ring-orange-100 dark:focus:ring-orange-500/20'
            } focus:outline-none focus:ring-2`}
          >
            <option value="">Select a course</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message <span className="text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" size={16} />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any questions or additional info..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          <>
            <FiSend size={16} /> Submit Enquiry
          </>
        )}
      </motion.button>
    </form>
  )
}
