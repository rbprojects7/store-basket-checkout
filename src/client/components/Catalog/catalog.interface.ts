export interface IProduct {
    id: string;
    name: string;
    price: string;
    description: string;
    linePrice: string;
    quantity: number;
}

export interface ICatalog {
    quantity?: number;
    products?: Array<IProduct>;
    addItemsToBasket: ( id: string ) => void;
    getAllProducts: () => void;
    isLoading?: boolean;
}