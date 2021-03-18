import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
//import Help from "../../components/Navigation/NavigationItems/Help/Help";
import Spinner from "../../components/UI/Spinner/Spinner";
//import Privacy from "../../components/Navigation/NavigationItems/Privacy/Privacy";
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";
// import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
//import axios from "axios";

class BurguerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  //   }

  state = {
    ordering: false,
    helping: false,
    loading: false,
    privacy: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updateAvailableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);
    return sum > 0;
  }

  orderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ ordering: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  helpHandler = () => {
    this.setState({ helping: true });
  };

  privacyHandler = () => {
    this.setState({ privacy: true });
  };

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  };

  questionClickedHandler = () => {};

  helpCancelHandler = () => {
    this.setState({ helping: false });
  };

  privacyCancelHandler = () => {
    this.setState({ privacy: false });
  };

  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burguer = this.props.error ? (
      <p>Ingredient's can't be loaded. Try again</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burguer = (
        <Aux>
          <Burguer ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            available={this.updateAvailableState(this.props.ings)}
            ordered={this.orderHandler}
            isAuth={this.props.isAuthenticated}
            help={this.helpHandler}
            privacy={this.privacyHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSumary
          ingredients={this.props.ings}
          orderCanceled={this.orderCancelHandler}
          orderContinued={this.orderContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Model show={this.state.ordering} modelClosed={this.orderCancelHandler}>
          {orderSummary}
        </Model>
        {/* <Model show={this.state.helping} modelClosed={this.helpCancelHandler}>
          <Help
            questionClicked={this.questionClickedHandler}
            questions={this.state.questions}
          />
        </Model>

        <Model
          show={this.state.privacy}
          modelClosed={this.privacyCancelHandler}
        >
          <Privacy />
        </Model> */}
        {burguer}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    error: state.burguerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurguerBuilder);
