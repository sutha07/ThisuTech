import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiSearch, FiAward, FiCheckCircle, FiXCircle, FiCalendar, FiUser, FiBookOpen } from 'react-icons/fi'
import { certificateAPI } from '../utils/api'

export default function CertificatePage() {
  const [certId, setCertId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!certId.trim()) { setError('Please enter a Certificate ID'); return }
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const res = await certificateAPI.verify(certId.trim().toUpperCase())
      setResult(res.data)
    } catch (err) {
      if (err.response?.status === 404) {
        setResult({ found: false, message: 'Certificate not found. Please check the ID and try again.' })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Certificate Verification | ThiSu Tech</title>
        <meta name="description" content="Verify the authenticity of your ThiSu Tech certificate by entering your Certificate ID." />
      </Helmet>

      {/* Header */}
      <div className="bg-navy-900 pt-28 pb-16 px-4">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-5">
            <FiAward className="text-orange-400" size={40} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black text-white">
            Certificate Verification
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 mt-3 text-lg">
            Verify the authenticity of any ThiSu Tech certificate
          </motion.p>
        </div>
      </div>

      <section className="section-padding bg-gray-50 dark:bg-gray-900 min-h-[60vh]">
        <div className="container-custom max-w-2xl">
          {/* Search Box */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card p-8 mb-8">
            <h2 className="font-heading font-bold text-navy-900 dark:text-white text-lg mb-6 text-center">
              Enter Certificate ID
            </h2>
            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="e.g. TT-2024-PY-001"
                  value={certId}
                  onChange={(e) => { setCertId(e.target.value.toUpperCase()); setError('') }}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 font-mono text-sm uppercase"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8 disabled:opacity-60"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : 'Verify'}
              </button>
            </form>
            {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            <p className="text-gray-400 text-xs mt-3 text-center">
              Certificate ID can be found on the bottom of your certificate document.
            </p>
          </motion.div>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {result.found ? (
                  <div className="card p-8">
                    {/* Valid Badge */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
                        <FiCheckCircle className="text-green-500" size={28} />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-green-600 dark:text-green-400 text-lg">
                          {result.certificate?.is_valid ? 'Certificate Valid ✓' : 'Certificate Revoked'}
                        </div>
                        <div className="text-gray-500 text-sm">ID: {result.certificate?.certificate_id}</div>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white">
                      <div className="text-center mb-6">
                        <div className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-1">ThiSu Tech</div>
                        <div className="text-xs text-gray-400">Certificate of Completion</div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { icon: FiUser, label: 'Student Name', value: result.certificate?.student_name },
                          { icon: FiBookOpen, label: 'Course', value: result.certificate?.course },
                          { icon: FiCalendar, label: 'Issue Date', value: result.certificate?.issue_date },
                          { icon: FiAward, label: 'Status', value: result.certificate?.is_valid ? 'Valid & Active' : 'Revoked' },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                            <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="text-orange-400" size={16} />
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">{label}</div>
                              <div className="font-semibold">{value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <FiXCircle className="text-red-500" size={30} />
                    </div>
                    <h3 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-2">
                      Certificate Not Found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {result.message || 'No certificate found with this ID. Please verify the ID and try again.'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
