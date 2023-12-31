# Generated by Django 4.2.6 on 2023-10-18 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='create_time')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='update_time')),
                ('is_delete', models.BooleanField(default=False, verbose_name='is_delete')),
                ('score', models.IntegerField(default=0, verbose_name='score')),
                ('type', models.IntegerField(default=0, verbose_name='type')),
                ('SelectA', models.CharField(max_length=100, verbose_name='select_a')),
                ('SelectB', models.CharField(max_length=100, verbose_name='select_b')),
                ('SelectC', models.CharField(max_length=100, verbose_name='select_c')),
                ('SelectD', models.CharField(max_length=100, verbose_name='select_d')),
                ('description', models.CharField(max_length=500, verbose_name='description')),
                ('answer', models.CharField(max_length=10, verbose_name='answer')),
            ],
            options={
                'verbose_name': 'quiz',
                'db_table': 'quiz',
            },
        ),
    ]
