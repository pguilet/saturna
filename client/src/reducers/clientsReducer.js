import { FETCH_CLIENTS } from '../actions/types';

const allClients = function (state = null, action) {
     switch (action.type) {
          case FETCH_CLIENTS:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default allClients;
