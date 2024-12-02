from django.db import models
import datetime


class Todo(models.Model):
    datetime.date(2024, 11, 1)
    text = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    date = models.DateField()

    def __str__(self):
        return self.text