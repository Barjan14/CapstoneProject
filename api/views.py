from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import MotionEvent
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from .utils.token_generator import email_verification_token

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("DEBUG REGISTER DATA:", request.data)
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        if username and password and email:
            # Create user with `is_active=False` to prevent login before activation
            user = User.objects.create_user(username=username, password=password, email=email, is_active=False)

            # Generate activation token and uid
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            # Create activation link
            activation_link = f"http://localhost:8000/api/activate/{uid}/{token}/"

            # Send the email with the activation link
            send_mail(
                'Activate Your Account',
                f'Hi {user.username}, please click the link to verify your account: {activation_link}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return Response({"message": "User created. Check your email to activate your account."}, status=status.HTTP_201_CREATED)

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
        return Response([{"timestamp": event.timestamp, "detected": event.detected} for event in events])


class MotionEventView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = [
            {"timestamp": "2025-05-11T10:00:00Z", "motion": True},
            {"timestamp": "2025-05-11T10:05:00Z", "motion": False},
        ]
        return Response(data)


class ActivateAccountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            # Decode user ID from the URL
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Check if the token is valid
        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({"message": "Account activated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Activation link is invalid"}, status=status.HTTP_400_BAD_REQUEST)
