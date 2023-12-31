# Generated by Django 4.2.6 on 2023-10-18 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='attempts',
            field=models.IntegerField(default=0, verbose_name='attempts'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='correct',
            field=models.IntegerField(default=0, verbose_name='correct'),
        ),
        migrations.AddField(
            model_name='quiz',
            name='incorrect',
            field=models.IntegerField(default=0, verbose_name='incorrect'),
        ),
    ]
