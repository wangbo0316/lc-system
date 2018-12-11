from django.db import models
from django.contrib.auth.models import AbstractUser
from depart.models import Department
from datetime import  datetime
# Create your models here.

class UserProfile(AbstractUser):
    '''
    用户
    '''
    name = models.CharField(verbose_name='姓名',max_length=30)
    level = models.IntegerField(verbose_name='权限等级',default=0)
    depart = models.ForeignKey(Department,verbose_name='部门',null=True,blank=True,on_delete=models.CASCADE)
    add_time = models.DateTimeField(verbose_name='添加时间', auto_now=True)

    class Meta:
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name