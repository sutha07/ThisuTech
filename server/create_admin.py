"""
Run once: python create_admin.py
Creates admin superuser if not already exists.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'thisutech.settings')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@thisutech.com', 'admin@123')
    print('✅ Superuser created: admin / admin@123')
else:
    print('ℹ️  Admin user already exists')
