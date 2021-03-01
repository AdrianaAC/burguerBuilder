import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state={
      orderForm: {
          name: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your name"
            },
            value:""
          },
          street: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your street adress"
            },
            value:""
          },
          zipCode: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter yout zip code"
            },
            value:""
          },
          country: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your country"
            },
            value:""
          },
          email:{
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Enter your email"
            },
            value:""
          },
          deliveryMethod: {
            elementType: "select",
            elementConfig: {
             options:[{value: "fastest", displayValue:"Fastest"},
             {value: "cheapest", displayValue:"Cheapest"}]
            },
            value:""
          },
      },
      loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false});
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false});
      });
        console.log(this.props.ingredients);
    }

    render() {

      const formElementsArray = [];
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderFrom[key]
        })
      }
        let form = (   
        <form>
                {formElementsArray.map(formElement => (
                  <Input  
                  
                  key = {formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value
                  />
                ))}
                <Button buttonType="Success" clicked={this.orderHandler}>Submit data</Button>
            </form>);
        if(this.state.loading) {
            form = (<Spinner/>)
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;