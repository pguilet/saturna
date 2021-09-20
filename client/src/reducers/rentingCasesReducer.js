import { FETCH_RENTING_CASES } from '../actions/types';

const allRentingCases = function (state = null, action) {
     switch (action.type) {
          case FETCH_RENTING_CASES:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default allRentingCases;
