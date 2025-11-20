from django.urls import path
from .views import UploadExcelView, QueryView, health

urlpatterns = [
    path('health/', health),
    path('upload/', UploadExcelView.as_view()),
    path('query/', QueryView.as_view()),
]
