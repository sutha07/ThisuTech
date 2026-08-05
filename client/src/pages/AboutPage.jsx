import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  FiTarget, FiEye, FiHeart, FiCheckCircle, FiAward,
  FiUsers, FiMonitor, FiStar, FiArrowRight, FiPhone
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import ThiSuLogo from '../components/ThiSuLogo'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const stats = [
  { icon: FiUsers,   value: '50+',  label: 'Students Trained',    color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { icon: FiMonitor, value: '9+',    label: 'Courses Offered',     color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  { icon: FiAward,   value: '100%',  label: 'Certificate Provided',color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/30' },
  { icon: FiStar,    value: '4.9★',  label: 'Average Rating',      color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/30' },
]

const values = [
  { icon: FiTarget,  title: 'Quality Education',   desc: 'We never compromise on content quality. Every course is carefully designed by industry experts to ensure you learn the right skills.' },
  { icon: FiHeart,   title: 'Student First',        desc: 'Your success is our success. We support every student with personalised attention, doubt clearing, and career guidance.' },
  { icon: FiEye,     title: 'Practical Learning',   desc: 'We believe in learning by doing. Every module includes hands-on exercises, real-world projects, and live practice sessions.' },
  { icon: FiAward,   title: 'Recognised Certificate', desc: 'Our certificates are valued by employers. Complete any course and earn a certificate that adds real weight to your resume.' },
]

const whyUs = [
  'Live Interactive Online Classes',
  'Expert Industry Instructors',
  'Hands-on Mini Projects',
  'Study Materials for Every Module',
  'Certificate on Completion',
  'Affordable & Flexible Fee',
  'Small Batch Size for Personal Attention',
  'Internship Opportunities',
  'Lifetime Community Access',
  'Placement & Career Guidance',
  'Doubt Clearing Support',
  'Tamil & English Medium',
]

const team = [
  {
    name: 'Tirumalai Venkateshvaran',
    role: 'Founder & Owner',
    tag: 'CEO — ThiSu Tech',
    emoji: '👨‍💼',
    desc: 'The visionary behind ThiSu Tech. Passionate about making quality tech education accessible to every student in Tamil Nadu and beyond.',
    isFounder: true,
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Esakki',
    role: 'Co-Founder',
    tag: 'Operations & Growth',
    emoji: '🤝',
    desc: 'Driving the growth and day-to-day operations of ThiSu Tech, ensuring every student gets the best learning experience possible.',
    isFounder: false,
    isCoFounder: true,
    color: 'from-blue-600 to-blue-700',
  },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | ThiSu Tech</title>
        <meta name="description" content="Learn about ThiSu Tech — our mission, vision, team and why we are Tamil Nadu's trusted online IT training academy." />
      </Helmet>

      {/* ── HERO ── */}
      <div className="relative pt-28 pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #071b3d 0%, #0B2C5F 60%, #0e3a7a 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
            <ThiSuLogo size="lg" dark={true} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-4xl md:text-6xl font-heading font-black text-white mb-4">
            About <span className="text-orange-500">ThiSu Tech</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-blue-200 text-lg max-w-2xl mx-auto">
            Tamil Nadu's trusted online IT training academy — empowering students with industry-ready skills since day one.
          </motion.p>
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="py-14 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label, color, bg }) => (
              <motion.div key={label} variants={fadeUp} className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={color} size={28} />
                </div>
                <div className={`text-3xl font-heading font-black ${color} mb-1`}>{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp}>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="section-title mt-2 mb-5">We Are <span className="text-orange-500">ThiSu Tech</span></h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong className="text-navy-900 dark:text-white">ThiSu Tech</strong> is a premier online IT training academy based in Tamil Nadu, India. We are dedicated to making quality technology education accessible to every student, regardless of their background or location.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Founded with a simple belief — <em className="text-navy-900 dark:text-white font-medium">"Every student deserves a chance to build a successful tech career"</em> — we have trained 500+ students across India through live online classes, real projects, and expert mentorship.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Our courses are taught in both <strong className="text-navy-900 dark:text-white">Tamil & English</strong>, making learning comfortable and effective. From Core Python to Digital Marketing, every program is crafted to make you job-ready from day one.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/919597869958" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
                  <FaWhatsapp size={16} /> Chat with Us
                </a>
                <Link to="/courses" className="btn-primary text-sm px-5 py-2.5">
                  Browse Courses <FiArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {/* Mission */}
              <div className="card p-6 border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                    <FiTarget className="text-orange-500" size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 dark:text-white text-lg">Our Mission</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  To empower every student with in-demand tech skills through affordable, practical, and high-quality online education — making career transformation accessible to all.
                </p>
              </div>
              {/* Vision */}
              <div className="card p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                    <FiEye className="text-blue-500" size={20} />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 dark:text-white text-lg">Our Vision</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  To become the most trusted and impactful IT training academy in South India — where every student we train becomes a confident, employed professional.
                </p>
              </div>
              {/* Tagline */}
              <div className="rounded-2xl p-6 text-center"
                style={{ background: 'linear-gradient(135deg, #0B2C5F, #1a4a8a)' }}>
                <p className="text-white font-heading font-bold text-lg">
                  "Learn Today. <span className="text-orange-400">Build Tomorrow.</span>"
                </p>
                <p className="text-blue-200 text-sm mt-1">— ThiSu Tech</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-wider">What Drives Us</motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-2">Our Core Values</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}
                className="card p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-900 to-blue-700 flex items-center justify-center mx-auto mb-4 group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="font-heading font-bold text-navy-900 dark:text-white mb-3">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp}>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Why ThiSu Tech?</span>
              <h2 className="section-title mt-2 mb-6">12 Reasons to Choose Us</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {whyUs.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <FiCheckCircle className="text-orange-500 flex-shrink-0" size={17} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {/* Stats highlight */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '50+',  lbl: 'Students Trained',  color: 'text-orange-500' },
                  { val: '9+',   lbl: 'Courses Offered',   color: 'text-blue-500'   },
                  { val: '100%', lbl: 'Certificate Rate',  color: 'text-green-500'  },
                  { val: '4.9★', lbl: 'Student Rating',    color: 'text-yellow-500' },
                ].map(({ val, lbl, color }) => (
                  <div key={lbl} className="card p-5 text-center">
                    <div className={`text-3xl font-heading font-black ${color} mb-1`}>{val}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{lbl}</div>
                  </div>
                ))}
              </div>
              {/* Tagline card */}
              <div className="rounded-2xl p-6 text-center"
                style={{ background: 'linear-gradient(135deg, #0B2C5F, #1a4a8a)' }}>
                <p className="text-white font-heading font-bold text-xl">
                  "Learn Today. <span className="text-orange-400">Build Tomorrow."</span>
                </p>
                <p className="text-blue-300 text-sm mt-2">— ThiSu Tech · Tamil Nadu, India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.span variants={fadeUp} className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Our Faculty</motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-2">Meet the Experts</motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Industry professionals with years of real-world experience, dedicated to your success.
            </motion.p>
          </motion.div>

          {/* ── Leadership Cards — Premium Design ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-3xl shadow-card-hover ${
                  member.isFounder
                    ? 'ring-2 ring-orange-400 ring-offset-2 dark:ring-offset-gray-900'
                    : 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                }`}
              >
                {/* Card gradient header */}
                <div className={`bg-gradient-to-br ${member.color} p-8 text-white text-center relative overflow-hidden`}>
                  {/* bg decoration */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-black/10" />

                  {/* Avatar */}
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center mx-auto mb-4 text-5xl shadow-xl">
                      {member.emoji}
                    </div>
                    <h3 className="font-heading font-black text-xl leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">{member.tag}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="bg-white dark:bg-gray-800 p-6 text-center">
                  {/* Role badge */}
                  <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full mb-4 ${
                    member.isFounder
                      ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400'
                      : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                  }`}>
                    {member.isFounder ? '⭐' : '🤝'} {member.role}
                  </span>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {member.desc}
                  </p>

                  {/* Bottom badge */}
                  <div className={`mt-4 inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    member.isFounder
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    ThiSu Tech
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B2C5F, #1a4a8a)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,122,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-heading font-black text-white mb-4">
              Ready to Start Your <span className="text-orange-500">Tech Journey?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
              Join 50+ students who have already transformed their careers with ThiSu Tech.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-base px-8 py-4">
                Browse Courses <FiArrowRight />
              </Link>
              <a href="tel:9597869958"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-all">
                <FiPhone size={18} /> Call: 95978 69958
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
