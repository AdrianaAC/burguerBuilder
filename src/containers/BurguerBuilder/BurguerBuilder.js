import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burguer from "../../components/Burguer/Burguer";

class BurguerBuilder extends Component {
  render() {
    return <Aux>
        <Burguer />
        <div>The kitchen: add and remove ingredients</div>
    </Aux>;
  }
}

export default BurguerBuilder;