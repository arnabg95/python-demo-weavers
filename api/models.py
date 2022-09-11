from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)



class UserManager(BaseUserManager):
    def create_user(self,email,password,**extra_fields):
        if not email:
            raise ValueError('Email Is Required')
        
        if not password:
            raise ValueError("Password Is Required")

        user = self.model(email=self.normalize_email(email),**extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user


    def create_superuser(self,email,password,**extra_fields):
        user = self.create_user(email,password,**extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser,PermissionsMixin):
    email           =   models.EmailField(max_length=255,unique=True)
    first_name      =   models.CharField(max_length=255)
    last_name       =   models.CharField(max_length=255)
    is_active       =   models.BooleanField(default=True)
    is_staff        =   models.BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS     =   ['first_name','last_name']
    USERNAME_FIELD      =   'email'

    def __str__(self) -> str:
        return self.email

STATUS_CHOICES = (
    ("created", "Created"),
    ("expired", "Expired"),
)

class OTP(models.Model):
    otp = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    status = models.CharField(choices=STATUS_CHOICES,max_length=10,default='created')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self) -> str:
        return self.otp