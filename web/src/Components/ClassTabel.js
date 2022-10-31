import React, { useMemo, useState } from "react";
import "../css/reset.css";
import "../css/ClassTable.css";
import GetDb from "../Components/DbHelper";

//var searchData = [];
export default function ClassTabel({sql}) {
  //const [sql, setSql] = useState("SELECT * FROM cls LIMIT 10");
  const [data, setData] = useState([]);
  const searchResult = useMemo(() => GetDb(sql, OnDataGet), [sql]);
  function OnDataGet(data) {
    //searchData = data;
    //console.log(data);
    setData(data);
  }
  const table = useMemo(() => {
    return (
      <table key={"tc"}>
        <thead>
          <tr>
            {data[0]?.columns.map((a, i) => {
              return (
                <th key={a + i} className="tc-header-tr">
                  {a}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data[0]?.values.map((a, i) => {
            return (
              <tr key={a + i}>
                {" "}
                {a.map((col) => {
                  return <td className="tc-body-td">{col}</td>;
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
