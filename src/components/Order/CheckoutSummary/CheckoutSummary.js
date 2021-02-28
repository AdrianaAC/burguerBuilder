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
            btnType="Danger"
            clicked
            >Cancel/</Button>

            <Button 
            btnType="Success"
            clicked
            >Continue</Button>

        </div>
    );
}

export default checkoutSummary;