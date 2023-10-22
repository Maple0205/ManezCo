import os
import re
from django.shortcuts import render
from rest_framework import status, mixins
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from djangoProject2.settings import MEDIA_ROOT
from users.models import User
from rest_framework.viewsets import GenericViewSet

from .permissions import UserPermission
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

from common.serializers import CustomResponse


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        password_confirmation = request.data.get('password_confirmation')
        str = r'^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}$'
        if not all([username,password,email,password_confirmation]):
            return Response({'error': "All parameters cannot be empty!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if User.objects.filter(username=username).exists():
            return Response({'error': "Username has been registered!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if User.objects.filter(email=email).exists():
            return Response({'error': "Email has been registered!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not re.match(str, email):
            return Response({'error': "Invalid email address!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if not (6 < len(password) < 18):
            return Response({'error': "The length of password is not between 6 and 18!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if password != password_confirmation:
            return Response({'error': "Passwords are not match!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        obj = User.objects.create_user(username=username, email=email, password=password)
        res = {
            "username":username,
            'id':obj.id,
            'email':obj.email,
        }
        data = CustomResponse.success(data=res)
        return Response(data)

# Create your views here.
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        result = serializer.validated_data
        result['id'] = serializer.user.id
        result['mobile'] = serializer.user.mobile
        result['email'] = serializer.user.email
        result['username'] = serializer.user.username
        result['token'] = result.pop('access')
        data = CustomResponse.success(data=result)
        return Response(data)

class UserView(GenericViewSet, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, UserPermission]

    def upload_avatar(self, request, *args, **kwargs):
        avatar = request.data.get('avatar')
        if not avatar:
            return Response({'error': "Upload failed, file cannot be empty!"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        if avatar.size > 1024*300:
            return Response({'error': "Upload failed, file cannot be large than 300kb"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        user = self.get_object()
        avatar.name = f"user_{user.id}_avatar.jpg"
        for file in os.listdir(MEDIA_ROOT):
            if file == avatar.name:
                file_path = os.path.join(MEDIA_ROOT,file)
                os.remove(file_path)
        ser = self.get_serializer(user, data={"avatar": avatar}, partial = True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response({'url': ser.data['avatar']})