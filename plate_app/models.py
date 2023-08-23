from django.db import models
from user_app.models import User
from journal_app.models import Journal_entry
# Create your models here.
class Measurement(models.Model):
    amount = models.PositiveBigIntegerField(null=False,default=0)
    unit_name = models.CharField(null=False,blank=False)

class Nutrient(models.Model):
    name = models.CharField(null=False,blank=False,max_length=255)
    measurement_id = models.ForeignKey(Measurement, on_delete=models.CASCADE, related_name='nutrient_measurements')
    is_macro = models.BooleanField(default=False)

class Plate(models.Model):
    journal_entry_id = models.ForeignKey(Journal_entry,on_delete=models.CASCADE, related_name='plates', null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Ingredient(models.Model):
    name = models.CharField(null=False,blank=False, max_length=255)
    plate_id = models.ForeignKey(Plate,on_delete=models.CASCADE, related_name='ingredients',default=1 )
    measurement_id = models.ForeignKey(Measurement, on_delete=models.CASCADE, related_name='ingredient_measurements')
    nutrients_id = models.ManyToManyField(Nutrient, related_name='nutrients')

    