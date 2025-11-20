from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/chatbot/', include('chatbot.urls')),
]
