# Generated by Django 4.1.1 on 2022-09-10 15:27

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='otp',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]