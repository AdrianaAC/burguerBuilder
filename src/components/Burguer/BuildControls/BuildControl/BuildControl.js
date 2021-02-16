import React from "react";
import classes from "./BuildControl.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Add} onClick={props.add}>
        Add
      </button>
      <button
        className={classes.Remove}
        onClick={props.remove}
        disabled={props.disabled}
      >
        Remove
      </button>
    </div>
  );
};

export default buildControl;
