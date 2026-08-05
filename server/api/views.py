from django.db.models import Count
from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend

from .models import Course, Enquiry, Certificate, Testimonial, GalleryItem
from .serializers import (
    CourseListSerializer, CourseDetailSerializer, CourseWriteSerializer,
    EnquirySerializer, CertificateSerializer, TestimonialSerializer,
    GalleryItemSerializer,
)


# ─────────────────────────────────────────────
#  AUTH
# ─────────────────────────────────────────────

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)
        if user and user.is_staff:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser,
                },
            })
        return Response(
            {'error': 'Invalid credentials or insufficient permissions.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )


# ─────────────────────────────────────────────
#  COURSES  (public)
# ─────────────────────────────────────────────

class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'mode', 'is_featured']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'offer_price']

    def get_queryset(self):
        return Course.objects.filter(is_active=True)


class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    queryset = Course.objects.filter(is_active=True)


# ─────────────────────────────────────────────
#  COURSES  (admin CRUD)
# ─────────────────────────────────────────────

class AdminCourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['title']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CourseWriteSerializer
        return CourseListSerializer


class AdminCourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return CourseWriteSerializer
        return CourseDetailSerializer


# ─────────────────────────────────────────────
#  ENQUIRIES
# ─────────────────────────────────────────────

class EnquiryCreateView(generics.CreateAPIView):
    serializer_class = EnquirySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Enquiry submitted successfully! We will contact you soon.'},
            status=status.HTTP_201_CREATED,
        )


class AdminEnquiryListView(generics.ListAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'course']
    search_fields = ['name', 'email', 'phone', 'course']


class AdminEnquiryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [IsAuthenticated]


# ─────────────────────────────────────────────
#  CERTIFICATE VERIFICATION  (public)
# ─────────────────────────────────────────────

class CertificateVerifyView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, certificate_id):
        try:
            cert = Certificate.objects.get(certificate_id=certificate_id)
            serializer = CertificateSerializer(cert)
            return Response({
                'found': True,
                'certificate': serializer.data,
            })
        except Certificate.DoesNotExist:
            return Response(
                {'found': False, 'message': 'Certificate not found. Please check the ID.'},
                status=status.HTTP_404_NOT_FOUND,
            )


# ─────────────────────────────────────────────
#  TESTIMONIALS  (public)
# ─────────────────────────────────────────────

class TestimonialListView(generics.ListAPIView):
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    queryset = Testimonial.objects.filter(is_active=True)


class AdminTestimonialView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]


class AdminTestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticated]


# ─────────────────────────────────────────────
#  GALLERY  (public)
# ─────────────────────────────────────────────

class GalleryListView(generics.ListAPIView):
    serializer_class = GalleryItemSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

    def get_queryset(self):
        return GalleryItem.objects.filter(is_active=True)


class AdminGalleryView(generics.ListCreateAPIView):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAuthenticated]


class AdminGalleryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAuthenticated]


# ─────────────────────────────────────────────
#  DASHBOARD STATS  (admin)
# ─────────────────────────────────────────────

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_courses = Course.objects.filter(is_active=True).count()
        total_enquiries = Enquiry.objects.count()
        new_enquiries = Enquiry.objects.filter(status='new').count()
        total_certificates = Certificate.objects.count()

        recent_enquiries = Enquiry.objects.order_by('-created_at')[:5]
        recent_data = EnquirySerializer(recent_enquiries, many=True).data

        enquiries_by_course = (
            Enquiry.objects.values('course')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )

        return Response({
            'total_courses': total_courses,
            'total_enquiries': total_enquiries,
            'new_enquiries': new_enquiries,
            'total_certificates': total_certificates,
            'recent_enquiries': recent_data,
            'enquiries_by_course': list(enquiries_by_course),
        })
