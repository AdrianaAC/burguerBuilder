import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"

class ContactData extends Component {
    state={
        name:"",
        address: {
            street: "",
            postalCode: ""    
        },
        phone:""
    }

    render() {
        return(
            <div className={classes.ContactData}>
                <h4>Enter you contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Enter your name" />
                    <input type="text" name="phone" placeholder="Enter your contact" />
                    <input type="text" name="street" placeholder="Enter your street address" />
                    <input type="text" name="postalCode" placeholder="Enter your postal code" />
                    <Button buttonType="Success">Submit data</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;