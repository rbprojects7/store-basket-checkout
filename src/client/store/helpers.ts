export const saveBasketProducts = (state) => {
    try {
        localStorage.setItem('basketState', JSON.stringify(state));
    } catch (err ) {
        console.log(err);
    }
};

export const loadBasketState = () => {
    try {
        const serializedBasketJSON = localStorage.getItem('basketState');
        if (!serializedBasketJSON || serializedBasketJSON === null) {
            return null;
        }
        return JSON.parse(serializedBasketJSON);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const convertProductsToState = (products, state) => {
    return products.map(product => {
        let quantity = state.reduce((prev, curr, index, products) => (products[index].id === product.sku.toString()) ? products[index].quantity : prev, 0);
        if (quantity > 10) quantity = 10;
        const linePrice = quantity ? `€${(product.price * quantity).toFixed(2)}` : '€0.00';
        return {
            id: product.sku.toString(),
            name: product.name,
            price: `€${product.price.toFixed(2)}`,
            quantity,
            description: product.description,
            linePrice
        };
    });
};