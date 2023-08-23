from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.EmailField(null=False,blank=False,max_length=255,unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []