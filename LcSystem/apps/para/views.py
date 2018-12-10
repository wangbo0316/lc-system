from .models import Para
from users.models import UserProfile
from depart.models import Department
from .serializers import ParaSerializer,ParaListSerializer
from .filters import ParaFilter
from rest_framework import filters,viewsets,mixins
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


class ParaViewSet(viewsets.ModelViewSet):
    '''
    参数列表
    '''
    queryset = Para.objects.all()
    serializer_class = ParaSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_class = ParaFilter
    # search_fields = ('pf_name', 'status')



class ParaListViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    '''
    参数列表
    '''
    queryset = Para.objects.all()
    serializer_class = ParaListSerializer
    # filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    # filter_class = ParaFilter
    # search_fields = ('pf_name', 'status')
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id',0)
        search = self.request.query_params.get('search',0)
        user = UserProfile.objects.get(id=user_id)
        parent_depart = Department.objects.get(id = user.depart_id)
        children_depart = parent_depart.sub.all()
        children_depart_ids = [i.id for i in children_depart]
        results = Para.objects.filter(depart_id__in= children_depart_ids,level=(user.level+1))
        if search:
            results = results.filter(depart__depart_name__contains=search)
        self.queryset = results.order_by('-add_time')
        return self.queryset

