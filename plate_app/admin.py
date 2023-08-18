from django.contrib import admin
from .models import Plate,Ingredient,Nutrient,Measurement
# Register your models here.
admin.site.register([Plate])
admin.site.register([Ingredient])
admin.site.register([Nutrient])
admin.site.register([Measurement])

