import json
from depart.models import Department
from users.models import UserProfile
from performance.models import Performance
from .MySQLConnector import MySQLConnector


class GetPfs:
    children_depart_ids = []


    def get_list(self,user_id):
        re_list = []
        user = UserProfile.objects.get(id=user_id)
        self.get_children_depart(user.depart_id)
        self.children_depart_ids.append(user.depart_id)
        results = Performance.objects.filter(
            status=0,
            user__level__gt=user.level,
            user__depart_id__in=self.children_depart_ids
        )
        for i in results:
            depart = i.user.depart.depart_name
            name = i.user.name
            add_person = user.depart_id
            pf_name = i.pf_name
            self_evaluat = json.loads(i.self_evaluat)
            second_evaluat = json.loads(i.second_evaluat)
            del self_evaluat['备注']
            del second_evaluat['备注']
            for j in self_evaluat:
                vo = {
                    "人员姓名":name,
                    "所属部门":depart,
                    "评价类型":"自评",
                    "科目名称":j,
                    "得分":self_evaluat[j],
                    "绩效月份":pf_name,
                    "添加人":add_person,
                }
                re_list.append(vo)
            for k in second_evaluat:
                vo = {
                    "人员姓名":name,
                    "所属部门":depart,
                    "评价类型":"领导评分",
                    "科目名称":k,
                    "得分":second_evaluat[k],
                    "绩效月份":pf_name,
                    "添加人":add_person,
                }
                re_list.append(vo)
        M = MySQLConnector()
        M.execute('delete from excel_view where `添加人` = '+str(user.depart_id))
        M.commit()
        M.upload_dir("excel_view",re_list)
        M.close()




    def get_children_depart(self, parent_depart_id):
        parent_depart = Department.objects.get(id=parent_depart_id)
        children_depart = parent_depart.sub.all()
        for i in children_depart:
            self.children_depart_ids.append(i.id)
            self.get_children_depart(i.id)