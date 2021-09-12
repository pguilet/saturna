import { FETCH_CASE } from '../actions/types';

const theCase = function (state = null, action) {
     switch (action.type) {
          case FETCH_CASE:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default theCase;
