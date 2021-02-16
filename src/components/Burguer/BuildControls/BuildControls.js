import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Total price: <strong>{props.price.toFixed(2)}€</strong></p>
      {controls.map((ele) => (
        <BuildControl
          key={ele.label}
          label={ele.label}
          add={() => props.ingredientAdded(ele.type)}
          remove={() => props.ingredientRemoved(ele.type)}
          disabled={props.disabled[ele.type]}
        />
      ))}
    </div>
  );
};

export default buildControls;
