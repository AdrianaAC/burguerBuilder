import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">BurguerBuilder</NavigationItem>
    <NavigationItem link="/orders">MyOrders</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Log In</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Log Out</NavigationItem>
    )}
    {/* <NavigationItem link="/">Notifications</NavigationItem>
        <NavigationItem link="/">Privacy</NavigationItem>
        <NavigationItem link="/" onClick={props.help}>Help</NavigationItem>
        <NavigationItem link="/">Settings</NavigationItem> */}
  </ul>
);

export default navigationItems;
