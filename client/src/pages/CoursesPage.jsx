import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiSearch, FiArrowRight, FiAward, FiClock, FiMonitor, FiCheckCircle } from 'react-icons/fi'
import { coursesAPI } from '../utils/api'
import ThiSuLogo from '../components/ThiSuLogo'
import { COURSE_LOGO_MAP, DEFAULT_META } from '../components/CourseLogos'

/* ── Static fallback courses ── */
const DEFAULT_COURSES = [
  { id: 1, title: 'Core Python', slug: 'core-python', duration: '8 Weeks', mode: 'Online', fee: '3000', offer_price: '1999', certificate_available: true, category: 'programming', topics_covered: ['Python Basics', 'OOP Concepts', 'File Handling', 'Mini Projects'] },
  { id: 2, title: 'Frontend Development', slug: 'frontend-development', duration: '10 Weeks', mode: 'Online', fee: '4000', offer_price: '2499', certificate_available: true, category: 'web', topics_covered: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Design'] },
  { id: 3, title: 'C Programming', slug: 'c-programming', duration: '6 Weeks', mode: 'Online', fee: '2500', offer_price: '1499', certificate_available: true, category: 'programming', topics_covered: ['Syntax & Basics', 'Pointers', 'Arrays', 'Functions'] },
  { id: 4, title: 'C++', slug: 'cpp', duration: '6 Weeks', mode: 'Online', fee: '2500', offer_price: '1499', certificate_available: true, category: 'programming', topics_covered: ['OOP', 'Classes & Objects', 'STL', 'Projects'] },
  { id: 5, title: 'Networking', slug: 'networking', duration: '8 Weeks', mode: 'Online', fee: '3000', offer_price: '1999', certificate_available: true, category: 'networking', topics_covered: ['OSI Model', 'TCP/IP', 'Protocols', 'Network Security'] },
  { id: 6, title: 'Digital Marketing', slug: 'digital-marketing', duration: '8 Weeks', mode: 'Online', fee: '3500', offer_price: '2199', certificate_available: true, category: 'digital_marketing', topics_covered: ['SEO', 'Social Media', 'Google Ads', 'Analytics'] },
  { id: 7, title: 'Microsoft Office', slug: 'microsoft-office', duration: '4 Weeks', mode: 'Online', fee: '1500', offer_price: '999', certificate_available: true, category: 'office', topics_covered: ['MS Word', 'MS Excel', 'PowerPoint', 'Outlook'] },
  { id: 8, title: 'Spoken English', slug: 'spoken-english', duration: '30 Days', mode: 'Online', fee: '5000', offer_price: '1499', certificate_available: true, category: 'language', topics_covered: ['Grammar Basics', 'Vocabulary', 'Public Speaking', 'Confidence'] },
  { id: 9, title: 'Internship Programs', slug: 'internship-programs', duration: '4–12 Weeks', mode: 'Online', fee: '5000', offer_price: '2999', certificate_available: true, category: 'internship', topics_covered: ['Live Projects', 'Mentorship', 'Portfolio Building', 'Certificate'] },
]

const CATEGORIES = [
  { label: 'All Courses', value: '' },
  { label: 'Programming', value: 'programming' },
  { label: 'Web Dev', value: 'web' },
  { label: 'Networking', value: 'networking' },
  { label: 'Marketing', value: 'digital_marketing' },
  { label: 'Office', value: 'office' },
  { label: 'Language', value: 'language' },
  { label: 'Internship', value: 'internship' },
]

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

/* ════════════════════════════════════════
   COURSE CARD  — real tech logo inside
   ════════════════════════════════════════ */
function CourseCard({ course }) {
  const meta = COURSE_LOGO_MAP[course.slug] || DEFAULT_META
  const { Logo, SecondLogo, bg, bgSolid, badgeBg, badgeText, accent, cardBorder, tagBg, tagText } = meta

  const discount = course.fee && course.offer_price
    ? Math.round(((Number(course.fee) - Number(course.offer_price)) / Number(course.fee)) * 100)
    : 0

  const topics = Array.isArray(course.topics_covered) ? course.topics_covered : []

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border ${cardBorder} shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col`}
    >
      {/* ── Card Top: gradient bg + real logo ── */}
      <div className={`relative bg-gradient-to-br ${bg} overflow-hidden`} style={{ height: 180 }}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-black/10" />

        {/* If API provides image, show it; else show the real tech logo */}
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
            {/* Real tech logo — big and centered */}
            {Logo && (
              <div className="drop-shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Logo size={72} />
              </div>
            )}
            {/* Second logo for Frontend (HTML + JS) */}
            {meta.secondLogo && (
              <div className="absolute bottom-3 right-3 opacity-70 drop-shadow-md">
                <meta.secondLogo size={28} />
              </div>
            )}
          </div>
        )}

        {/* Mode badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
            <FiMonitor size={10} /> {course.mode}
          </span>
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-green-500 text-white shadow-md">
              {discount}% OFF
            </span>
          </div>
        )}

        {/* ThiSu Tech branding strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 52 52" fill="none">
              <rect width="52" height="52" rx="6" fill="#0B2C5F"/>
              <rect x="8" y="12" width="20" height="4.5" rx="1" fill="white"/>
              <rect x="15" y="12" width="5.5" height="22" rx="1" fill="white"/>
              <path d="M28 17 Q23 17 23 22 Q23 26 28 26 Q33 26 33 31 Q33 36 28 36" stroke="#3B82F6" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            </svg>
            <span className="text-white/80 text-xs font-semibold tracking-wide">ThiSu Tech</span>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${badgeBg}`}>
            {badgeText}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-navy-900 dark:text-white text-lg mb-2 leading-tight">
          {course.title}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FiClock size={11} className="text-orange-500" /> {course.duration}
          </span>
          {course.certificate_available && (
            <span className="flex items-center gap-1">
              <FiAward size={11} className="text-orange-500" /> Certificate
            </span>
          )}
          <span className="flex items-center gap-1">
            <FiCheckCircle size={11} className="text-green-500" /> Live Classes
          </span>
        </div>

        {/* Topics chips */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagBg} ${tagText}`}
              >
                {t}
              </span>
            ))}
            {topics.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                +{topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-heading font-black text-orange-500 leading-none">
              ₹{course.offer_price}
            </span>
            {String(course.fee) !== String(course.offer_price) && (
              <span className="text-gray-400 text-sm line-through pb-0.5">₹{course.fee}</span>
            )}
          </div>
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: bgSolid }}
          >
            Details <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════════
   PAGE
   ════════════════════════════════════════ */
export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    coursesAPI.getAll({ search, category })
      .then((r) => {
        const data = r.data.results || r.data
        setCourses(data.length > 0 ? data : DEFAULT_COURSES)
      })
      .catch(() => setCourses(DEFAULT_COURSES))
      .finally(() => setLoading(false))
  }, [search, category])

  /* Client-side filter when API doesn't filter */
  const displayed = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = !category || c.category === category
    return matchSearch && matchCat
  })

  return (
    <>
      <Helmet>
        <title>Courses | ThiSu Tech — Learn · Code · Innovate · Succeed</title>
        <meta name="description" content="Explore all ThiSu Tech courses — Python, Frontend, C, C++, Networking, Digital Marketing and more. Online live classes with certificates." />
      </Helmet>

      {/* ══ HEADER ══════════════════════════════════ */}
      <div
        className="relative pt-28 pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #071b3d 0%, #0B2C5F 50%, #0e3a7a 100%)' }}
      >
        {/* bg decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Floating tech symbols */}
          {['</>','{}','[ ]','#','//','&&'].map((sym, i) => (
            <div
              key={i}
              className="absolute font-mono font-bold select-none pointer-events-none"
              style={{
                color: 'rgba(255,255,255,0.04)',
                fontSize: `${44 + i * 12}px`,
                top: `${10 + i * 13}%`,
                left: `${3 + i * 17}%`,
                transform: `rotate(${-20 + i * 9}deg)`,
              }}
            >
              {sym}
            </div>
          ))}
        </div>

        <div className="container-custom relative z-10 text-center">
          {/* Real Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <ThiSuLogo size="lg" dark={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-semibold px-4 py-2 rounded-full mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Online Live Classes · Enroll Now!
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-3"
          >
            Our <span className="text-orange-500">Courses</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-200 text-lg max-w-xl mx-auto mb-8"
          >
            Industry-ready courses with live classes, real projects &amp; certificates.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            {[['9+', 'Courses'], ['500+', 'Students'], ['100%', 'Certificate'], ['Live', 'Classes']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-2xl font-heading font-black text-orange-400">{val}</div>
                <div className="text-blue-300 text-xs tracking-wide">{lbl}</div>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:bg-white/15 text-sm transition-all"
            />
          </motion.div>
        </div>
      </div>

      {/* ══ STICKY FILTER BAR ══════════════════════ */}
      <div className="sticky top-[64px] md:top-[80px] z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="container-custom py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  category === cat.value
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ GRID ══════════════════════════════════ */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-custom">
          {/* Result count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Showing{' '}
              <span className="font-semibold text-navy-900 dark:text-white">{displayed.length}</span>{' '}
              course{displayed.length !== 1 ? 's' : ''}
              {search && (
                <> for &ldquo;<span className="text-orange-500">{search}</span>&rdquo;</>
              )}
            </p>
            {(search || category) && (
              <button
                onClick={() => { setSearch(''); setCategory('') }}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Skeleton */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-card animate-pulse">
                  <div className="h-44 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-5 space-y-3 bg-white dark:bg-gray-800">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayed.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayed.map((c) => (
                <CourseCard key={c.id || c.slug} course={c} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No courses found. Try a different keyword.
              </p>
              <button
                onClick={() => { setSearch(''); setCategory('') }}
                className="mt-4 btn-primary"
              >
                Show All Courses
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-3xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #0B2C5F, #1a4a8a)' }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,122,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.5) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-2">
                  Not sure which course to pick?
                </h3>
                <p className="text-blue-200">
                  Talk to us — we'll guide you to the right path for your career.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="https://wa.me/919597869958"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
                >
                  💬 WhatsApp Us
                </a>
                <Link to="/contact" className="btn-primary whitespace-nowrap">
                  Free Counselling <FiArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
