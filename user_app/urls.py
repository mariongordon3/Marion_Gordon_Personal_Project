from django.urls import path
from.views import Sign_up,Log_in,Log_out

urlpatterns = [
    path('signup/',Sign_up.as_view(),name='sign_up'),
    path('login/',Log_in.as_view(),name='log_in'),
    path('logout/',Log_out.as_view(),name='logout')
]

