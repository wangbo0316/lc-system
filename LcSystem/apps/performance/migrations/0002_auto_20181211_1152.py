# Generated by Django 2.1.2 on 2018-12-11 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('performance', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='performance',
            name='add_time',
            field=models.DateTimeField(auto_now=True, verbose_name='添加时间'),
        ),
    ]
