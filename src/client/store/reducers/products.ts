import { FETCHED_PRODUCTS, ADD_TO_BASKET, DELETE_ITEM_FROM_BASKET, UPDATE_ITEM_QUANTITY } from '../../constants';
import { convertProductsToState } from '../helpers';
import { IProduct } from '../../components';

export const products = (state = [], action) => {
    switch (action.type) {
        case FETCHED_PRODUCTS:
            return convertProductsToState(action.payload.products, state);
        case ADD_TO_BASKET:
            return state.map((product:IProduct) => {
                let quantity = product.id === action.payload.id ? ++product.quantity : product.quantity;
                if (quantity > 10) quantity = 10;
                const linePrice = quantity ? `€${(Number(product.price.substring(1)) * quantity).toFixed(2)}` : '€0.00';
                return {
                    ...product,
                    quantity,
                    linePrice
                }
            });
        case DELETE_ITEM_FROM_BASKET:
                return state.map((product: IProduct) => ({
                    ...product,
                    quantity: product.id === action.payload.id ? 0 : product.quantity,
                    linePrice: product.id === action.payload.id ? `€0.00` : product.linePrice,
                  }));
        case UPDATE_ITEM_QUANTITY:
            return state.map((product: IProduct) => {
                let quantity = product.id === action.payload.id ? action.payload.quantity : product.quantity;
                if (quantity > 10) quantity = 10;
                const linePrice = quantity ? `€${(Number(product.price.substring(1)) * quantity).toFixed(2)}` : '€0.00';
                return {
                    ...product,
                    quantity,
                    linePrice
                }
                });
        default:
            return state;
    }
}