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
from para.models import Para

class DepartSerializer(serializers.ModelSerializer):
    level = serializers.CharField(required=False, write_only=True, max_length=4)
    lev = ""
    class Meta:
        model = Department
        fields = ('id','depart_name','parent','add_time','level')

    def validate_level(self,level):
        try:
            self.lev = level
        except:
            pass


    def validate(self, attrs):
        try:
            del attrs['level']
        except:
            pass
        return attrs

    def create(self, validated_data):
        depart = Department.objects.create(**validated_data)
        depart.save()
        para_data = {}
        para_data['depart_id'] = depart.id
        para_data['level'] = int(self.lev) + 1
        para = Para.objects.create(**para_data)
        para.save()
        para2_data = {}
        para2_data['depart_id'] = depart.id
        para2_data['level'] = int(self.lev) + 2
        para2 = Para.objects.create(**para2_data)
        para2.save()
        return depart



