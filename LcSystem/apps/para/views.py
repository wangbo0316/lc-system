from .models import Para
from depart.models import Department
from .serializers import ParaSerializer,UpdateParaSerializer
from rest_framework import viewsets,mixins
# Create your views here.


class ParaViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    '''
    参数列表
    '''
    queryset = Para.objects.all()
    serializer_class = ParaSerializer
    # filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    # filter_class = ParaFilter
    # search_fields = ('pf_name', 'status')
    def get_queryset(self):
        user = self.request.user
        parent_depart = Department.objects.get(id = user.depart_id)
        children_depart = parent_depart.sub.all()
        children_depart_ids = [i.id for i in children_depart]
        children_depart_ids.append(user.depart_id)
        results = Para.objects.filter(depart_id__in= children_depart_ids,level=(user.level+1))
        self.queryset = results.order_by('-add_time')
        return self.queryset

class UpdateParaViewSet(viewsets.GenericViewSet,mixins.UpdateModelMixin):
    queryset = Para.objects.all()
    serializer_class = UpdateParaSerializer

class CurrtentParaViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    queryset = Para.objects.all()
    serializer_class = ParaSerializer

    def get_queryset(self):
        user = self.request.user
        self.queryset = Para.objects.filter(depart_id=user.depart_id,level=user.level)
        return self.queryset