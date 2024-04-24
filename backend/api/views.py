from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, AnimeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Anime

# Create your views here.

class AnimeListCreate(generics.ListCreateAPIView):
    serializer_class = AnimeSerializer
    permission_classes = [IsAuthenticated]
    
    def  get_queryset(self):
        user = self.request.user
        return Anime.objects.filter(creator=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(creator=self.request.user)
        else:
            print(serializer.errors)
            
class AnimeDelete(generics.DestroyAPIView):
    serializer_class = AnimeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Anime.objects.filter(creator=user, id=self.kwargs['pk'])
    
class AnimeUpdate(generics.UpdateAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



