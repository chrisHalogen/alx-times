# serializers.py
from rest_framework import serializers
from .models import UserActivity
from django.utils import timezone
from pytz import timezone as pytz_timezone  # Import pytz for setting timezone
from .models import Article
from django.conf import settings
from urllib.parse import urljoin


def add_day_suffix(day):
    if 4 <= day <= 20 or 24 <= day <= 30:
        suffix = "th"
    else:
        suffix = ["st", "nd", "rd"][day % 10 - 1]
    return suffix


class UserActivitySerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = UserActivity
        fields = [
            "id",
            "user",
            "activity",
            "timestamp",
            "ip_address",
        ]  # Expose necessary fields
        read_only_fields = [
            "user",
            "timestamp",
            "ip_address",
        ]  # These fields will be set automatically

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        ip_address = request.META.get(
            "REMOTE_ADDR", None
        )  # Get user's IP address from the request
        timestamp = timezone.now().astimezone(
            pytz_timezone("Africa/Lagos")
        )  # Set GMT+1 for Lagos timezone

        # Create a new user activity log entry
        return UserActivity.objects.create(
            user=user,
            activity=validated_data["activity"],
            timestamp=timestamp,
            ip_address=ip_address,
        )

    def get_timestamp(self, obj):
        day = obj.timestamp.day
        day_suffix = add_day_suffix(day)
        formatted_timestamp = obj.timestamp.strftime(
            f"%d{day_suffix} of %B, %Y - %H:%M:%S"
        )
        return formatted_timestamp


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "author",
            "category",
            "content",
            "image",
            "created_at",
            "updated_at",
            "is_deleted",
        ]
        read_only_fields = ["author", "created_at", "updated_at"]

    # def create(self, validated_data):
    #     user = self.context["request"].user
    #     article = Article.objects.create(author=user, **validated_data)
    #     return article


# class ArticleDetailSerializer(serializers.ModelSerializer):
#     created_at = serializers.DateTimeField(
#         format=f"%d %B %Y - %H:%M:%S", default_timezone=timezone.get_current_timezone()
#     )
#     updated_at = serializers.DateTimeField(
#         format="%d %B %Y - %H:%M:%S", default_timezone=timezone.get_current_timezone()
#     )

#     class Meta:
#         model = Article
#         fields = [
#             "id",
#             "title",
#             "author",
#             "category",
#             "content",
#             "image",
#             "created_at",
#             "updated_at",
#         ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(
        format="%d %B %Y - %H:%M:%S", default_timezone=timezone.get_current_timezone()
    )
    image = serializers.SerializerMethodField()
    updated_at = serializers.DateTimeField(
        format="%d %B %Y - %H:%M:%S", default_timezone=timezone.get_current_timezone()
    )

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "author",
            "category",
            "content",
            "image",
            "created_at",
            "updated_at",
        ]

    def get_author(self, obj):
        """Return the author's full name."""
        return f"{obj.author.first_name} {obj.author.last_name}"

    def get_image(self, obj):
        """Return the full URL of the image."""
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        elif obj.image:
            # In case `request` is not available, fallback to constructing the URL manually.
            return urljoin(settings.MEDIA_URL, obj.image.url)
        return None
