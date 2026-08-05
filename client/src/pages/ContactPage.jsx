import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import EnquiryForm from '../components/EnquiryForm'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const contactInfo = [
  {
    icon: FiPhone,
    title: 'Call Us',
    lines: ['+91 95978 69958'],
    action: 'tel:9597869958',
    actionLabel: 'Call Now',
    color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    iconColor: 'text-blue-500',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    lines: ['+91 95978 69958', 'Available 9AM – 9PM'],
    action: 'https://wa.me/919597869958',
    actionLabel: 'Chat Now',
    color: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
    iconColor: 'text-green-500',
    external: true,
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['thisutech@gmail.com'],
    action: 'mailto:thisutech@gmail.com',
    actionLabel: 'Send Email',
    color: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
    iconColor: 'text-orange-500',
  },
  {
    icon: FiMapPin,
    title: 'Location',
    lines: ['Tamil Nadu, India', 'Online Classes — All India'],
    color: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    iconColor: 'text-purple-500',
  },
]

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | ThiSu Tech</title>
        <meta name="description" content="Contact ThiSu Tech for course enquiries. Call, WhatsApp, or fill the form. We're here to help you start your tech journey." />
      </Helmet>

      {/* Header */}
      <div className="bg-navy-900 pt-28 pb-16 px-4">
        <div className="container-custom text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-400 text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black text-white mt-2">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 mt-3 text-lg">
            We're here to help you start your tech journey
          </motion.p>
        </div>
      </div>

      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          {/* Contact Cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
          >
            {contactInfo.map(({ icon: Icon, title, lines, action, actionLabel, color, iconColor, external }) => (
              <motion.div key={title} variants={fadeUp} className="card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={iconColor} size={24} />
                </div>
                <h3 className="font-heading font-semibold text-navy-900 dark:text-white mb-2">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-gray-600 dark:text-gray-400 text-sm">{l}</p>
                ))}
                {action && (
                  <a
                    href={action}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-block mt-3 text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors"
                  >
                    {actionLabel} →
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="card p-8">
                <h2 className="font-heading font-bold text-navy-900 dark:text-white text-2xl mb-2">
                  Send an Enquiry
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Fill the form below and we'll get back to you within 24 hours.
                </p>
                <EnquiryForm />
              </div>
            </motion.div>

            {/* Contact Details + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Reach Us Card */}
              <div className="card p-6"
                style={{ background: 'linear-gradient(135deg, #0B2C5F, #1a4a8a)' }}>
                <h3 className="font-heading font-bold text-white text-lg mb-5">Reach Us Directly</h3>
                <div className="space-y-4">
                  <a href="tel:9597869958"
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 mb-0.5">Phone / WhatsApp</p>
                      <p className="text-white font-bold text-lg">+91 95978 69958</p>
                    </div>
                  </a>
                  <a href="mailto:thisutech@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 mb-0.5">Email</p>
                      <p className="text-white font-bold">thisutech@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/10">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 mb-0.5">Location</p>
                      <p className="text-white font-bold">Tamil Nadu, India</p>
                      <p className="text-blue-300 text-xs">Online Classes — All India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                    <FiClock className="text-orange-500" size={18} />
                  </div>
                  <h3 className="font-heading font-semibold text-navy-900 dark:text-white">Support Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    ['Monday – Friday', '9:00 AM – 9:00 PM'],
                    ['Saturday',        '9:00 AM – 6:00 PM'],
                    ['Sunday',          '10:00 AM – 4:00 PM'],
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <span className="text-gray-600 dark:text-gray-400">{day}</span>
                      <span className="font-semibold text-navy-900 dark:text-white">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919597869958?text=Hi%20ThiSu%20Tech%2C%20I%20want%20to%20know%20more%20about%20your%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp size={26} />
                </div>
                <div>
                  <div className="font-heading font-bold text-lg">Chat on WhatsApp</div>
                  <div className="text-green-100 text-sm">Get instant response — usually within minutes</div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
