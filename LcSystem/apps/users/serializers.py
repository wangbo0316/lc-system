# -*- coding: utf-8 -*-
'''
Created On 18-11-9 下午10:40
    @Author  : WangBo
    @File    : serializers.py
    @Software: PyCharm
    @Tag     : 
'''
from rest_framework import serializers
from .models import UserProfile
from depart.serializers import DepartSerializer
from rest_framework.authtoken.models import Token



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id','username','name','level','depart','password','is_superuser')


    def create(self, validated_data):
        pwd = validated_data['password']
        user = UserProfile.objects.create(**validated_data)
        user.set_password(pwd)
        user.save()
        return user


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id','username','name','level','depart','is_superuser')