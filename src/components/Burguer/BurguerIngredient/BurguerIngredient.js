/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React from "react";
import classes from "./BurguerIngredient.css";
import PropTypes from "prop-types";

const burguerIngredient = props => {
 
    let ingredient = null;

    switch (props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom}></div>;
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

      case "onions":
        ingredient = <div div className={classes.Onions}></div>;
        break;

      case "tomato":
        ingredient = <div div className={classes.Tomato}></div>;
        break;

      default:
        ingredient = null;
    }
    return ingredient;
  }


burguerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burguerIngredient;
