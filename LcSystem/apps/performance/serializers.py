# -*- coding: utf-8 -*-
'''
Created On 18-11-13 下午3:07
    @Author  : WangBo
    @File    : serializers.py
    @Software: PyCharm
    @Tag     : 
'''

from rest_framework import serializers
from .models import Performance
from users.serializers import UserDetailSerializer

class PerformanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Performance
        fields = '__all__'



class PfListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    class Meta:
        model = Performance
        fields = '__all__'


