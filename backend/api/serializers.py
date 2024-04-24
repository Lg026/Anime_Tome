from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Anime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class AnimeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Anime
        fields = ['id', 'jikanId', 'title', 'description', 'img_url', 'rating', 'watched', 'addedAt', 'creator']
        extra_kwargs = {'creator': {'read_only': True}}

