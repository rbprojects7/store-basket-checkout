import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './client/store';
import { loadBasketState } from './client/store/helpers';
import * as serviceWorker from './serviceWorker';
import { MemoizedCatalog, MemoizedCheckout } from './client/components';
import { FailedCheckout, NotFound, Success } from './client/views';
import { routes } from './client/constants';

let initialState = null;
let store;
initialState = loadBasketState();
if (initialState) {
    store = configureStore(initialState);
} else {
    store = configureStore();
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <>
                <Switch>
                    <Route exact path={routes.catalog} render={() => (<MemoizedCatalog />)} />
                    <Route exact path={routes.checkout} render={() => (<MemoizedCheckout />)} />
                    <Route exact path={routes.failed} render={() => (<FailedCheckout />)} />
                    <Route exact path={routes.success} render={() => (<Success />)} />
                    <Route render={() => (<NotFound />)} />
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
