import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        tomato:0,
        onions:0
    },
    totalPrice: 3
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                }

            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default reducer;