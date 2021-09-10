import { FETCH_NOTARIES } from '../actions/types';

const allNotaries = function (state = null, action) {
     switch (action.type) {
          case FETCH_NOTARIES:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default allNotaries;
