from .models import Performance
from .serializers import PerformanceSerializer,PfListSerializer,PfUpdateSerializer
from rest_framework import viewsets,filters,mixins,status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from depart.models import Department
from django.db.models import Q
from script.UploadPF import GetPfs
from django.http import HttpResponse

# Create your views here.
class PfUpdateViewSet(viewsets.GenericViewSet,mixins.UpdateModelMixin):
    queryset = Performance.objects.all()
    serializer_class = PfUpdateSerializer

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.user.level-int(request.data["status"])>1 and float(request.data["second_sum"])>=90 and float(request.data["second_sum"])<95:
            request.data["status"] = 0
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class PfListPagination(PageNumberPagination):
    page_size = 10

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
    pagination_class = PfListPagination
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
        search = self.request.query_params
        searchFiles = {}

        for i in search:
            if i!= "page":
                searchFiles[i] = search.get(i,0)

        user = self.request.user
        self.get_children_depart(user.depart_id)
        self.children_depart_ids.append(user.depart_id)
        results = Performance.objects.filter(
            (Q(user__level__gt=user.level) & (Q(second_sum__gte=95) | Q(second_sum__lt=90))) | Q(user__level = (user.level+1)),
            user__depart_id__in=self.children_depart_ids,
            status=user.level
        )
        if searchFiles:
            results = results.filter(**searchFiles)
        self.queryset = results.order_by('-add_time')
        return self.queryset

def UploadPf(req):
    user_id = req.GET["user_id"]
    G = GetPfs()
    try:
        G.get_list(user_id)
        return HttpResponse('{"status":"OK"}')
    except:
        return HttpResponse('{"status":"NO"}')


