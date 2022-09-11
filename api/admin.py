from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from api import models
from django.utils.translation import gettext_lazy as _

class UserAdmin(BaseUserAdmin):
    ordering        =   ['id']
    list_display    =   ['email','first_name','last_name']
    fieldsets       =   (
        (None,{'fields':('email','first_name','last_name','password')}),
        (
            _('Permissions'),
            {
                'fields':(
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'),{'fields':('last_login',)}),
    )
    readonly_fields = ['last_login',]
    add_fieldsets     = ((None,{
        'classes':('wide',),
        'fields':(
            'email',
            'password1',
            'password2',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'is_superuser',
        )
    }),
    )


admin.site.register(models.User,UserAdmin)