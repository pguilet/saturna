import { FLASH } from "../actions/types";

const flashReducer = function (state = null, action){
    switch(action.type){
        case FLASH:
            return action.payload || false;//payload with empty string = false
        default:
            return state;
    }
}

export default flashReducer;