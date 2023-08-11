from django.db import models
from user_app.models import User
# Create your models here.
class Measurements(models.Model):
    amount = models.PositiveBigIntegerField()
    unitName = models.CharField()

class Nutrient(models.Model):
    name = models.CharField()
    measurement_id = models.ForeignKey(Measurements, ondelete=models.CASCADE, related_name='measurements')
    is_macro = models.BooleanField(default=False)
# class Plate(models.Model):
