import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import "../css/reset.css";
import "../css/mainStyle.css";
import "../css/DialogBox.css";
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
  //const [doSql, setSql] = useState("SELECT * FROM cls LIMIT 10");
  const [doSql, setSql] = useState("");

  const weekOpts = [
    { text: "一", value: "星期一" },
    { text: "二", value: "星期二" },
    { text: "三", value: "星期三" },
    { text: "四", value: "星期四" },
    { text: "五", value: "星期五" },
    { text: "六", value: "星期六" },
    { text: "日", value: "星期日" },
  ];

  const sch_typeOpts = [
    { text: "五專", value: "1" },
    { text: "二技", value: "3" },
    { text: "四技", value: "4" },
    { text: "碩班", value: "8" },
  ];
  useEffect(() => {
    //取得資料庫裡面有的學年
    var sql = "SELECT DISTINCT semi FROM cls";
    GetDb(sql, (res) => {
      console.log(res[0]?.values.flat());
      setSemiOptions(res[0]?.values.flat());
    });
  }, []);

  const weekRef = useRef("weekRef");
  const schTypeRef = useRef("schTypeRef");
  const semiRef = useRef("semiRef");
  const startRef = useRef("startRef");
  const endRef = useRef("endRef");
  //console.log(searchResult);

  function HandleSearch() {
    console.log("Search");
    var semi = semiRef.current.state.selected.value;
    var weeks = weekRef.current.state.opts;
    var sch_type = schTypeRef.current.state.opts;
    var start = startRef.current.value;
    var end = endRef.current.value;

    var selectedWeeks = weeks.reduce(
      (acc, val) => (val.isChecked ? acc.concat("'" + val.value + "'") : acc),
      []
    );
    var selectedSchTypes = sch_type.reduce(
      (acc, val) => (val.isChecked ? acc.concat("'" + val.value + "'") : acc),
      []
    );
    var week_sql = selectedWeeks.join(",");
    var schType_sql = selectedSchTypes.join(",");
    console.log(semi);
    console.log(weeks);
    console.log(start);
    console.log(end);
    console.log(selectedWeeks);
    console.log(week_sql);

    var sql = `SELECT * from cls WHERE 
                        semi='${semi}' AND 
                        start >=${start} AND
                        end <=${end} AND
                        week IN (${week_sql}) AND
                        sch_type IN (${schType_sql})

                        `;
    console.log(sql);
    setSql(sql);
  }

  return (
    <div className="full-screen">
      {/* 要更新摳我 */}
      <div className="call-me-btn-root">
        <div className="dialog">
          <ul>            
            <li>
              <a href="http://lontoone.github.io/me">要更新Call我，或自己clone下來執行。</a>
            </li>
          </ul>
          <div className="arrow"></div>
        </div>
        <a href="http://lontoone.github.io/me" target={"_blank"}>
        <img src="https://avatars.githubusercontent.com/u/45337164?s=400&u=189572e08cf2a7d3547556b33eabf28e5f3596ed&v=4"></img>
        </a>
      </div>

      <div className="home-title">中科大全校課表査詢</div>
      {/* 主內容 */}
      <div className="shadow home-center-container">
        {/* 選單項目 --學年 */}
        <div className="form-item">
          <p>學年</p>
          <Dropdown
            className="home-dropDown"
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

        {/* 選單項目 --學制 */}
        <div className="form-item">
          <p>學制</p>
          <InlineCheckBox opts={sch_typeOpts} ref={schTypeRef} />
        </div>

        {/* 選單項目 --搜尋按鈕 */}
        <div className="form-item-full-button" onClick={() => HandleSearch()}>
          搜尋
        </div>
      </div>

      {/* 個人連結 */}
      <div className="home-socialbtn-group">
        {/* 巴哈 
        <button
          class=""
          onClick={() => {
            const url =
              "https://home.gamer.com.tw/homeindex.php?owner=news2000tw";
            window.open(url, "_blank");
          }}
        >
          <img
            className="smallIcon"
            src="https://cdn6.aptoide.com/imgs/e/f/a/efae200e586d616b816b01affb3e63d1_icon.png"
          ></img>
        </button>*/}

        {/* Github */}
        <button
          class=""
          onClick={() => {
            const url = "https://github.com/Lontoone";
            window.open(url, "_blank");
          }}
        >
          <img
            className="smallIcon"
            src="https://i.imgur.com/cpN5Xlp.png"
          ></img>
        </button>

        {/* IG 
        <button
          class=""
          onClick={() => {
            const url = "https://www.instagram.com/lontoone/";
            window.open(url, "_blank");
          }}
        >
          <img
            className="smallIcon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
          ></img>
        </button>*/}
      </div>

      {/* 搜尋結果 */}
      <div className="home-main-seg">
        <ClassTabel sql={doSql} />
      </div>
    </div>
  );
}
