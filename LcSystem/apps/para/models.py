from django.db import models
from datetime import datetime
from depart.models import Department


# Create your models here.
class Para(models.Model):
    depart = models.ForeignKey(Department,verbose_name='部门',null=True,blank=True,on_delete=models.CASCADE)
    level = models.IntegerField(verbose_name='等级')
    content_json = models.TextField(verbose_name='参数表')
    add_time = models.DateField(verbose_name='添加时间', default=datetime.now)

    class Meta:
        verbose_name = '参数表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.depart.depart_name + str(self.level)


