import { FETCH_HOME_ADS } from '../actions/types';

const homeAds = function (state = null, action) {
     switch (action.type) {
          case FETCH_HOME_ADS:
               return action.payload || false; //payload with empty string = false
          default:
               return state;
     }
};

export default homeAds;
