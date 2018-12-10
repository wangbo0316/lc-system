# -*- coding: utf-8 -*-
'''
Created On 18-11-9 下午10:33
    @Author  : WangBo
    @File    : urls.py
    @Software: PyCharm
    @Tag     : 
'''

from django.urls import path

from .views import DepartView

app_name = 'users'

urlpatterns = [
    path('getDepart/',DepartView.post,name='users')
]