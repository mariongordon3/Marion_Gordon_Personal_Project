from rest_framework import serializers
from .models import Plate, Ingredient, Nutrient, Measurement

class PlateSerializer(serializers.ModelSerializer):
    class meta:
        model = Plate
        fields = ['ingredients_id','created_at']

class IngredientSerializer(serializers.ModelSerializer):
    class meta:
        model = Ingredient
        fields = ['name','measurement_id','nutrients_id']