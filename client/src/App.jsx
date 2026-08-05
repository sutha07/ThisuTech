import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import BackToTop from './components/BackToTop'
import PageLoader from './components/PageLoader'

// Pages
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import InternshipPage from './pages/InternshipPage'
import CertificatePage from './pages/CertificatePage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

// Admin
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCourses from './pages/admin/AdminCourses'
import AdminEnquiries from './pages/admin/AdminEnquiries'
import ProtectedRoute from './components/ProtectedRoute'

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PageLoader />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><CoursesPage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/courses/:slug" element={<PublicLayout><CourseDetailPage /></PublicLayout>} />
          <Route path="/internship" element={<PublicLayout><InternshipPage /></PublicLayout>} />
          <Route path="/certificate" element={<PublicLayout><CertificatePage /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
