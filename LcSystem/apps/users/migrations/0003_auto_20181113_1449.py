# Generated by Django 2.1.2 on 2018-11-13 14:49

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('depart', '0002_department_add_time'),
        ('users', '0002_auto_20181108_0838'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='access_level',
            new_name='level',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='department',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='add_time',
            field=models.DateField(default=datetime.datetime.now, verbose_name='添加时间'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='depart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='depart.Department', verbose_name='部门'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='isManage',
            field=models.IntegerField(default=0, verbose_name='是否管理者'),
            preserve_default=False,
        ),
    ]
