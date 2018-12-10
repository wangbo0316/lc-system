# -*- coding: utf-8 -*-
'''
Created On 18-11-12 下午4:42
    @Author  : WangBo
    @File    : filters.py
    @Software: PyCharm
    @Tag     : 
'''

import django_filters
from .models import UserProfile

class UserFilter(django_filters.rest_framework.FilterSet):
    '''
    用户过滤类
    '''

    class Meta:
        model = UserProfile
        fields = ['username','id','depart']