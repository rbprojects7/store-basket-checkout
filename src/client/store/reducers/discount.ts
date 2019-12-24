import { APPLY_DISCOUNT } from "../../constants";

export const discount = (state = null, action) => {
    switch (action.type) {
        case APPLY_DISCOUNT:
            return action.payload.discount
        default:
            return state;
    }
}