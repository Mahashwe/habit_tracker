from django.db import models

class Habit(models.Model):
    name=models.CharField(max_length=200)
    description=models.TextField(blank=True)
    remaining=models.IntegerField(default=0)
    done=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    
