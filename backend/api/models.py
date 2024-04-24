from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Anime(models.Model):
    id = models.AutoField(primary_key=True)
    jikanId = models.IntegerField() 
    title = models.CharField(max_length=255)
    description = models.TextField()
    img_url = models.URLField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    watched = models.BooleanField(default=False)
    addedAt = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='anime')
    
    class Meta:
        unique_together = ('jikanId', 'creator',)
    
    def __str__(self):
        return self.title
