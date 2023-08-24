from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from .models import User
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK,HTTP_204_NO_CONTENT,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_201_CREATED
# Create your views here.

# use cookies, grab user through cookies
class Sign_up(APIView):
    def post(self,request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            username = email
            new_user = User.objects.create_user(username=username,password=password,email=email)
            token = Token.objects.create(user=new_user)
            # change when making front end
            return Response({'user':new_user.email,'token':token.key},status=HTTP_201_CREATED)
        except:
            return Response({'detail':'invalid credentials'},status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    def post(self,request):
        try:
            username = request.data.get('email')
            password = request.data.get('password')
            user = authenticate(username=username,password=password)
            if user:
                token, created = Token.objects.get_or_create(user = user)
                return Response({'user':token.user.username,'token':token.key}, status=HTTP_200_OK)
            else:
                return Response({'detail':'invalid credentials'},status=HTTP_400_BAD_REQUEST)
        except: 
            return Response(status=HTTP_400_BAD_REQUEST)
        
class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
        
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            return Response(request.user.email, status=HTTP_200_OK)
        except:
            return Response(status=HTTP_404_NOT_FOUND)