# Generated by Django 2.1.2 on 2018-11-19 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20181113_1449'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='level',
            field=models.IntegerField(default=0, verbose_name='权限等级'),
        ),
    ]
