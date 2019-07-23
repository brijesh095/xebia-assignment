import { combineReducers } from "redux";

export function loginReducer(state = null, action= {type: ''}) {
    let newState = {};
    switch (action.type) {
      case 'TOGGLE_LOGIN_BTN_STATUS':
        newState = { ...state, loginBtnEnabledStatus: action.status };
        break;
      case 'LOGIN_ERROR_MESSAGE':
        newState = { ...state, errMsg: action.message };
        break;
      case 'LOGGEDIN_USER_DETAILS_SAVE':
        newState = { ...state, userDetails: action.details };
        break;
      case 'RECORD_SEARCH':
      newState = { ...state, planetDetails: action.details }; 
      break; 
      default:
        newState = {...state};
    }
  
    return newState;
  };

  export default combineReducers({loginReducer})