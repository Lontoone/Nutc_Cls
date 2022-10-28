import React, { Component } from 'react'
import '../css/reset.css'
import '../css/mainStyle.css'

export default class Home extends Component {
  render() {
    return (
      <div className='full-screen'>
        {/* 主內容 */}
        <div className='abs-center home-center-container'>
          <div className='home-title'>Title</div>
          {/* 選單 */}
          <div className='form-item'>
            <p>學年</p>
            <input type={"number"}></input>

            <fieldset>
              <p>上</p>
              <input type={"radio"} id="1" />
              <p>下</p>
              <input type={"radio"} id="2" />
            </fieldset>

          </div>
          <div className='home-main-seg'>

            {/* 搜尋結果 */}
          </div>
        </div>
      </div>
    )
  }
}
