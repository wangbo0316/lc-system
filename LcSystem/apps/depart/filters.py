# -*- coding: utf-8 -*-
'''
Created On 18-11-19 下午2:10
    @Author  : WangBo
    @File    : filters.py
    @Software: PyCharm
    @Tag     : 
'''

import django_filters
from .models import Department

class DepartFilter(django_filters.rest_framework.FilterSet):
    '''
    部门过滤类
    '''

    class Meta:
        model = Department
        fields = ['id']