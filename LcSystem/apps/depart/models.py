from django.db import models
import datetime
# Create your models here.


class Department(models.Model):
    depart_name = models.CharField(verbose_name='部门名称',max_length=30)
    parent = models.ForeignKey('self',null=True,blank=True,verbose_name='父级部门',
                               on_delete=models.CASCADE,related_name='sub')
    add_time = models.DateTimeField(verbose_name='添加时间', auto_now=True)


    class Meta:
        verbose_name = '部门'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.depart_name