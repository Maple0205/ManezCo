from django.db import models
from common.db import BaseModel
from users.models import User
# Create your models here.
class Quiz(BaseModel):
    score = models.IntegerField(verbose_name="score", default=0)
    type = models.IntegerField(verbose_name="type", default=0)
    SelectA = models.CharField(verbose_name='select_a', max_length=100)
    SelectB = models.CharField(verbose_name='select_b', max_length=100)
    SelectC = models.CharField(verbose_name='select_c', max_length=100)
    SelectD = models.CharField(verbose_name='select_d', max_length=100)
    description = models.CharField(verbose_name='description', max_length=500)
    answer = models.CharField(verbose_name='answer', max_length=10)
    attempts = models.IntegerField(verbose_name='attempts', default=0)
    correct = models.IntegerField(verbose_name='correct', default=0)
    incorrect = models.IntegerField(verbose_name='incorrect', default=0)
    lesson = models.CharField(verbose_name='lesson', max_length=20)
    class Meta:
        db_table = 'quiz'
        verbose_name = 'quiz'

class QuizAttempt(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    attempt = models.CharField(verbose_name='attempt', max_length=10)
    result = models.BooleanField(verbose_name='result')
    quiz = models.ForeignKey('Quiz', on_delete=models.CASCADE)
    mark = models.IntegerField('mark')
    class Meta:
        db_table = 'quiz_attempt'
        verbose_name = 'quiz_attempt'