import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './rootReducer';
import { throttle } from 'lodash';
import { saveBasketProducts } from './helpers';

export const history = createBrowserHistory();

const configureStore = (preloadedState) => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
      ),
    ),
  );

  store.subscribe(throttle(() => {
      // @ts-ignore
      const { products } = store.getState();
      saveBasketProducts({ products });
  }, 1500));

  return store;
}

export default configureStore;