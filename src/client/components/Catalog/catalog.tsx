import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { map, isEmpty } from 'lodash';
import { routes } from '../../constants';
import { CatalogHeader, GlobalTableStyle } from './catalog.style';
import { ICatalog, IProduct } from './catalog.interface';

export const Catalog = ({ quantity = 0, products = [], addItemsToBasket, isLoading = true, getAllProducts }: ICatalog) => {
    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    return (
        <Fragment>
            <GlobalTableStyle />
            <CatalogHeader>Product List View</CatalogHeader>
            <Link to={routes.checkout}>
             Basket {quantity}
            </Link>
            {isLoading ? <p>Loading products...</p> : <Fragment>
                {isEmpty(products) ? <p>There are no products available currently</p> : <table>
                    <caption className="hidden">The products available to purchase.</caption>
                    <tbody>
                        <tr className="hidden">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                        </tr>
                        {map(products, (product: IProduct) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button value={product.id} onClick={() => addItemsToBasket(product.id)}>
                                        Add to basket
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
                <Link to={routes.checkout}>Proceed to checkout</Link>
            </Fragment>}
        </Fragment>
    );
}