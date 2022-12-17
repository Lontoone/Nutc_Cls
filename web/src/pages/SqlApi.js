import React, { useEffect, useMemo, useState } from "react";
import ClassTabel from "../Components/ClassTabel";
import GetDb from "../Components/DbHelper";

function SqlApi() {
  //取得URL參數 (注意格式，?要接先一個&，例如下方)
  //不然React在搞，取不到第一個參數
  //http://localhost:3000/#/api/?&semi=1101&weeks=星期一,星期二,星期三&end=8&start=1&sch_type=1
  //http://localhost:3000/#/api/?&cid=D2441
  //http://localhost:3000/#/api/?&cid=D2441&semi=1091
  var cls_id ="";
  var semi = new Date().getFullYear - 1911 + "1";
  var weeks = "1,2,3,4,5,6,7";
  var end = 8;
  var start = 1;
  var sch_type = 1;

  const urlToSql = () => {
    var currUrl = window.location.toString();

    const query = currUrl.replace("#/", "");
    const paras = new URLSearchParams(query);
    console.log(query);
    console.log(paras);
    cls_id = paras.get("cid");
    semi = paras.get("semi");
    weeks = paras.get("weeks");
    end = paras.get("end");
    start = paras.get("start");
    sch_type = paras.get("sch_type");
    var selectedWeeks = weeks?weeks
      .split(",")
      .reduce((acc, val) => acc.concat("'" + val + "'"), [])
      .join(","):null;

    var selectedst = sch_type?sch_type
      .split(",")
      .reduce((acc, val) => acc.concat("'" + val + "'"), [])
      .join(","):null;
    /*
    var sql = `SELECT * from cls WHERE 
                          semi = '${semi}' AND
                          start >=${start} AND
                          end <=${end} AND
                          week IN (${selectedWeeks}) AND
                          sch_type IN (${selectedst})
                          `;
  */
    var queryItems = [];
    if (cls_id != null) queryItems.push("clsno='" + cls_id +"'");
    if (semi != null ) queryItems.push("semi='" + semi + "'" );
    if (start != null)  queryItems.push( "start>=" + start );
    if (end != null) queryItems.push( "end<=" + end)
    if (weeks != null) queryItems.push("week IN(" + selectedWeeks + ")" );
    if (sch_type != null) queryItems.push("sch_type IN(" + selectedst +")");

    var sql =`SELECT * from cls WHERE  ${queryItems.join(" AND ")}`;
    /*
    var sql = `SELECT * from cls WHERE 
                          ${cls_id != null ? "clsno='" + cls_id + "' AND" : ""}  
                          ${semi != null ? "semi='" + semi + "' AND" : ""}  
                          ${start != null ? "start>=" + start + " AND" : ""}
                          ${end != null ? "end<=" + end + " AND" : ""}
                          ${weeks != null ? "week IN(" + selectedWeeks + ") AND" : ""}
                          ${sch_type != null ? "sch_type IN(" + selectedst +")" : ""}
                          `;
                          */
    console.log(sql);
    return sql;
  };

  const res = useMemo(() => {
    return <ClassTabel sql={urlToSql()} />;
  });

  return <>{res}</>;
}

export default SqlApi;
