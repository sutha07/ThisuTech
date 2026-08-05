import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('thisutech_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 - auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('thisutech_token')
      localStorage.removeItem('thisutech_user')
      if (window.location.pathname.startsWith('/admin') &&
          window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

// ── Convenience helpers ──────────────────────────────

export const coursesAPI = {
  getAll: (params) => api.get('/courses/', { params }),
  getBySlug: (slug) => api.get(`/courses/${slug}/`),
}

export const enquiryAPI = {
  submit: (data) => api.post('/enquiry/', data),
}

export const certificateAPI = {
  verify: (id) => api.get(`/certificates/verify/${id}/`),
}

export const testimonialsAPI = {
  getAll: () => api.get('/testimonials/'),
}

export const galleryAPI = {
  getAll: (params) => api.get('/gallery/', { params }),
}

export const adminAPI = {
  login: (data) => api.post('/admin/login/', data),
  getDashboard: () => api.get('/admin/dashboard/'),

  // Courses
  getCourses: (params) => api.get('/admin/courses/', { params }),
  createCourse: (data) => api.post('/admin/courses/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateCourse: (id, data) => api.patch(`/admin/courses/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}/`),

  // Enquiries
  getEnquiries: (params) => api.get('/admin/enquiries/', { params }),
  updateEnquiry: (id, data) => api.patch(`/admin/enquiries/${id}/`, data),
  deleteEnquiry: (id) => api.delete(`/admin/enquiries/${id}/`),

  // Gallery
  getGallery: () => api.get('/admin/gallery/'),
  addGalleryItem: (data) => api.post('/admin/gallery/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteGalleryItem: (id) => api.delete(`/admin/gallery/${id}/`),
}
