import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import "../css/reset.css";
import "../css/mainStyle.css";
import Dropdown from "react-dropdown"; //https://github.com/fraserxu/react-dropdown
import "react-dropdown/style.css";
import InlineCheckBox from "../Components/InlineCheckBox";
//import sqlite3 from 'sqlite3';
import GetDb from "../Components/DbHelper";
import ClassTabel from "../Components/ClassTabel";

//const initSqlJs = window.initSqlJs;

//TODO: SQLite: https://github.com/sql-js/sql.js

export default function Home() {
  /*
  const searchResult = useMemo(() => (
    GetDb(sql)
    ), [sql])
    */
   const [semiOptions, setSemiOptions] = useState([]);
   const [doSql, setSql] = useState("SELECT * FROM cls");

  const options = ["one", "two", "three"];
  const weekOpts = [
    { text: "星期一", value: 1 },
    { text: "星期二", value: 2 },
    { text: "星期三", value: 3 },
    { text: "星期四", value: 4 },
    { text: "星期五", value: 5 },
    { text: "星期六", value: 6 },
    { text: "星期日", value: 7 },
  ];
  useEffect(() => {
    //取得資料庫裡面有的學年
    var sql = "SELECT DISTINCT semi FROM cls"
    GetDb(sql , (res)=>{
      console.log(res[0]?.values.flat());
      setSemiOptions(res[0]?.values.flat());
    })

  }, []);

  const weekRef = useRef("weekRef");
  const semiRef = useRef("semiRef");
  const startRef = useRef("startRef");
  const endRef = useRef("endRef");
  //console.log(searchResult);

  function HandleSearch() {
    console.log("Search");
    var semi = semiRef.current.state.selected.value;
    var weeks = weekRef.current.state.opts;
    var start = startRef.current.value;
    var end = endRef.current.value;

    var selectedWeeks = weeks.reduce((acc , val) => val.isChecked?acc.concat("'"+val.text+"'"):acc,[]);
    var week_sql = selectedWeeks.join(',');
    console.log(semi);
    console.log(weeks);
    console.log(start);
    console.log(end);
    console.log(selectedWeeks);
    console.log(week_sql);


    var sql=`SELECT * from cls WHERE 
                        semi='${semi}' AND 
                        start >=${start} AND
                        end <=${end} AND
                        week IN (${week_sql})
                        `
    console.log(sql);
    setSql(sql);
  }

  return (
    <div className="full-screen">
      {/* 主內容 */}
      <div className="home-center-container">
        <div className="home-title">Title</div>
        {/* 選單項目 --學年 */}
        <div className="form-item">
          <p>學年</p>
          <Dropdown
            options={semiOptions}
            //onChange={this._onSelect}
            /*value={semiOptions[0]}*/
            placeholder="選擇學年"
            ref={semiRef}
          />
        </div>

        {/* 選單項目 --星期 */}
        <div className="form-item">
          <p>星期</p>
          <InlineCheckBox opts={weekOpts} ref={weekRef} />
        </div>

        {/* 選單項目 --起始節 */}
        <div className="form-item">
          <p>節數</p>
          <input
            className="form-item-input"
            type={"number"}
            min={1}
            max={8}
            defaultValue={1}
            ref={startRef}
          ></input>
          <p>~</p>
          <input
            className="form-item-input"
            type={"number"}
            min={1}
            max={8}
            defaultValue={8}
            ref={endRef}
          ></input>
        </div>

        {/* 選單項目 --搜尋按鈕 */}
        <div className="form-item-full-button" onClick={() => HandleSearch()}>
          搜尋
        </div>
      </div>

      <div className="home-main-seg">
        {/* 搜尋結果 */}
        <ClassTabel  sql={doSql}/>
      </div>
    </div>
  );
}
