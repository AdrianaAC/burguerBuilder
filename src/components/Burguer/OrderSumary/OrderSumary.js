import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

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
      <p><strong>Total price: {props.price.toFixed(2)}€</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.orderCanceled} buttonType="Danger">
        Cancel
      </Button>
      <Button clicked={props.orderContinued} buttonType="Success">
        Continue
      </Button>
    </Aux>
  );
};

export default orderSumary;
