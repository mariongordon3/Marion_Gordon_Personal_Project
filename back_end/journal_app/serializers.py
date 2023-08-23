from rest_framework import serializers
from .models import Journal_entry

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal_entry
        fields = ['id','created_at']