# Generated by Django 2.1.2 on 2018-11-19 15:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('depart', '0002_department_add_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_cat', to='depart.Department', verbose_name='父级部门'),
        ),
    ]