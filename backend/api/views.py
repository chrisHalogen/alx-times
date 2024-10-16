# views.py
from rest_framework import generics, permissions
from .models import UserActivity, Article
from .serializers import (
    UserActivitySerializer,
    ArticleSerializer,
    ArticleDetailSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsOwnerOrAdmin
from rest_framework.views import APIView
from django.db.models import Q
from .pagination import ArticlePagination
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404


class UserActivityListCreateView(generics.ListCreateAPIView):
    """
    GET: List the most recent 10 user activities formatted for the ObjectTable.
    POST: Create a new activity log.
    """

    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only the activities of the authenticated user, limited to the most recent 10
        return UserActivity.objects.filter(user=self.request.user).order_by(
            "-timestamp"
        )[:10]

    def list(self, request, *args, **kwargs):
        # Get the queryset of the most recent 10 activities
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Define the head (columns) for the table
        head = ["activity", "timestamp", "ip_address"]

        # Format the data as key-value pairs
        data = []
        for item in serializer.data:
            data.append(
                {
                    "activity": item["activity"],
                    "timestamp": item["timestamp"],
                    "ip_address": item.get(
                        "ip_address", "N/A"
                    ),  # Fallback if IP is null
                }
            )
        print({"head": head, "data": data})
        # Return the response in the format expected by the ObjectTable component
        return Response({"head": head, "data": data}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        # Pass the request context to the serializer to allow capturing user and IP address
        serializer.save(
            user=self.request.user, ip_address=self.request.META.get("REMOTE_ADDR")
        )


class ArticleListCreateView(generics.ListCreateAPIView):
    # queryset = Article.objects.filter(is_deleted=False).order_by(
    #     "-created_at"
    # )  # Only show non-deleted articles
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = ArticlePagination

    def get_queryset(self):
        user = self.request.user
        return Article.objects.filter(author=user, is_deleted=False).order_by(
            "-created_at"
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        paginator = self.pagination_class()
        paginated_articles = paginator.paginate_queryset(queryset, request)

        serializer = ArticleDetailSerializer(paginated_articles, many=True)
        output = paginator.get_paginated_response(serializer.data)
        # print("Output")
        # print(output.data["results"])

        # Create a structured response similar to the provided format
        formatted_articles = {
            "head": ["title", "category", "created_at", "action"],
            "data": [
                {
                    "title": article["title"],
                    "category": article["category"],
                    "created_at": article["created_at"],
                    "action": article["id"],
                }
                for article in output.data["results"]
            ],
        }

        output.data["results"] = formatted_articles

        # print(output)

        return output

        # # Apply pagination
        # paginator = self.pagination_class()
        # paginated_articles = paginator.paginate_queryset(formatted_articles, request)

        # # Serialize the paginated articles
        # print(paginated_articles)

        # return paginator.get_paginated_response(paginated_articles)

        # return Response(formatted_articles)


class ArticleRetrieveView(generics.RetrieveAPIView):
    queryset = Article.objects.filter(is_deleted=False)  # Only non-deleted articles
    serializer_class = ArticleDetailSerializer  # Use the new serializer

    def get_object(self):
        obj = super().get_object()
        return obj


class ArticleRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        if not self.request.user.is_staff:
            return Article.objects.filter(is_deleted=False)
        return Article.objects.all()


class ArticleSoftDeleteView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsOwnerOrAdmin]

    def perform_update(self, serializer):
        article = self.get_object()
        article.is_deleted = True  # Mark as deleted
        article.save()


class ArticleRestoreView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_update(self, serializer):
        article = self.get_object()
        article.is_deleted = False  # Restore article
        article.save()


class SearchArticlesView(APIView):
    permission_classes = [permissions.AllowAny]
    pagination_class = ArticlePagination

    def get_serializer_context(self):
        """Include the request in the serializer context."""
        return {"request": self.request}

    def get(self, request, *args, **kwargs):
        term = request.query_params.get("term", "")
        articles = Article.objects.filter(
            Q(title__icontains=term) | Q(category__icontains=term), is_deleted=False
        ).order_by("-created_at")

        paginator = self.pagination_class()
        paginated_articles = paginator.paginate_queryset(articles, request)

        serializer = ArticleDetailSerializer(paginated_articles, many=True)
        return paginator.get_paginated_response(serializer.data)


class FilteredArticlesView(APIView):
    permission_classes = [permissions.AllowAny]
    pagination_class = ArticlePagination

    def get_serializer_context(self):
        """Include the request in the serializer context."""
        return {"request": self.request}

    def get(self, request, *args, **kwargs):
        # Get query parameters
        term = request.query_params.get("term", "")
        category = request.query_params.get("category", None)
        featured = request.query_params.get("featured", None)
        latest = request.query_params.get("latest", None)

        # Base queryset
        queryset = Article.objects.filter(is_deleted=False)

        # Apply search by term (title or category)
        if term:
            queryset = queryset.filter(
                Q(title__icontains=term) | Q(category__icontains=term)
            )

        # Filter by category if provided
        if category:
            queryset = queryset.filter(category__iexact=category)

        # Filter by featured status if provided
        if featured is not None:
            is_featured = featured.lower() == "true"
            queryset = queryset.filter(featured=is_featured)

        # If latest is provided, order by most recent
        if latest:
            queryset = queryset.order_by("-created_at")

        # Apply pagination
        paginator = self.pagination_class()
        paginated_articles = paginator.paginate_queryset(queryset, request)

        # Serialize the paginated articles
        serializer = ArticleDetailSerializer(
            paginated_articles, many=True, context=self.get_serializer_context()
        )

        return paginator.get_paginated_response(serializer.data)


class ExportArticlesView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        """Include the request in the serializer context."""
        return {"request": self.request}

    def get(self, request, *args, **kwargs):
        # Query 3 latest articles
        latest_articles = Article.objects.filter(is_deleted=False).order_by(
            "-created_at"
        )[:3]

        # Query 3 featured articles
        featured_articles = Article.objects.filter(featured=True, is_deleted=False)[:3]

        # Serialize the results
        latest_serializer = ArticleDetailSerializer(
            latest_articles, many=True, context=self.get_serializer_context()
        )
        featured_serializer = ArticleDetailSerializer(
            featured_articles, many=True, context=self.get_serializer_context()
        )

        # Construct the response data
        data = {
            "latest": latest_serializer.data,
            "featured": featured_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)


class ArticleDetailView(APIView):
    permission_classes = [permissions.AllowAny]  # Open to everyone

    def get(self, request, article_id, *args, **kwargs):
        """
        Retrieve details of a specific article by ID.
        """
        article = get_object_or_404(Article, id=article_id)
        serializer = ArticleDetailSerializer(article, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
