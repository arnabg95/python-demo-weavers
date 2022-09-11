import email
from rest_framework import (generics,permissions)
from rest_framework_simplejwt import authentication
from . import serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


class Register(generics.CreateAPIView):
    serializer_class = serializer.UserSerializer

class Update(generics.RetrieveUpdateAPIView):
    serializer_class = serializer.UserSerializer
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ResetPwdEmailOTP(APIView):
    """Reset Password Using Email"""
    serializer_class = serializer.EmailVerifySerializer
    
    def post(self,req,format=None):
        serial_data = self.serializer_class(data=req.data)
        if serial_data.is_valid():
            return Response(status=status.HTTP_200_OK)
        return Response(data=serial_data.errors)

class ResetPwdOTPMatch(APIView):
    """Reset Password Match New Otp"""
    serializer_class = serializer.OtpSerializer
    
    def post(self,req,format=None):
        serial_data = self.serializer_class(data=req.data)
        if serial_data.is_valid(raise_exception=True):
            try:
                user = serial_data.validated_data.get('user')
                token = RefreshToken.for_user(user)
            except Exception as e:
                print(e)
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_200_OK,data={"access":str(token.access_token)})
        return Response(data=serial_data.errors)


