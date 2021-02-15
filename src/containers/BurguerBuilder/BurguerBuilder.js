import React, { Component } from "react";
import Aux from "../../hoc/Aux";

class BurguerBuilder extends Component {
  render() {
    return <Aux>
        <div>Graphical representation of the burguer</div>
        <div>The kitchen: add and remove ingredients</div>
    </Aux>;
  }
}

export default BurguerBuilder;