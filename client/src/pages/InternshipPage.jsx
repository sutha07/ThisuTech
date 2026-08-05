import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiCheckCircle, FiAward, FiLayers, FiClock } from 'react-icons/fi'
import EnquiryForm from '../components/EnquiryForm'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const internships = [
  {
    title: 'Frontend Internship',
    icon: '🌐',
    duration: '10 Days / 4–8 Weeks',
    fee: '₹699',
    originalFee: '₹1499',
    color: 'from-blue-600 to-blue-800',
    poster: '/assets/frontend-poster.jpg',
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind CSS', 'Git & GitHub', 'Responsive Design'],
    highlights: ['Live Projects', 'Mentorship', 'Certificate', 'Portfolio Building'],
  },
  {
    title: 'Backend Internship',
    icon: '⚙️',
    duration: '4 - 8 Weeks',
    fee: '₹2999',
    color: 'from-purple-600 to-purple-800',
    poster: null,
    skills: ['Python / Django', 'REST API Development', 'Database Design', 'Authentication & JWT', 'Deployment Basics', 'Git & GitHub'],
    highlights: ['Live Projects', 'Mentorship', 'Certificate', 'Industry Exposure'],
  },
  {
    title: 'Python Internship',
    icon: '🐍',
    duration: '4 - 6 Weeks',
    fee: '₹1999',
    color: 'from-green-600 to-green-800',
    poster: null,
    skills: ['Core Python', 'Data Structures', 'File Handling', 'Automation Scripts', 'Libraries & Frameworks', 'Mini Projects'],
    highlights: ['Live Projects', 'Certificate', 'Mentorship', 'Job Assistance'],
  },
]

export default function InternshipPage() {
  return (
    <>
      <Helmet>
        <title>Internship Programs | ThiSu Tech</title>
        <meta name="description" content="Apply for Frontend, Backend, and Python internship programs at ThiSu Tech. Get real-world experience with live projects and earn a certificate." />
      </Helmet>

      {/* Header */}
      <div className="bg-navy-900 pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,122,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-custom text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-400 text-sm font-semibold uppercase tracking-widest">
            Internship Programs
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black text-white mt-2">
            Launch Your Career with
            <span className="text-orange-500"> Real Experience</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
            Work on live projects, get mentored by industry experts, and earn a certificate that employers respect.
          </motion.p>
        </div>
      </div>

      {/* Internship Cards */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {internships.map((prog) => (
              <motion.div key={prog.title} variants={fadeUp} className="card overflow-hidden flex flex-col">
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${prog.color} relative overflow-hidden`} style={{ minHeight: prog.poster ? 220 : 140 }}>
                  {prog.poster ? (
                    <>
                      <img src={prog.poster} alt={prog.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="relative z-10 p-6 flex flex-col justify-end h-full pt-16">
                        <h2 className="font-heading font-bold text-2xl text-white">{prog.title}</h2>
                        <div className="flex items-center gap-3 mt-2 text-sm text-white/80">
                          <span className="flex items-center gap-1"><FiClock size={13} /> {prog.duration}</span>
                          <div className="flex items-center gap-1">
                            {prog.originalFee && <span className="text-white/50 line-through text-xs">{prog.originalFee}</span>}
                            <span className="font-black text-orange-400 text-xl">{prog.fee}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-white text-center">
                      <div className="text-5xl mb-3">{prog.icon}</div>
                      <h2 className="font-heading font-bold text-2xl">{prog.title}</h2>
                      <div className="flex items-center justify-center gap-4 mt-3 text-sm text-white/80">
                        <span className="flex items-center gap-1"><FiClock size={13} /> {prog.duration}</span>
                        <span className="font-bold text-white text-lg">{prog.fee}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="p-6 flex-grow">
                  <h3 className="font-heading font-semibold text-navy-900 dark:text-white mb-3 text-sm uppercase tracking-wider">
                    Skills You'll Gain
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {prog.skills.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FiCheckCircle className="text-orange-500 flex-shrink-0" size={14} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {prog.highlights.map((h) => (
                      <span key={h} className="badge bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 text-xs">
                        {h}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/919597869958?text=Hi%2C%20I%20want%20to%20apply%20for%20the%20internship%20program."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center"
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Why Intern With Us?</span>
              <h2 className="section-title mt-2 mb-6">What You Get</h2>
              {[
                { icon: FiLayers, title: 'Real Live Projects', desc: 'Work on actual client projects and build a professional portfolio.' },
                { icon: FiAward, title: 'Industry Certificate', desc: 'Earn a certificate that validates your skills to employers.' },
                { icon: FiCheckCircle, title: 'Expert Mentorship', desc: 'Get guided by experienced professionals throughout the internship.' },
                { icon: FiClock, title: 'Flexible Duration', desc: 'Choose from 4-week to 12-week programs based on your schedule.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-navy-900 dark:text-white">{title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Enquiry Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="card p-8">
                <h3 className="font-heading font-bold text-navy-900 dark:text-white text-xl mb-6 text-center">
                  Apply for Internship
                </h3>
                <EnquiryForm defaultCourse="Internship Programs" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
