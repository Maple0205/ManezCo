# Generated by Django 4.2.6 on 2023-10-18 06:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quiz', '0002_quiz_attempts_quiz_correct_quiz_incorrect'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizAttempt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='create_time')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='update_time')),
                ('is_delete', models.BooleanField(default=False, verbose_name='is_delete')),
                ('attempt', models.CharField(max_length=10, verbose_name='attempt')),
                ('result', models.BooleanField(verbose_name='result')),
                ('mark', models.IntegerField(verbose_name='mark')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz.quiz')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'quiz_attempt',
                'db_table': 'quiz_attempt',
            },
        ),
    ]
