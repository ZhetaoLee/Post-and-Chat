import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import weather from './weather';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth,
    weather,
    posts,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});

export default rootReducer;