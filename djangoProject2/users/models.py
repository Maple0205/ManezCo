from django.db import models
from common.db import BaseModel
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser,BaseModel):
    mobile = models.CharField(verbose_name="mobile", default='', max_length=10)
    avatar = models.ImageField(verbose_name='avatar', blank=True, null=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'users'

