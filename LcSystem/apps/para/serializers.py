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
    class Meta:
        model = Para
        fields = '__all__'

    def create(self, validated_data):
        try:
            old_para = Para.objects.filter(depart_id=validated_data['depart'],level=validated_data['level'])
            for i in old_para:
                i.delete()
        except:
            pass
        new_para = Para.objects.create(**validated_data)
        new_para.save()
        return new_para

class ParaListSerializer(serializers.ModelSerializer):
    depart = DepartSerializer()
    class Meta:
        model = Para
        fields = '__all__'