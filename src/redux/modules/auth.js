const DEFAULT_CITY = "Toronto";

const initialState = {
  authError: null,
  userNameWarningMessage: null,
  emailWarningMessage: null,
  passwordWarningMessage: null,
  authDirectTo: false,
  userNameRedirectTo: false,
  emailRedirectTo: false,
  passwordDirectTo: false,
};

// action types
export const types = {
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  LOG_IN_SUCCESS: "LOG_IN_SUCCESS",
  LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS",
  SIGN_UP_ERROR: "SIGN_UP_ERROR",
  LOG_IN_ERROR: "LOG_IN_ERROR",
  LOG_OUT_ERROR: "LOG_OUT_ERROR",

  USERNAME_FORMAT_CORRECT: "USERNAME_FORMAT_CORRECT",
  USERNAME_FORMAT_WRONG: "USERNAME_FORMAT_WRONG",
  EMAIL_FORMAT_CORRECT: "EMAIL_FORMAT_CORRECT",
  EMAIL_FORMAT_WRONG: "EMAIL_FORMAT_WRONG",
  PASSWORD_FORMAT_CORRECT: "PASSWORD_FORMAT_CORRECT",
  PASSWORD_FORMAT_WRONG: "PASSWORD_FORMAT_WRONG",
};

// action creators
export const actions = {
  login: (email, password) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
        email, password
      ).then(() => {
        dispatch({ type: types.LOG_IN_SUCCESS, authDirectTo: true});
      }).catch((err) => {
        dispatch({ type: types.LOG_IN_ERROR, authDirectTo: false, err });
      });
    };
  },
  signup: (username, email, password) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      firebase.auth().createUserWithEmailAndPassword(
        email, password
      ).then((resp) => {
        firestore.collection('users').doc(resp.user.uid).set({
          userName: username,
          userEmail: email,
          city: DEFAULT_CITY,
        })
      }).then(() => {
        dispatch({ type: types.SIGN_UP_SUCCESS, authDirectTo: true });
      }).catch((err) => {
        dispatch({ type: types.SIGN_UP_ERROR, authDirectTo: false, err });
      });
    };
  },
  logout: () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signOut().then(() => {
        dispatch({ type: types.LOG_OUT_SUCCESS, userNameRedirectTo: false, emailRedirectTo: false, 
                    passwordDirectTo: false, authDirectTo: false});
      }).catch((err) => {
        dispatch({ type: types.LOG_OUT_ERROR, err });
      });
    };
  },
  checkUserName: (username) => {
    return (dispatch) => {
      if (username.length === 0){
        dispatch({ type: types.USERNAME_FORMAT_WRONG, userNameRedirectTo: false, userNameWarningMessage: "Username is required" });
      } else if (username.length > 30) {
        dispatch({ type: types.USERNAME_FORMAT_WRONG, userNameRedirectTo: false, userNameWarningMessage: "Username cannot exceed 30 characters" });
      } else {
        dispatch({ type: types.USERNAME_FORMAT_CORRECT, userNameRedirectTo: true});
      }
    }
  },
  checkEmail: (email) => {
    return (dispatch) => {
      if (email.length === 0) {
        dispatch({ type: types.EMAIL_FORMAT_WRONG, emailRedirectTo: false, emailWarningMessage: "Email is required" });
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        dispatch({ type: types.EMAIL_FORMAT_WRONG, emailRedirectTo: false, emailWarningMessage: "Invalid email address" });
      } else {
        dispatch({ type: types.EMAIL_FORMAT_CORRECT, emailRedirectTo:true });
      }
    }
  },
  checkPassword: (password) => {
    return (dispatch) => {
      if (password.length === 0) {
        dispatch({ type: types.PASSWORD_FORMAT_WRONG, passwordDirectTo: false, passwordWarningMessage: "Password is required" });
      } else if (password.length < 6){
        dispatch({ type: types.PASSWORD_FORMAT_WRONG, passwordDirectTo: false, passwordWarningMessage: "Password length must no less than 6 characters" });
      } else {
        dispatch({ type: types.PASSWORD_FORMAT_CORRECT, passwordDirectTo: true });
      }
    }
  },
};

// reducers
const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.LOG_OUT_SUCCESS:
      return {...state , authError: null, userNameWarningMessage: null, emailWarningMessage: null, passwordWarningMessage: null,userNameRedirectTo: action.userNameRedirectTo, emailRedirectTo: action.emailRedirectTo, passwordDirectTo: action.passwordDirectTo, authDirectTo: action.authDirectTo};
    case types.LOG_OUT_ERROR:
      return state;
    case types.LOG_IN_SUCCESS:
      return {...state, authError: null, authDirectTo: action.authDirectTo};
    case types.LOG_IN_ERROR:
      return {...state, authError: "Wrong email or password", authDirectTo: action.authDirectTo};
    case types.SIGN_UP_SUCCESS:
      return {...state, authDirectTo: action.authDirectTo, authError: null};
    case types.SIGN_UP_ERROR:
      return {...state, authDirectTo: action.authDirectTo, authError: "This email already exists, please try another one"};
    case types.USERNAME_FORMAT_CORRECT:
      return {...state, userNameWarningMessage: null, userNameRedirectTo: action.userNameRedirectTo};
    case types.USERNAME_FORMAT_WRONG:
      return {...state, userNameWarningMessage: action.userNameWarningMessage, userNameRedirectTo: action.userNameRedirectTo};
    case types.EMAIL_FORMAT_CORRECT:
      return {...state, emailWarningMessage: null, emailRedirectTo: action.emailRedirectTo};
    case types.EMAIL_FORMAT_WRONG:
      return {...state, emailWarningMessage: action.emailWarningMessage, emailRedirectTo: action.emailRedirectTo};
    case types.PASSWORD_FORMAT_CORRECT:
      return {...state, passwordWarningMessage: null, passwordDirectTo: action.passwordDirectTo};
    case types.PASSWORD_FORMAT_WRONG:
      return {...state, passwordWarningMessage: action.passwordWarningMessage, passwordDirectTo: action.passwordDirectTo};
    default: 
      return state;
  }
}

export default reducer;
