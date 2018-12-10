from .models import UserProfile
from depart.models import Department
from .serializers import UserSerializer,CurrentUserSerializer
from rest_framework import viewsets,filters,mixins
from django_filters.rest_framework import DjangoFilterBackend
from .filters import UserFilter
from rest_framework.authentication import TokenAuthentication

# Create your views here.



class CurrentUserViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    '''
    人员操作
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

class UserViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer

