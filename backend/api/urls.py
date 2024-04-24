from django.urls import path
from . import views

urlpatterns = [
    path('anime/', views.AnimeListCreate.as_view(), name='Anime-list'),
    path('anime/delete/<int:pk>/', views.AnimeDelete.as_view(), name='delete-anime'),
    path('anime/<int:id>/', views.AnimeUpdate.as_view(), name='update-anime')
]