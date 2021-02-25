import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model"; 
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";
import Help from "../../components/Navigation/NavigationItems/Help/Help";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

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
    ordering: false,
    helping:false,
    loading: false
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

  helpHandler = () => {
    this.setState({helping: true})
  }

  orderCancelHandler = () => {
    this.setState({ordering: false})
  }

  questionClickedHandler = () => {

  }

  helpCancelHandler = () => {
    this.setState({helping: false})
  }

  orderContinueHandler = () => {
    this.setState({loading: true})

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Consuela",
        address: {
          street: "SesamoStreet",
          zipCode: "123456",
          country: "Mexico"
        },
        email: "test@test.com"
      },
      deliveryMethod: "express"
    }

    axios.post("/orders.json", order)
    .then(response => {
      this.setState({loading: false, ordering: false})
    })
    .catch(error => {
      this.setState({loading: false, ordering: false})
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary =  <OrderSumary ingredients={this.state.ingredients} 
    orderCanceled={this.orderCancelHandler}
    orderContinued={this.orderContinueHandler}
    price={this.state.totalPrice}/>;


    if(this.state.loading) {
      orderSummary = <Spinner/>;

    }
    return (
      <Aux>
        <Model show={this.state.ordering} modelClosed={this.orderCancelHandler}>
         {orderSummary}
        </Model>
        <Model show={this.state.helping} modelClosed={this.helpCancelHandler}>
          <Help 
          questionClicked={this.questionClickedHandler}
          questions={this.state.questions}/>
        </Model>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          available={this.state.available}
          ordered={this.orderHandler}
          help = {this.helpHandler}
        />
      </Aux>
    );
  }
}


export default BurguerBuilder;
