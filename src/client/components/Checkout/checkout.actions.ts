import axios from 'axios';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { api, routes, UPDATE_ITEM_QUANTITY, DELETE_ITEM_FROM_BASKET, GET_PROMO_CODE, APPLY_DISCOUNT } from '../../constants';

export const updateItemQuantity = (id, quantity) => ({
    type: UPDATE_ITEM_QUANTITY,
    payload: { id, quantity: parseInt(quantity) }
});

export const deleteItemFromBasket = (id) => ({
    type: DELETE_ITEM_FROM_BASKET,
    payload: { id }
});

export const applyDiscount = (discount) => ({
    type: APPLY_DISCOUNT,
    payload: { discount }
});

export const getPromoCode = (promoCode) => ({
    type: GET_PROMO_CODE,
    payload: { promoCode }
});

export const checkout = (products, creditCardDetails) => async (dispatch: Dispatch) => {
    const body = JSON.stringify({
        basket: products.map(product => ({ sku: parseInt(product.id), quantity: product.quantity })),
        cardNumber: creditCardDetails
    });
    try {
        const response = await axios.post(`${api.baseUrl}${api.checkout}`, body);
        //@ts-ignore
        const { errors } = response;
        if (!errors) {
            return dispatch(push(routes.success));
        } else {
            return dispatch(push(routes.failed));
        }
    } catch (error) {
        return dispatch(push(routes.failed));
    }
}
  
export const applyPromoCode = (promoCode: string) => async (dispatch: Dispatch) => {
    dispatch(getPromoCode(promoCode));
    const body = JSON.stringify({ promoCode });
    try {
        const response = await axios.post(`${api.baseUrl}${api.promocode}`, body);
        // @ts-ignore
        const { data } = response;
        dispatch(applyDiscount(data));
    } catch (err) {
        console.log(err);
    }
}