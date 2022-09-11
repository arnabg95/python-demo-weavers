from dataclasses import fields
from . import models
from django.contrib.auth import get_user_model
from rest_framework import serializers
from random import randint
from django.core.mail import send_mail
from collections import OrderedDict


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class EmailVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def __random(self,n):
        range_start = 10**(n-1)
        range_end = (10**n)-1
        return randint(range_start, range_end)


    def __saveOtp(self,pk):
        try:
            code = self.__random(6)
            models.OTP.objects.create(otp=code, user=pk)
        except Exception as e:
            return None
        else:
            return code

    def validate(self, validated_data):
        email = validated_data.get('email')
        if get_user_model().objects.filter(email=email).exists():
            user = get_user_model().objects.get(email=email)
            pk = user.pk
            updateOtp = self.__saveOtp(pk=pk)
            if updateOtp is not None:
                try:
                    send_mail(
                        'Reset Password OTP',
                        f'Here is the message.{updateOtp}',
                        'arnabgupta84@gmail.com',
                        [email],
                        fail_silently=False,
                    )
                except Exception as e:
                    raise serializers.ValidationError('Unable To Send Mail')
                else:
                    return validated_data
            raise serializers.ValidationError('Unable To Generate OTP')
        raise serializers.ValidationError('You Are Not Registered!')


class OtpSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=255)
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['otp','email']

    def validate(self, validated_data):
        email = validated_data.get('email')
        otp = validated_data.get('otp')
        if get_user_model().objects.filter(email=email).exists():
            user = get_user_model().objects.get(email=email)
            pk = user.pk
            otpinDb = models.OTP.objects.filter(user=pk).filter(status='created').order_by('-id').first() #returns None if not found
            if otpinDb is None:
                raise serializers.ValidationError('Could Not Find OTP')
            if str(otp) == str(otpinDb):
                #200 ok 
                otpinDb.status = 'expired'
                otpinDb.save()
            validated_data.update({'user':user})
            return validated_data
        raise serializers.ValidationError('You Are Not Registered!')