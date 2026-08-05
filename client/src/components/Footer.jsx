import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import ThiSuLogo from './ThiSuLogo'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Internship', to: '/internship' },
  { label: 'Certificate', to: '/certificate' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const courses = [
  'Core Python', 'Frontend Development', 'C Programming',
  'C++', 'Networking', 'Digital Marketing',
  'Microsoft Office', 'Spoken English',
]

const socials = [
  { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <ThiSuLogo size="md" dark={true} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Learn industry-ready skills through Online Live Classes with Certificates.
              Your journey to a tech career starts here.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center transition-colors ${color}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500 inline-block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((c) => (
                <li key={c}>
                  <Link
                    to="/courses"
                    className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500 inline-block" />
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:9597869958"
                  className="flex items-center gap-3 text-gray-400 hover:text-orange-400 text-sm transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <FiPhone size={14} className="text-orange-400" />
                  </div>
                  +91 95978 69958
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919597869958"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp size={14} className="text-green-400" />
                  </div>
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:thisutech@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-orange-400 text-sm transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <FiMail size={14} className="text-orange-400" />
                  </div>
                  thisutech@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiMapPin size={14} className="text-orange-400" />
                </div>
                Tamil Nadu, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center">
            © 2026 ThiSu Tech. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-orange-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
