import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Model from "../../components/UI/Model/Model";
import Help from "../../components/Navigation/NavigationItems/Help/Help";
import Spinner from "../../components/UI/Spinner/Spinner";
import Privacy from "../../components/Navigation/NavigationItems/Privacy/Privacy";
import OrderSumary from "../../components/Burguer/OrderSumary/OrderSumary";
// import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurguerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  //   }

  state = {
    available: false,
    ordering: false,
    helping: false,
    loading: false,
    privacy: false,
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get(
    //     "https://react-burguerbuilder-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
    //   )
    //   .then((response) => { 
    //     this.setState({ ingredients: response.data });
    //   });
  }

  updateAvailableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);
    this.setState({ available: sum > 0 });
  }

  
  orderHandler = () => {
    this.setState({ ordering: true });
  };

  helpHandler = () => {
    this.setState({ helping: true });
  };

  privacyHandler = () => {
    this.setState({privacy: true})
  }

  orderCancelHandler = () => {
    this.setState({ ordering: false });
  };

  questionClickedHandler = () => {};

  helpCancelHandler = () => {
    this.setState({ helping: false });
  };

  privacyCancelHandler = () => {
    this.setState({privacy: false})
  }

  orderContinueHandler = () => {

    const queryParams = [];
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
    }

    queryParams.push("price=" + this.state.totalPrice);
    const queryString =  queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search:"?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burguer = <Spinner />;

    if (this.props.ings) {
      burguer = (
        <Aux>
          <Burguer ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            available={this.state.available}
            ordered={this.orderHandler}
            help={this.helpHandler}
            privacy={this.privacyHandler}
          />
        </Aux>
      );
      orderSummary = 
        <OrderSumary
          ingredients={this.props.ings}
          orderCanceled={this.orderCancelHandler}
          orderContinued={this.orderContinueHandler}
          price={this.props.price}
        />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
  

    return (
      <Aux>
        <Model show={this.state.ordering} modelClosed={this.orderCancelHandler}>
          {orderSummary}
        </Model>
        <Model show={this.state.helping} modelClosed={this.helpCancelHandler}>
          <Help
            questionClicked={this.questionClickedHandler}
            questions={this.state.questions}
          />
       </Model>

       <Model show={this.state.privacy} modelClosed={this.privacyCancelHandler}>
         <Privacy />
       </Model>
        {burguer}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurguerBuilder);
