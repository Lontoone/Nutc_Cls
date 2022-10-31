import initSqlJs from "sql.js";
//import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import sqlWasm from "../utils/sql-wasm.wasm";
import fs from "fs";

//https://github.com/sql-js/sql.js/
const dblink =
  "https://github.com/Lontoone/Nutc_Cls/blob/master/Datas/cls.db?raw=true";
const localLink = "D:/Work/NUTC_Cls/web/src/cls.db";
const relLink = process.env.PUBLIC_URL + "/cls.db";
const tempLink =
  "https://nutcedutw-my.sharepoint.com/:u:/g/personal/s1110534008_nutc_edu_tw/ER6xYCSwdOVCtCNUWAmII24BuBi7N-zCFUHF7MMweQj9SQ?e=A8CtyE";



function loadBinaryFile(path, success) {
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
async function GetDb() {
  const SQL = await initSqlJs({ locateFile: () => sqlWasm });

  //const db = new SQL.Database("D:/Work/NUTC_Cls/web/src/cls.db");

  /*
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    console.log(relLink);
    console.log(xhr);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status == 0) {
          console.log(e);
          var uInt8Array = new Uint8Array(this.response);
          var db = new SQL.Database(uInt8Array);
          //var contents = db.exec("SELECT * FROM cls");
          // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
          console.log(db);
  
        }
      }
  
    };
    
    xhr.open("GET", relLink, true);
    xhr.send();
    */

  loadBinaryFile(relLink, function (data) {
    var sqldb = new SQL.Database(data);
    // Database is ready
    var res = sqldb.exec("SELECT * FROM cls");
    console.log(res);
  });
}

export default GetDb;
