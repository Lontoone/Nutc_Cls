from calendar import week
import bs4
import requests
from bs4 import BeautifulSoup

import json
import datetime
import re  # regex
import unicodedata
import sqlite3
import csv
import numpy as np
import pandas as pd



class ClassItem:
    def __init__(self):
        self.semi='' #學期
        self.clsno='' #課程代碼
        self.clsfor='' #開課班級
        self.clsName='' #課程名稱
        self.clsRoom='' #教室
        self.clsOpt='' #選修/必修
        self.start='' #開始
        self.end=''  #結尾
        self.week='' #星期
        self.hour='' #時數
        self.crid='' #學分
        self.stuCount='' #選課人數
        self.teacher='' #老師
        
    def getColTypePairs():
        return {
            'semi':"TEXT",
            'clsno': 'TEXT',
            'clsfor': 'TEXT',
            'clsName': 'TEXT',
            'clsRoom' :'TEXT',
            'clsOpt': 'TEXT',
            'start': 'INTEGER',
            'end' :'INTEGER',
            'week': 'TEXT',
            'hour':'INTEGER',
            'crid': 'INTEGER',
            'stuCount' :'TEXT',
            'teacher': 'TEXT'                  
        }
    def getColDataPairs(self):
        return {
            'semi':self.semi,
            'clsno': self.clsno,
            'clsfor': self.clsfor,
            'clsName': self.clsName,
            'clsRoom' :self.clsRoom,
            'clsOpt': self.clsOpt,
            'start': self.start,
            'end' :self.end,
            'week': self.week,
            'hour':self.hour,
            'crid': self.crid,
            'stuCount' :self.stuCount,
            'teacher': self.teacher                  
        }
        
        

def CreateDB():
    conn = sqlite3.connect('cls.db');
    cols=''
    for k,v in ClassItem.getColTypePairs().items():
        cols+=k+' '+v+','
    
    #去掉最後一個逗號
    cols=re.sub(r',$','',cols)
    
    create_sql='CREATE TABLE IF NOT EXISTS cls ('+cols +')'
    '''
    create_sql = 'CREATE TABLE IF NOT EXISTS cls (\
        clsno TEXT,\
        clsfor TEXT,\
        clsName TEXT,\
        clsRoom TEXT,\
        clsOpt TEXT,\
        start INTEGER,\
        end INTEGER,\
        week TEXT,\
        hour INTEGER,\
        crid INTEGER,\
        stuCount TEXT,\
        teacher TEXT\
        )'
    '''
    cursor = conn.cursor()
    cursor.execute(create_sql)
    return conn,cursor


def GetClassData(sem, sch_type,weekday,start_section ,end_section, _p,fileName):
    url=f"https://aisap.nutc.edu.tw/public/day/course_list.aspx?sch_dep=1&sem={sem}&sch_type={sch_type}&weekday={weekday}&start_section={start_section}&end_section={end_section}&_p={_p}"
    req = requests.get(url)
    soup = BeautifulSoup(req.text ,features="html5lib" )
    trs= soup.find_all('tr')
    
    #print (tr[:])
    
    classDatas=[]
    
    #跳過第一欄標題欄
    for tr in trs[2:]:
        tds= tr.findChildren('td',recursive=False)
        _data =ClassItem()
        _data.semi=sem
        _data.clsno=tds[1].text
        _data.clsfor=tds[2].text
        _data.clsName=tds[3].text
        
        _data.clsRoom=re.search(r'(\d+)' ,tds[5].text ).group()
        _data.week = re.search(r'^.{0,3}' ,tds[5].text ).group()
        _data.start = re.search(r'第(.)' ,tds[5].text ).group(1)
        _data.end = re.search(r'(.)節' ,tds[5].text ).group(1)
        
        
        _data.clsOpt=tds[6].text
        
        _data.hour=re.search(r'^.',tds[7].text).group()
        _data.crid=re.search(r'.$',tds[7].text).group()
        
        _data.stuCount=tds[8].text
        _data.teacher=tds[9].text
        
        #全形轉半形
        _data.start=unicodedata.normalize('NFKC', _data.start)
        _data.end=unicodedata.normalize('NFKC', _data.end)
        _data.hour=unicodedata.normalize('NFKC', _data.hour)
        _data.crid=unicodedata.normalize('NFKC', _data.crid)
        
        classDatas.append(_data);
        pass
    return classDatas;
    #寫成csv
    with open(fileName, 'w',encoding='utf8') as csvfile:
        writer = csv.writer(csvfile)
        
        rows= ClassItem.getColTypePairs().keys()
        writer.writerow(rows)
        
        for data in classDatas:            
            writer.writerow(data.getColDataPairs().values())        
    pass

def WriteCsv(fileName , classDatas):
    with open(fileName, 'w',encoding='utf8') as csvfile:
        writer = csv.writer(csvfile)
        
        rows= ClassItem.getColTypePairs().keys()
        writer.writerow(rows)
        
        for data in classDatas:            
            writer.writerow(data.getColDataPairs().values())        
    pass

def GetMaxPage(sem, sch_type,weekday,start_section ,end_section):
    url=f"https://aisap.nutc.edu.tw/public/day/course_list.aspx?sch_dep=1&sem={sem}&sch_type={sch_type}&weekday={weekday}&start_section={start_section}&end_section={end_section}"
    print(url)
    req = requests.get(url)
    soup = BeautifulSoup(req.text ,features="html5lib" )
    #lastHref= soup.find_all("b a", href=True)[-2]['href']
    #lastHref= soup.find_all("b > a", href=True)
    b =soup.find_all('b')
    herf = b[-1].findChildren("a" , recursive=False)
    a = herf[0].attrs['href']
    
    page = re.search(r'_p=(\d+)',a).group(1)
    print (page)
    return eval(page)

    
def WriteCsvToSqlite(fileName):
    df= pd.read_csv(fileName, encoding='utf8')
    conn,cursor = CreateDB()
    rows= ','.join(list(df.columns))
    
    for data in df.itertuples():            
        _values = ','.join(["'"+str(elem)+"'" for elem in data[1:]]) # 因為pd預設在第0位放編號
        insert_sql=f"INSERT INTO cls ({rows}) VALUES ({_values})"
        cursor.execute(insert_sql)
        conn.commit()
        
    pass

#CreateDB()

if __name__ == '__main__':
    
    #sem = 1111
    sem = datetime.datetime.now().year - 1911  #民國年
    sch_type=0
    weekday=1
    start_section=1
    end_section=7
    _p=1

    semiRange = 3
    #抓範圍3年內的上下學期
    for i in range(sem-semiRange,sem +1 ):
        for j in [1,2]: #上下學期
            _curSem=str(i)+str(j)
            fileName=_curSem+'.csv'
            semiDatas=[]
            maxPage = GetMaxPage(_curSem , sch_type,weekday,start_section,end_section)
            
            #該學期每一頁
            for page in range(1,maxPage+1):
                datas = GetClassData(_curSem , sch_type,weekday,start_section,end_section ,page ,fileName)
                semiDatas.extend(datas)

            WriteCsv(fileName,semiDatas)
            WriteCsvToSqlite(fileName)
            pass
    