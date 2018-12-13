# -*- coding: utf-8 -*-
'''
Created On 18-11-13 下午3:06
    @Author  : WangBo
    @File    : serializers.py
    @Software: PyCharm
    @Tag     : 
'''

from rest_framework import serializers
from .models import Para
from depart.serializers import DepartSerializer


class ParaSerializer(serializers.ModelSerializer):
    depart = DepartSerializer()
    class Meta:
        model = Para
        fields = '__all__'