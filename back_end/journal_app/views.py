from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from .models import Journal_entry
from user_app.models import User
from plate_app.models import Plate,Ingredient,Measurement,Nutrient
from .serializers import JournalEntrySerializer
from plate_app.serializers import PlateSerializer,IngredientSerializer,MeasurementSerializer,NutrientSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK,HTTP_204_NO_CONTENT,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_201_CREATED
# Create your views here.
# on front end pick a food from foods and post to back end
    # "foods": [
    #     {
    #         "fdcId": 2343477,
    #         "description": "Pie, apple",
    #         "commonNames": "",
    #         "additionalDescriptions": "",
    #         "dataType": "Survey (FNDDS)",
    #         "foodCode": 53301000,
    #         "publishedDate": "2022-10-28",
    #         "foodCategory": "Cakes and pies",
    #         "foodCategoryId": 2646625,
    #         "allHighlightFields": "",
    #         "score": 609.0303,
    #         "microbes": [],
    #         "foodNutrients": [
    #             {
    #                 "nutrientId": 1003,
    #                 "nutrientName": "Protein",
    #                 "nutrientNumber": "203",
    #                 "unitName": "G",
    #                 "value": 2.7,
    #                 "rank": 600,
    #                 "indentLevel": 1,
    #                 "foodNutrientId": 28717129
    #             },
    #             {
    #                 "nutrientId": 1004,
    #                 "nutrientName": "Total lipid (fat)",
    #                 "nutrientNumber": "204",
    #                 "unitName": "G",
    #                 "value": 15.3,
    #                 "rank": 800,
    #                 "indentLevel": 1,
    #                 "foodNutrientId": 28717130
    #             }
