
from rest_framework import viewsets,mixins,status
from .serializers import DepartSerializer
from users.models import UserProfile
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Department
# Create your views here.

class DepartPagination(PageNumberPagination):
    page_size = 10



class DepartViewSet(viewsets.ModelViewSet):
    '''
    部门视图
    '''
    queryset = Department.objects.all()
    serializer_class = DepartSerializer
    pagination_class = DepartPagination
    def get_queryset(self):
        user_id = self.request.user.id
        user = UserProfile.objects.get(id=user_id)
        parent = Department.objects.get(id=user.depart_id)
        children = parent.sub.all()
        self.queryset = children.order_by('-add_time')
        return self.queryset

    def create(self, request, *args, **kwargs):
        user = self.request.user
        parent_dep = Department.objects.get(id = user.depart_id)
        request.data['parent'] = parent_dep.id
        request.data['level'] = str(user.level)
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        depart = self.perform_create(serializer)
        re_dict = serializer.data
        headers = self.get_success_headers(serializer.data)
        return Response(re_dict, status=status.HTTP_201_CREATED, headers=headers)
        # return depart

class DepartParaViewSet(viewsets.GenericViewSet,mixins.ListModelMixin):
    '''
    部门视图
    '''
    queryset = Department.objects.all()
    serializer_class = DepartSerializer
    def get_queryset(self):
        user_id = self.request.user.id
        user = UserProfile.objects.get(id=user_id)
        parent = Department.objects.get(id=user.depart_id)
        children = parent.sub.all()
        children_ids = [i.id for i in children]
        children_ids.append(user.depart_id)
        self.queryset = Department.objects.filter(id__in = children_ids).order_by('-add_time')
        return self.queryset


