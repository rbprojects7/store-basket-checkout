import { FETCHED_PRODUCTS, GET_PRODUCTS } from '../../constants';

export const isLoading = (state = false, action) => {
    switch (action.type) {
        case FETCHED_PRODUCTS:
            return false;
        case GET_PRODUCTS:
            return true;
        default:
            return state;
    }
};
