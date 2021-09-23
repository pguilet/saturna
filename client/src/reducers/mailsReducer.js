import { FETCH_MAILS } from '../actions/types';

const mails = function (state = null, action) {
     switch (action.type) {
          case FETCH_MAILS:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default mails;
