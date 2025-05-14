# api/utils/token_generator.py

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

email_verification_token = PasswordResetTokenGenerator()

def send_verification_email(user):
    token = email_verification_token.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verification_link = f"http://127.0.0.1:8000/api/verify-email/{uid}/{token}/"

    subject = "Verify your email"
    message = f"Click the link to verify your email: {verification_link}"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)
