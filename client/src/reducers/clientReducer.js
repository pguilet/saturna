import { FETCH_CLIENT } from '../actions/types';

const client = function (state = null, action) {
     switch (action.type) {
          case FETCH_CLIENT:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default client;
