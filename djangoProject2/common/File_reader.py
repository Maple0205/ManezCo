import os.path


from django.http import FileResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoProject2.settings import MEDIA_ROOT


class FileView(APIView):
    def get(self,requests, name):
        path = MEDIA_ROOT / name
        if os.path.isfile(path):
            return FileResponse(open(path, 'rb'))
        return Response({'error': "File doesn't exist!"}, status=status.HTTP_404_NOT_FOUND)