import React, { Fragment, useState } from 'react';
import luhn from 'luhn';
import { Link } from 'react-router-dom';
import { range, isEmpty } from 'lodash';
import { routes } from '../../constants';
import { CheckoutParagraph } from './checkout.style';
import { CheckoutForm } from './checkout.form';
import { ICheckout } from './checkout.interface';
import { GlobalTableStyle } from '../Catalog/catalog.style';

export const Checkout = ({
    promocode,
    applyPromoCode,
    quantity = 0, 
    products,
    updateItemQuantity,
    deleteItemFromBasket,
    subTotal,
    discount,
    totalAmount,
    checkout
}: ICheckout): JSX.Element => {
    const [validCheckout, setCheckoutValid] = useState(false);
    const checkoutInputOnChange = (value) => {
      if (luhn.validate(value) && quantity > 0) {
        setCheckoutValid(true);
      } else {
        setCheckoutValid(false);
      }
    }
    return (
        <Fragment>
            <GlobalTableStyle />
            <CheckoutParagraph>
                Basket / Checkout View
            </CheckoutParagraph>
            <Link to={routes.catalog}>Continue shopping</Link>
            <br />
            <Link to={routes.checkout}>
             Basket {quantity}
            </Link>
            {products && !isEmpty(products) && <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Line Price</th>
              <th>Product Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <select defaultValue={product.quantity} onChange={ev => updateItemQuantity(product.id, ev.target.value)}>
                  {range(1, 11).map(quantity => (
                      <option key={`${quantity} ${product.id}`} value={quantity}>{quantity}</option>
                  ))}
                  </select>
                </td>
                <td>{product.linePrice}</td>
                <td>
                  <button value={product.id} onClick={() => deleteItemFromBasket(product.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
        <CheckoutForm
            defaultValue={promocode}
            inputId="promoCodeInput"
            label="Enter Promo Code"
            onSubmit={(value) => applyPromoCode(value)}
            submitButtonValue="Apply"
            onChangeInput={() => {}}
            disabled={false}
        />
        {/* <form onSubmit={evt => { evt.preventDefault(); applyPromoCode(this.promoCode.value) }}>
          <label htmlFor="promo-code">Enter Promo Code</label>
          <input id="promo-code" type="text" defaultValue={promoCode} ref={n => { this.promoCode = n }} />
          <input type="submit" value="Apply" />
        </form> */}
        <table>
          <tbody>
            <tr>
              <th>Sub Total</th>
              <td>{subTotal}</td>
            </tr>
            <tr>
              <th>Promotional amount</th>
              <td>{discount}</td>
            </tr>
            <tr>
              <th>Total Amount</th>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </table>
        <CheckoutForm
            inputId="creditCardInput"
            label="Please enter your credit card number"
            onSubmit={(value) => checkout(products, value)}
            submitButtonValue="Pay and Checkout"
            onChangeInput={checkoutInputOnChange}
            disabled={quantity === 0 || !validCheckout}
        />
    </Fragment>
    );
}