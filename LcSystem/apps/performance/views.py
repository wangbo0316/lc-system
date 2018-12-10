from .models import Performance
from .serializers import PerformanceSerializer,PfListSerializer
from rest_framework import viewsets,filters,mixins
from django_filters.rest_framework import DjangoFilterBackend
from .filters import PerformanceFilter
from users.models import UserProfile
from depart.models import Department

# Create your views here.

class PerformanceViewSet(viewsets.ModelViewSet):
    '''
    绩效操作
    '''
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer
    filter_backends = (DjangoFilterBackend,filters.SearchFilter)
    filter_class = PerformanceFilter
    search_fields = (['pf_name'])

class PfListViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    '''
    绩效列表
    '''
    children_depart_ids = []
    queryset = Performance.objects.all()
    serializer_class = PfListSerializer
    # filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    # filter_class = PerformanceFilter
    # search_fields = (['pf_name'])

    def get_children_depart(self,parent_depart_id):
        parent_depart = Department.objects.get(id = parent_depart_id)
        children_depart = parent_depart.sub.all()
        for i in children_depart:
            self.children_depart_ids.append(i.id)
            self.get_children_depart(i.id)

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id',0)
        search = self.request.query_params.get('search',0)
        user = UserProfile.objects.get(id=user_id)
        self.get_children_depart(user.depart_id)
        results = Performance.objects.filter(user__depart_id__in=self.children_depart_ids,user__level__gt=user.level)
        if search:
            results = results.filter(pf_name__contains=search)
        self.queryset = results.order_by('-add_time')
        return self.queryset
