import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { GET_PRODUCTS, ADD_TO_BASKET, FETCHED_PRODUCTS, api } from '../../constants';

export const getProducts = () => ({ type: GET_PRODUCTS });

export interface IAddFetchedProductsAction extends Action {
    type: typeof FETCHED_PRODUCTS;
    payload: {
        products: [];
    }
  }  

export const addFetchedProducts = (products: []): IAddFetchedProductsAction => ({ type: FETCHED_PRODUCTS, payload: { products } });

export const addToBasket = (id: string) => ({ type: ADD_TO_BASKET, payload: { id } });

export const getAllProducts = () => async (dispatch: Dispatch) => {
    dispatch(getProducts());
    try {
        const { data } = await axios.get(`${api.baseUrl}${api.products}`);
        return dispatch(addFetchedProducts(data));
    } catch (error) {
        console.error(error);
    }
};
