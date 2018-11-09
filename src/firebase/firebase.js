import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD6Orw97KxyAtWHzNtLAHP1KtFdCQAYTVY",
    authDomain: "expensify-app-72dab.firebaseapp.com",
    databaseURL: "https://expensify-app-72dab.firebaseio.com",
    projectId: "expensify-app-72dab",
    storageBucket: "expensify-app-72dab.appspot.com",
    messagingSenderId: "125734550575"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };