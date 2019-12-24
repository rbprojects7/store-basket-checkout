import { createSelector } from 'reselect';
import { reduce, values } from 'lodash';

export const getProductItemsSelector = state => state.products;

export const getIsLoadingProductsSelector = state => state.isLoading;

export const getQuantityBasketSelector = createSelector(
    getProductItemsSelector,
    products => reduce(values(products), (acc: number, product: { quantity: number }) => acc + product.quantity, 0),
);
