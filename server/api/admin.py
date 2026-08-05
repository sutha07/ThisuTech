from django.contrib import admin
from .models import Course, Enquiry, Certificate, Testimonial, GalleryItem


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'mode', 'offer_price', 'is_active', 'is_featured', 'created_at']
    list_filter = ['category', 'mode', 'is_active', 'is_featured']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_active', 'is_featured']
    ordering = ['-created_at']


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'course', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'phone', 'course']
    list_editable = ['status']
    ordering = ['-created_at']
    readonly_fields = ['created_at']


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['certificate_id', 'student_name', 'course', 'issue_date', 'is_valid']
    list_filter = ['is_valid', 'issue_date']
    search_fields = ['certificate_id', 'student_name', 'course']
    list_editable = ['is_valid']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'course', 'rating', 'is_active', 'created_at']
    list_filter = ['rating', 'is_active']
    search_fields = ['student_name', 'course']
    list_editable = ['is_active']


@admin.register(GalleryItem)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_active', 'created_at']
    list_filter = ['category', 'is_active']
    list_editable = ['is_active']


# Customize Django Admin header
admin.site.site_header = "ThiSu Tech Admin"
admin.site.site_title = "ThiSu Tech"
admin.site.index_title = "Welcome to ThiSu Tech Admin Panel"
