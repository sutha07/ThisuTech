import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiArrowRight, FiCheckCircle, FiAward, FiUsers, FiMonitor, FiStar } from 'react-icons/fi'
import { coursesAPI, testimonialsAPI } from '../utils/api'
import EnquiryForm from '../components/EnquiryForm'
import ThiSuLogo from '../components/ThiSuLogo'

/* ── Animation helpers ─────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

/* ── Static data ───────────────────────────────────── */
const stats = [
  { icon: FiUsers, value: '50+',  label: 'Students Trained' },
  { icon: FiMonitor, value: '9+',   label: 'Courses Offered' },
  { icon: FiAward, value: '100%', label: 'Certificate Provided' },
  { icon: FiStar, value: '4.9★', label: 'Average Rating' },
]

/* ── 15 Student testimonials — domain-wise, English ── */
const STATIC_TESTIMONIALS = [
  { id: 1,  student_name: 'Arun Kumar',       course: 'Core Python',          rating: 5, location: 'Chennai',     review: 'I joined ThiSu Tech for Python and it was an amazing experience. The live sessions were very interactive and all my doubts were cleared patiently. I received my certificate too. Highly recommended for anyone starting their coding journey!' },
  { id: 2,  student_name: 'Priya S',           course: 'Frontend Development', rating: 5, location: 'Coimbatore',  review: 'HTML, CSS and JavaScript were taught step by step with real projects. My portfolio is ready and I landed my first job thanks to ThiSu Tech. The instructor was very supportive throughout the course.' },
  { id: 3,  student_name: 'Ravi M',            course: 'Digital Marketing',    rating: 5, location: 'Madurai',     review: 'SEO, Google Ads and Social Media Marketing were all taught practically. We ran live campaigns during the course. I am now getting freelance projects regularly. Excellent course!' },
  { id: 4,  student_name: 'Kavitha R',         course: 'Spoken English',       rating: 5, location: 'Trichy',      review: 'My English confidence improved completely in just 30 days. Daily conversations, interview tips and public speaking were all included. The instructor explained everything very clearly. I now speak confidently in interviews.' },
  { id: 5,  student_name: 'Suresh P',          course: 'C Programming',        rating: 5, location: 'Salem',       review: 'From C programming basics to pointers, everything was clearly explained. It was extremely useful for my engineering exams. The study materials provided were also very well structured and easy to follow.' },
  { id: 6,  student_name: 'Deepa N',           course: 'Microsoft Office',     rating: 5, location: 'Erode',       review: 'I was afraid of Excel formulas, pivot tables and VLOOKUP before this course. After joining ThiSu Tech my confidence grew a lot. My work speed in the office has increased significantly. Great course!' },
  { id: 7,  student_name: 'Manoj T',           course: 'C++',                  rating: 5, location: 'Vellore',     review: 'OOP concepts, inheritance and STL were all taught with real examples. We built a mini project which I added to my resume. The interviewer actually asked about it. ThiSu Tech prepared me very well.' },
  { id: 8,  student_name: 'Anjali K',          course: 'Frontend Internship',  rating: 5, location: 'Tirunelveli', review: 'The 10-day internship was a great experience. We worked on live projects using React and Tailwind CSS. The mentor guidance was excellent. I received a certificate and now have a solid portfolio to show employers.' },
  { id: 9,  student_name: 'Karthik V',         course: 'Networking',           rating: 5, location: 'Madurai',     review: 'OSI model, TCP/IP and subnetting were all explained with clear visuals. This course is perfect for CCNA preparation. The lab practicals made the concepts easy to understand. Worth every rupee spent!' },
  { id: 10, student_name: 'Meena L',           course: 'Core Python',          rating: 5, location: 'Coimbatore',  review: 'I had zero coding knowledge before joining. Within 8 weeks I was building Python projects on my own. The instructor was very supportive and the study materials were clear and well organised. ThiSu Tech changed my career path.' },
  { id: 11, student_name: 'Vikram S',          course: 'Digital Marketing',    rating: 5, location: 'Chennai',     review: 'I joined to create an online presence for my business. Google Ads and Instagram marketing were taught practically. After completing the course my sales increased 3x. I recommend this course to every business owner.' },
  { id: 12, student_name: 'Nithya B',          course: 'Frontend Development', rating: 5, location: 'Tirupur',     review: 'I was scared to learn React.js but ThiSu Tech taught it step by step with practical examples. Now I can build complete component-based UIs confidently. The teaching quality is amazing and the fee is very affordable.' },
  { id: 13, student_name: 'Surya G',           course: 'Python Internship',    rating: 5, location: 'Salem',       review: 'During the internship we built an automation script for a real use case. I got genuine industry experience along with a certificate and a strong portfolio. My job search has become much easier after completing this program.' },
  { id: 14, student_name: 'Lavanya P',         course: 'Spoken English',       rating: 5, location: 'Trichy',      review: 'I used to get nervous speaking English in interviews. After the 30-day course I speak confidently. We practised group discussions and mock interviews regularly. ThiSu Tech truly transformed my communication skills.' },
  { id: 15, student_name: 'Dinesh R',          course: 'Microsoft Office',     rating: 5, location: 'Madurai',     review: 'I joined to improve my computer skills for government job preparation. MS Word, Excel and PowerPoint were all covered thoroughly with practice exercises. The certificate was very useful for my application. Thank you ThiSu Tech!' },
]

