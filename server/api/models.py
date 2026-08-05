from django.db import models


class Course(models.Model):
    CATEGORY_CHOICES = [
        ('programming', 'Programming'),
        ('web', 'Web Development'),
        ('networking', 'Networking'),
        ('digital_marketing', 'Digital Marketing'),
        ('office', 'Microsoft Office'),
        ('language', 'Language'),
        ('internship', 'Internship'),
    ]
    MODE_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
        ('hybrid', 'Hybrid'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='programming')
    image = models.ImageField(upload_to='courses/', blank=True, null=True)
    description = models.TextField()
    overview = models.TextField(blank=True)
    duration = models.CharField(max_length=100)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default='online')
    fee = models.DecimalField(max_digits=8, decimal_places=2)
    offer_price = models.DecimalField(max_digits=8, decimal_places=2)
    who_can_join = models.TextField(blank=True)
    topics_covered = models.JSONField(default=list, blank=True)
    certificate_available = models.BooleanField(default=True)
    live_classes = models.BooleanField(default=True)
    study_materials = models.BooleanField(default=True)
    mini_projects = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Enquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('enrolled', 'Enrolled'),
        ('closed', 'Closed'),
    ]

    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    course = models.CharField(max_length=200)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Enquiries'

    def __str__(self):
        return f"{self.name} - {self.course}"


class Certificate(models.Model):
    certificate_id = models.CharField(max_length=50, unique=True)
    student_name = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    issue_date = models.DateField()
    is_valid = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.certificate_id} - {self.student_name}"


class Testimonial(models.Model):
    student_name = models.CharField(max_length=200)
    course = models.CharField(max_length=200)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    review = models.TextField()
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student_name} - {self.rating}★"


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('course_poster', 'Course Poster'),
        ('certificate', 'Certificate'),
        ('internship', 'Internship'),
        ('event', 'Event'),
        ('workshop', 'Workshop'),
    ]

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='event')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
