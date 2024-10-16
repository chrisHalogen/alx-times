from rest_framework.pagination import PageNumberPagination


class ArticlePagination(PageNumberPagination):
    page_size = 6  # 9 items per page
    page_size_query_param = "page_size"
    max_page_size = 100
