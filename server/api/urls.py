from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # ── Auth ──────────────────────────────────────────
    path('admin/login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('admin/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # ── Public – Courses ──────────────────────────────
    path('courses/', views.CourseListView.as_view(), name='courses-list'),
    path('courses/<slug:slug>/', views.CourseDetailView.as_view(), name='course-detail'),

    # ── Public – Certificate ──────────────────────────
    path('certificates/verify/<str:certificate_id>/', views.CertificateVerifyView.as_view(), name='cert-verify'),

    # ── Public – Enquiry ──────────────────────────────
    path('enquiry/', views.EnquiryCreateView.as_view(), name='enquiry-create'),

    # ── Public – Testimonials ─────────────────────────
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonials'),

    # ── Public – Gallery ──────────────────────────────
    path('gallery/', views.GalleryListView.as_view(), name='gallery'),

    # ── Admin – Dashboard ─────────────────────────────
    path('admin/dashboard/', views.DashboardStatsView.as_view(), name='dashboard'),

    # ── Admin – Courses ───────────────────────────────
    path('admin/courses/', views.AdminCourseListCreateView.as_view(), name='admin-courses'),
    path('admin/courses/<int:pk>/', views.AdminCourseDetailView.as_view(), name='admin-course-detail'),

    # ── Admin – Enquiries ─────────────────────────────
    path('admin/enquiries/', views.AdminEnquiryListView.as_view(), name='admin-enquiries'),
    path('admin/enquiries/<int:pk>/', views.AdminEnquiryDetailView.as_view(), name='admin-enquiry-detail'),

    # ── Admin – Testimonials ──────────────────────────
    path('admin/testimonials/', views.AdminTestimonialView.as_view(), name='admin-testimonials'),
    path('admin/testimonials/<int:pk>/', views.AdminTestimonialDetailView.as_view(), name='admin-testimonial-detail'),

    # ── Admin – Gallery ───────────────────────────────
    path('admin/gallery/', views.AdminGalleryView.as_view(), name='admin-gallery'),
    path('admin/gallery/<int:pk>/', views.AdminGalleryDetailView.as_view(), name='admin-gallery-detail'),
]
