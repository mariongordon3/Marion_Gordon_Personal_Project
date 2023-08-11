from rest_framework import serializers
from .models import Journal_entry

class JournalEntrySerializer(serializers.ModelSerializer):
    class meta:
        model = Journal_entry
        fields = ['plate_id','created_at']