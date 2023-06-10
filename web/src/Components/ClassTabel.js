import React, { useMemo, useState } from "react";
import "../css/reset.css";
import "../css/ClassTable.css";
import GetDb from "../Components/DbHelper";

//var searchData = [];
export default function ClassTabel({ sql }) {
  //const [sql, setSql] = useState("SELECT * FROM cls LIMIT 10");
  const [data, setData] = useState([]);
  const searchResult = useMemo(() => GetDb(sql, OnDataGet), [sql]);
  function OnDataGet(data) {
    //searchData = data;
    console.log(data);
    setData(data);
  }

  const colNameMap = (col) => {
    const colMap = {
      semi: "學年",
      clsno: "編號",
      clsfor: "班級",
      clsName: "課程名稱",
      clsRoom: "教室",
      semi: "學年",
      clsOpt: "選/必修",
      week: "星期",
      hour: "時數",
      crid: "學分",
      stuCount: "人數",
      teacher: "老師",
      sch_type: "學制",
      start: "開始節",
      end: "結束節",
    };
    let _name = colMap[col];
    if (_name) {
      return _name;
    } else {
      //找不到對應的就返回英文
      return col;
    }
  };
  const sch_typeNameMap = (col) => {
    const colMap = {
      1: "五專",
      3: "二技",
      4: "四技",
      8: "碩班",
    };
    let _name = colMap[col];
    if (_name) {
      return _name;
    } else {
      //找不到對應的就返回英文
      return col;
    }
  };

  const table = useMemo(() => {
    return (
      <table key={"tc"}>
        <thead>
          <tr>
            {data[0]?.columns.map((a, i) => {
              return (
                <th key={a + i} className="tc-header-tr">
                  {colNameMap(a)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data[0]?.values.map((a, i) => {
            return (
              <tr key={a + i}>
                {a.map((col, i) => {
                  //偷懶 sch_type剛好是最後一欄，轉對應名稱
                  return (
                    <td className="tc-body-td">                      
                      {i == (a.length - 1) ? sch_typeNameMap(col) : col}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }, [data]);

  return <div className="tc-root">{table}</div>;
}
