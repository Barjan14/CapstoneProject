from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from api.utils.token_generator import email_verification_token


def send_verification_email(user, request):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = email_verification_token.make_token(user)
    current_site = get_current_site(request)
    verification_link = f"http://{current_site.domain}/verify-email/{uid}/{token}/"

    subject = 'Verify your email'
    message = f'Click the link to verify your email: {verification_link}'

    send_mail(
        subject,
        message,
        'yourgmail@gmail.com',  # From email
        [user.email],
        fail_silently=False,
    )
