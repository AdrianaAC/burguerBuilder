import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">BurguerBuilder</NavigationItem>
        <NavigationItem link="/orders">MyOrders</NavigationItem>
        {/* <NavigationItem link="/">Notifications</NavigationItem>
        <NavigationItem link="/">Privacy</NavigationItem>
        <NavigationItem link="/" onClick={props.help}>Help</NavigationItem>
        <NavigationItem link="/">Settings</NavigationItem> */}
        
    </ul>
);

export default navigationItems;