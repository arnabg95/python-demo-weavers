from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from django.urls import path
from . import views


app_name = "api"

urlpatterns = [
    path("register/",views.Register.as_view(),name="register"),
    path("login/",TokenObtainPairView.as_view(),name="login"),
    path("update/",views.Update.as_view(),name="update"),
    path("reset-email/",views.ResetPwdEmailOTP.as_view(),name="resetemail"),
    path("reset-otp/",views.ResetPwdOTPMatch.as_view(),name="resetotp"),
    path("refresh/",TokenRefreshView.as_view(),name="refresh"),
    path("verify/",TokenVerifyView.as_view(),name="verify"),
]
