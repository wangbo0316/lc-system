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
from django.contrib.auth.models import  Group


class UserDetailSerializer(serializers.ModelSerializer):
    depart = DepartSerializer()
    class Meta:
        model = UserProfile
        fields = ('id','username','name','level','depart','is_superuser')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id','username','name','level','depart','is_superuser')


    def create(self, validated_data):
        user = UserProfile.objects.create(**validated_data)
        user.set_password('88888888')
        user.save()
        group = Group.objects.get(name='普通用户')
        group.user_set.set([user])
        return user


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id','username','name','level','depart','is_superuser')