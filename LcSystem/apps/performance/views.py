from .models import Performance
from .serializers import PerformanceSerializer,PfListSerializer
from rest_framework import viewsets,filters,mixins,status
from rest_framework.response import Response
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
    # filter_backends = (DjangoFilterBackend,filters.SearchFilter)
    # filter_class = PerformanceFilter
    # search_fields = (['pf_name'])

    def get_queryset(self):
        user = self.request.user
        self.queryset = Performance.objects.filter(user_id=user.id).order_by('-add_time')
        return self.queryset

    def create(self, request, *args, **kwargs):
        try:
            Performance.objects.get(pf_name=request.data['pf_name'],user_id=request.data['user'])
            return Response({'message':'该日期下已存在绩效记录，请删除后重新添加！','status':False}, status=status.HTTP_201_CREATED)
        except:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            re_dict = serializer.data
            headers = self.get_success_headers(serializer.data)
            return Response({'message':'添加成功 ！','status':True}, status=status.HTTP_201_CREATED, headers=headers)


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
