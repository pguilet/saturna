import { FETCH_CASES } from '../actions/types';

const allCases = function (state = null, action) {
     switch (action.type) {
          case FETCH_CASES:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default allCases;
