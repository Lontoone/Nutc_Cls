import React, { useEffect, useMemo, useState} from "react";
//import '../css/ClassTabel.css'
import GetDb from "../Components/DbHelper";

export default function ClassTabel() {

    const [sql, setSql] = useState("SELECT * FROM cls");
    const searchResult = useMemo(() => (
        GetDb(sql)
    ), [sql])

    return (
        <div className='tc-root'>
            <table>
                <thead>
                    {
                    
                    searchResult[0].columns.map((a, i) => {
                        return (
                        <>
                        <tr>a</tr>
                        </>)
                    })}
                </thead>
                <tbody></tbody>
            </table>
        </div>
    )
}
