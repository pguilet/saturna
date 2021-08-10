import { FETCH_PAGE } from '../actions/types';

const pageSelectedReducer = function (state = null, action) {
     switch (action.type) {
          case FETCH_PAGE:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default pageSelectedReducer;
