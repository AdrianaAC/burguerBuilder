import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state={
        name:"",
        address: {
            street: "",
            postalCode: ""    
        },
        phone:"",
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Consuela",
        address: {
          street: "SesamoStreet",
          zipCode: "123456",
          country: "Mexico",
        },
        email: "test@test.com",
      },
      deliveryMethod: "express",
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
        let form = (   <form>
            <input type="text" name="name" placeholder="Enter your name" />
                <input type="text" name="phone" placeholder="Enter your contact" />
                <input type="text" name="street" placeholder="Enter your street address" />
                <input type="text" name="postalCode" placeholder="Enter your postal code" />
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