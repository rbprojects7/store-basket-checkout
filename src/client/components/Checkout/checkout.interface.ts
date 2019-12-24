import { IProduct } from "../Catalog";

export interface ICheckout {
    promocode: string;
    applyPromoCode: (value: string) => void;
    products: Array<IProduct>;
    updateItemQuantity: (id: string, value: string | number) => void;
    deleteItemFromBasket: (id: string) => void;
    subTotal: string;
    discount: string;
    quantity?: number;
    totalAmount: string;
    checkout: (products: Array<IProduct>, value: string) => void;
}