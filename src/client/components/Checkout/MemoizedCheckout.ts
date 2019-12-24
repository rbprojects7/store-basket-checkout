import { memo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Checkout } from './checkout';
import { ICheckout } from './checkout.interface';
import { getProductsFromBasket, getSubTotalValue, getDiscountValue, getTotalAmount } from './checkout.helpers';
import { updateItemQuantity, deleteItemFromBasket, checkout, applyPromoCode } from './checkout.actions';
import { getQuantityBasketSelector } from '../../selectors';

type StateToPropsMap = Pick<ICheckout, 'products' | 'subTotal' | 'discount' | 'totalAmount' | 'quantity' | 'promocode'>;

const mapStateToProps = (state: StateToPropsMap): StateToPropsMap => {
    const promocode = state.promocode;
    const quantity = getQuantityBasketSelector(state);
    const products = getProductsFromBasket(state);
    const subTotal = getSubTotalValue(state);
    const discount = getDiscountValue(state, subTotal);
    const totalAmount = getTotalAmount(subTotal, discount);

    return {
        quantity,
        products,
        subTotal,
        discount, 
        totalAmount,
        promocode,
    }
};

type DispatchToPropsMap = Pick<ICheckout, 'updateItemQuantity' | 'deleteItemFromBasket' | 'checkout' | 'applyPromoCode'>;

const mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsMap => ({
    updateItemQuantity: (id, quantity) => dispatch<any>(updateItemQuantity(id, quantity)),
    deleteItemFromBasket: (id) => dispatch<any>(deleteItemFromBasket(id)),
    checkout: (products, creditCardDetails) => dispatch<any>(checkout(products, creditCardDetails)),
    applyPromoCode: (value: string) => dispatch<any>(applyPromoCode(value)),
});

export const MemoizedCheckout = connect(
    mapStateToProps,
    mapDispatchToProps,
)(memo(Checkout));
