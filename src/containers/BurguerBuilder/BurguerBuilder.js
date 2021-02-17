import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.75,
  meat: 1.5,
  bacon: 1,
  onions: 0.5,
  tomato: 0.5,
};
class BurguerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  //   }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
      onions: 0,
      tomato: 0,
    },
    totalPrice: 3,
    available: false,
  };

  updateAvailableState (ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);
      this.setState({available: sum>0});
  };

  addIngredientHandler = (type) => {
    const oldQtt = this.state.ingredients[type];
    const updatedQtt = oldQtt + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedQtt;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateAvailableState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldQtt = this.state.ingredients[type];
    const updatedQtt = oldQtt - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedQtt;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          available={this.state.available}
        />
      </Aux>
    );
  }
}

export default BurguerBuilder;
