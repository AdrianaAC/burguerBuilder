import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model"; 
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";

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
    ordering: false
  };

  updateAvailableState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
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
    this.updateAvailableState(updatedIngredients);
  };

  orderHandler = () => {
    this.setState({ordering: true});
  }

  orderCancelHandler = () => {
    this.setState({ordering: false})
  }

  orderContinueHandler = () => {
    alert("Continued ...");
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Model show={this.state.ordering} modelClosed={this.orderCancelHandler}>
          <OrderSumary ingredients={this.state.ingredients} 
          orderCanceled={this.orderCancelHandler}
          orderContinued={this.orderContinueHandler}
          price={this.state.totalPrice}/>
        </Model>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          available={this.state.available}
          ordered={this.orderHandler}
        />
      </Aux>
    );
  }
}

export default BurguerBuilder;
