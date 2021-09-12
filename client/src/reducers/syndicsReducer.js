import { FETCH_SYNDICS } from '../actions/types';

const allSyndics = function (state = null, action) {
     switch (action.type) {
          case FETCH_SYNDICS:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default allSyndics;
