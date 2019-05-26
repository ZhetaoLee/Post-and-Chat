import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB4toHs6SrH5F_hpddZ62gBgX25FE1BQ1E",
    authDomain: "post-and-chat.firebaseapp.com",
    databaseURL: "https://post-and-chat.firebaseio.com",
    projectId: "post-and-chat",
    storageBucket: "post-and-chat.appspot.com",
    messagingSenderId: "1032292451917",
    appId: "1:1032292451917:web:881c8441be9fdd80"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase;