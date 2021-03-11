import * as actionTypes from "./actionTypes";

export const purchaseBurbuerSuccess = (id, orderData) => {
    return {
type: actionTypes.PURCHASE_BURGUER_SUCCESS,
orderId: id,
orderData: orderData
    }
};

export const purchaseBurbuerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    }
}