import React from "react";
import Aux from "../../../hoc/Aux";

const orderSumary = (props) => {
  const ingredientSumary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}:</span>{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Order summary:</h3>
      <ul>{ingredientSumary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  );
};

export default orderSumary;
