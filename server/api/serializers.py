from rest_framework import serializers
from .models import Course, Enquiry, Certificate, Testimonial, GalleryItem


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for course cards/listing."""
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'category', 'image',
            'duration', 'mode', 'fee', 'offer_price',
            'certificate_available', 'is_featured', 'created_at',
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    """Full serializer for course detail page."""
    class Meta:
        model = Course
        fields = '__all__'


class CourseWriteSerializer(serializers.ModelSerializer):
    """Serializer for creating / updating courses (admin)."""
    class Meta:
        model = Course
        fields = '__all__'

    def validate_offer_price(self, value):
        fee = self.initial_data.get('fee')
        if fee and float(value) > float(fee):
            raise serializers.ValidationError("Offer price cannot be greater than the original fee.")
        return value


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = '__all__'
        read_only_fields = ['status', 'created_at']

    def validate_phone(self, value):
        cleaned = ''.join(filter(str.isdigit, value))
        if len(cleaned) < 10:
            raise serializers.ValidationError("Please enter a valid phone number (min 10 digits).")
        return value


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'
