/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React from "react";
import classes from "./BurguerIngredient.css";

const burguerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div div className={classes.BreadBottom}></div>;
      break;

    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;

    case "meat":
      ingredient = <div div className={classes.Meat}></div>;
      break;

    case "cheese":
      ingredient = <div div className={classes.Cheese}></div>;
      break;

    case "salad":
      ingredient = <div div className={classes.Salad}></div>;
      break;

    case "bacon":
      ingredient = <div div className={classes.Bacon}></div>;
      break;

    default:
      ingredient = null;
  }
  return ingredient;
};

export default burguerIngredient;
