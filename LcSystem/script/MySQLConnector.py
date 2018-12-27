# -*- coding: utf-8 -*-
'''
Created On 18-6-5 上午11:22
    @Author  : WangBo
    @File    : MySQLConnector.py
    @Software: PyCharm
    @Tag     : 
'''


import pymysql
import re

class MySQLConnector:

    def __init__(self):
        # self.con = pymysql.Connect(host='localhost', port=3306,
        #                                user='root', passwd='0316',
        #                                db="refined_operation", charset='utf8')
        # print('-'*20+"已建立本地MySQL数据库连接"+'-'*20)
        self.con = pymysql.Connect(host='117.187.193.36', port=33060,
                                       user='wangbo', passwd='lc2018',
                                       db="lc_sys", charset='utf8')
        self.cur = self.con.cursor()

    def execute(self,query,args=None):
        self.cur.execute(query,args)
        pass

    def executemany(self,query,args=None):
        self.cur.executemany(query,args)
        pass

    def commit(self):
        self.con.commit()
        pass

    def fetall(self):
        return self.cur.fetchall()

    def close(self):
        self.con.close()
        pass

    def upload_dir(self,tbl_name,list):
        tupp = []
        for i in list:
            keys = i.keys()

            sql = "insert into "+tbl_name+" ("
            for k in keys:
                sql += "`"+k+ "`,"
            sql = sql[:-1]+") values ("
            for k in keys:
                sql += "%s,"
            sql = sql[:-1] + ")"
            tup = []
            for k in keys:
                if type(i[k]) != str:
                    tup.append(str(i[k]))
                else:
                    tup.append(i[k])
            tupp.append(tuple(tup))
        self.executemany(sql,tupp)
        self.commit()
        pass

    def upload_obj(self,tbl_name,list):
        obj = list[0]
        keys = obj.__dict__.keys()
        sql = "insert into " + tbl_name + " ("
        for k in keys:
            sql += "`" + k + "`,"
        sql = sql[:-1] + ") values ("
        for k in keys:
            sql += "%s,"
        sql = sql[:-1] + ")"
        tupList = []
        for l in list:
            di = l.__dict__
            tup = []
            for k in keys:
                tup.append(di[k])
            tupp = tuple(tup)
            tupList.append(tupp)
        self.executemany(sql, tupList)
        self.commit()
        pass

    def trunc_table(self,tbl_name):
        self.execute("TRUNCATE TABLE "+tbl_name)
        self.commit()
        pass

    def query_dir(self,sql):
        col_names = re.findall(r'SELECT (.*) FROM',sql)[0]
        col_list = col_names.split(",")
        self.execute(sql)
        result = self.fetall()
        dircList = []
        for r in result:
            dirc = {}
            for i in range(0,len(r)):
                dirc[col_list[i].replace("`","")] = r[i]
            dircList.append(dirc)
        return dircList
