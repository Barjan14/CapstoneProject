from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import MotionEvent
User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("DEBUG REGISTER DATA:", request.data)
        username = request.data.get("username")
        password = request.data.get("password")
        if username and password:
            user = User.objects.create_user(username=username, password=password)
            return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)



class SensorDataView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        motion = request.data.get("motion")
        if motion:
            MotionEvent.objects.create(user=request.user, detected=True)
            return Response({"message": "Motion recorded"})
        return Response({"error": "No motion detected"}, status=400)

    def get(self, request):
        events = MotionEvent.objects.filter(user=request.user).order_by('-timestamp')
        return Response([
            {"timestamp": event.timestamp, "detected": event.detected}
            for event in events
        ])
    
    class MotionEventView(APIView):
      permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch motion events for the logged-in user
        events = MotionEvent.objects.filter(user=request.user)
        motion_data = [
            {"id": event.id, "timestamp": event.timestamp, "detected": event.detected}
            for event in events
        ]
        return Response(motion_data, status=status.HTTP_200_OK) 