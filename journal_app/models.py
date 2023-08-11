from django.db import models
from plate_app.models import Plate
from user_app.models import User
# Create your models here.

class Journal_entry(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    plate_id = models.ForeignKey(Plate, on_delete=models.CASCADE, related_name='plates')
    created_at = models.DateTimeField()