from django.db import models
from user_app.models import User
# Create your models here.
class Measurement(models.Model):
    amount = models.PositiveBigIntegerField(null=False,default=0)
    unitName = models.CharField(null=False,blank=False)

class Nutrient(models.Model):
    name = models.CharField(null=False,blank=False,max_length=255)
    measurement_id = models.ForeignKey(Measurement, on_delete=models.CASCADE, related_name='nutrient_measurements')
    is_macro = models.BooleanField(default=False)

class Ingredient(models.Model):
    name = models.CharField(null=False,blank=False, max_length=255)
    measurement_id = models.ForeignKey(Measurement, on_delete=models.CASCADE, related_name='ingredient_measurements')
    nutrients_id = models.ManyToManyField(Nutrient, related_name='nutrients')
class Plate(models.Model):
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredients')
    created_at = models.DateTimeField(null=False,blank=False)