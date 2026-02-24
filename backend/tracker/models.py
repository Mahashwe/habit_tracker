from django.db import models

class Habit(models.Model):
    habitName = models.CharField(max_length=100)
    habitDescription = models.TextField()
    frequency = models.IntegerField()
    done = models.BooleanField(default=False)
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.habitName
