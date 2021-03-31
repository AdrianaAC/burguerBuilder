import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
//import axios from "../../../axios-orders";
//import withErrorHandle from "../../../hoc/withErrorHandle/withErrorHandle";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const contactData = props => {
 const [orderForm, setOrderForm] = useState({
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your street adress",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter yout zip code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      }
    })
    const [formIsValid, setFormIsValid] = useState(false);


  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients:props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurguer(order, props.token);
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid)
  };

 
    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    }
    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button buttonType="Success" disabled={!formIsValid}>
          Submit data
        </Button>
      </form>
    );
    if (props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data</h4>
        {form}
      </div>
    );
  }


const mapStateToProps = (state) => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurguer: (orderData, token) =>
      dispatch(actions.purchaseBurguer(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(contactData);
