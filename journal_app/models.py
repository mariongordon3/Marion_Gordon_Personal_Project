from django.db import models
from user_app.models import User
# Create your models here.

class Journal_entry(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    created_at = models.DateTimeField(auto_now_add=True)