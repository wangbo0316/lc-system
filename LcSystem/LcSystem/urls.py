"""LcSystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import path,include,re_path
from django.views.static import serve
from .settings import MEDIA_ROOT
from rest_framework.routers import DefaultRouter
from performance.views import PerformanceViewSet,PfListViewSet,PfUpdateViewSet,UploadPf
from rest_framework.authtoken import views
from rest_framework_jwt.views import obtain_jwt_token
from users.views import UserViewSet,CurrentUserViewSet,validateUsername,FixPwdViewSet
from depart.views import DepartViewSet,DepartParaViewSet
from para.views import ParaViewSet,UpdateParaViewSet,CurrtentParaViewSet,OneParaViewSet


router = DefaultRouter()
router.register(r'user', UserViewSet)                   # ? user_id & search
router.register(r'depart', DepartViewSet)               # ? user_id & search
router.register(r'para', ParaViewSet)           # ? user_id & search
router.register(r'performance', PerformanceViewSet)     # ? user & search
router.register(r'getTranList', PfListViewSet)               # ? user_id & search
router.register(r'currentUser', CurrentUserViewSet)
router.register(r'departPara', DepartParaViewSet)
router.register(r'updatePara', UpdateParaViewSet)
router.register(r'getCurrPara', CurrtentParaViewSet)
router.register(r'updatePF', PfUpdateViewSet)
router.register(r'onePara', OneParaViewSet)
router.register(r'fixPwd', FixPwdViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('valiUser/',validateUsername),
    path('uploadPf/',UploadPf),
    re_path(r'media/(?P<path>.*)$',serve,{'document_root':MEDIA_ROOT}),
    path('', include(router.urls)),
    re_path(r'^api-auth/', include('rest_framework.urls')),
    re_path(r'^api-token-auth/', views.obtain_auth_token),
    re_path(r'^jwt_auth/', obtain_jwt_token),
]
