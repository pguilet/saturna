import { FETCH_RENTING_CASE } from '../actions/types';

const rentingCase = function (state = null, action) {
     switch (action.type) {
          case FETCH_RENTING_CASE:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default rentingCase;
