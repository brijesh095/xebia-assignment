const actionsList = {
  'TOGGLE_LOGIN_BTN_STATUS': 'TOGGLE_LOGIN_BTN_STATUS',
  'LOGIN_ERROR': 'LOGIN_ERROR_MESSAGE',
  'SAVE_USER_DETAILS': 'LOGGEDIN_USER_DETAILS_SAVE',
  'RECORD_SEARCH': 'RECORD_SEARCH'
}

export function loginErrorMessageAction(message) {
  return {
    type: actionsList.LOGIN_ERROR,
    message,
  }
}

export function loggedInUserDetailsSave(details) {
  return {
    type: actionsList.SAVE_USER_DETAILS,
    details,
  }
}

export function loginAction(dispatch) {
  return (props, account) => {
    fetch(`https://swapi.co/api/people/?search=${account.username}`)
      .then(result => {  
        return result.json(); 
      })
      .then(userDetails => {
        let users = userDetails.results, userFound = false;
        
        if (users.length === 0) {
          dispatch(loginErrorMessageAction("No users found with the name of " + account.username));
        } else {
          users.forEach((user, index) => {
            if (user.name === account.username && user.birth_year ===account.password) {
              localStorage.setItem("loginUser", true);
              dispatch(loggedInUserDetailsSave(user));
              props.history.push('/search');
              userFound = true;
            }
          });
          if (!userFound) {
            dispatch(loginErrorMessageAction("Please check your username or password"));
          }
        }
      })
      .catch(function (error) {
        dispatch(loginErrorMessageAction(error));
      });
  };
}

export function logoutAction (dispatch) {
  return (props) => {
    localStorage.clear();
    props.history.push('/');
  }
}

export function updateList(details) {
  return {
    type: actionsList.RECORD_SEARCH,
    details,
  }    
}

export function filterPlanet (dispatch) {
  return (data) => {
    fetch(`https://swapi.co/api/planets/?search=${data}`)
    .then(result => {  
      return result.json(); 
    })
    .then(planets => {
      dispatch(updateList(planets.results))
    })
    .catch((err) => {
      console.log(err);
    })  
  }
}

