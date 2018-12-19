# Generated by Django 2.1.2 on 2018-12-18 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('performance', '0002_auto_20181211_1152'),
    ]

    operations = [
        migrations.AddField(
            model_name='performance',
            name='second_sum',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10, verbose_name='二次评价总分'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='performance',
            name='sum',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='自评总分'),
            preserve_default=False,
        ),
    ]
