from .models import UserProfile
from depart.models import Department
from .serializers import UserSerializer,CurrentUserSerializer,FixPwdSerializer
from rest_framework import viewsets,mixins,status
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.pagination import PageNumberPagination


# Create your views here.

class UserPagination(PageNumberPagination):
    page_size = 10

class CurrentUserViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    '''
    获取当前用户
    '''
    queryset = UserProfile.objects.all()
    serializer_class = CurrentUserSerializer
    # authentication_classes = (TokenAuthentication,)
    # filter_backends = (DjangoFilterBackend,filters.SearchFilter)
    # filter_class = UserFilter
    # search_fields = ('username', 'email')
    def get_queryset(self):
        user_id = self.request.user.id
        self.queryset = UserProfile.objects.filter(id=user_id)
        return self.queryset

class UserViewSet(mixins.CreateModelMixin,mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserPagination
    def get_queryset(self):
        user = self.request.user
        parent_depart = Department.objects.get(id = user.depart_id)
        children_depart = parent_depart.sub.all()
        children_depart_ids = [i.id for i in children_depart]
        children_depart_ids.append(user.depart_id)
        results = UserProfile.objects.filter(depart_id__in = children_depart_ids, level = (user.level+1))
        self.queryset = results.order_by('-add_time')
        return self.queryset

    def create(self, request, *args, **kwargs):
        user = self.request.user
        request.data['level'] = user.level + 1
        if int(request.data['depart']) == user.depart_id:
            request.data['is_superuser'] = 0
        print(request.data['depart'],user.depart_id, request.data['is_superuser'])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        re_dict = serializer.data
        headers = self.get_success_headers(serializer.data)
        return Response(re_dict, status=status.HTTP_201_CREATED, headers=headers)

def validateUsername(req):
    username = req.GET['username']
    try:
        user_id = req.GET['user_id']
        user = UserProfile.objects.get(id = user_id)
        if user.username == username:
            return HttpResponse('OK')
        else:
            try:
                user = UserProfile.objects.get(username = username)
                return HttpResponse('NO')
            except:
                return HttpResponse('OK')
    except:
        try:
            user = UserProfile.objects.get(username=username)
            return HttpResponse('NO')
        except:
            return HttpResponse('OK')

class FixPwdViewSet(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.CreateModelMixin):
    serializer_class = FixPwdSerializer
    queryset = UserProfile.objects.all()

    def get_queryset(self):
        user = self.request.user
        old_pwd = self.request.query_params.get("pwd",0)
        print(UserProfile.objects.get(id = user.id).check_password(old_pwd))
        if UserProfile.objects.get(id = user.id).check_password(old_pwd):
            return UserProfile.objects.filter(id = user.id)
        else:
            return UserProfile.objects.filter(id = 0)

    def create(self, request, *args, **kwargs):
        old_pwd = request.data['oldPwd']
        new_pwd = request.data['newPwd']
        user = UserProfile.objects.get(id = self.request.user.id)
        if user.check_password(old_pwd):
            user.set_password(new_pwd)
            user.save()
            return Response({"status": "OK"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "Fails"}, status=status.HTTP_201_CREATED)
