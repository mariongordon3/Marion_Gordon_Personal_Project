from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(null=False,blank=False,max_length=255,unique=True)
    USERNAME_FIELD = 'email'
    weight = models.PositiveIntegerField(null=False,default=150)
    REQUIRED_FIELDS = []