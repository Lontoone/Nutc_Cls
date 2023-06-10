import PropTypes from "prop-types";
import React, { Component } from "react";
import "../css/InlineCheckBox.css";
//TODO: 可以做成插件公布
export default class InlineCheckBox extends Component {
  state = {};
  constructor(props) {
    super(props);
    //this.state = props;
    this.state = { ...props };
    //this.handelItemClicked = this.
    console.log(this.state);
  }

  render() {
    function handelItemClicked(_this, e, i) {
      //取消選取
      if (e.target.classList.contains("ilcb-selected")) {
        e.target.classList.remove("ilcb-selected");
        _this.state.opts[i].isChecked = false;
      } 
      //選取
      else {
        _this.state.opts[i].isChecked = true;
        e.target.classList.add("ilcb-selected");
      }

      return _this.state.opts;
    }
    return (
      <div className="ilcb-root" key={"ilcb-root"}>
        {this.state.opts.map((a, i) => {
          return (
            <div
              className="ilcb-item"
              key={"ilcb-item" + i}
              value={a.value}
              onClick={(e) => {
                this.setState(handelItemClicked(this, e, i));
              }}
            >
              {a.text}
            </div>
          );

          console.log(a);
        })}
       
      </div>
    );
  }
}