class All_journals(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        try:
            # user = User.objects.get(username=request.data['username'])
            # journal = Journal_entry(user_id=user)
            all_journals = Journal_entry.objects.all()
            serialized_journals = JournalEntrySerializer(all_journals, many=True)
            serialized_journals_data = serialized_journals.data
            for journal in serialized_journals_data:
                plate_list = Plate.objects.filter(journal_entry_id__id__contains = journal['id'])
                serialized_plates = PlateSerializer(plate_list,many=True)
                journal['plates'] = serialized_plates.data
                for plate_item in journal['plates']:
                 ingredients = Ingredient.objects.filter(plate_id__id__contains = plate_item['id'])
                 serialized_ingredients = IngredientSerializer(ingredients, many=True)
                 plate_item['ingredients'] = serialized_ingredients.data
                 for plate_ingredient in plate_item['ingredients']:
                      ingredient_measurement = Measurement.objects.get(id=plate_ingredient['measurement_id'])
                      serialized_measurement = MeasurementSerializer(ingredient_measurement)
                      nutrients = Nutrient.objects.filter(id__in = plate_ingredient['nutrients_id'])
                      serialized_nutrients= NutrientSerializer(nutrients,many=True)
                      plate_ingredient['measurement_id'] = serialized_measurement.data
                      plate_ingredient['nutrients_id'] = serialized_nutrients.data
                      for nutrient_item in plate_ingredient['nutrients_id']:
                           nutrient_measurement = Measurement.objects.get(id=nutrient_item['measurement_id'])
                           serialized_measurement = MeasurementSerializer(nutrient_measurement)
                           nutrient_item['nutrients_id'] = serialized_measurement.data 
            return Response(serialized_journals.data,status=HTTP_200_OK)
        except:
            return Response(status=HTTP_404_NOT_FOUND)
        
class A_journal(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,journal_entry_id):
            journal = get_object_or_404(Journal_entry,id=journal_entry_id)
            serialized_journal = JournalEntrySerializer(journal)
            serialized_journal_data = serialized_journal.data
            plate_list = Plate.objects.filter(journal_entry_id__id__contains = journal.id)
            serialized_plates = PlateSerializer(plate_list,many=True)
            serialized_journal_data['plates'] = serialized_plates.data
            for plate_item in serialized_journal_data['plates']:
                 ingredients = Ingredient.objects.filter(plate_id__id__contains = plate_item['id'])
                 serialized_ingredients = IngredientSerializer(ingredients, many=True)
                 plate_item['ingredients'] = serialized_ingredients.data
                 for plate_ingredient in plate_item['ingredients']:
                      ingredient_measurement = Measurement.objects.get(id=plate_ingredient['measurement_id'])
                      serialized_measurement = MeasurementSerializer(ingredient_measurement)
                      nutrients = Nutrient.objects.filter(id__in = plate_ingredient['nutrients_id'])
                      serialized_nutrients= NutrientSerializer(nutrients,many=True)
                      plate_ingredient['measurement_id'] = serialized_measurement.data
                      plate_ingredient['nutrients_id'] = serialized_nutrients.data
                      for nutrient_item in plate_ingredient['nutrients_id']:
                           nutrient_measurement = Measurement.objects.get(id=nutrient_item['measurement_id'])
                           serialized_measurement = MeasurementSerializer(nutrient_measurement)
                           nutrient_item['nutrients_id'] = serialized_measurement.data                    
            return Response(serialized_journal_data,status=HTTP_200_OK)
    
    def post(self,request,journal_entry_id):
        try:
            user = User.objects.get(username=request.data['username'])
            journal = Journal_entry(user_id=user)
            # has ID?
            serialized_journal = JournalEntrySerializer(journal)
            journal.save()
            return Response(serialized_journal.data,HTTP_201_CREATED)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
    
    def delete(self,request,journal_entry_id):
        journal = get_object_or_404(Journal_entry, id=journal_entry_id)
        journal.delete()
        return Response(status=HTTP_204_NO_CONTENT)



class A_plate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self,request,journal_entry_id,plate_id):
        try:
            journal = Journal_entry.objects.get(id=journal_entry_id)
            plate = Plate(journal_entry_id=journal)
            serialized_plate = PlateSerializer(plate)
            plate.save()
            return Response(serialized_plate.data,status=HTTP_201_CREATED)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
        
    def delete(self,request,journal_entry_id,plate_id):
        journal = get_object_or_404(Journal_entry, id=journal_entry_id)
        plate = journal.plates.get(id=plate_id)
        plate.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class An_ingredient(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request,journal_entry_id,plate_id,ingredient_id):
        # try:
            print(request.data)
            journal = get_object_or_404(Journal_entry, id=journal_entry_id)
            plate = journal.plates.get(id=plate_id)
            nutrient_list=request.data['data']['foodNutrients']
            nutrients_to_add = []
            for nutrient in nutrient_list:
                nutrient_measurement = Measurement(amount=nutrient['value'],unit_name=nutrient['unitName'])
                nutrient_measurement.save()
                nutrient_names =["Total lipid (fat)","Protein","Carbohydrate, by difference"]
                nutrient_description = Nutrient(name = nutrient['nutrientName'],measurement_id= nutrient_measurement,is_macro =  nutrient['nutrientName'] in nutrient_names)
                nutrient_description.save()
                nutrients_to_add.append(nutrient_description)
            ingredient_measurement = Measurement(amount=request.data['data']['servingSize'],unit_name=request.data['data']['servingSizeUnit'])
            ingredient_measurement.save()
            ingredient = Ingredient(name=request.data['data']['description'],plate_id=plate,measurement_id=ingredient_measurement)
            ingredient.save()
            ingredient.nutrients_id.set(nutrients_to_add)
            serialized_ingredient = IngredientSerializer(ingredient)
            return Response(serialized_ingredient.data,status=HTTP_201_CREATED)
        # except:
        #     return Response(status=HTTP_400_BAD_REQUEST)
        
    def put(self,request,journal_entry_id,plate_id,ingredient_id):
        # try:
            print(request.data)
            journal = get_object_or_404(Journal_entry, id=journal_entry_id)
            plate = journal.plates.get(id=plate_id)
            ingredient = plate.ingredients.get(id=ingredient_id)
            ingredient.amount_consumed = request.data['amount']
            ingredient.save()
            return Response(status=HTTP_204_NO_CONTENT)
        # except:
        #     return Response(status=HTTP_400_BAD_REQUEST)

    def delete(self,request,journal_entry_id,plate_id,ingredient_id):
        try:
            journal = get_object_or_404(Journal_entry, id=journal_entry_id)
            plate = journal.plates.get(id=plate_id)
            ingredient = plate.ingredients.get(id=ingredient_id)
            ingredient.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except:
            return Response(status=HTTP_404_NOT_FOUND)

