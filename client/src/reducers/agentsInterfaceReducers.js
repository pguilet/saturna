import { FETCH_USERS } from "../actions/types";

const allUsers = function (state = null, action){
    switch(action.type){
        case FETCH_USERS:
            return action.payload || false;//payload with empty string = false
        default:
            return state;
    }
}

export default allUsers;