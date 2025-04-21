from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Token


class BearerTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None  # não tenta autenticar

        token_value = auth_header.split(' ')[1]

        try:
            token = Token.objects.get(token=token_value)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')

        return (token.user, None)