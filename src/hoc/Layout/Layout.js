import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

 const sideDrawerCloseHandler = () => {
    setSideDrawerIsVisible(false);
  };

 const drawerHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        drawerClicked={drawerHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        closed={sideDrawerCloseHandler}
        open={sideDrawerIsVisible}
        isAuth={props.isAuthenticated}
      />
      <main className={classes.Content}>{this.props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
