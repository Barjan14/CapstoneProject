from rest_framework import serializers
from .models import MotionEvent

class MotionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MotionEvent
        fields = ['timestamp', 'motion']
