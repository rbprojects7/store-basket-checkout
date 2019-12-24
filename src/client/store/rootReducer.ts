import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { discount, isLoading, products, promocode } from './reducers';

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  discount,
  isLoading,
  products,
  promocode,
});
