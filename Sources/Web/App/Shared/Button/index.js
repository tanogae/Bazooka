﻿import React from "react";
import classname from "classnames";

var Button = React.createClass({
    render(){
        var classes = classname("button", {"button--primary": this.props.primary, "button--block": this.props.block}, this.props.className);
        return <button {...this.props} className={classes}>{this.props.children}</button>
    }
});

export default Button;