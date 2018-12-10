# -*- coding: utf-8 -*-
'''
Created On 18-11-19 下午2:29
    @Author  : WangBo
    @File    : filters.py
    @Software: PyCharm
    @Tag     : 
'''

import django_filters
from .models import Performance

class PerformanceFilter(django_filters.rest_framework.FilterSet):
    '''
    绩效表过滤类
    '''

    class Meta:
        model = Performance
        fields = ['user']