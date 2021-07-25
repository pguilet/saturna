import { FETCH_USER } from "../actions/types";

const authReducer = function (state = null, action){
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;//payload with empty string = false
        default:
            return state;
    }
}

export default authReducer;