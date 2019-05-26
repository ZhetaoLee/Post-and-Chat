import axios from 'axios';

const WEATHER_KEY = "a91755d2273e487a827193001192204";

const initialState = {
  city: null,
  temp_c: null,
  text: null,
  icon: null,
  weatherError: null,
  openLocation: false,
  showError: false,
};

// action types
export const types = {
  CHANGE_LOCATION_SUCCESS: "CHANGE_LOCATION_SUCCESS",
  CHANGE_LOCATION_ERROR: "CHANGE_LOCATION_ERROR",
  OPEN_SUCCESS: "OPEN_SUCCESS",
  CANCEL_SUCCESS: "CANCEL_SUCCESS",
  HIDE_ERROR_SUCCESS: "HIDE_ERROR_SUCCESS",
};

// action creators
export const actions = {
  newLocation: () => {
    return (dispatch) => {
      dispatch({ type: types.OPEN_SUCCESS, openLocation: true});
    };
  },
  cancelLocation: () => {
    return (dispatch) => {
      dispatch({ type: types.CANCEL_SUCCESS, openLocation: false});
    };
  },
  saveLocation: (location, userid) => {
    return (dispatch, getState, {getFirestore}) => {
      const URL = `https://api.apixu.com/v1/current.json?key=${WEATHER_KEY}&q=${location}`;
      const firestore = getFirestore();
      axios.get(URL).then((response) => {
        return response.data;
      }).then(()=>{
        firestore.collection('users').doc(userid).update({
          city: location
        }).then(()=>{
          dispatch({ type: types.CHANGE_LOCATION_SUCCESS, city: location, showError: false, weatherError: null});
        })
      }).catch((err) => {
        dispatch({ type: types.CHANGE_LOCATION_ERROR, showError: true, weatherError: "No such city exists, please enter a valid city name"});
      })
    };
  },
  loadLocation: (location) => {
    return (dispatch) => {
      const URL = `https://api.apixu.com/v1/current.json?key=${WEATHER_KEY}&q=${location}`;
      axios.get(URL).then((response) => {
          return response.data;
      }).then((data) => {
        const { temp_c } = data.current;
        const { name } = data.location;
        const { text, icon } = data.current.condition;
        dispatch({ type: types.CHANGE_LOCATION_SUCCESS, showError: false, weatherError: null, temp_c: temp_c, city: name, text: text, icon: icon});
      }).catch((err) => {
        dispatch({ type: types.CHANGE_LOCATION_ERROR, showError: true, weatherError: "No such city exists, please enter a valid city name"});
      })
    };
  },
  hideError: () => {
    return (dispatch) => {
      dispatch({ type: types.HIDE_ERROR_SUCCESS, showError: false});
    };
  }
};

// reducers
const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.CHANGE_LOCATION_SUCCESS:
      return {...state, showError: action.showError, weatherError: action.weatherError, temp_c: action.temp_c, city: action.city, text: action.text, icon: action.icon};
    case types.CHANGE_LOCATION_ERROR:
      return {...state, showError: action.showError, weatherError: action.weatherError};
    case types.OPEN_SUCCESS:
      return {...state, openLocation: action.openLocation};
    case types.CANCEL_SUCCESS:
      return {...state, openLocation: action.openLocation};
    case types.HIDE_ERROR_SUCCESS:
      return {...state, showError: action.showError};
    default: 
      return state;
  }
}

export default reducer;
  