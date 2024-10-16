from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow access if user is owner or staff
        # print(obj.author == request.user or request.user.is_staff)
        # print(obj.author)
        # print(request.user)
        return obj.author == request.user or request.user.is_staff
