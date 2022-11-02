import initSqlJs from "sql.js";
//import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import sqlWasm from "../utils/sql-wasm.wasm";
import fs from "fs";
import React, { useMemo } from 'react';

const relLink = process.env.PUBLIC_URL + "/Datas/cls.db";


async function loadBinaryFile(path, success) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    var data = new Uint8Array(xhr.response);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    success(arr.join(""));
  };
  xhr.send();
};
async function GetDb(sql,callback) {
  const SQL = await initSqlJs({ locateFile: () => sqlWasm });
  //const db = new SQL.Database("url/cls.db");

  await loadBinaryFile(relLink, function (data) {
    var sqldb = new SQL.Database(data);
    // Database is ready
    //var res = sqldb.exec("SELECT * FROM cls");
    var res = sqldb.exec(sql);    

    callback(res);
  });
}

export default GetDb;

