
import React from "react";
import classes from "./Model.css"

const model = (props) => {
    return(
    <div className={classes.Model}>
        {props.children}
    </div>
    )
}
    

export default model;