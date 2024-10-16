# urls.py
from django.urls import path
from .views import (
    UserActivityListCreateView,
    ArticleListCreateView,
    ArticleRetrieveUpdateView,
    ArticleSoftDeleteView,
    ArticleRestoreView,
    ArticleRetrieveView,
    SearchArticlesView,
    FilteredArticlesView,
    ExportArticlesView,
    ArticleDetailView,
)

urlpatterns = [
    path("activity-logs/", UserActivityListCreateView.as_view(), name="activity-logs"),
    path("articles/", ArticleListCreateView.as_view(), name="article-list-create"),
    path(
        "articles/<int:pk>/view/",
        ArticleRetrieveUpdateView.as_view(),
        name="article-retrieve",
    ),
    path(
        "articles/<int:pk>/",
        ArticleRetrieveUpdateView.as_view(),
        name="article-detail-update",
    ),
    path(
        "articles/<int:pk>/delete/",
        ArticleSoftDeleteView.as_view(),
        name="article-soft-delete",
    ),
    path(
        "articles/<int:pk>/restore/",
        ArticleRestoreView.as_view(),
        name="article-restore",
    ),
    path(
        "articles/<int:article_id>/detail/",
        ArticleDetailView.as_view(),
        name="article-detail",
    ),
    path("articles/search/", SearchArticlesView.as_view(), name="search-articles"),
    path("articles/filter/", FilteredArticlesView.as_view(), name="search-articles"),
    path("articles/export/", ExportArticlesView.as_view(), name="export-articles"),
]
