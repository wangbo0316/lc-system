from django.db import models
from datetime import datetime
from users.models import UserProfile
# Create your models here.


class Performance(models.Model):
    pf_name = models.CharField(verbose_name='绩效名称',max_length=50)
    user = models.ForeignKey(UserProfile,verbose_name='用户',null=True,blank=True,on_delete=models.CASCADE)
    self_evaluat = models.TextField(verbose_name='自评得分')
    second_evaluat = models.TextField(verbose_name='二次评价得分')
    status = models.IntegerField(verbose_name='审批进度')
    add_time = models.DateTimeField(verbose_name='添加时间', auto_now=True)

    class Meta:
        verbose_name = '绩效考核表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.pf_name