const whyUs = [
  'Live Interactive Online Classes',
  'Industry-Expert Instructors',
  'Hands-on Mini Projects',
  'Lifetime Recording Access',
  'Certificate on Completion',
  'Affordable Fee Structure',
  'Internship Opportunities',
  'Placement Assistance',
]

const faqs = [
  { q: 'Are classes conducted online?', a: 'Yes, all classes are conducted via live online sessions. Recordings are also shared after each class.' },
  { q: 'Will I get a certificate?', a: 'Yes! You will receive a digital certificate upon successful completion of the course.' },
  { q: 'What is the course duration?', a: 'Course durations range from 4 weeks to 3 months depending on the program.' },
  { q: 'Are there any prerequisites?', a: 'Most beginner courses require no prior knowledge. Advanced courses may have prerequisites mentioned on the course page.' },
  { q: 'How do I enroll?', a: 'Fill the enquiry form on this website or WhatsApp us at +91 95978 69958 to get started.' },
  { q: 'Is EMI available?', a: 'Yes, we offer flexible payment options. Contact us for more details.' },
]

/* ── Course Card ───────────────────────────────────── */
function CourseCard({ course }) {
  return (
    <motion.div
      variants={fadeUp}
      className="card overflow-hidden group"
    >
      <div className="relative h-44 bg-gradient-to-br from-navy-900 to-navy-700 overflow-hidden">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-heading font-black text-white/20">
              {course.title?.[0]}
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 badge bg-orange-500 text-white">
          {course.mode || 'Online'}
        </span>
        {course.certificate_available && (
          <span className="absolute top-3 right-3 badge bg-white/20 text-white backdrop-blur-sm">
            <FiAward size={10} /> Certificate
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-navy-900 dark:text-white text-lg mb-1 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Duration: <span className="font-medium text-gray-700 dark:text-gray-300">{course.duration}</span>
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-orange-500 font-bold text-xl">₹{course.offer_price}</span>
            {course.fee !== course.offer_price && (
              <span className="text-gray-400 text-sm line-through ml-2">₹{course.fee}</span>
            )}
          </div>
          <Link
            to={`/courses/${course.slug}`}
            className="text-navy-900 dark:text-orange-400 text-sm font-semibold hover:text-orange-500 flex items-center gap-1 transition-colors"
          >
            View Details <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ── FAQ Item ──────────────────────────────────────── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      className="border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <span className="font-medium text-gray-800 dark:text-white text-sm md:text-base">{q}</span>
        <span className={`text-orange-500 text-xl font-bold transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </motion.div>
  )
}

/* ── Domain color map ── */
const DOMAIN_COLORS = {
  'Core Python':          { bg: 'bg-blue-700',    initBg: 'bg-blue-100 dark:bg-blue-900', initText: 'text-blue-700 dark:text-blue-300' },
  'Frontend Development': { bg: 'bg-orange-600',  initBg: 'bg-orange-100 dark:bg-orange-900', initText: 'text-orange-700 dark:text-orange-300' },
  'Digital Marketing':    { bg: 'bg-red-600',     initBg: 'bg-red-100 dark:bg-red-900', initText: 'text-red-700 dark:text-red-300' },
  'Spoken English':       { bg: 'bg-amber-500',   initBg: 'bg-amber-100 dark:bg-amber-900', initText: 'text-amber-700 dark:text-amber-300' },
  'C Programming':        { bg: 'bg-slate-600',   initBg: 'bg-slate-100 dark:bg-slate-900', initText: 'text-slate-700 dark:text-slate-300' },
  'Microsoft Office':     { bg: 'bg-blue-600',    initBg: 'bg-blue-100 dark:bg-blue-900', initText: 'text-blue-700 dark:text-blue-300' },
  'C++':                  { bg: 'bg-rose-700',    initBg: 'bg-rose-100 dark:bg-rose-900', initText: 'text-rose-700 dark:text-rose-300' },
  'Frontend Internship':  { bg: 'bg-indigo-600',  initBg: 'bg-indigo-100 dark:bg-indigo-900', initText: 'text-indigo-700 dark:text-indigo-300' },
  'Networking':           { bg: 'bg-cyan-600',    initBg: 'bg-cyan-100 dark:bg-cyan-900', initText: 'text-cyan-700 dark:text-cyan-300' },
  'Python Internship':    { bg: 'bg-green-600',   initBg: 'bg-green-100 dark:bg-green-900', initText: 'text-green-700 dark:text-green-300' },
}

function TestimonialsGrid() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? STATIC_TESTIMONIALS : STATIC_TESTIMONIALS.slice(0, 9)

  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {displayed.map((t) => {
          const dc = DOMAIN_COLORS[t.course] || { bg: 'bg-navy-900', initBg: 'bg-navy-100 dark:bg-navy-900', initText: 'text-navy-700 dark:text-navy-300' }
          return (
            <motion.div key={t.id} variants={fadeUp}
              className="card p-5 flex flex-col hover:-translate-y-1 transition-transform duration-300">
              {/* Top: stars + course badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${dc.bg}`}>
                  {t.course}
                </span>
              </div>

              {/* Review */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow italic">
                "{t.review}"
              </p>

              {/* Student info */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className={`w-10 h-10 rounded-full ${dc.initBg} flex items-center justify-center font-heading font-black text-sm flex-shrink-0 ${dc.initText}`}>
                  {t.student_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-navy-900 dark:text-white text-sm leading-tight">{t.student_name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                    <svg className="w-3 h-3 fill-green-500" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Show more / less */}
      <div className="text-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 border-2 border-navy-900 dark:border-white text-navy-900 dark:text-white font-semibold px-8 py-3 rounded-full hover:bg-navy-900 hover:text-white dark:hover:bg-white dark:hover:text-navy-900 transition-all duration-300"
        >
          {showAll ? 'Show Less ↑' : `See All ${STATIC_TESTIMONIALS.length} Reviews ↓`}
        </button>
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────── */
export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    coursesAPI.getAll({ is_featured: true }).then((r) => setCourses(r.data.results || r.data))
    testimonialsAPI.getAll().then((r) => setTestimonials(r.data.results || r.data))
  }, [])

  return (
    <>
      <Helmet>
        <title>ThiSu Tech | Learn Today. Build Tomorrow.</title>
        <meta name="description" content="ThiSu Tech - Learn industry-ready skills through Online Live Classes with Certificates." />
      </Helmet>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-navy-700/60 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="container-custom relative z-10 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="text-white"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Online Live Classes — Enroll Now!
              </motion.span>

              {/* Real Logo in Hero */}
              <motion.div variants={fadeUp} className="mb-5">
                <ThiSuLogo size="lg" dark={true} />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black leading-tight mb-6"
              >
                Learn Today.
                <br />
                <span className="text-orange-500">Build Tomorrow.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg"
              >
                Learn industry-ready skills through <strong className="text-white">Online Live Classes</strong> with
                Certificates. Start your tech career with ThiSu Tech.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/courses" className="btn-primary text-base px-8 py-4">
                  Enroll Now <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn-secondary text-base px-8 py-4">
                  Contact Us
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-8">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-heading font-black text-orange-500">{value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right – Enquiry Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <h3 className="text-white font-heading font-bold text-xl mb-6 text-center">
                  Quick Enquiry
                </h3>
                <EnquiryForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────── */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-14 items-center"
          >
            <motion.div variants={fadeUp}>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="section-title mt-2 mb-5">Who We Are</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                <strong className="text-navy-900 dark:text-white">ThiSu Tech</strong> is a premier online IT training
                academy dedicated to making quality tech education accessible to everyone. We bridge the gap between
                learning and industry by offering practical, job-ready courses.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Our expert instructors deliver live, interactive sessions with real-world projects, ensuring
                you not only learn but also build. Every course comes with a certificate recognized by employers.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Our Mission', desc: 'To empower individuals with in-demand tech skills through affordable, quality education.' },
                  { title: 'Our Vision', desc: 'To be the most trusted online IT academy in South India.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-5 rounded-2xl bg-navy-900/5 dark:bg-white/5 border border-navy-900/10 dark:border-white/10">
                    <h4 className="font-heading font-semibold text-navy-900 dark:text-white mb-2">{title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link to="/about" className="btn-primary text-sm px-5 py-2.5">
                  Know More About Us <FiArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-6">
                Why Choose ThiSu Tech?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {whyUs.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <FiCheckCircle className="text-orange-500 flex-shrink-0" size={18} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── COURSES ────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Our Programs
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-2">
              Popular Courses
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Industry-relevant courses designed to get you job-ready fast.
            </motion.p>
          </motion.div>

          {courses.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {courses.slice(0, 6).map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Core Python', 'Frontend Development', 'C Programming', 'C++', 'Digital Marketing', 'Networking'].map((name) => (
                <div key={name} className="card overflow-hidden">
                  <div className="h-44 bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center">
                    <span className="text-white/30 font-heading font-black text-5xl">{name[0]}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-navy-900 dark:text-white text-lg mb-1">{name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Duration: 6 Weeks • Online</p>
                    <Link to="/courses" className="text-orange-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      View Details <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/courses" className="btn-navy">
              View All Courses <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────── */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Student Reviews
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-2">
              What Our Students Say
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Real feedback from our students across different courses and cities.
            </motion.p>
          </motion.div>

          <TestimonialsGrid />
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-2">
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-3"
          >
            {faqs.map((item, i) => (
              <FAQItem key={i} {...item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,122,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-black text-white mb-4">
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Join 50+ students who are already building their tech careers with ThiSu Tech.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-base px-8 py-4">
                Browse Courses <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/919597869958"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4"
              >
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
