export const getProductsFromBasket = (state) => {
    return state.products
        .filter(product => product.quantity > 0)
        .map(product => ({ id: product.id, name: product.name, quantity: product.quantity, linePrice: product.linePrice}));
}
  
export const getDiscountValue = (state, total): string => {
    const discount = state.discount ? (state.discount.amount / 100) : 0;
    return `€${(Number(total.substring(1)) * discount).toFixed(2)}`;
};

export const getSubTotalValue = (state): string => {
    const subTotal = state.products.map(product => product.price.substring(1) * product.quantity).reduce((prev, curr) => prev + curr, 0) || 0;
    return `€${subTotal.toFixed(2)}`
};

export const getTotalAmount = (subTotal, discount) => {
    return `€${(Number(subTotal.substring(1)) - Number(discount.substring(1))).toFixed(2)}`;
}