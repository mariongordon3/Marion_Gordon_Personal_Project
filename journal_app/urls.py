from rest_framework.views import APIView
from django.urls import path
from .views import All_journals,A_plate,A_journal,An_ingredient
urlpatterns=[
    path('',All_journals.as_view(),name="all_journals"),
    path('<int:journal_entry_id>/',A_journal.as_view(),name="a_journal"),
    path('<int:journal_entry_id>/plate/<int:plate_id>/',A_plate.as_view(),name="a_plate"),
    path('<int:journal_entry_id>/plate/<int:plate_id>/ingredient/<int:ingredient_id>',An_ingredient.as_view(),name='an_ingredient')
]