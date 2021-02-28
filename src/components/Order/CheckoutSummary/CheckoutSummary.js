import React from "react";
import Burguer from "../../Burguer/Burguer";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy your meal!</h1>
            <div style={{width:"100%", margin:"auto"}}>
                <Burguer ingredients={props.ingredients}/>
            </div>
            <Button 
            buttonType="Danger"
            clicked = {props.checkoutCancel}
            >Cancel</Button>

            <Button 
            buttonType="Success"
            clicked = {props.checkoutContinue}
            >Continue</Button>

        </div>
    );
}

export default checkoutSummary;