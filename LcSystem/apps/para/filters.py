# -*- coding: utf-8 -*-
'''
Created On 18-11-19 下午2:33
    @Author  : WangBo
    @File    : filters.py
    @Software: PyCharm
    @Tag     : 
'''

from .models import Para
import django_filters

class ParaFilter(django_filters.rest_framework.FilterSet):
    '''
    参数过滤类
    '''
    class Meta:
        model = Para
        fields = ['depart','level']
