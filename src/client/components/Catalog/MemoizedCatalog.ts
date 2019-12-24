import { memo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Catalog } from './catalog';
import { ICatalog } from './catalog.interface';
import { getProductItemsSelector, getIsLoadingProductsSelector, getQuantityBasketSelector } from '../../selectors';
import { getAllProducts, addToBasket } from './catalog.actions';

type StateToPropsMap = Pick<ICatalog, 'quantity' | 'products' | 'isLoading'>;

const mapStateToProps = (state: StateToPropsMap): StateToPropsMap  => {
    const products = getProductItemsSelector(state);
    const quantity = getQuantityBasketSelector(state);
    const isLoading = getIsLoadingProductsSelector(state);
    return {
        quantity,
        products,
        isLoading,
    }
};

type DispatchToPropsMap = Pick<ICatalog, 'getAllProducts' | 'addItemsToBasket'>;

const mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsMap => ({
    getAllProducts: (): Promise<void> => dispatch<any>(getAllProducts()),
    addItemsToBasket: (id): void => dispatch<any>(addToBasket(id)),
});

export const MemoizedCatalog = connect(
    mapStateToProps,
    mapDispatchToProps,
)(memo(Catalog));
