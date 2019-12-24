import { GET_PROMO_CODE } from '../../constants';

export const promocode = (state = null, action) => {
    switch (action.type) {
        case GET_PROMO_CODE:
                return action.payload.promoCode;
        default:
            return state;
    }
}