# 主旨

國立台中科技大學現有的課表查詢系統為教務處的教務資訊系統，其有幾個嚴重缺點：

- 1.無法正確回傳使用者所設定的區間的資料(例如使用者僅查詢第7、8節的課，系統卻會回傳5~8節的課)
- 2.無法合併查詢(例如使用者不能同時查詢五專部與四技部的課程)。

因此本專案特別針對該問題進行改善，架設查詢網站，除了提供使用者更好的搜尋外，也額外開放API與檔案存取，將校務資訊作成開放資料以方便未來開發者。

還有我開發好玩的。🤪

# 網站
部分手機原生瀏覽器不支援資料庫查詢，若學年選單太久沒出現選項，請改用Google瀏覽器。
## >>**[進入網站](https://lontoone.github.io/Nutc_Cls/)**

網站預覽
![img](https://i.imgur.com/txdfWvi.png)

# 資料更新
因為github沒辦法定時執行程式碼🤔，所以每學期還是得執行一次爬蟲更新資料，更新資料方式有兩種：

- 1. 提醒我🥴
- 2. 自己抓[Datas](https://github.com/Lontoone/Nutc_Cls/tree/master/web/public/Datas)下面的scrap.py檔執行後，把結果用pull request推上來。
    建議整個資料夾拉下來再執行，這樣舊的資料就不用重新爬。

# 製作教學
[部落格文章](https://lontoone-5070b.web.app/article/aagbcAD0KqXTwXHiacWZ)

# 使用API查詢
為了最大化本專案的價值，我將sql查詢做成接口，你可透過在網址列下sql查詢取得課表資料，範例網址如下：
```
https://lontoone.github.io/Nutc_Cls/#/api/?&semi=1101&weeks=星期一,星期二,星期三&end=8&start=1&sch_type=1
```
參數說明：

- semi表學期，例如1111為第111學年上學期；1112為下學期。
- sch_type表學制，1=五專、3=二技、4=四技、8=碩班。
- weeks表星期，1~7分別表星期一到星期日。
- start表開始節。
- end表結束節。
