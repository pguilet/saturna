import { FOCUS_FORM_CONFIGURATION } from '../actions/types';

const focusFormConfiguration = function (state = null, action) {
     switch (action.type) {
          case FOCUS_FORM_CONFIGURATION:
               if (action.payload) {
                    return action.payload.configuration;
               }
               return null;
          default:
               return state;
     }
};

export default focusFormConfiguration;
