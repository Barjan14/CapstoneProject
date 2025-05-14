from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class MotionEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    detected = models.BooleanField(default=True)
    motion = models.BooleanField()

    def __str__(self):
        return f"Motion at {self.timestamp}"
