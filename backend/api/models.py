from django.db import models
from django.conf import settings
from django.utils import timezone
from .constants import CATEGORY_CHOICES


class UserActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    activity = models.CharField(max_length=255)
    timestamp = models.DateTimeField(default=timezone.now)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.activity} - {self.timestamp}"


class Article(models.Model):
    title = models.CharField(max_length=500)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to="article_images/", null=True, blank=True)
    is_deleted = models.BooleanField(default=False)  # Soft delete
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
