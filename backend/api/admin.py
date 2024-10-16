from django.contrib import admin
from .models import UserActivity, Article

# Register your models here.
admin.site.register(UserActivity)
# admin.site.register(Article)


@admin.action(description="Mark selected articles as featured")
def make_featured(modeladmin, request, queryset):
    queryset.update(featured=True)


class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author", "created_at", "featured")
    list_filter = ("category", "featured", "created_at")
    actions = [make_featured]
    search_fields = ("title", "category", "content")
    readonly_fields = (
        "author",
        "created_at",
        "updated_at",
    )  # Ensure some fields are read-only

    def save_model(self, request, obj, form, change):
        """Set the author automatically if the article is newly created."""
        if not obj.pk:  # If the article is being created
            obj.author = request.user
        super().save_model(request, obj, form, change)

    def get_readonly_fields(self, request, obj=None):
        """Make 'featured' field editable only for admins."""
        if not request.user.is_superuser:
            return self.readonly_fields + ("featured",)
        return self.readonly_fields

    def is_featured(self, obj):
        return obj.featured

    is_featured.boolean = True  # Display a tick mark or cross in the admin
    is_featured.short_description = "Featured"


admin.site.register(Article, ArticleAdmin)
