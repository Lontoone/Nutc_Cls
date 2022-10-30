import initSqlJs from "sql.js";
//import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import sqlWasm from "../utils/sql-wasm.wasm";
import fs from "fs";

//https://github.com/sql-js/sql.js/
const dblink =
  "https://github.com/Lontoone/Nutc_Cls/blob/master/Datas/cls.db?raw=true";
const localLink = "D:/Work/NUTC_Cls/web/src/cls.db";
const tempLink =
  "https://nutcedutw-my.sharepoint.com/:u:/g/personal/s1110534008_nutc_edu_tw/ER6xYCSwdOVCtCNUWAmII24BuBi7N-zCFUHF7MMweQj9SQ?e=A8CtyE";
async function GetDb() {
  const SQL = await initSqlJs({ locateFile: () => sqlWasm });
  /*
  //const db = new SQL.Database("D:/Work/NUTC_Cls/web/src/cls.db");
  var data = fs.readFileSync('D:/Work/NUTC_Cls/web/src/cls.db');
  var db = new SQL.Database(data);*/
  /*
  const sqlPromise = initSqlJs({ locateFile: () => sqlWasm });
  const dataPromise = fetch(dblink).then((res) =>
    res.arrayBuffer()
  );
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
  const db = new SQL.Database(new Uint8Array(buf));
  */
  /*
  var xhr = new XMLHttpRequest();
  xhr.open("GET", tempLink, true);
  xhr.responseType = "arraybuffer";

  console.log(xhr);
  xhr.onload = function (e) {
    var uInt8Array = new Uint8Array(this.response);
    var db = new SQL.Database(uInt8Array);
    var contents = db.exec("SELECT * FROM cls");
    // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
    console.log(contents);
  };
  //console.log(db);*/
  let reader = new FileReader();
  reader.onload = function (e) {
    let arrayBuffer = new Uint8Array(reader.result);
    console.log(arrayBuffer);
  };

  reader.readAsArrayBuffer("../cls.db");
}
export default GetDb;
