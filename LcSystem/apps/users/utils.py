# -*- coding: utf-8 -*-
# @Time    : 18-12-6 下午2:04
# @Author  : WangBo
# @File    : utils.py
# @Software: PyCharm

def jwt_response_payload_handler(token, user=None, request=None):
    """为返回的结果添加用户相关信息"""
    currentAuthority = ''
    if user.is_superuser :
        currentAuthority = 'admin'
    else:
        currentAuthority = 'user'

    return {
        'token': token,
        'status':'ok',
        'currentAuthority': currentAuthority,
        'type':'account',
    }
