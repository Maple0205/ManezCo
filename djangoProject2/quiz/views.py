import random

from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, get_object_or_404

from rest_framework import mixins, status, viewsets, pagination
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from quiz.models import Quiz,QuizAttempt
from quiz.serializers import QuizSerializer,QuizAttemptSerializer

from users.permissions import UserPermission

class NoPagination(pagination.PageNumberPagination):
    page_size = None

    def get_paginated_response(self, data):
        return Response(data)

class OnePagination(pagination.PageNumberPagination):
    page_size = 1

    def get_paginated_response(self, data):
        return Response(data)

# Create your views here.
class QuizView(GenericViewSet,
               mixins.ListModelMixin,
               mixins.CreateModelMixin,
               mixins.DestroyModelMixin,
               mixins.UpdateModelMixin,
               mixins.RetrieveModelMixin):
    permission_classes = [IsAuthenticated]
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    pagination_class = pagination.PageNumberPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_quiz_list_by_lesson(self, request, *args, **kwargs):
        lesson = self.kwargs['lesson']
        quizzes = Quiz.objects.filter(lesson=lesson)
        random_quizzes = random.sample(list(quizzes), 5)
        paginator = PageNumberPagination()
        result_page = paginator.paginate_queryset(random_quizzes, request)
        serializer = QuizSerializer(result_page, many=True)

        return Response({'results': serializer.data}, status=status.HTTP_200_OK)


class QuizAttemptView(GenericViewSet,APIView,
                      mixins.CreateModelMixin,
                      mixins.ListModelMixin):
    permission_classes = [IsAuthenticated]
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    pagination_class = NoPagination

    def create(self, request, *args, **kwargs):
        user = request.user
        quiz = request.data.get('quiz')
        answer = request.data.get('attempt')

        try:
            quiz_obj = Quiz.objects.get(id=quiz)

            result = answer == quiz_obj.answer
            mark = 0
            if result:
                quiz_obj.correct += 1
                mark = quiz_obj.score
            else:
                quiz_obj.incorrect += 1
            quiz_obj.attempts += 1
            quiz_obj.save()

            attempt = QuizAttempt.objects.create(
                user=user,
                quiz=quiz_obj,
                attempt=answer,
                result=result,
                mark=mark
            )

            serializer = QuizAttemptSerializer(attempt)  # Serialize the attempt object
            return Response({'result': serializer.data}, status=status.HTTP_201_CREATED)

        except ObjectDoesNotExist:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

    def get_attempts_by_user(self, request, *args, **kwargs):
        user = request.user
        try:
            quiz_objs = QuizAttempt.objects.filter(user=user)
            print(quiz_objs)
            serializer = QuizAttemptSerializer(quiz_objs, many=True)
            return Response({'results': serializer.data}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

    def attempts_quizzes_lesson(self, request, *args, **kwargs):
        user = request.user
        quizzes = request.data.get('quizzes')
        correct = 0
        mark = 0
        print(quizzes)
        for quiz,attempt in quizzes.items():
            temp_mark = 0
            try:
                quiz = Quiz.objects.get(id=quiz)
                quiz.attempts += 1
                result = quiz.answer == attempt
                if result:
                    temp_mark = quiz.score
                    mark += temp_mark
                    correct += 1
                    quiz.correct += 1
                else:
                    quiz.incorrect += 1
                quiz.save()
                QuizAttempt.objects.create(
                    user=user,
                    quiz=quiz,
                    attempt=attempt,
                    result=result,
                    mark=temp_mark
                )

            except ObjectDoesNotExist:
                return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        res = {'user':user.id, 'correct':correct, 'mark':mark}
        return Response({'results': res}, status=status.HTTP_200_OK)

