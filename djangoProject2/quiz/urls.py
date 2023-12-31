"""
URL configuration for djangoProject2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from quiz import views

urlpatterns = [
    path('', views.QuizView.as_view({'post': 'create', 'get': 'list'})),

    path('<int:pk>', views.QuizView.as_view({'delete': 'destroy', 'get': 'retrieve'})),
    path('attempt', views.QuizAttemptView.as_view({'post': 'create', 'get': 'list'})),
    path('<str:lesson>', views.QuizView.as_view({'get': 'get_quiz_list_by_lesson'})),
    path('attempt_by_user/', views.QuizAttemptView.as_view({'get': 'get_attempts_by_user'})),
    path('attempts_quizzes_lesson/', views.QuizAttemptView.as_view({'post': 'attempts_quizzes_lesson'})),
]
