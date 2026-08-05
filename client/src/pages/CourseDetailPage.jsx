import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  FiClock, FiMonitor, FiAward, FiVideo, FiCheckCircle,
  FiArrowLeft, FiLayers, FiUsers, FiBookOpen, FiCode
} from 'react-icons/fi'
import { coursesAPI } from '../utils/api'
import EnquiryForm from '../components/EnquiryForm'
import { COURSE_LOGO_MAP, DEFAULT_META } from '../components/CourseLogos'

/* ── Per-course fallback data ── */
const COURSE_FALLBACKS = {
  'core-python': {
    title: 'Core Python', duration: '8 Weeks', mode: 'Online', fee: '3000', offer_price: '1999',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: true,
    overview: 'Master Python programming from basics to advanced concepts. Learn data types, functions, OOP, file handling, and build real-world projects.',
    who_can_join: 'Beginners with no prior programming knowledge, College students, Freshers starting their tech career.',
    topics_covered: ['Python Basics & Syntax', 'Data Types & Variables', 'Control Flow & Loops', 'Functions & Modules', 'OOP Concepts', 'File Handling', 'Exception Handling', 'NumPy & Pandas Intro', 'Mini Projects'],
  },
  'frontend-development': {
    title: 'Frontend Development', duration: '10 Weeks', mode: 'Online', fee: '4000', offer_price: '2499',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: true,
    overview: 'Build modern, responsive websites from scratch. Learn HTML5, CSS3, JavaScript ES6+ and React.js with hands-on projects.',
    who_can_join: 'Anyone with basic computer knowledge, Students, Career-switchers, Freshers.',
    topics_covered: ['HTML5 & Semantic Tags', 'CSS3 & Flexbox/Grid', 'JavaScript ES6+', 'DOM Manipulation', 'React.js Basics', 'Tailwind CSS', 'Responsive Design', 'Git & GitHub', 'Portfolio Projects'],
  },
  'c-programming': {
    title: 'C Programming', duration: '6 Weeks', mode: 'Online', fee: '2500', offer_price: '1499',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: false,
    overview: 'Learn the foundation of programming with C. Understand memory management, pointers, data structures, and algorithmic thinking.',
    who_can_join: 'Beginners, Engineering students, Anyone wanting to learn programming fundamentals.',
    topics_covered: ['C Basics & Syntax', 'Data Types & Operators', 'Control Flow', 'Functions & Recursion', 'Arrays & Strings', 'Pointers', 'Structures', 'File Handling', 'Programs & Practice'],
  },
  'cpp': {
    title: 'C++', duration: '6 Weeks', mode: 'Online', fee: '2500', offer_price: '1499',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: true,
    overview: 'Master Object-Oriented Programming with C++. Build strong fundamentals in OOP, templates, and the Standard Template Library.',
    who_can_join: 'Students who know C basics, Engineering students, Competitive programmers.',
    topics_covered: ['C++ Basics', 'Classes & Objects', 'Inheritance & Polymorphism', 'Encapsulation', 'Templates', 'STL - Vectors, Maps', 'Exception Handling', 'File I/O', 'Mini Projects'],
  },
  'networking': {
    title: 'Networking', duration: '8 Weeks', mode: 'Online', fee: '3000', offer_price: '1999',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: false,
    overview: 'Understand computer networks from basics to advanced. Learn protocols, routing, switching, and network security concepts.',
    who_can_join: 'IT students, Professionals, Anyone preparing for CCNA or CompTIA Network+.',
    topics_covered: ['Network Basics', 'OSI & TCP/IP Model', 'IP Addressing & Subnetting', 'Routing & Switching', 'DNS & DHCP', 'HTTP & FTP', 'Firewalls', 'Network Security', 'Practical Labs'],
  },
  'digital-marketing': {
    title: 'Digital Marketing', duration: '8 Weeks', mode: 'Online', fee: '3500', offer_price: '2199',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: true,
    overview: 'Grow your business online! Learn SEO, Google Ads, Social Media Marketing, Content Marketing, and Analytics.',
    who_can_join: 'Business owners, Students, Freelancers, Marketing professionals.',
    topics_covered: ['Digital Marketing Basics', 'SEO On-Page & Off-Page', 'Google Ads', 'Social Media Marketing', 'Facebook & Instagram Ads', 'Content Marketing', 'Email Marketing', 'Google Analytics', 'Live Campaigns'],
  },
  'microsoft-office': {
    title: 'Microsoft Office', duration: '4 Weeks', mode: 'Online', fee: '1500', offer_price: '999',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: false,
    overview: 'Master the most widely used office software. Learn MS Word, Excel, PowerPoint and Outlook for professional use.',
    who_can_join: 'Anyone, Office professionals, Students, Job seekers.',
    topics_covered: ['MS Word - Documents & Formatting', 'MS Excel - Formulas & Charts', 'Excel - Pivot Tables & VLOOKUP', 'MS PowerPoint - Presentations', 'Outlook - Email Management', 'OneDrive & Collaboration', 'Practical Assignments'],
  },
  'spoken-english': {
    title: 'Spoken English', duration: '30 Days', mode: 'Online', fee: '5000', offer_price: '1499',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: false,
    overview: 'Transform your English communication in 30 days. From hesitation to confidence — speak fluently in any situation.',
    who_can_join: 'School/College students, Job seekers, Working professionals, Homemakers.',
    topics_covered: ['Introduction & Greetings', 'Grammar Basics', 'Vocabulary Building', 'Daily Conversations', 'Office & Interview English', 'Public Speaking', 'Group Discussion', 'Pronunciation Practice', 'Confidence Building'],
  },
  'internship-programs': {
    title: 'Internship Programs', duration: '4–12 Weeks', mode: 'Online', fee: '5000', offer_price: '2999',
    certificate_available: true, live_classes: true, study_materials: true, mini_projects: true,
    overview: 'Get real-world experience with live projects. Choose from Frontend, Backend, or Python internship tracks with expert mentorship.',
    who_can_join: 'Students, Freshers, Anyone wanting real industry experience.',
    topics_covered: ['Frontend / Backend / Python Track', 'Live Project Work', 'Code Reviews', 'Team Collaboration', 'Git & Deployment', 'Portfolio Building', 'Mentor Guidance', 'Industry Certificate'],
  },
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

/* ── Feature Pill ── */
function FeaturePill({ icon: Icon, label, active }) {
  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
      active
        ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30'
        : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700'
    }`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
        active ? 'bg-green-100 dark:bg-green-500/20' : 'bg-gray-100 dark:bg-gray-700'
      }`}>
        <Icon size={14} className={active ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} />
      </div>
      <span>{label}</span>
      {active && <span className="ml-auto text-green-500 text-xs">✓</span>}
    </div>
  )
}

