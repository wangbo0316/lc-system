# Generated by Django 2.1.2 on 2018-11-08 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='access_level',
            field=models.IntegerField(verbose_name='权限等级'),
        ),
    ]