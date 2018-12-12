from .models import UserProfile
from depart.models import Department
from .serializers import UserSerializer,CurrentUserSerializer
from rest_framework import viewsets,mixins,status
from rest_framework.response import Response
from django.http import HttpResponse


# Create your views here.



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
    def get_queryset(self):
        user = self.request.user
        parent_depart = Department.objects.get(id = user.depart_id)
        children_depart = parent_depart.sub.all()
        children_depart_ids = [i.id for i in children_depart]
        results = UserProfile.objects.filter(depart_id__in = children_depart_ids, level = (user.level+1))
        self.queryset = results.order_by('-add_time')
        return self.queryset

    def create(self, request, *args, **kwargs):
        user = self.request.user
        request.data['level'] = user.level + 1
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