/* ── Page ── */
export default function CourseDetailPage() {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    coursesAPI.getBySlug(slug)
      .then((r) => setCourse(r.data))
      .catch(() => {
        // Use per-course fallback, or a generic one
        const fallback = COURSE_FALLBACKS[slug] || {
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          slug, duration: '6 Weeks', mode: 'Online', fee: '2999', offer_price: '1999',
          certificate_available: true, live_classes: true, study_materials: true, mini_projects: false,
          overview: 'Comprehensive course covering all fundamentals and advanced topics with live classes and hands-on projects.',
          who_can_join: 'Anyone interested in learning.',
          topics_covered: ['Introduction', 'Core Concepts', 'Advanced Topics', 'Projects'],
        }
        setCourse(fallback)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="w-12 h-12 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin" />
    </div>
  )

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-navy-900 dark:text-white mb-4">Course not found</h2>
        <Link to="/courses" className="btn-primary">Browse Courses</Link>
      </div>
    </div>
  )

  const meta = COURSE_LOGO_MAP[slug] || DEFAULT_META
  const { Logo, bgSolid } = meta

  const discount = course.fee && course.offer_price
    ? Math.round(((Number(course.fee) - Number(course.offer_price)) / Number(course.fee)) * 100)
    : 0

  return (
    <>
      <Helmet>
        <title>{course.title} | ThiSu Tech</title>
        <meta name="description" content={course.overview || `Learn ${course.title} at ThiSu Tech with live classes and study materials.`} />
      </Helmet>

      {/* ── Hero ── */}
      <div
        className="pt-24 pb-14 px-4 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #071b3d 0%, #0B2C5F 60%, ${bgSolid}99 100%)` }}
      >
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container-custom relative z-10">
          <Link to="/courses" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-8 transition-colors">
            <FiArrowLeft size={16} /> Back to Courses
          </Link>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col md:flex-row md:items-center gap-8"
          >
            {/* Logo big */}
            {Logo && (
              <motion.div
                variants={fadeUp}
                className="hidden md:flex w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center flex-shrink-0"
              >
                <Logo size={80} />
              </motion.div>
            )}

            <div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-3">
                <span className="badge bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  <FiClock size={11} /> {course.duration}
                </span>
                <span className="badge bg-white/10 text-white">
                  <FiMonitor size={11} /> {course.mode}
                </span>
                {course.certificate_available && (
                  <span className="badge bg-green-500/20 text-green-400 border border-green-500/30">
                    <FiAward size={11} /> Certificate
                  </span>
                )}
                {course.study_materials && (
                  <span className="badge bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <FiBookOpen size={11} /> Study Materials
                  </span>
                )}
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-heading font-black text-white mb-5">
                {course.title}
              </motion.h1>

              <motion.div variants={fadeUp} className="flex items-end gap-4">
                <span className="text-4xl font-heading font-black text-orange-500">₹{course.offer_price}</span>
                {String(course.fee) !== String(course.offer_price) && (
                  <>
                    <span className="text-gray-400 text-xl line-through">₹{course.fee}</span>
                    <span className="badge bg-green-500 text-white">{discount}% OFF</span>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Left: Main content ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Overview */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:p-8">
                <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                  <FiLayers className="text-orange-500" /> Course Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.overview || course.description}</p>
              </motion.div>

              {/* Features — "Study Materials" instead of Recording */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 md:p-8">
                <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-5">Course Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <FeaturePill icon={FiVideo}     label="Live Classes"      active={course.live_classes} />
                  <FeaturePill icon={FiBookOpen}  label="Study Materials"   active={course.study_materials !== false} />
                  <FeaturePill icon={FiAward}     label="Certificate"       active={course.certificate_available} />
                  <FeaturePill icon={FiCode}      label="Mini Projects"     active={course.mini_projects} />
                </div>

                {/* Study materials note */}
                {course.study_materials !== false && (
                  <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FiBookOpen className="text-blue-600 dark:text-blue-400" size={15} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Study Materials Included</p>
                      <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-0.5">
                        Notes, PDF guides, code examples, and practice exercises provided for every module.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Topics Covered */}
              {course.topics_covered?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6 md:p-8">
                  <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-5">Topics Covered</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.topics_covered.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${bgSolid}20` }}>
                          <span className="text-xs font-bold" style={{ color: bgSolid }}>{i + 1}</span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{t}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Who Can Join */}
              {course.who_can_join && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 md:p-8">
                  <h2 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-4 flex items-center gap-2">
                    <FiUsers className="text-orange-500" /> Who Can Join?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.who_can_join}</p>
                </motion.div>
              )}
            </div>

            {/* ── Right: Sticky Sidebar ── */}
            <div>
              <div className="card p-6 sticky top-24">
                {/* Price */}
                <div className="text-center mb-5 pb-5 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-4xl font-heading font-black text-orange-500 mb-1">₹{course.offer_price}</div>
                  {String(course.fee) !== String(course.offer_price) && (
                    <div className="text-gray-400 line-through text-lg">₹{course.fee}</div>
                  )}
                  {discount > 0 && (
                    <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                      You save ₹{Number(course.fee) - Number(course.offer_price)} ({discount}% off)
                    </span>
                  )}
                </div>

                {/* Quick info */}
                <div className="space-y-2.5 text-sm mb-5">
                  {[
                    ['⏱️ Duration',   course.duration],
                    ['💻 Mode',        course.mode],
                    ['🏆 Certificate', course.certificate_available ? 'Yes ✓' : 'No'],
                    ['📹 Live Classes',course.live_classes          ? 'Yes ✓' : 'No'],
                    ['📚 Study Materials', course.study_materials !== false ? 'Yes ✓' : 'No'],
                    ['🛠️ Mini Projects', course.mini_projects       ? 'Yes ✓' : 'No'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-1.5 border-b border-gray-50 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">{k}</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{v}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-heading font-bold text-navy-900 dark:text-white text-center mb-4">
                  Enroll Now
                </h3>
                <EnquiryForm defaultCourse={course.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
