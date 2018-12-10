# -*- coding: utf-8 -*-
'''
Created On 18-11-13 下午3:06
    @Author  : WangBo
    @File    : serializers.py
    @Software: PyCharm
    @Tag     : 
'''

from rest_framework import serializers
from .models import Department

class DepartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'



