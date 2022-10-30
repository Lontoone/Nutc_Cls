import React, { Component, useEffect, useRef } from "react";
import "../css/reset.css";
import "../css/mainStyle.css";
import Dropdown from "react-dropdown"; //https://github.com/fraserxu/react-dropdown
import "react-dropdown/style.css";
import InlineCheckBox from "../Components/InlineCheckBox";
//import sqlite3 from 'sqlite3';
import GetDb from "../Components/DbHelper";

const initSqlJs = window.initSqlJs;


//TODO: SQLite: https://github.com/sql-js/sql.js 

function HandleSearch(){
  console.log("Search");
  //const db = new sqlite3.Database("../../../Datas/cls.db");

  console.log(GetDb());
  
}

export default function Home() {

  
  const options = ["one", "two", "three"];
  const weekOpts = [
    { text: "一", value: 1 },
    { text: "二", value: 2 },
    { text: "三", value: 3 },
    { text: "四", value: 4 },
    { text: "五", value: 5 },
    { text: "六", value: 6 },
    { text: "日", value: 7 },
  ];
  useEffect(() => {}, []);

  const weekRef = useRef("weekRef");
  

  return (
    <div className="full-screen">
      {/* 主內容 */}
      <div className="abs-center home-center-container">
        <div className="home-title">Title</div>
        {/* 選單項目 --學年 */}
        <div className="form-item">
          <p>學年</p>
          <Dropdown
            options={options}
            //onChange={this._onSelect}
            value={options[0]}
            placeholder="Select an option"
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
          <input className="form-item-input" type={"number"} min={1} max={8} defaultValue={1}></input>
          <p>~</p>
          <input className="form-item-input" type={"number"} min={1} max={8} defaultValue={8}></input>
        </div>

        {/* 選單項目 --搜尋按鈕 */}        
          <div className="form-item-full-button" onClick={()=>HandleSearch()}>搜尋</div>
        

        <div className="home-main-seg">{/* 搜尋結果 */}</div>
      </div>
    </div>
  );
}
