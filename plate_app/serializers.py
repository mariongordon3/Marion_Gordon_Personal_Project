from rest_framework import serializers
from .models import Plate, Ingredient, Nutrient, Measurement

class PlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = ['id','created_at']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id','name','measurement_id','nutrients_id']

class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ['amount','unit_name']

class NutrientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrient
        fields = ['name','measurement_id','is_macro']