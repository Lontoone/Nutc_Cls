import React, { useEffect, useMemo, useState } from "react";
import ClassTabel from "../Components/ClassTabel";
import GetDb from "../Components/DbHelper";

function SqlApi() {
  //取得URL參數 (注意格式，?要接先一個&，例如下方)
  //不然React在搞，取不到第一個參數
  //http://localhost:3000/#/api/?&semi=1101&weeks=星期一,星期二,星期三&end=8&start=1&sch_type=1
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
    semi = paras.get("semi");
    weeks = paras.get("weeks");
    end = paras.get("end");
    start = paras.get("start");
    sch_type = paras.get("sch_type");
    var selectedWeeks = weeks
      .split(",")
      .reduce((acc, val) => acc.concat("'" + val + "'"), [])
      .join(",");

    var selectedst = sch_type
      .split(",")
      .reduce((acc, val) => acc.concat("'" + val + "'"), [])
      .join(",");

    var sql = `SELECT * from cls WHERE 
                          semi='${semi}' AND 
                          start >=${start} AND
                          end <=${end} AND
                          week IN (${selectedWeeks}) AND
                          sch_type IN (${selectedst})
                          `;

    return sql;
  };

  const res = useMemo(() => {
    return <ClassTabel sql={urlToSql()} />;
  });

  return <>{res}</>;
}

export default SqlApi;
